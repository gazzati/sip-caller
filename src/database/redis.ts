import Redis from "ioredis"

import config from "@root/config"

const redis = new Redis({ host: config.redis.host })

export default redis
