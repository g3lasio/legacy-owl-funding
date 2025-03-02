import express, { type Express } from "express";
import fs from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer, createLogger } from "vite";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import { type Server } from "http";
import viteConfig from "../vite.config";
import { nanoid } from "nanoid";

const viteLogger = createLogger();

export function log(message: string, source = "express", level: "info" | "warn" | "error" = "info") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
  const levelPrefix = level === "error" ? "❌" : level === "warn" ? "⚠️" : "✅";
  console.log(`${formattedTime} [${source}] ${levelPrefix} ${message}`);
}

export async function setupVite(app: Express, server: Server) {
  log("🔧 Setting up Vite in development mode", "vite", "info");
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true,
  };

  let vite: any;
  try {
    vite = await createViteServer({
      ...viteConfig,
      configFile: false,
      customLogger: {
        ...viteLogger,
        error: (msg, options) => {
          log(`❌ Vite Error: ${msg}`, "vite", "error");
          process.exit(1);
        },
      },
      server: serverOptions,
      appType: "custom",
      logLevel: "info", // Increased log level for Vite
    });
    log("✅ Vite middleware configured successfully", "vite", "info");
    app.use(vite.middlewares);
  } catch (error) {
    log(`❌ Error setting up Vite: ${error}`, "vite", "error");
    throw error; // Re-throw to be handled by calling function
  }

  app.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    log(`[vite] Handling request for ${url}`, "vite"); // added log for request handling.
    try {
      const clientTemplate = path.resolve(
        __dirname,
        "..",
        "client",
        "index.html",
      );

      // always reload the index.html file from disk incase it changes
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`,
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      log(`❌ Error during Vite transformIndexHtml: ${e}`, "vite", "error");
      if (vite) {
        vite.ssrFixStacktrace(e as Error);
      }
      next(e);
    }
  });;
}

export function serveStatic(app: Express) {
  log("🔧 Setting up static file serving for production", "express", "info");
  
  // In production, client build outputs to dist/client
  const distPath = path.resolve(process.cwd(), "dist/client");
  
  log(`Looking for static files in: ${distPath}`, "express", "info");

  if (!fs.existsSync(distPath)) {
    log(`❌ Could not find the build directory: ${distPath}`, "express", "error");
    log(`Trying alternative public directory...`, "express", "info");
    
    // Fallback to "public" directory if "dist/client" doesn't exist
    const altPath = path.resolve(process.cwd(), "dist/public");
    if (fs.existsSync(altPath)) {
      log(`✅ Found alternative build directory: ${altPath}`, "express", "info");
      app.use(express.static(altPath));
    } else {
      log(`❌ Could not find any static build directory`, "express", "error");
    }
  } else {
    app.use(express.static(distPath));
  }

  // Serve index.html for all routes (SPA fallback)
  app.use("*", (req, res) => {
    const indexPath = path.resolve(distPath, "index.html");
    log(`Serving index.html for route: ${req.originalUrl}`, "express", "info");
    
    if (fs.existsSync(indexPath)) {
      res.sendFile(indexPath);
    } else {
      log(`❌ Could not find index.html at ${indexPath}`, "express", "error");
      res.status(404).send("Not found - Build files missing");
    }
  });
} "index.html");
  });
}