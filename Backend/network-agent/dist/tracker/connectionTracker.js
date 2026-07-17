"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectionTracker = void 0;
class ConnectionTracker {
    /**
     * Previous Scan Snapshot
     */
    previousConnections = new Map();
    /**
     * Compare Current Scan with Previous Scan
     */
    process(currentConnections, currentScanId) {
        const events = [];
        const currentMap = new Map();
        /**
         * Build Current Snapshot
         */
        for (const connection of currentConnections) {
            currentMap.set(connection.id, connection);
        }
        /**
         * NEW_CONNECTION
         * STATE_CHANGED
         */
        for (const connection of currentConnections) {
            const oldConnection = this.previousConnections.get(connection.id);
            if (!oldConnection) {
                if (connection.state === "ESTAB" ||
                    connection.state === "LISTEN" ||
                    connection.state === "SYN-SENT") {
                    events.push({
                        ...connection,
                        event: "NEW_CONNECTION"
                    });
                }
                continue;
            }
            if (oldConnection.state !==
                connection.state) {
                events.push({
                    ...connection,
                    event: "STATE_CHANGED"
                });
            }
        }
        /**
         * CONNECTION_CLOSED
         */
        for (const [id, oldConnection] of this.previousConnections) {
            if (!currentMap.has(id)) {
                events.push({
                    ...oldConnection,
                    scanId: currentScanId,
                    timestamp: new Date().toISOString(),
                    event: "CONNECTION_CLOSED"
                });
            }
        }
        /**
         * Save Snapshot
         */
        this.previousConnections =
            currentMap;
        return events;
    }
}
exports.ConnectionTracker = ConnectionTracker;
