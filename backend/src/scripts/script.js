import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import UserModel from "../models/user.model.js";
import TenantModel from "../models/tenant.model.js";
import NoteModel from "../models/notes.model.js";

dotenv.config();

const DUMMY_PASSWORD = process.env.DUMMY_PASSWORD;

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected.");

    await Promise.all([
      UserModel.deleteMany({}),
      TenantModel.deleteMany({}),
      NoteModel.deleteMany({})
    ]);
    console.log("Cleared existing data.");

    const hashedPassword = await bcrypt.hash(DUMMY_PASSWORD, 10);

    const tenants = await TenantModel.insertMany([
      { tenantName: "Acme" },
      { tenantName: "Globex" }
    ]);
    console.log("Tenants created:", tenants.map(t => t.tenantName));

    const users = await UserModel.insertMany([
      {
        email: "admin@acme.test",
        password: hashedPassword,
        role: "admin",
        tenant: tenants[0]._id
      },
      {
        email: "user@acme.test",
        password: hashedPassword,
        role: "user",
        tenant: tenants[0]._id
      },
      {
        email: "admin@globex.test",
        password: hashedPassword,
        role: "admin",
        tenant: tenants[1]._id
      },
      {
        email: "user@globex.test",
        password: hashedPassword,
        role: "user",
        tenant: tenants[1]._id
      }
    ]);
    console.log(`Created ${users.length} users.`);

    const notes = await NoteModel.insertMany([
      {
        title: "Acme Global Note 1",
        content: "This is the first note for Acme.",
        tenant: tenants[0]._id,
        createdBy: users.find(u => u.email === "admin@acme.test")._id
      },
      {
        title: "Acme Global Note 2",
        content: "This is another shared note for Acme.",
        tenant: tenants[0]._id,
        createdBy: users.find(u => u.email === "user@acme.test")._id
      },
      {
        title: "Globex Global Note 1",
        content: "This is the first note for Globex.",
        tenant: tenants[1]._id,
        createdBy: users.find(u => u.email === "admin@globex.test")._id
      }
    ]);
    console.log(`Created ${notes.length} notes.`);

  } catch (err) {
    console.error("Error seeding:", err);
  } finally {
    await mongoose.disconnect();
    console.log("MongoDB disconnected.");
  }
};

seedDatabase();
