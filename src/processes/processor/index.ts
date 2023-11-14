import { v1 as uuidv1, } from "uuid"

import "../../aliases"
import Ari from "./ari"
import Processor from "./processor"

new Processor().start();


const ari = new Ari();

// (async() => {
//     const firstChannelId = uuidv1()
//     const secondChannelId = uuidv1()
//     const bridgeId = uuidv1()

//     const firstChannel = await ari.createChannel("Sip/1003", firstChannelId)
//     console.log("firstChannel", firstChannel)

//     ari.dial(firstChannel.id)
//     // const secondChannel = await ari.createChannel("Sip/1002", secondChannelId)
//     // console.log("secondChannel", secondChannel)
//     // const bridge = await ari.createBridge(bridgeId)
//     // console.log("bridge", bridge)


//     // await ari.addChannelsToBridge(bridge.id, [firstChannel.id, secondChannel.id])

// })()
