import { 
  type User, 
  type InsertUser,
  type Admin,
  type InsertAdmin,
  type Product,
  type InsertProduct,
  type ContactQuery,
  type InsertContactQuery,
  type ServiceRequest,
  type InsertServiceRequest,
  type Complaint,
  type InsertComplaint,
  type CartItem,
  type InsertCartItem,
  type Order,
  type InsertOrder
} from "@shared/schema";
import { randomUUID } from "crypto";
import fs from "fs";
import path from "path";

export interface IStorage {
  // User methods
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Admin methods
  // Admin methods
getAdminById(id: string): Promise<Admin | undefined>;
getAdminByUsername(username: string): Promise<Admin | undefined>;
createAdmin(admin: InsertAdmin): Promise<Admin>;
updateAdmin(
  id: string,
  data: Partial<InsertAdmin>
): Promise<Admin | undefined>;
  
  // Product methods
  getAllProducts(): Promise<Product[]>;
  getProductById(id: string): Promise<Product | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;
  updateProduct(id: string, product: Partial<InsertProduct>): Promise<Product | undefined>;
  deleteProduct(id: string): Promise<void>;
  
  // Contact Query methods
  createContactQuery(query: InsertContactQuery): Promise<ContactQuery>;
  getAllContactQueries(): Promise<ContactQuery[]>;
  updateContactQueryStatus(id: string, status: string): Promise<ContactQuery | undefined>;
  
  // Service Request methods
  createServiceRequest(request: InsertServiceRequest): Promise<ServiceRequest>;
  getAllServiceRequests(): Promise<ServiceRequest[]>;
  updateServiceRequest(id: string, data: Partial<ServiceRequest>): Promise<ServiceRequest | undefined>;
  
  // Complaint methods
  createComplaint(complaint: InsertComplaint): Promise<Complaint>;
  getAllComplaints(): Promise<Complaint[]>;
  updateComplaint(id: string, data: Partial<Complaint>): Promise<Complaint | undefined>;
  
  // Cart methods
  getCartItems(sessionId: string): Promise<CartItem[]>;
  addToCart(item: InsertCartItem): Promise<CartItem>;
  updateCartQuantity(id: string, quantity: number): Promise<CartItem | undefined>;
  removeFromCart(id: string): Promise<void>;
  clearCart(sessionId: string): Promise<void>;
  
  // Order methods
  createOrder(order: InsertOrder): Promise<Order>;
  getAllOrders(): Promise<Order[]>;
  getOrderById(id: string): Promise<Order | undefined>;
  getOrderByNumber(orderNumber: string): Promise<Order | undefined>;
  updateOrderStatus(id: string, status: string): Promise<Order | undefined>;
  
  // Stats
  getAdminStats(): Promise<any>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private admins: Map<string, Admin>;
  private products: Map<string, Product>;
  private contactQueries: Map<string, ContactQuery>;
  private serviceRequests: Map<string, ServiceRequest>;
  private complaints: Map<string, Complaint>;
  private cartItems: Map<string, CartItem>;
  private orders: Map<string, Order>;
  private dataFile: string;
  private saving = false;

  constructor() {
    this.users = new Map();
    this.admins = new Map();
    this.products = new Map();
    this.contactQueries = new Map();
    this.serviceRequests = new Map();
    this.complaints = new Map();
    this.cartItems = new Map();
    this.orders = new Map();
    this.dataFile = path.resolve(process.cwd(), "server", "data.json");
    void this.loadFromDisk();
  }

