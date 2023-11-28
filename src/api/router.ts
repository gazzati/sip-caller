import mainController from "@root/api/main/main.controller"
import vkController from "@root/api/vk/vk.controller"

import type { FastifyInstance } from "fastify"

const router = (app: FastifyInstance) => {
  app.register(mainController, { prefix: "/api/" })
  app.register(vkController, { prefix: "/api/vk/" })
}

export default router
