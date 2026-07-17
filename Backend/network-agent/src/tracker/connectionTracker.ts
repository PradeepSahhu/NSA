import { NetworkEvent } from "../types";

export class ConnectionTracker {

    /**
     * Previous Scan Snapshot
     */
    private previousConnections =
        new Map<string, NetworkEvent>();

    /**
     * Compare Current Scan with Previous Scan
     */
    public process(
        currentConnections: NetworkEvent[],
        currentScanId: number
    ): NetworkEvent[] {

        const events: NetworkEvent[] = [];

        const currentMap =
            new Map<string, NetworkEvent>();

        /**
         * Build Current Snapshot
         */
        for (const connection of currentConnections) {

            currentMap.set(
                connection.id,
                connection
            );

        }

        /**
         * NEW_CONNECTION
         * STATE_CHANGED
         */
        for (const connection of currentConnections) {

            const oldConnection =
                this.previousConnections.get(
                    connection.id
                );

            if (!oldConnection) {

                if (
                    connection.state === "ESTAB" ||
                    connection.state === "LISTEN" ||
                    connection.state === "SYN-SENT"
                ) {

                    events.push({

                        ...connection,

                        event: "NEW_CONNECTION"

                    });

                }

                continue;

            }

            if (
                oldConnection.state !==
                connection.state
            ) {

                events.push({

                    ...connection,

                    event: "STATE_CHANGED"

                });

            }

        }

        /**
         * CONNECTION_CLOSED
         */
        for (
            const [id, oldConnection]
            of this.previousConnections
        ) {

            if (!currentMap.has(id)) {

                events.push({

                    ...oldConnection,

                    scanId: currentScanId,

                    timestamp:
                        new Date().toISOString(),

                    event:
                        "CONNECTION_CLOSED"

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