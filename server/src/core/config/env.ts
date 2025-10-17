import { z } from "zod";
import dotenv from "dotenv";
import logger from "../logger/winston.logger";

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]),
  PORT: z.coerce.number().default(3000),
  CORS_ORIGIN: z.string().url(),

  DATABASE_URL: z.string().url(),
  // CLOUDFLARE_ENDPOINT: z
  //   .string({ required_error: "Cloudflare endpoint is required" })
  //   .url(),
});

const _parsed = envSchema.safeParse(process.env);

if (!_parsed.success) {
  logger.error("❌ Invalid environment variables:");
  _parsed.error.errors.forEach((err) => {
    logger.error(`• ${err.path.join(".")}: ${err.message}`);
  });
  process.exit(1);
}

const serverEnv = _parsed.data;
export default serverEnv;