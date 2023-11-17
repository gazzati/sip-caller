import "../aliases"

import router from "@api/router"
import fastifySensible from "@fastify/sensible"
import fastify from "fastify"

import config from "@root/config"

const app = fastify({
  logger: true // TODO: add own logger
  //ignoreTrailingSlash: true,
})

app.after(() => {
  app.register(fastifySensible)

  router(app)
})

export const start = async () => {
  try {
    await app.listen({ port: config.apiPort })
  } catch (error) {
    console.error(error)
  }
}
