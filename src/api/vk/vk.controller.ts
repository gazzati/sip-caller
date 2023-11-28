import { FastifyInstance } from "fastify"

import { GetCities } from "./vk.interface"

import VkService from "./vk.service"

async function VkController(server: FastifyInstance) {
  const vkService = new VkService()

  server.get<GetCities>("/cities", async (request, reply) => {
    const cities = await vkService.getCities(request.query.search)

    reply.send({cities})
  })
}

export default VkController
