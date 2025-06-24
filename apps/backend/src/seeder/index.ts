// apps/backend/src/seeder/index.ts
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { School, User } from '@olp-monitor/database-models';
import { schools } from '../../data/schools';

// Load env vars
dotenv.config({ path: './.env' });

const connectDB = async () => {
    try {
      const mongoURI = process.env.MONGO_URI;
      if (!mongoURI) {
        console.error('FATAL ERROR: MONGO_URI is not defined in .env file');
        process.exit(1);
      }
      await mongoose.connect(mongoURI);
      console.log('MongoDB Connected for Seeding...');
    } catch (err: any) {
      console.error(`MongoDB Connection Error: ${err.message}`);
      process.exit(1);
    }
};

const importData = async () => {
    try {
        // Drop the old, non-sparse email index if it exists. This is the fix.
        try {
            await User.collection.dropIndex('email_1');
            console.log('✅ Dropped outdated unique index on email.');
        } catch (e: any) {
            if (e.codeName === 'IndexNotFound') {
                console.log('ℹ️ Email index is correct. No action needed.');
            } else {
                throw e;
            }
        }

        // Clear existing data
        await School.deleteMany();

        // Add default billing contact to each school record
        const schoolsWithBilling = schools.map(school => ({
            ...school,
            billingContact: {
                name: 'Default Admin',
                email: 'billing@example.com',
                phone: '0700000000'
            }
        }));

        await School.insertMany(schoolsWithBilling);
        console.log('✅ School data Imported!');

        // Activate the test user 'Zaria001' if they exist
        const testUser = await User.findOne({ username: 'Zaria001' });
        if (testUser) {
            testUser.isActive = true;
            await testUser.save();
            console.log('✅ Activated test user: Zaria001');
        } else {
            console.log("ℹ️ Test user 'Zaria001' not found, skipping activation.");
        }

        console.log('✅ Seeding process complete!');
        process.exit();
    } catch (error) {
        console.error('❌ Error importing data:', error);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        await School.deleteMany();
        await User.deleteMany();
        console.log('✅ All School and User data destroyed!');
        process.exit();
    } catch (error) {
        console.error('❌ Error destroying data:', error);
        process.exit(1);
    }
};

const runSeeder = async () => {
    await connectDB();
    if (process.argv[2] === '-d') {
        await destroyData();
    } else {
        await importData();
    }
};

runSeeder();