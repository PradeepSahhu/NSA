"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./config");
const networkCapture_1 = require("./capture/networkCapture");
const ssParser_1 = require("./parser/ssParser");
const connectionTracker_1 = require("./tracker/connectionTracker");
const fileLogger_1 = require("./logger/fileLogger");
const tsharkCapture_1 = require("./packet/tsharkCapture");
const packetParser_1 = require("./parser/packetParser");
const packetLogger_1 = require("./logger/packetLogger");
const tracker = new connectionTracker_1.ConnectionTracker();
const tshark = new tsharkCapture_1.TsharkCapture();
let scanId = 0;
/**
 * SS Connection Scan
 */
async function scanNetwork() {
    scanId++;
    try {
        const lines = await (0, networkCapture_1.captureConnections)();
        const connections = [];
        for (const line of lines) {
            const event = (0, ssParser_1.parseSSLine)(line, scanId);
            if (event) {
                connections.push(event);
            }
        }
        const events = tracker.process(connections, scanId);
        await (0, fileLogger_1.writeEvents)(events);
    }
    catch (err) {
        console.error(err);
    }
}
/**
 * Live Packet Capture
 */
function startPacketCapture() {
    tshark.start(async (packetJson) => {
        const packet = (0, packetParser_1.parsePacket)(packetJson);
        if (!packet)
            return;
        await (0, packetLogger_1.writePacket)(packet);
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
    await (0, fileLogger_1.initializeLogger)();
    await (0, packetLogger_1.initializePacketLogger)();
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
    }, config_1.CONFIG.CAPTURE_INTERVAL);
}
main().catch(console.error);
