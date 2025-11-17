import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
dotenv.config();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function createDevServer() {
  const app = express();

  // Create Vite server in middleware mode
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: "custom",
  });

  // Use vite's connect instance as middleware
  app.use(vite.middlewares);

  app.use("*", async (req, res, next) => {
    const url = req.originalUrl;

    try {
      // Always read fresh template in dev
      let template = fs.readFileSync(
        path.resolve(__dirname, "index.html"),
        "utf-8",
      );

      // Apply Vite HTML transforms
      template = await vite.transformIndexHtml(url, template);

      // Load the server entry
      const { render } = await vite.ssrLoadModule("/src/entry-server.jsx");

      // Render the app HTML
      const appHtml = await render(req);

      // Replace the SSR outlet with the app HTML
      const html = template.replace(`<!--ssr-outlet-->`, appHtml);

      res.status(200).set({ "Content-Type": "text/html" }).end(html);
    } catch (e) {
      // If an error is caught, let Vite fix the stack trace so it maps back
      // to your actual source code.
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });

  return app;
}

async function createProdServer() {
  const app = express();
  app.use((await import("compression")).default());
  app.use(
    (await import("serve-static")).default(
      path.resolve(__dirname, "dist/client"),
      {
        index: false,
      },
    ),
  );
  app.use("*", async (req, res, next) => {
    try {
      let template = fs.readFileSync(
        path.resolve(__dirname, "dist/client/index.html"),
        "utf-8",
      );
      const render = (await import("./dist/server/entry-server.js")).render;
      const appHtml = await render(req);
      const html = template.replace(`<!--ssr-outlet-->`, appHtml);
      res.status(200).set({ "Content-Type": "text/html" }).end(html);
    } catch (e) {
      next(e);
    }
  });
  return app;
}
if (process.env.NODE_ENV === "production") {
  const app = await createProdServer();
  app.listen(process.env.PORT, () =>
    console.log(`ssr production server running on http://
localhost:${process.env.PORT}`),
  );
} else {
  const app = await createDevServer();
  app.listen(process.env.PORT, () =>
    console.log(
      `ssr dev server running on http://localhost:${process.env.PORT}`,
    ),
  );
}
