import { FastifyInstance } from "fastify"

import StatService from "./stat.service"

async function statController(server: FastifyInstance) {
  const statService = new StatService()

  server.get("/", async (_, reply) => {
    const response = await statService.getStats()

    reply.send(response)
  })
}

export default statController
