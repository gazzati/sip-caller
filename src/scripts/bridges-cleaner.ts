import "../aliases"

import dayjs from "dayjs"

import Ari from "@root/ari"
import Logger, { Service } from "@root/services/logger"

// npx ts-node --transpile-only src/scripts/bridges-cleaner.ts

const ari = new Ari()
const logger = new Logger(Service.Scripts)

const cleanUpBridges = async () => {
  try {
    const bridges = await ari.getBridges()
    logger.info(bridges.length.toString())

    for (const bridge of bridges) {
      const createdAt = dayjs(bridge.creationtime)
      const hoursAgo = dayjs().diff(createdAt, "hours")

      if (hoursAgo > 10 && !bridge.channels.length) {
        // if (bridge.channels.length) {
        //   await ari.removeChannelsFromBridge(bridge.id, bridge.channels)
        // }

        await ari.removeBridge(bridge.id)
        logger.info(`Bridge ${bridge.id} ended`)
      }
    }

    process.exit()
  } catch (error) {
    logger.error(error)
    process.exit()
  }
}

cleanUpBridges()
