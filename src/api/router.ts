import mainController from "@root/api/main/main.controller"

import type { FastifyInstance } from "fastify"

const router = (app: FastifyInstance) => {
  app.register(mainController, { prefix: "/api/" })
}

export default router
