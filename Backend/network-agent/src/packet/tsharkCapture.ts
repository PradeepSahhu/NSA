import { spawn, ChildProcessWithoutNullStreams } from "child_process";

export class TsharkCapture {

    private process: ChildProcessWithoutNullStreams | null = null;

    /**
     * Start live packet capture
     */
    public start(
        onPacket: (json: string) => void
    ) {

        this.process = spawn("sudo", [

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

            console.error(
                "[tshark]",
                data.toString()
            );

        });

        this.process.on("close", (code) => {

            console.log(
                `tshark exited (${code})`
            );

        });

    }

    /**
     * Stop Capture
     */
    public stop() {

        if (this.process) {

            this.process.kill("SIGINT");

            this.process = null;

        }

    }

}