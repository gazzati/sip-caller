import dotenv from "dotenv"
import Joi from "joi"

dotenv.config()

enum Env {
  Production = "production",
  Development = "development"
}

const envVarsSchema = Joi.object({
  ENV: Joi.string().valid(Env.Development, Env.Production).default(Env.Development).description("Env"),

  ARI_HOST: Joi.string().default("localhost").description("Ari host"),
  ARI_PORT: Joi.string().default("8088").description("Ari port"),
  ARI_APP: Joi.string().default("app").description("Ari application name"),
  ARI_USER: Joi.string().default("user").description("Ari user"),
  ARI_PASSWORD: Joi.string().default("password").description("Ari password"),

  REDIS_HOST: Joi.string().default("localhost").description("Redis host"),

  API_PORT: Joi.string().default(3003).description("API host")
})
  .unknown()
  .required()

const { error, value: envVars } = envVarsSchema.validate(process.env)

if (error) {
  throw new Error(`Config validation error: ${error.message}`)
}

const config = {
  env: envVars.ENV,

  ari: {
    host: envVars.ARI_HOST,
    port: envVars.ARI_PORT,
    app: envVars.ARI_APP,
    user: envVars.ARI_USER,
    password: envVars.ARI_PASSWORD
  },

  redis: {
    host: envVars.REDIS_HOST,
    keys: {
      event: "event"
    }
  },

  apiPort: envVars.API_PORT
}

export default config
export { Env }
