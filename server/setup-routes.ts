import type { Express } from "express";
import { db, pool, databaseUrl } from "./db";
import { sql } from "drizzle-orm";
import bcrypt from "bcrypt";
import { storage } from "./storage";

// IMPORTANT: Set this in your .env file for security
const SETUP_PASSWORD = process.env.SETUP_PASSWORD || "setup123";

// Middleware to verify setup password
function requireSetupPassword(req: any, res: any, next: any) {
  const password = req.query.password || req.body.password;
  
  if (password !== SETUP_PASSWORD) {
    return res.status(401).json({ 
      message: "Unauthorized. Provide setup password via ?password=YOUR_SETUP_PASSWORD" 
    });
  }
  
  next();
}

export function registerSetupRoutes(app: Express) {
  function requireDatabase(res: any) {
    if (!pool || !db) {
      res.status(503).json({
        success: false,
        message: "Database is not configured on this deployment",
        detail: "Set DATABASE_URL to enable database setup and migration endpoints.",
      });
      return false;
    }

    return true;
  }
  
  // Test database connection
  app.get("/api/setup/test-connection", requireSetupPassword, async (req, res) => {
    try {
      if (!requireDatabase(res)) {
        return;
      }

      const result = await pool!.query('SELECT NOW()');
      res.json({ 
        success: true, 
        message: "Database connection successful!",
        timestamp: result.rows[0].now,
        database: databaseUrl?.split('@')[1]?.split('/')[1] || 'unknown'
      });
    } catch (error: any) {
      res.status(500).json({ 
        success: false, 
        message: "Database connection failed", 
        error: error.message 
      });
    }
  });

  // Create all database tables
  app.post("/api/setup/migrate", requireSetupPassword, async (req, res) => {
    try {
      if (!requireDatabase(res)) {
        return;
      }

      // Create admins table
      await db!.execute(sql`
        CREATE TABLE IF NOT EXISTS admins (
          id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
          username TEXT NOT NULL UNIQUE,
          password TEXT NOT NULL,
          email TEXT NOT NULL UNIQUE,
          created_at TIMESTAMP NOT NULL DEFAULT NOW()
        )
      `);

      // Create products table
      await db!.execute(sql`
        CREATE TABLE IF NOT EXISTS products (
          id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
          name TEXT NOT NULL,
          description TEXT NOT NULL,
          price INTEGER NOT NULL,
          image TEXT NOT NULL,
          features TEXT[] NOT NULL,
          capacity TEXT NOT NULL,
          warranty TEXT NOT NULL,
          in_stock BOOLEAN NOT NULL DEFAULT true,
          created_at TIMESTAMP NOT NULL DEFAULT NOW(),
          updated_at TIMESTAMP NOT NULL DEFAULT NOW()
        )
      `);

      // Create contact_queries table
      await db!.execute(sql`
        CREATE TABLE IF NOT EXISTS contact_queries (
          id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
          name TEXT NOT NULL,
          email TEXT NOT NULL,
          phone TEXT NOT NULL,
          message TEXT NOT NULL,
          status TEXT NOT NULL DEFAULT 'pending',
          created_at TIMESTAMP NOT NULL DEFAULT NOW()
        )
      `);

      // Create service_requests table
      await db!.execute(sql`
        CREATE TABLE IF NOT EXISTS service_requests (
          id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
          name TEXT NOT NULL,
          email TEXT NOT NULL,
          phone TEXT NOT NULL,
          address TEXT NOT NULL,
          service_type TEXT NOT NULL,
          product_model TEXT,
          description TEXT NOT NULL,
          status TEXT NOT NULL DEFAULT 'pending',
          scheduled_date TIMESTAMP,
          created_at TIMESTAMP NOT NULL DEFAULT NOW()
        )
      `);

      // Create complaints table
      await db!.execute(sql`
        CREATE TABLE IF NOT EXISTS complaints (
          id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
          name TEXT NOT NULL,
          email TEXT NOT NULL,
          phone TEXT NOT NULL,
          order_id TEXT,
          complaint_type TEXT NOT NULL,
          description TEXT NOT NULL,
          status TEXT NOT NULL DEFAULT 'pending',
          created_at TIMESTAMP NOT NULL DEFAULT NOW()
        )
      `);

      res.json({ 
        success: true, 
        message: "All database tables created successfully!",
        tables: ['admins', 'products', 'contact_queries', 'service_requests', 'complaints']
      });
    } catch (error: any) {
      res.status(500).json({ 
        success: false, 
        message: "Migration failed", 
        error: error.message 
      });
    }
  });

  // Initialize admin user
  app.post("/api/setup/init-admin", requireSetupPassword, async (req, res) => {
    try {
      // Check if admin already exists
      const existingAdmin = await storage.getAdminByUsername("admin");
      
      if (existingAdmin) {
        return res.json({ 
          success: true, 
          message: "Admin user already exists",
          alreadyExists: true
        });
      }

      // Create default admin user
      const hashedPassword = await bcrypt.hash("admin123", 10);
      
      await storage.createAdmin({
        username: "admin",
        password: hashedPassword,
        email: "admin@example.com",
      });

      res.json({ 
        success: true, 
        message: "Admin user created successfully!",
        credentials: {
          username: "admin",
          password: "admin123",
          warning: "⚠️ PLEASE CHANGE THESE CREDENTIALS AFTER FIRST LOGIN!"
        }
      });
    } catch (error: any) {
      res.status(500).json({ 
        success: false, 
        message: "Failed to create admin user", 
        error: error.message 
      });
    }
  });

  // Complete setup (runs all steps)
  app.post("/api/setup/complete", requireSetupPassword, async (req, res) => {
    const steps: any[] = [];
    
    try {
      if (!requireDatabase(res)) {
        return;
      }

      // Step 1: Test connection
      try {
        await pool!.query('SELECT NOW()');
        steps.push({ step: 1, name: "Database Connection", success: true });
      } catch (error: any) {
        steps.push({ step: 1, name: "Database Connection", success: false, error: error.message });
        throw new Error("Database connection failed");
      }

      // Step 2: Create tables
      try {
        await db!.execute(sql`
          CREATE TABLE IF NOT EXISTS admins (
            id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
            username TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE,
            created_at TIMESTAMP NOT NULL DEFAULT NOW()
          )
        `);

        await db!.execute(sql`
          CREATE TABLE IF NOT EXISTS products (
            id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
            name TEXT NOT NULL,
            description TEXT NOT NULL,
            price INTEGER NOT NULL,
            image TEXT NOT NULL,
            features TEXT[] NOT NULL,
            capacity TEXT NOT NULL,
            warranty TEXT NOT NULL,
            in_stock BOOLEAN NOT NULL DEFAULT true,
            created_at TIMESTAMP NOT NULL DEFAULT NOW(),
            updated_at TIMESTAMP NOT NULL DEFAULT NOW()
          )
        `);

        await db!.execute(sql`
          CREATE TABLE IF NOT EXISTS contact_queries (
            id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            phone TEXT NOT NULL,
            message TEXT NOT NULL,
            status TEXT NOT NULL DEFAULT 'pending',
            created_at TIMESTAMP NOT NULL DEFAULT NOW()
          )
        `);

        await db!.execute(sql`
          CREATE TABLE IF NOT EXISTS service_requests (
            id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            phone TEXT NOT NULL,
            address TEXT NOT NULL,
            service_type TEXT NOT NULL,
            product_model TEXT,
            description TEXT NOT NULL,
            status TEXT NOT NULL DEFAULT 'pending',
            scheduled_date TIMESTAMP,
            created_at TIMESTAMP NOT NULL DEFAULT NOW()
          )
        `);

        await db!.execute(sql`
          CREATE TABLE IF NOT EXISTS complaints (
            id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            phone TEXT NOT NULL,
            order_id TEXT,
            complaint_type TEXT NOT NULL,
            description TEXT NOT NULL,
            status TEXT NOT NULL DEFAULT 'pending',
            created_at TIMESTAMP NOT NULL DEFAULT NOW()
          )
        `);

        steps.push({ step: 2, name: "Create Tables", success: true });
      } catch (error: any) {
        steps.push({ step: 2, name: "Create Tables", success: false, error: error.message });
        throw new Error("Table creation failed");
      }

      // Step 3: Create admin user
      try {
        const existingAdmin = await storage.getAdminByUsername("admin");
        
        if (!existingAdmin) {
          const hashedPassword = await bcrypt.hash("admin123", 10);
          await storage.createAdmin({
            username: "admin",
            password: hashedPassword,
            email: "admin@example.com",
          });
          steps.push({ step: 3, name: "Create Admin User", success: true, created: true });
        } else {
          steps.push({ step: 3, name: "Create Admin User", success: true, alreadyExists: true });
        }
      } catch (error: any) {
        steps.push({ step: 3, name: "Create Admin User", success: false, error: error.message });
        throw new Error("Admin creation failed");
      }

      res.json({
        success: true,
        message: "✅ Complete setup finished successfully!",
        steps,
        credentials: {
          username: "admin",
          password: "admin123",
          loginUrl: "/admin",
          warning: "⚠️ PLEASE CHANGE THESE CREDENTIALS AFTER FIRST LOGIN!"
        }
      });

    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: "Setup failed",
        steps,
        error: error.message
      });
    }
  });

  // Get setup status
  app.get("/api/setup/status", requireSetupPassword, async (req, res) => {
    const status: any = {
      database: { connected: false },
      tables: {
        admins: false,
        products: false,
        contact_queries: false,
        service_requests: false,
        complaints: false
      },
      adminUser: { exists: false }
    };

    try {
      // Check database connection
      try {
        await pool!.query('SELECT NOW()');
        status.database.connected = true;
      } catch (error) {
        status.database.connected = false;
      }

      // Check if tables exist
      try {
        const tables = ['admins', 'products', 'contact_queries', 'service_requests', 'complaints'];
        for (const table of tables) {
          try {
            await db!.execute(sql.raw(`SELECT 1 FROM ${table} LIMIT 1`));
            status.tables[table] = true;
          } catch (error) {
            status.tables[table] = false;
          }
        }
      } catch (error) {
        // Tables check failed
      }

      // Check if admin exists
      try {
        const admin = await storage.getAdminByUsername("admin");
        status.adminUser.exists = !!admin;
      } catch (error) {
        status.adminUser.exists = false;
      }

      res.json({ success: true, status });
    } catch (error: any) {
      res.status(500).json({ 
        success: false, 
        message: "Status check failed", 
        error: error.message 
      });
    }
  });
}
