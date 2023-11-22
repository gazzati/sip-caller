import { FastifyInstance } from "fastify"

import {GetIp} from './main.interface';

import StatService from "./main.service"

async function mainController(server: FastifyInstance) {
  const statService = new StatService()

  server.get<GetIp>("/ip", async (request, reply) => {
    const ip = request.headers["real-ip"] || ""

    reply.send({ip})
  })

  server.get("/stats", async (_, reply) => {
    const response = await statService.getStats()

    reply.send(response)
  })
}

export default mainController
