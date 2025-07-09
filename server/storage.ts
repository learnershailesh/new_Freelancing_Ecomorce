import { users, products, type User, type InsertUser, type Product, type InsertProduct } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getProducts(): Promise<Product[]>;
  getProduct(id: number): Promise<Product | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private products: Map<number, Product>;
  private currentUserId: number;
  private currentProductId: number;

  constructor() {
    this.users = new Map();
    this.products = new Map();
    this.currentUserId = 1;
    this.currentProductId = 1;
    
    // Initialize with hardcoded products
    this.initializeProducts();
  }

  private initializeProducts() {
    const hardcodedProducts: InsertProduct[] = [
      {
        name: "Premium Wireless Headphones",
        price: "299.99",
        originalPrice: "399.99",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=600",
        description: "Experience crystal-clear audio with these premium wireless headphones featuring noise cancellation and 30-hour battery life.",
        rating: 5,
        badge: "New",
        category: "Electronics"
      },
      {
        name: "Ultra-thin Laptop",
        price: "1299.99",
        originalPrice: null,
        image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=600",
        description: "Powerful performance meets sleek design in this ultra-portable laptop perfect for work and creativity.",
        rating: 4,
        badge: "Best Seller",
        category: "Computers"
      },
      {
        name: "Smart Phone Pro",
        price: "899.99",
        originalPrice: null,
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=600",
        description: "Latest flagship smartphone with advanced camera system and all-day battery life.",
        rating: 5,
        badge: null,
        category: "Mobile"
      },
      {
        name: "Professional Camera",
        price: "1599.99",
        originalPrice: "1799.99",
        image: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=600",
        description: "Capture stunning photos with this professional-grade camera featuring 4K video recording.",
        rating: 4,
        badge: "Pro",
        category: "Photography"
      },
      {
        name: "Gaming Console",
        price: "499.99",
        originalPrice: null,
        image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=600",
        description: "Next-generation gaming console with lightning-fast loading and immersive gaming experience.",
        rating: 5,
        badge: "Hot",
        category: "Gaming"
      },
      {
        name: "Smart Watch",
        price: "249.99",
        originalPrice: "299.99",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=600",
        description: "Track your fitness goals with this advanced smartwatch featuring health monitoring and GPS.",
        rating: 4,
        badge: null,
        category: "Wearables"
      },
      {
        name: "Wireless Earbuds",
        price: "179.99",
        originalPrice: "219.99",
        image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=600",
        description: "Compact wireless earbuds with premium sound quality and active noise cancellation.",
        rating: 4,
        badge: "Popular",
        category: "Audio"
      },
      {
        name: "Tablet Pro",
        price: "649.99",
        originalPrice: null,
        image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=600",
        description: "Powerful tablet with stunning display perfect for work, creativity, and entertainment.",
        rating: 5,
        badge: "New",
        category: "Tablets"
      },
      {
        name: "Mechanical Keyboard",
        price: "129.99",
        originalPrice: "159.99",
        image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=600",
        description: "Premium mechanical keyboard with RGB backlighting and customizable keys.",
        rating: 4,
        badge: null,
        category: "Accessories"
      },
      {
        name: "Wireless Mouse",
        price: "79.99",
        originalPrice: null,
        image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=600",
        description: "Ergonomic wireless mouse with precision tracking and long battery life.",
        rating: 4,
        badge: null,
        category: "Accessories"
      },
      {
        name: "4K Monitor",
        price: "449.99",
        originalPrice: "549.99",
        image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=600",
        description: "Ultra-sharp 4K monitor with vibrant colors and slim bezels for immersive viewing.",
        rating: 5,
        badge: "Sale",
        category: "Monitors"
      },
      {
        name: "Portable Speaker",
        price: "99.99",
        originalPrice: "129.99",
        image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=600",
        description: "Compact portable speaker with powerful sound and waterproof design.",
        rating: 4,
        badge: "Waterproof",
        category: "Audio"
      },
      {
        name: "Gaming Headset",
        price: "159.99",
        originalPrice: null,
        image: "https://images.unsplash.com/photo-1599669454699-248893623440?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=600",
        description: "Professional gaming headset with surround sound and clear microphone.",
        rating: 5,
        badge: "Gaming",
        category: "Gaming"
      },
      {
        name: "Webcam HD",
        price: "89.99",
        originalPrice: "109.99",
        image: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=600",
        description: "High-definition webcam with auto-focus and built-in microphone.",
        rating: 4,
        badge: "HD",
        category: "Accessories"
      },
      {
        name: "Power Bank",
        price: "39.99",
        originalPrice: "49.99",
        image: "https://images.unsplash.com/photo-1609592842387-5e7b0f62c7de?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=600",
        description: "High-capacity power bank with fast charging and multiple ports.",
        rating: 4,
        badge: "Fast Charge",
        category: "Accessories"
      },
      {
        name: "Fitness Tracker",
        price: "129.99",
        originalPrice: null,
        image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=600",
        description: "Advanced fitness tracker with heart rate monitoring and sleep tracking.",
        rating: 4,
        badge: "Fitness",
        category: "Wearables"
      },
      {
        name: "Smart Home Hub",
        price: "199.99",
        originalPrice: "249.99",
        image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=600",
        description: "Central hub for controlling all your smart home devices with voice commands.",
        rating: 5,
        badge: "Smart Home",
        category: "Smart Home"
      },
      {
        name: "Wireless Charger",
        price: "49.99",
        originalPrice: null,
        image: "https://images.unsplash.com/photo-1623841709711-0e2c9c2e7e5e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=600",
        description: "Fast wireless charger compatible with all Qi-enabled devices.",
        rating: 4,
        badge: "Wireless",
        category: "Accessories"
      },
      {
        name: "VR Headset",
        price: "399.99",
        originalPrice: "499.99",
        image: "https://images.unsplash.com/photo-1603481588273-2f908a9a7a1b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=600",
        description: "Immersive virtual reality headset with high-resolution display and spatial audio.",
        rating: 5,
        badge: "VR",
        category: "Gaming"
      },
      {
        name: "Drone Camera",
        price: "799.99",
        originalPrice: "899.99",
        image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=600",
        description: "Professional drone with 4K camera and intelligent flight modes.",
        rating: 5,
        badge: "Pro",
        category: "Photography"
      }
    ];

    hardcodedProducts.forEach(product => {
      this.createProduct(product);
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async getProduct(id: number): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = this.currentProductId++;
    const product: Product = { 
      ...insertProduct, 
      id,
      originalPrice: insertProduct.originalPrice || null,
      rating: insertProduct.rating || null,
      badge: insertProduct.badge || null
    };
    this.products.set(id, product);
    return product;
  }
}

export const storage = new MemStorage();
