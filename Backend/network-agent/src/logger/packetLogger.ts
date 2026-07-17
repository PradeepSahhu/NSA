import { promises as fs } from "fs";
import path from "path";

import { PacketEvent } from "../packet/packetParser.js";

const LOG_DIR = path.join(
    process.cwd(),
    "logs"
);

const LOG_FILE = path.join(
    LOG_DIR,
    "packets.jsonl"
);

export async function initializePacketLogger() {

    await fs.mkdir(LOG_DIR, {

        recursive: true

    });

}

export async function writePacket(
    packet: PacketEvent
) {

    await fs.appendFile(

        LOG_FILE,

        JSON.stringify(packet) + "\n"

    );

}