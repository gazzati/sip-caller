import statController from "@root/api/stat/stat.controller"

import type { FastifyInstance } from "fastify"

const router = (app: FastifyInstance) => {
  app.register(statController, { prefix: "/api/stats" })
}

export default router
