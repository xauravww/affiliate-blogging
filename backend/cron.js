import { createRequire } from "module";
import path from "path";
import dotenv from "dotenv";
import cron from "node-cron";
import https from "https";
import generateSitemap from './generateSitemap.js';

const require = createRequire(import.meta.url);

// Load environment variables from .env file
dotenv.config({ path: path.resolve(".env") });
const backendUrl = process.env.RENDER_BACKEND_URL;

// 13-minute interval job for server health check
const healthCheckJob = cron.schedule("*/13 * * * *", async () => {
  try {
    // Perform an HTTPS GET request to hit any backend API
    const response = await new Promise((resolve, reject) => {
      https.get(backendUrl, (res) => {
        let data = "";
        res.on("data", (chunk) => {
          data += chunk;
        });
        res.on("end", () => {
          resolve({ statusCode: res.statusCode, data });
        });
      }).on("error", (err) => {
        reject(err);
      });
    });

    if (response.statusCode === 200) {
      console.log("Server health check successful");
    } else {
      console.error(`Server health check failed with status code: ${response.statusCode}`);
    }

  } catch (err) {
    console.error("Error during health check:", err.message);
  }
});

// Midnight job for sitemap generation
const sitemapJob = cron.schedule("0 0 * * *", async () => {
  try {
    await generateSitemap();
  } catch (err) {
    console.error("Error during sitemap generation:", err.message);
  }
});

export { healthCheckJob, sitemapJob };