  private async loadFromDisk() {
    try {
      if (!fs.existsSync(this.dataFile)) return;
      const raw = await fs.promises.readFile(this.dataFile, "utf-8");
      const data = JSON.parse(raw);

      // Helper to revive dates
      const reviveDate = (obj: any) => {
        if (!obj) return obj;
        Object.keys(obj).forEach((k) => {
          const v = obj[k];
          if (v && typeof v === "string" && /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z/.test(v)) {
            obj[k] = new Date(v);
          }
        });
        return obj;
      };

      if (data.users) {
        data.users.forEach((u: any) => this.users.set(u.id, reviveDate(u)));
      }
      if (data.admins) {
        data.admins.forEach((a: any) => this.admins.set(a.id, reviveDate(a)));
      }
      if (data.products) {
        data.products.forEach((p: any) => this.products.set(p.id, reviveDate(p)));
      }
      if (data.contactQueries) {
        data.contactQueries.forEach((q: any) => this.contactQueries.set(q.id, reviveDate(q)));
      }
      if (data.serviceRequests) {
        data.serviceRequests.forEach((r: any) => this.serviceRequests.set(r.id, reviveDate(r)));
      }
      if (data.complaints) {
        data.complaints.forEach((c: any) => this.complaints.set(c.id, reviveDate(c)));
      }
      if (data.cartItems) {
        data.cartItems.forEach((ci: any) => this.cartItems.set(ci.id, reviveDate(ci)));
      }
      if (data.orders) {
        data.orders.forEach((o: any) => this.orders.set(o.id, reviveDate(o)));
      }
      // If no products exist after loading (fresh install), seed a couple of demo products
      if (this.products.size === 0) {
        const seed1: Product = {
          id: randomUUID(),
          name: "AquaPure RO 7L",
          description: "Compact RO purifier with mineral cartridge and UV sterilization.",
          price: 12999,
          image: "/images/demo-ro-7l.png",
          features: ["UV Sterilization", "Mineral Technology", "7L Capacity"],
          capacity: "7L",
          warranty: "1 year",
          inStock: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        } as Product;

        const seed2: Product = {
          id: randomUUID(),
          name: "AquaPure RO 10L Plus",
          description: "High capacity RO with TDS controller and advanced filters.",
          price: 17999,
          image: "/images/demo-ro-10l.png",
          features: ["TDS Controller", "10L Capacity", "Low Power Mode"],
          capacity: "10L",
          warranty: "2 years",
          inStock: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        } as Product;

        this.products.set(seed1.id, seed1);
        this.products.set(seed2.id, seed2);
        void this.saveToDisk();
      }
    } catch (err) {
      console.error("Failed to load storage data:", err);
    }
  }

  private async saveToDisk() {
    // A very small debounce to avoid concurrent writes
    if (this.saving) return;
    this.saving = true;
    try {
      const data = {
        users: Array.from(this.users.values()),
        admins: Array.from(this.admins.values()),
        products: Array.from(this.products.values()),
        contactQueries: Array.from(this.contactQueries.values()),
        serviceRequests: Array.from(this.serviceRequests.values()),
        complaints: Array.from(this.complaints.values()),
        cartItems: Array.from(this.cartItems.values()),
        orders: Array.from(this.orders.values()),
      };
      await fs.promises.writeFile(this.dataFile, JSON.stringify(data, null, 2), "utf-8");
    } catch (err) {
      console.error("Failed to save storage data:", err);
    } finally {
      this.saving = false;
    }
  }

  // User methods
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    void this.saveToDisk();
    return user;
  }


  
  // Admin methods


// Admin methods
async getAdminById(id: string): Promise<Admin | undefined> {
  return this.admins.get(id);
}

async getAdminByUsername(username: string): Promise<Admin | undefined> {
  return Array.from(this.admins.values()).find(
    (admin) => admin.username === username,
  );
}

async createAdmin(insertAdmin: InsertAdmin): Promise<Admin> {
  const id = randomUUID();
  const admin: Admin = {
    ...insertAdmin,
    id,
    createdAt: new Date(),
  };

  this.admins.set(id, admin);
  void this.saveToDisk();

  return admin;
}

