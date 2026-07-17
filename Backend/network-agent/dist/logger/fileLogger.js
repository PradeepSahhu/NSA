"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeLogger = initializeLogger;
exports.writeEvent = writeEvent;
exports.writeEvents = writeEvents;
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const config_1 = require("../config");
const logDirectory = path_1.default.dirname(config_1.CONFIG.LOG_FILE);
/**
 * Initialize logger
 * Creates logs directory if it doesn't exist.
 */
async function initializeLogger() {
    await fs_1.promises.mkdir(logDirectory, {
        recursive: true
    });
}
/**
 * Write a single event
 */
async function writeEvent(event) {
    await fs_1.promises.appendFile(config_1.CONFIG.LOG_FILE, JSON.stringify(event) + "\n", "utf8");
}
/**
 * Write multiple events
 */
async function writeEvents(events) {
    if (events.length === 0)
        return;
    const data = events
        .map(event => JSON.stringify(event))
        .join("\n") + "\n";
    await fs_1.promises.appendFile(config_1.CONFIG.LOG_FILE, data, "utf8");
}
