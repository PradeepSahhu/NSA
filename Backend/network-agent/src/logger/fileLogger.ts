import { promises as fs } from "fs";
import path from "path";

import { CONFIG } from "../config";
import { NetworkEvent } from "../types";

const logDirectory = path.dirname(CONFIG.LOG_FILE);

/**
 * Initialize logger
 * Creates logs directory if it doesn't exist.
 */
export async function initializeLogger(): Promise<void> {

    await fs.mkdir(logDirectory, {

        recursive: true

    });

}

/**
 * Write a single event
 */
export async function writeEvent(
    event: NetworkEvent
): Promise<void> {

    await fs.appendFile(

        CONFIG.LOG_FILE,

        JSON.stringify(event) + "\n",

        "utf8"

    );

}

/**
 * Write multiple events
 */
export async function writeEvents(
    events: NetworkEvent[]
): Promise<void> {

    if (events.length === 0)
        return;

    const data = events
        .map(event => JSON.stringify(event))
        .join("\n") + "\n";

    await fs.appendFile(

        CONFIG.LOG_FILE,

        data,

        "utf8"

    );

}