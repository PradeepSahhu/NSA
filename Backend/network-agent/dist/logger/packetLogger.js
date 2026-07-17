"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializePacketLogger = initializePacketLogger;
exports.writePacket = writePacket;
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const LOG_DIR = path_1.default.join(process.cwd(), "logs");
const LOG_FILE = path_1.default.join(LOG_DIR, "packets.jsonl");
async function initializePacketLogger() {
    await fs_1.promises.mkdir(LOG_DIR, {
        recursive: true
    });
}
async function writePacket(packet) {
    await fs_1.promises.appendFile(LOG_FILE, JSON.stringify(packet) + "\n");
}
