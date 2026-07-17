import crypto from "crypto";

import { CONFIG, LOOPBACK_IPS } from "../config";

import { NetworkEvent } from "../types";

/**
 * Parse one line of `ss -tunp`
 */
export function parseSSLine(
    line: string,
    scanId: number
): NetworkEvent | null {

    line = line.trim();

    if (
        !line ||
        line.startsWith("Netid")
    ) {
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
    if (
        CONFIG.IGNORE_LOOPBACK &&
        (
            LOOPBACK_IPS.includes(localParsed.ip) ||
            LOOPBACK_IPS.includes(remoteParsed.ip)
        )
    ) {
        return null;
    }

    /**
     * Ignore IPv6
     */
    if (
        CONFIG.IGNORE_IPV6 &&
        (
            localParsed.ip.includes(":") ||
            remoteParsed.ip.includes(":")
        )
    ) {
        return null;
    }

    const processInfo = extractProcess(line);

    /**
     * Ignore Unknown Process
     */
    if (
        CONFIG.IGNORE_UNKNOWN_PROCESS &&
        processInfo.process === "unknown"
    ) {
        return null;
    }

    const direction = detectDirection(
        localParsed.ip,
        remoteParsed.ip
    );

const id = crypto
    .createHash("sha1")
    .update(
        `${protocol}-${processInfo.process}-${localParsed.ip}-${localParsed.port}-${remoteParsed.ip}-${remoteParsed.port}`
    )
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
function parseAddress(address: string) {

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

            port: Number(
                address.substring(end + 2)
            )

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

        port: Number(
            address.substring(idx + 1)
        )

    };

}

/**
 * Extract Process & PID
 */
function extractProcess(line: string) {

    const match =
        line.match(
            /users:\(\("([^"]+)",pid=(\d+)/
        );

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
function detectDirection(
    localIP: string,
    remoteIP: string
): "incoming" | "outgoing" | "unknown" {

    if (
        LOOPBACK_IPS.includes(localIP)
    ) {
        return "unknown";
    }

    return "outgoing";

}