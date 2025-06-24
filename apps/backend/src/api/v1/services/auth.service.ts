// apps/backend/src/api/v1/services/auth.service.ts
// apps/backend/src/api/v1/services/auth.service.ts

import { School, User, IUserDocument } from '@olp-monitor/database-models';
import { IRegisterSchoolAdminRequest, UserRole } from '@olp-monitor/shared-types';
import { generateUniqueId } from '../../../utils/idGenerator';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import { sendEmail } from '../../../utils/email.service';
import crypto from 'crypto';
import 'dotenv/config';

export class AuthService {
  // Add this new method inside the AuthService class
// In apps/backend/src/api/v1/services/auth.service.ts inside the AuthService class

public static async forgotPassword(email: string, origin: string): Promise<void> {
  const user = await User.findOne({ email });

  if (!user) {
    // For security, we don't reveal if the user exists.
    // We just won't send an email.
    console.log(`Password reset attempt for non-existent user: ${email}`);
    return;
  }

  // 1. Generate a random reset token
  const resetToken = crypto.randomBytes(32).toString('hex');

  // 2. Hash the token and set it on the user model
  user.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  // 3. Set an expiry date (e.g., 10 minutes from now)
  user.passwordResetExpires = new Date(Date.now() + 10 * 60 * 1000);

  await user.save();

  // 4. Create the reset URL and send the email
  const resetUrl = `${origin}/reset-password/${resetToken}`;

  const message = `You are receiving this email because you (or someone else) have requested the reset of a password. Please make a PUT request to: \n\n ${resetUrl}\n\nIf you did not request this, please ignore this email and your password will remain unchanged.`;

  try {
    await sendEmail({
      to: user.email,
      subject: 'Password Reset Token (valid for 10 min)',
      text: message,
      html: `<p>${message.replace(/\n/g, '<br>')}</p>`,
    });
  } catch (error) {
    // If email fails, clear the token from the DB to allow retries
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();
    throw new Error('There was an error sending the email. Please try again later.');
  }
}

public static async resetPassword(token: string, newPassword: string): Promise<void> {
  // 1. Get user based on the hashed token
  const hashedToken = crypto
    .createHash('sha256')
    .update(token)
    .digest('hex');

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() }, // Check if token is not expired
  });

  if (!user) {
    throw new Error('Token is invalid or has expired.');
  }

  // 2. Set the new password and clear the token fields
  user.password = newPassword;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;

  await user.save();
}

public static async registerGenericUser(data: any): Promise<IUserDocument> {
  const { email, role, username } = data;


  
  

  // Check for existing user
  if (role === UserRole.STUDENT) {
      const existingUser = await User.findOne({ username });
      if (existingUser) {
          throw new Error('This username is already taken. Please choose another.');
      }
  } else {
      if (!email) throw new Error('Email is required for this role.');
      const existingUser = await User.findOne({ email });
      if (existingUser) {
          throw new Error('A user with this email already exists.');
      }
  }

  // Generate user number based on role
  const rolePrefixes: { [key in UserRole]?: string } = {
      [UserRole.STUDENT]: 'ST',
      [UserRole.TEACHER]: 'TR',
      [UserRole.PARENT]: 'PR',
      [UserRole.HEADTEACHER]: 'HT',
  };
  const prefix = rolePrefixes[role as UserRole] || 'USR';
  const userNumber = await generateUniqueId(prefix);

  const newUser = new User({
      ...data,
      userNumber,
      isActive: false, // User is inactive until approved
  });

  const savedUser = await newUser.save();
  savedUser.password = undefined; // Don't send password back

  return savedUser;
}
  /**
   * Registers a new school and its primary administrator (Headteacher).
   * This is a transactional operation to ensure data integrity.
   */
  public static async registerSchoolAdmin(
    data: IRegisterSchoolAdminRequest
  ): Promise<IUserDocument> {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      // Check for existing school or user email within the transaction
      const existingSchool = await School.findOne({ schoolCode: data.schoolCode }).session(session);
      if (existingSchool) {
        throw new Error('A school with this code already exists.');
      }

      const existingUser = await User.findOne({ email: data.adminEmail }).session(session);
      if (existingUser) {
        throw new Error('A user with this email already exists.');
      }

      // 1. Create the School (Tenant)
      const newSchool = new School({
        name: data.schoolName,
        schoolCode: data.schoolCode,
        address: data.schoolAddress,
        billingContact: data.billingContact,
        // Initial subscription status is inactive until approved by SuperAdmin
      });
      const savedSchool = await newSchool.save({ session });

      // 2. Create the Headteacher User
      const userNumber = await generateUniqueId('HT'); // HT for Headteacher
      const newUser = new User({
        firstName: data.adminFirstName,
        lastName: data.adminLastName,
        email: data.adminEmail,
        password: data.adminPassword,
        role: UserRole.HEADTEACHER,
        schoolId: savedSchool._id,
        userNumber: userNumber,
      });

      const savedUser = await newUser.save({ session });

      // If all operations succeed, commit the transaction
      await session.commitTransaction();
      
      // We don't want to return the password, even if it's hashed
      savedUser.password = undefined;
      return savedUser;

    } catch (error) {
      // If any operation fails, abort the entire transaction
      await session.abortTransaction();
      console.error("Transaction aborted:", error);
      throw error; // Re-throw the error to be caught by the controller
    } finally {
      // End the session
      session.endSession();
    }
  }

  /**
   * Logs in a user and generates a JWT.
   */
  // In apps/backend/src/api/v1/services/auth.service.ts inside the AuthService class

