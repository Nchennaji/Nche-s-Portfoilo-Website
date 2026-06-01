import express from "express";
import path from "path";
import "dotenv/config";
import { createServer as createViteServer } from "vite";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";

// Mock DB Storage
let projects = [
  {
    id: "1",
    title: "3-Tier Banking Application Deployment on AWS",
    description: "Architected and deployed a highly available 3-tier banking application using AWS native services.",
    tech: ["AWS", "Terraform", "EC2", "RDS"],
    githubUrl: "https://github.com/Nchennaji",
    docUrl: "https://github.com/Nchennaji",
    demoUrl: "",
    imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2672&auto=format&fit=crop",
  },
  {
    id: "2",
    title: "Kubernetes GitOps Deployment with Argo CD",
    description: "Implemented a complete GitOps workflow for a microservices application on Kubernetes using Argo CD and GitHub Actions.",
    tech: ["Kubernetes", "Argo CD", "GitHub Actions", "Docker"],
    githubUrl: "https://github.com/Nchennaji",
    docUrl: "https://github.com/Nchennaji",
    demoUrl: "",
    imageUrl: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?q=80&w=2670&auto=format&fit=crop",
  }
];

let messages: any[] = [];
let resumeUrl = "/resume.pdf";

const JWT_SECRET = process.env.JWT_SECRET || "super_secret_devops_key_123";
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "nchedo.nnaji24@gmail.com";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "Flower1988#";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());
  app.use(cookieParser());

  // === API ROUTES ===

  // ---- Auth ----
  app.post("/api/auth/login", (req, res) => {
    const { email, password } = req.body;
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      const token = jwt.sign({ role: "admin", email }, JWT_SECRET, { expiresIn: "1d" });
      res.cookie("admin_token", token, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "strict" });
      res.json({ success: true });
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  });

  app.post("/api/auth/logout", (req, res) => {
    res.clearCookie("admin_token");
    res.json({ success: true });
  });

  app.get("/api/auth/verify", (req, res) => {
    const token = req.cookies.admin_token;
    if (!token) return res.status(401).json({ error: "Unauthorized" });
    try {
      jwt.verify(token, JWT_SECRET);
      res.json({ success: true });
    } catch {
      res.status(401).json({ error: "Invalid token" });
    }
  });

  // Auth Middleware
  const requireAdmin = (req: any, res: any, next: any) => {
    const token = req.cookies.admin_token;
    if (!token) return res.status(401).json({ error: "Unauthorized" });
    try {
      req.user = jwt.verify(token, JWT_SECRET);
      next();
    } catch {
      return res.status(401).json({ error: "Invalid token" });
    }
  };

  // ---- Projects ----
  app.get("/api/projects", (req, res) => {
    res.json(projects);
  });

  app.post("/api/projects", requireAdmin, (req, res) => {
    const project = { id: Date.now().toString(), ...req.body };
    projects.push(project);
    res.json(project);
  });

  app.put("/api/projects/:id", requireAdmin, (req, res) => {
    const index = projects.findIndex(p => p.id === req.params.id);
    if (index === -1) return res.status(404).json({ error: "Not found" });
    projects[index] = { ...projects[index], ...req.body };
    res.json(projects[index]);
  });

  app.delete("/api/projects/:id", requireAdmin, (req, res) => {
    projects = projects.filter(p => p.id !== req.params.id);
    res.json({ success: true });
  });

  // ---- Messages ----
  app.post("/api/messages", (req, res) => {
    const message = { id: Date.now().toString(), date: new Date().toISOString(), ...req.body };
    messages.push(message);
    res.json({ success: true });
  });

  app.get("/api/messages", requireAdmin, (req, res) => {
    res.json(messages);
  });

  app.delete("/api/messages/:id", requireAdmin, (req, res) => {
    messages = messages.filter(m => m.id !== req.params.id);
    res.json({ success: true });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
