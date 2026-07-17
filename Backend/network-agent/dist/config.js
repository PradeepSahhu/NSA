"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VALID_STATES = exports.LOOPBACK_IPS = exports.CONFIG = void 0;
const path_1 = __importDefault(require("path"));
/**
 * Network Agent Configuration
 */
exports.CONFIG = {
    /**
     * Capture interval (milliseconds)
     */
    CAPTURE_INTERVAL: 5000,
    /**
     * Output JSONL file
     */
    LOG_FILE: path_1.default.join(process.cwd(), "logs", "network.jsonl"),
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
exports.LOOPBACK_IPS = [
    "127.0.0.1",
    "::1"
];
/**
 * Valid TCP/UDP states
 */
exports.VALID_STATES = [
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
