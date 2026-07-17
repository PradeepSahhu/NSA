import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

/**
 * Capture active network connections
 * using Linux `ss` command.
 */
export async function captureConnections(): Promise<string[]> {

    try {

        const { stdout } = await execAsync("ss -tunp");

        return stdout
            .split("\n")
            .map(line => line.trim())
            .filter(line => line.length > 0);

    } catch (error) {

        console.error("[Capture Error]", error);

        return [];

    }

}