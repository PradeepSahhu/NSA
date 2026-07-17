import path from "path";

/**
 * Network Agent Configuration
 */

export const CONFIG = {

    /**
     * Capture interval (milliseconds)
     */
    CAPTURE_INTERVAL: 5000,

    /**
     * Output JSONL file
     */
    LOG_FILE: path.join(
        process.cwd(),
        "logs",
        "network.jsonl"
    ),

    /**
     * Ignore localhost traffic
     */
    IGNORE_LOOPBACK: true,

    /**
     * Ignore sockets whose process
     * cannot be determined
     */
    IGNORE_UNKNOWN_PROCESS: true,

    /**
     * Ignore IPv6 connections
     */
    IGNORE_IPV6: false

};

/**
 * Loopback Addresses
 */

export const LOOPBACK_IPS = [

    "127.0.0.1",

    "::1"

];

/**
 * Valid TCP/UDP states
 */

export const VALID_STATES = [

    "ESTAB",

    "LISTEN",

    "SYN-SENT",

    "SYN-RECV",

    "FIN-WAIT-1",

    "FIN-WAIT-2",

    "CLOSE-WAIT",

    "LAST-ACK",

    "TIME-WAIT",

    "UNCONN"

];