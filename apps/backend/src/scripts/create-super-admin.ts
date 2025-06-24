// apps/backend/src/scripts/create-super-admin.ts

import mongoose from 'mongoose';
import { User } from '@olp-monitor/database-models';
import { UserRole } from '@olp-monitor/shared-types';
import { generateUniqueId } from '../utils/idGenerator';
import 'dotenv/config';

async function createSuperAdmin() {
  try {
    // Connect to MongoDB
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/olp-monitor';
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB');

    // Check if a super admin already exists
    const existingSuperAdmin = await User.findOne({ role: UserRole.SUPER_ADMIN });
    if (existingSuperAdmin) {
      console.log('A Super Admin already exists in the system.');
      await mongoose.disconnect();
      return;
    }

    // Generate a unique user number for the super admin
    const userNumber = await generateUniqueId('SA');
    
    // Create a secure password
    const password = 'SuperAdmin@2025'; // You should change this after first login
    
    // Create the super admin user
    const superAdmin = new User({
      userNumber,
      firstName: 'System',
      lastName: 'Administrator',
      email: 'admin@olp-monitor.org',
      password,
      role: UserRole.SUPER_ADMIN,
      isActive: true, // Important: This must be true for login to work
    });

    await superAdmin.save();
    console.log('Super Admin created successfully!');
    console.log('-----------------------------------');
    console.log('Login Credentials:');
    console.log(`Email: admin@olp-monitor.org`);
    console.log(`Password: ${password}`);
    console.log('-----------------------------------');
    console.log('IMPORTANT: Please change this password after your first login!');

    await mongoose.disconnect();
  } catch (error) {
    console.error('Error creating Super Admin:', error);
    process.exit(1);
  }
}

createSuperAdmin();
