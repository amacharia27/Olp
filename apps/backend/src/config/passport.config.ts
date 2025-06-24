// apps/backend/src/config/passport.config.ts
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { User, IUserDocument } from '@olp-monitor/database-models';
import { UserRole } from '@olp-monitor/shared-types';
import 'dotenv/config';

// This function will be called to configure passport
export const configurePassport = () => {
  // Google OAuth Strategy
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        callbackURL: '/api/v1/auth/google/callback',
        scope: ['profile', 'email'],
      },
      async (_accessToken, _refreshToken, profile, done) => {
        try {
          // Check if user already exists in our database
          let user = await User.findOne({ googleId: profile.id });

          if (user) {
            // If user exists, return the user
            return done(null, user);
          }

          // If user doesn't exist, create a new user
          const newUser = new User({
            googleId: profile.id,
            firstName: profile.name?.givenName || 'User',
            lastName: profile.name?.familyName || '',
            email: profile.emails?.[0].value, // Google guarantees at least one email
            avatar: profile.photos?.[0].value,
            role: UserRole.STUDENT, // Default role, can be changed later
            userNumber: `G-${profile.id}`, // Create a unique user number
            isActive: true,
          });

          await newUser.save();
          return done(null, newUser);
        } catch (error) {
          return done(error, false);
        }
      }
    )
  );

  // Used to stuff a piece of information into a cookie
  passport.serializeUser((user, done) => {
    done(null, (user as IUserDocument).id);
  });

  // Used to retrieve the whole object from the cookie
  passport.deserializeUser((id, done) => {
    User.findById(id, (err: any, user: IUserDocument | null) => done(err, user));
  });
};
