import bcrypt from "bcrypt";
import { storage } from "./storage";

async function initializeAdmin() {
  console.log("Initializing default admin user...");
  
  try {
    // Check if admin already exists
    const existingAdmin = await storage.getAdminByUsername("admin");
    
    if (existingAdmin) {
      console.log("✓ Admin user already exists");
      return;
    }

    // Create default admin user
    const hashedPassword = await bcrypt.hash("admin123", 10);
    
    await storage.createAdmin({
      username: "admin",
      password: hashedPassword,
      email: "admin@example.com",
    });

    console.log("✓ Default admin user created successfully");
    console.log("  Username: admin");
    console.log("  Password: admin123");
    console.log("  Please change these credentials after first login!");
  } catch (error) {
    console.error("✗ Failed to create admin user:", error);
    process.exit(1);
  }
}

// Run initialization
initializeAdmin().then(() => {
  console.log("\n✓ Initialization complete!");
}).catch((error) => {
  console.error("\n✗ Initialization failed:", error);
  process.exit(1);
});
