import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import UserModel from '../models/user.model.js'; 
import dotenv from 'dotenv';

dotenv.config();

const DUMMY_PASSWORD = 'password';

const seedUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected successfully.');

    await UserModel.deleteMany({});
    console.log('Existing users cleared.');

    const salt=10;
    const hashedPassword=await bcrypt.hash(DUMMY_PASSWORD, salt);
    console.log('Password hashed!');

    const usersToCreate = [
      {
        email: 'admin@acme.test',
        password: hashedPassword,
        role: 'admin',
        tenantName: 'Acme'
      },
      {
        email: 'user@acme.test',
        password: hashedPassword,
        role: 'user',
        tenantName: 'Acme'
      },
      {
        email: 'admin@globex.test',
        password: hashedPassword,
        role: 'admin',
        tenantName: 'Globex'
      },
      {
        email: 'user@globex.test',
        password: hashedPassword,
        role: 'user',
        tenantName: 'Globex'
      }
    ];

    await UserModel.insertMany(usersToCreate);
    console.log(`Successfully created ${usersToCreate.length} dummy users.`);

  } 
  catch (error) {
    console.error('Error seeding the database:', error);
  } 
  finally {
    await mongoose.disconnect();
    console.log('MongoDB disconnected.');
  }
};

seedUsers();