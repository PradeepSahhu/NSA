import { getProcesses, getProcessById } from "./process.tools.ts";
import { blockNetwork, getNetwork } from "./network.tools.ts";
import { IToolFunctionInterface } from "../utils/Interface/ToolFnType.ts";
import { Tool, tool } from "langchain";
import * as z from "zod";

//-------------- type of ToolFunction ------------

type RegisteredTool = IToolFunctionInterface<z.ZodTypeAny, unknown>;

//------------- Tool Registry for Processes Tools -----------

export const ProcessToolRegistry: Record<string, RegisteredTool> = {
  [getProcesses.name]: getProcesses,
  [getProcessById.name]: getProcessById,
};

export const NetworkToolRegistry: Record<string, RegisteredTool> = {
  [getNetwork.name]: getNetwork,
  [blockNetwork.name]: blockNetwork,
};

export const ToolWrapper = (toolFn: RegisteredTool) => {
  return tool(toolFn.execute, {
    name: toolFn.name,
    description: toolFn.description,
    schema: toolFn.schema,
  });
};

// consider the below format also
/*

export const ToolWrapper = (toolFn: RegisteredTool) => {
  return tool(
  
  async(args)=>{
    const res = await toolFn.execute(inputValue);
    return res;
  }, {
    name: toolFn.name,
    description: toolFn.description,
    schema: toolFn.schema,
  });
};

*/

export const ProcessesTools = Object.values(ProcessToolRegistry).map((toolFn) =>
  ToolWrapper(toolFn),
);

export const NetworkTools = Object.values(NetworkToolRegistry).map((toolFn) => ToolWrapper(toolFn));

/*
less redable form :)

export const toolsprocesses = Object.values(ProcessToolRegistry).map(ToolWrapper);

*/