// 👇 ADD THIS METHOD
async updateAdmin(
  id: string,
  data: Partial<InsertAdmin>
): Promise<Admin | undefined> {
  const admin = this.admins.get(id);

  if (!admin) {
    return undefined;
  }

  const updated: Admin = {
    ...admin,
    ...data,
  };

  this.admins.set(id, updated);
  await this.saveToDisk();

  return updated;
}



  // Product methods
  async getAllProducts(): Promise<Product[]> {
    try {
      return Array.from(this.products.values()).sort((a, b) => {
        const aTime = a.createdAt instanceof Date ? a.createdAt.getTime() : 0;
        const bTime = b.createdAt instanceof Date ? b.createdAt.getTime() : 0;
        return bTime - aTime;
      });
    } catch (err) {
      console.error("Error in getAllProducts:", err);
      return Array.from(this.products.values());
    }
  }

  async getProductById(id: string): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = randomUUID();
    const product: Product = {
      ...insertProduct,
      id,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.products.set(id, product);
    void this.saveToDisk();
    return product;
  }

  async updateProduct(id: string, data: Partial<InsertProduct>): Promise<Product | undefined> {
    const product = this.products.get(id);
    if (!product) return undefined;
    
    const updated: Product = {
      ...product,
      ...data,
      updatedAt: new Date(),
    };
    this.products.set(id, updated);
    void this.saveToDisk();
    return updated;
  }

  async deleteProduct(id: string): Promise<void> {
    this.products.delete(id);
    void this.saveToDisk();
  }

  // Contact Query methods
  async createContactQuery(insertQuery: InsertContactQuery): Promise<ContactQuery> {
    const id = randomUUID();
    const query: ContactQuery = {
      ...insertQuery,
      id,
      status: "pending",
      createdAt: new Date(),
    };
    this.contactQueries.set(id, query);
    void this.saveToDisk();
    return query;
  }

  async getAllContactQueries(): Promise<ContactQuery[]> {
    return Array.from(this.contactQueries.values()).sort((a, b) => 
      b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  async updateContactQueryStatus(id: string, status: string): Promise<ContactQuery | undefined> {
    const query = this.contactQueries.get(id);
    if (!query) return undefined;
    
    const updated: ContactQuery = { ...query, status };
    this.contactQueries.set(id, updated);
    void this.saveToDisk();
    return updated;
  }

  // Service Request methods
  async createServiceRequest(insertRequest: InsertServiceRequest): Promise<ServiceRequest> {
    const id = randomUUID();
    const request: ServiceRequest = {
      ...insertRequest,
      id,
      status: "pending",
      scheduledDate: null,
      createdAt: new Date(),
    };
    this.serviceRequests.set(id, request);
    void this.saveToDisk();
    return request;
  }

  async getAllServiceRequests(): Promise<ServiceRequest[]> {
    return Array.from(this.serviceRequests.values()).sort((a, b) => 
      b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  async updateServiceRequest(id: string, data: Partial<ServiceRequest>): Promise<ServiceRequest | undefined> {
    const request = this.serviceRequests.get(id);
    if (!request) return undefined;
    
    const updated: ServiceRequest = { ...request, ...data };
    this.serviceRequests.set(id, updated);
    void this.saveToDisk();
    return updated;
  }

  // Complaint methods
  async createComplaint(insertComplaint: InsertComplaint): Promise<Complaint> {
    const id = randomUUID();
    const complaint: Complaint = {
      ...insertComplaint,
      id,
      priority: "medium",
      status: "open",
      resolution: null,
      createdAt: new Date(),
      resolvedAt: null,
    };
    this.complaints.set(id, complaint);
    void this.saveToDisk();
    return complaint;
  }

  async getAllComplaints(): Promise<Complaint[]> {
    return Array.from(this.complaints.values()).sort((a, b) => 
      b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  async updateComplaint(id: string, data: Partial<Complaint>): Promise<Complaint | undefined> {
    const complaint = this.complaints.get(id);
    if (!complaint) return undefined;
    
    const updated: Complaint = { 
      ...complaint, 
      ...data,
      resolvedAt: (data.status === 'resolved' || data.status === 'closed') && !complaint.resolvedAt 
        ? new Date() 
        : complaint.resolvedAt
    };
    this.complaints.set(id, updated);
    void this.saveToDisk();
    return updated;
  }

  // Stats
  async getAdminStats(): Promise<any> {
    const totalProducts = this.products.size;
    const totalQueries = this.contactQueries.size;
    const totalServiceRequests = this.serviceRequests.size;
    const totalComplaints = this.complaints.size;
    const totalOrders = this.orders.size;
    
    const pendingQueries = Array.from(this.contactQueries.values()).filter(q => q.status === 'pending').length;
    const pendingServiceRequests = Array.from(this.serviceRequests.values()).filter(r => r.status === 'pending').length;
    const openComplaints = Array.from(this.complaints.values()).filter(c => c.status === 'open').length;
    const pendingOrders = Array.from(this.orders.values()).filter(o => o.status === 'pending').length;
    
    return {
      totalProducts,
      totalQueries,
      totalServiceRequests,
      totalComplaints,
      totalOrders,
      pendingQueries,
      pendingServiceRequests,
      openComplaints,
      pendingOrders,
    };
  }

  // Cart methods
  async getCartItems(sessionId: string): Promise<CartItem[]> {
    return Array.from(this.cartItems.values()).filter(
      item => item.sessionId === sessionId
    );
  }

  async addToCart(insertItem: InsertCartItem): Promise<CartItem> {
    // Check if item already exists in cart
    const existing = Array.from(this.cartItems.values()).find(
      item => item.sessionId === insertItem.sessionId && item.productId === insertItem.productId
    );

    if (existing) {
      // Update quantity
      const updated: CartItem = {
        ...existing,
        quantity: existing.quantity + insertItem.quantity,
      };
      this.cartItems.set(existing.id, updated);
      void this.saveToDisk();
      return updated;
    }

    const id = randomUUID();
    const item: CartItem = {
      ...insertItem,
      id,
      createdAt: new Date(),
    };
    this.cartItems.set(id, item);
    void this.saveToDisk();
    return item;
  }

  async updateCartQuantity(id: string, quantity: number): Promise<CartItem | undefined> {
    const item = this.cartItems.get(id);
    if (!item) return undefined;

    if (quantity <= 0) {
      this.cartItems.delete(id);
      void this.saveToDisk();
      return undefined;
    }

    const updated: CartItem = { ...item, quantity };
    this.cartItems.set(id, updated);
    void this.saveToDisk();
    return updated;
  }

  async removeFromCart(id: string): Promise<void> {
    this.cartItems.delete(id);
    void this.saveToDisk();
  }

  async clearCart(sessionId: string): Promise<void> {
    const items = await this.getCartItems(sessionId);
    items.forEach(item => this.cartItems.delete(item.id));
    void this.saveToDisk();
  }

  // Order methods
  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    const id = randomUUID();
    const orderNumber = `ORD${Date.now()}${Math.floor(Math.random() * 1000)}`;
    const order: Order = {
      ...insertOrder,
      id,
      orderNumber,
      status: "pending",
      createdAt: new Date(),
    };
    this.orders.set(id, order);
    void this.saveToDisk();
    return order;
  }

  async getAllOrders(): Promise<Order[]> {
    return Array.from(this.orders.values()).sort((a, b) => {
      const aTime = a.createdAt instanceof Date ? a.createdAt.getTime() : 0;
      const bTime = b.createdAt instanceof Date ? b.createdAt.getTime() : 0;
      return bTime - aTime;
    });
  }

  async getOrderById(id: string): Promise<Order | undefined> {
    return this.orders.get(id);
  }

  async getOrderByNumber(orderNumber: string): Promise<Order | undefined> {
    return Array.from(this.orders.values()).find(
      (order) => order.orderNumber === orderNumber
    );
  }

  async updateOrderStatus(id: string, status: string): Promise<Order | undefined> {
  const order = this.orders.get(id);
  if (!order) return undefined;

  const updated: Order = { ...order, status };
  this.orders.set(id, updated);
  void this.saveToDisk();
  return updated;
}

}   // <-- This closing brace closes the MemStorage class

export const storage = new MemStorage();
