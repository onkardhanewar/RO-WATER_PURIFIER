import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";
import { admins, products, contactQueries, serviceRequests, complaints } from "@shared/schema";
import { upload } from "./index";

// Middleware to check if admin is authenticated
function requireAdmin(req: any, res: any, next: any) {
  if (req.session && req.session.adminId) {
    return next();
  }
  return res.status(401).json({ message: "Unauthorized" });
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Image upload endpoint
  app.post("/api/upload", requireAdmin, upload.single("image"), (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }
      const imageUrl = `/assets/images/products/${req.file.filename}`;
      res.json({ imageUrl });
    } catch (error) {
      console.error("Upload error:", error);
      res.status(500).json({ message: "Failed to upload image" });
    }
  });

  // Admin Authentication Routes
  app.post("/api/admin/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      
      const admin = await storage.getAdminByUsername(username);
      if (!admin) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const validPassword = await bcrypt.compare(password, admin.password);
      if (!validPassword) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      req.session.adminId = admin.id;
      res.json({ id: admin.id, username: admin.username, email: admin.email });
    } catch (error) {
      res.status(500).json({ message: "Login failed" });
    }
  });

  app.post("/api/admin/logout", (req, res) => {
    req.session.destroy(() => {
      res.json({ message: "Logged out" });
    });
  });

  app.get("/api/admin/me", requireAdmin, async (req, res) => {
    try {
      const admin = await storage.getAdminById(req.session.adminId);
      if (!admin) {
        return res.status(404).json({ message: "Admin not found" });
      }
      res.json({ id: admin.id, username: admin.username, email: admin.email });
    } catch (error) {
      res.status(500).json({ message: "Failed to get admin info" });
    }
  });

  // Update admin credentials
  app.post("/api/admin/update-credentials", requireAdmin, async (req, res) => {
    try {
      const { currentPassword, newUsername, newPassword } = req.body;
      const adminId = req.session.adminId;

      // Get current admin
      const admin = await storage.getAdminById(adminId);
      if (!admin) {
        return res.status(404).json({ message: "Admin not found" });
      }

      // Verify current password
      const validPassword = await bcrypt.compare(currentPassword, admin.password);
      if (!validPassword) {
        return res.status(401).json({ message: "Current password is incorrect" });
      }

      // Prepare update data
      const updateData: any = {};
      
      if (newUsername && newUsername !== admin.username) {
        // Check if username already exists
        const existingAdmin = await storage.getAdminByUsername(newUsername);
        if (existingAdmin && existingAdmin.id !== adminId) {
          return res.status(400).json({ message: "Username already taken" });
        }
        updateData.username = newUsername;
      }

      if (newPassword) {
        updateData.password = await bcrypt.hash(newPassword, 10);
      }

      if (Object.keys(updateData).length === 0) {
        return res.status(400).json({ message: "No changes to update" });
      }

      // Update admin credentials
      await storage.updateAdmin(adminId, updateData);

      // Destroy session to force re-login
      req.session.destroy(() => {
        res.json({ message: "Credentials updated successfully" });
      });
    } catch (error) {
      console.error("Update credentials error:", error);
      res.status(500).json({ message: "Failed to update credentials" });
    }
  });

  // Products Routes
  app.get("/api/products", async (req, res) => {
    try {
      const allProducts = await storage.getAllProducts();
      res.json(allProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ message: "Failed to fetch products" });
    }
  });

  app.get("/api/products/:id", async (req, res) => {
    try {
      const product = await storage.getProductById(req.params.id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch product" });
    }
  });

  app.post("/api/admin/products", requireAdmin, async (req, res) => {
    try {
      const product = await storage.createProduct(req.body);
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: "Failed to create product" });
    }
  });

  app.put("/api/admin/products/:id", requireAdmin, async (req, res) => {
    try {
      const product = await storage.updateProduct(req.params.id, req.body);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: "Failed to update product" });
    }
  });

  app.delete("/api/admin/products/:id", requireAdmin, async (req, res) => {
    try {
      await storage.deleteProduct(req.params.id);
      res.json({ message: "Product deleted" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete product" });
    }
  });

  // Contact Queries Routes
  app.post("/api/contact", async (req, res) => {
    try {
      const query = await storage.createContactQuery(req.body);
      res.json(query);
    } catch (error) {
      res.status(500).json({ message: "Failed to submit contact query" });
    }
  });

  app.get("/api/admin/contact-queries", requireAdmin, async (req, res) => {
    try {
      const queries = await storage.getAllContactQueries();
      res.json(queries);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch contact queries" });
    }
  });

  app.put("/api/admin/contact-queries/:id", requireAdmin, async (req, res) => {
    try {
      const query = await storage.updateContactQueryStatus(req.params.id, req.body.status);
      if (!query) {
        return res.status(404).json({ message: "Query not found" });
      }
      res.json(query);
    } catch (error) {
      res.status(500).json({ message: "Failed to update query status" });
    }
  });

  // Service Requests Routes
  app.post("/api/service-requests", async (req, res) => {
    try {
      const request = await storage.createServiceRequest(req.body);
      res.json(request);
    } catch (error) {
      res.status(500).json({ message: "Failed to submit service request" });
    }
  });

  app.get("/api/admin/service-requests", requireAdmin, async (req, res) => {
    try {
      const requests = await storage.getAllServiceRequests();
      res.json(requests);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch service requests" });
    }
  });

  app.put("/api/admin/service-requests/:id", requireAdmin, async (req, res) => {
    try {
      const request = await storage.updateServiceRequest(req.params.id, req.body);
      if (!request) {
        return res.status(404).json({ message: "Request not found" });
      }
      res.json(request);
    } catch (error) {
      res.status(500).json({ message: "Failed to update service request" });
    }
  });

  // Complaints Routes
  app.post("/api/complaints", async (req, res) => {
    try {
      const complaint = await storage.createComplaint(req.body);
      res.json(complaint);
    } catch (error) {
      res.status(500).json({ message: "Failed to submit complaint" });
    }
  });

  app.get("/api/admin/complaints", requireAdmin, async (req, res) => {
    try {
      const allComplaints = await storage.getAllComplaints();
      res.json(allComplaints);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch complaints" });
    }
  });

  app.put("/api/admin/complaints/:id", requireAdmin, async (req, res) => {
    try {
      const complaint = await storage.updateComplaint(req.params.id, req.body);
      if (!complaint) {
        return res.status(404).json({ message: "Complaint not found" });
      }
      res.json(complaint);
    } catch (error) {
      res.status(500).json({ message: "Failed to update complaint" });
    }
  });

  // Admin dashboard stats
  app.get("/api/admin/stats", requireAdmin, async (req, res) => {
    try {
      const stats = await storage.getAdminStats();
      res.json(stats);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch stats" });
    }
  });

  // Cart Routes
  app.get("/api/cart", async (req, res) => {
    try {
      const sessionId = req.sessionID;
      console.log(`[CART GET] SessionID: ${sessionId}, Cookie: ${req.headers.cookie}`);
      const cartItems = await storage.getCartItems(sessionId);
      
      // Populate with product details
      const itemsWithProducts = await Promise.all(
        cartItems.map(async (item) => {
          const product = await storage.getProductById(item.productId);
          return {
            ...item,
            product,
          };
        })
      );
      
      res.json(itemsWithProducts);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch cart" });
    }
  });

  app.post("/api/cart", async (req, res) => {
    try {
      const sessionId = req.sessionID;
      const { productId, quantity } = req.body;
      console.log(`[CART POST] SessionID: ${sessionId}, Cookie: ${req.headers.cookie}, ProductID: ${productId}`);
      
      // Force session to be saved
      req.session.touch();
      
      const item = await storage.addToCart({
        sessionId,
        productId,
        quantity: quantity || 1,
      });
      
      // Ensure session is saved before responding
      req.session.save((err) => {
        if (err) {
          console.error('Session save error:', err);
        }
        res.json(item);
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to add to cart" });
    }
  });

  app.put("/api/cart/:id", async (req, res) => {
    try {
      const { quantity } = req.body;
      const item = await storage.updateCartQuantity(req.params.id, quantity);
      
      if (!item && quantity > 0) {
        return res.status(404).json({ message: "Cart item not found" });
      }
      
      res.json(item || { message: "Item removed" });
    } catch (error) {
      res.status(500).json({ message: "Failed to update cart" });
    }
  });

  app.delete("/api/cart/:id", async (req, res) => {
    try {
      await storage.removeFromCart(req.params.id);
      res.json({ message: "Item removed from cart" });
    } catch (error) {
      res.status(500).json({ message: "Failed to remove item" });
    }
  });

  app.delete("/api/cart", async (req, res) => {
    try {
      const sessionId = req.sessionID;
      await storage.clearCart(sessionId);
      res.json({ message: "Cart cleared" });
    } catch (error) {
      res.status(500).json({ message: "Failed to clear cart" });
    }
  });

  // Order Routes
  app.post("/api/orders", async (req, res) => {
    try {
      const order = await storage.createOrder(req.body);
      // Clear cart after successful order
      if (req.sessionID) {
        await storage.clearCart(req.sessionID);
      }
      res.json(order);
    } catch (error) {
      console.error("Error creating order:", error);
      res.status(500).json({ message: "Failed to create order" });
    }
  });

  app.get("/api/orders/:orderNumber", async (req, res) => {
    try {
      const order = await storage.getOrderByNumber(req.params.orderNumber);
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
      res.json(order);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch order" });
    }
  });

  // Admin order routes
  app.get("/api/admin/orders", requireAdmin, async (req, res) => {
    try {
      const orders = await storage.getAllOrders();
      res.json(orders);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch orders" });
    }
  });

  app.put("/api/admin/orders/:id", requireAdmin, async (req, res) => {
    try {
      const { status } = req.body;
      const order = await storage.updateOrderStatus(req.params.id, status);
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
      res.json(order);
    } catch (error) {
      res.status(500).json({ message: "Failed to update order" });
    }
  });

  return httpServer;
}
