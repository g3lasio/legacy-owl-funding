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
  });
}

export function serveStatic(app: Express) {
  log("🔧 Setting up static file serving for production", "express", "info");
  const distPath = path.resolve(__dirname, "public");

  if (!fs.existsSync(distPath)) {
    log(`❌ Could not find the build directory: ${distPath}`, "express", "error");
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`,
    );
  }

  app.use(express.static(distPath));

  // fall through to index.html if the file doesn't exist
  app.use("*", (_req, res) => {
    res.sendFile(path.resolve(distPath, "index.html"));
  });
}