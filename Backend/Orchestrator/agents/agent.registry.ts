import { createAgent } from "langchain";
import { NetworkAgent, ProcessesAgent } from "../utils/llm.connection";

interface IAgentCapability {
  name: string;
  description: string;
}

//-------------------- type of CreateAgent from langchain --------------
type Agent = ReturnType<typeof createAgent>;

//-------------------- Agent Details ------------------
/*
Same Agent instance will be used
*/

interface IAgentDetails {
  id: string;
  name: string;
  description: string;
  capabilities: IAgentCapability[];
  spawn: () => Promise<Agent>;
}

export const AgentRegistry: Record<string, IAgentDetails> = {
  processes: {
    id: "processes",
    name: "ProcessesAgent",
    description: "Agnet used to process the processes in the Operating system",
    capabilities: [
      {
        name: "ProcessesAgent",
        description: "processes the running process in the opeating system",
      },
    ],
    spawn: async () => {
      return ProcessesAgent;
    },
  },
  network: {
    id: "network",
    name: "NetworkAgent",
    description: "Agent used to handle network monitoring and control operations",
    capabilities: [
      {
        name: "NetworkAgent",
        description: "Handles network-related tasks such as querying and blocking network targets",
      },
    ],
    spawn: async () => {
      return NetworkAgent;
    },
  },
};
