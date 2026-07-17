"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.captureConnections = captureConnections;
const child_process_1 = require("child_process");
const util_1 = require("util");
const execAsync = (0, util_1.promisify)(child_process_1.exec);
/**
 * Capture active network connections
 * using Linux `ss` command.
 */
async function captureConnections() {
    try {
        const { stdout } = await execAsync("ss -tunp");
        return stdout
            .split("\n")
            .map(line => line.trim())
            .filter(line => line.length > 0);
    }
    catch (error) {
        console.error("[Capture Error]", error);
        return [];
    }
}