// In apps/backend/src/api/v1/services/auth.service.ts inside the AuthService class
// In apps/backend/src/api/v1/services/auth.service.ts inside the AuthService class

public static async login(identifier: string, password: string): Promise<{ token: string; user: IUserDocument }> {
  const jwtSecret = process.env.JWT_SECRET;
  const jwtExpiresIn = process.env.JWT_EXPIRES_IN;

  // --- Start of Intense Debugging ---
  console.log("\n--- NEW LOGIN ATTEMPT ---");
  console.log(`[1] Received identifier: "${identifier}"`);

  if (!jwtSecret || !jwtExpiresIn) {
    console.error("[ERROR] JWT configuration missing in .env file!");
    throw new Error('FATAL: JWT configuration missing.');
  }

  const identifier_i = new RegExp(`^${identifier}$`, 'i');
  const query = {
    $or: [
      { userNumber: identifier },
      { username: identifier_i },
      { email: identifier_i },
    ],
  };
  
  console.log('[2] Searching database with query:', JSON.stringify(query));
  
  const user = await User.findOne(query).select('+password');
  
  if (!user) {
    console.log('[3] OUTCOME: User NOT FOUND in database.');
    console.log("--- LOGIN ATTEMPT FAILED ---\n");
    throw new Error('Invalid credentials');
  }

  console.log(`[3] OUTCOME: User FOUND. User ID: ${user._id}, Role: ${user.role}`);
  console.log(`[4] Checking 'isActive' status. Value is: ${user.isActive}`);
  
  // This is the check we are investigating
  if (!user.isActive) {
      console.log("[5] OUTCOME: Login FORBIDDEN because user.isActive is false.");
      console.log("--- LOGIN ATTEMPT FAILED ---\n");
      throw new Error('This account has been deactivated or is pending approval.');
  }

  console.log(`[5] 'isActive' check PASSED.`);
  console.log("[6] Comparing submitted password with stored hash...");

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    console.log(`[7] OUTCOME: Password does NOT match for user ${user._id}.`);
    console.log("--- LOGIN ATTEMPT FAILED ---\n");
    throw new Error('Invalid credentials');
  }

  console.log('[7] OUTCOME: Password MATCHES.');
  console.log('[8] Generating JWT...');

  const payload = { id: user._id, role: user.role, schoolId: user.schoolId };
  const expiresInSeconds = parseInt(jwtExpiresIn, 10);
  const token = jwt.sign(payload, jwtSecret, { expiresIn: expiresInSeconds });
  
  user.password = undefined;

  console.log('[9] Login successful. Returning token.');
  console.log("--- LOGIN ATTEMPT SUCCEEDED ---\n");

  return { token, user };
}
}
