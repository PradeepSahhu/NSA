"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseSSLine = parseSSLine;
const crypto_1 = __importDefault(require("crypto"));
const config_1 = require("../config");
/**
 * Parse one line of `ss -tunp`
 */
function parseSSLine(line, scanId) {
    line = line.trim();
    if (!line ||
        line.startsWith("Netid")) {
        return null;
    }
    const parts = line.split(/\s+/);
    if (parts.length < 6)
        return null;
    const protocol = parts[0];
    const state = parts[1];
    const local = parts[4];
    const remote = parts[5];
    const localParsed = parseAddress(local);
    const remoteParsed = parseAddress(remote);
    if (!localParsed || !remoteParsed)
        return null;
    /**
     * Ignore Loopback
     */
    if (config_1.CONFIG.IGNORE_LOOPBACK &&
        (config_1.LOOPBACK_IPS.includes(localParsed.ip) ||
            config_1.LOOPBACK_IPS.includes(remoteParsed.ip))) {
        return null;
    }
    /**
     * Ignore IPv6
     */
    if (config_1.CONFIG.IGNORE_IPV6 &&
        (localParsed.ip.includes(":") ||
            remoteParsed.ip.includes(":"))) {
        return null;
    }
    const processInfo = extractProcess(line);
    /**
     * Ignore Unknown Process
     */
    if (config_1.CONFIG.IGNORE_UNKNOWN_PROCESS &&
        processInfo.process === "unknown") {
        return null;
    }
    const direction = detectDirection(localParsed.ip, remoteParsed.ip);
    const id = crypto_1.default
        .createHash("sha1")
        .update(`${protocol}-${processInfo.process}-${localParsed.ip}-${localParsed.port}-${remoteParsed.ip}-${remoteParsed.port}`)
        .digest("hex");
    return {
        id,
        scanId,
        timestamp: new Date().toISOString(),
        event: "NEW_CONNECTION",
        direction,
        protocol,
        state,
        process: processInfo.process,
        pid: processInfo.pid,
        localIP: localParsed.ip,
        localPort: localParsed.port,
        remoteIP: remoteParsed.ip,
        remotePort: remoteParsed.port
    };
}
/**
 * Parse IPv4 / IPv6
 */
function parseAddress(address) {
    /**
     * IPv6
     */
    if (address.startsWith("[")) {
        const end = address.lastIndexOf("]:");
        if (end === -1)
            return null;
        return {
            ip: address
                .substring(1, end)
                .split("%")[0],
            port: Number(address.substring(end + 2))
        };
    }
    /**
     * IPv4
     */
    const idx = address.lastIndexOf(":");
    if (idx === -1)
        return null;
    return {
        ip: address
            .substring(0, idx)
            .split("%")[0],
        port: Number(address.substring(idx + 1))
    };
}
/**
 * Extract Process & PID
 */
function extractProcess(line) {
    const match = line.match(/users:\(\("([^"]+)",pid=(\d+)/);
    if (!match) {
        return {
            process: "unknown",
            pid: null
        };
    }
    return {
        process: match[1],
        pid: Number(match[2])
    };
}
/**
 * Detect Direction
 */
function detectDirection(localIP, remoteIP) {
    if (config_1.LOOPBACK_IPS.includes(localIP)) {
        return "unknown";
    }
    return "outgoing";
}
