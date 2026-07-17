import { CONFIG } from "./config";

import { captureConnections } from "./capture/networkCapture";
import { parseSSLine } from "./parser/ssParser";

import { ConnectionTracker } from "./tracker/connectionTracker";

import {
    initializeLogger,
    writeEvents
} from "./logger/fileLogger";

import { NetworkEvent } from "./types";

import { TsharkCapture } from "./packet/tsharkCapture";

import { parsePacket } from "./packet/packetParser";

import {
    initializePacketLogger,
    writePacket
} from "./logger/packetLogger";

const tracker = new ConnectionTracker();

const tshark = new TsharkCapture();

let scanId = 0;

/**
 * SS Connection Scan
 */
async function scanNetwork(): Promise<void> {

    scanId++;

    try {

        const lines = await captureConnections();

        const connections: NetworkEvent[] = [];

        for (const line of lines) {

            const event = parseSSLine(
                line,
                scanId
            );

            if (event) {

                connections.push(event);

            }

        }

        const events = tracker.process(
            connections,
            scanId
        );

        await writeEvents(events);

    } catch (err) {

        console.error(err);

    }

}

/**
 * Live Packet Capture
 */
function startPacketCapture() {

    tshark.start(async (packetJson) => {

        const packet = parsePacket(packetJson);

        if (!packet)
            return;

        await writePacket(packet);

    });

}

/**
 * Main
 */
async function main() {

    console.clear();

    console.log("======================================");

    console.log(" AI Network Monitoring Agent ");

    console.log("======================================");

    console.log();

    await initializeLogger();

    await initializePacketLogger();

    /**
     * Start tshark
     */
    startPacketCapture();

    /**
     * First SS Scan
     */
    await scanNetwork();

    /**
     * Repeat SS Scan
     */
    setInterval(async () => {

        await scanNetwork();

    }, CONFIG.CAPTURE_INTERVAL);

}

main().catch(console.error);