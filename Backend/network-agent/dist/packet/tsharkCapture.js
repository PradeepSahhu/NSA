"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TsharkCapture = void 0;
const child_process_1 = require("child_process");
class TsharkCapture {
    process = null;
    /**
     * Start live packet capture
     */
    start(onPacket) {
        this.process = (0, child_process_1.spawn)("sudo", [
            "tshark",
            "-i",
            "any",
            "-l",
            "-T",
            "ek"
        ]);
        let buffer = "";
        this.process.stdout.on("data", (chunk) => {
            buffer += chunk.toString();
            const lines = buffer.split("\n");
            buffer = lines.pop() || "";
            for (const line of lines) {
                if (!line.trim())
                    continue;
                onPacket(line);
            }
        });
        this.process.stderr.on("data", (data) => {
            console.error("[tshark]", data.toString());
        });
        this.process.on("close", (code) => {
            console.log(`tshark exited (${code})`);
        });
    }
    /**
     * Stop Capture
     */
    stop() {
        if (this.process) {
            this.process.kill("SIGINT");
            this.process = null;
        }
    }
}
exports.TsharkCapture = TsharkCapture;
