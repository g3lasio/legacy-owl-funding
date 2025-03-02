import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes.js";
import { setupVite, serveStatic, log } from "./vite.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  // Log every request
  log(`📝 Request received: ${req.method} ${path}`);

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    // Log all requests with more info
    let logLine = `🚀 ${req.method} ${path} ${res.statusCode} in ${duration}ms`;
    if (capturedJsonResponse) {
      logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
    }

    if (logLine.length > 80) {
      logLine = logLine.slice(0, 79) + "…";
    }

    log(logLine);
  });

  next();
});

(async () => {
  const server = await registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  try {
    // Use port from environment variable or fallback to 3000
    const port = process.env.PORT || 3000;
    log(`Attempting to start server on port ${port}`);
    log(`Environment: ${process.env.NODE_ENV || 'development'}`);
    
    server.listen({
      port: Number(port),
      host: "0.0.0.0",
      // Avoid using reusePort in production as it can cause issues
      ...(process.env.NODE_ENV !== 'production' ? { reusePort: true } : {})
    }, () => {
      log(`Server running successfully on port ${port}`);
      log(`NODE_ENV: ${process.env.NODE_ENV}`);
      log(`Current directory: ${process.cwd()}`);
      // List files in dist directory to verify build
      if (process.env.NODE_ENV === 'production') {
        import('fs').then(fs => {
          try {
            const files = fs.readdirSync('./dist');
            log(`Files in dist directory: ${files.join(', ')}`);
          } catch (err) {
            log(`Error listing dist directory: ${err.message}`);
          }
        }).catch(err => {
          log(`Error importing fs module: ${err.message}`);
        });
      }
    });
  } catch (error) {
    log(`Error starting server: ${error.message}`, "express", "error");
    console.error("Full error:", error);
    process.exit(1); // Exit with error code for clarity
  }
})();
