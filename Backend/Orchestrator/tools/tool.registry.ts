import {
  getProcesses,
  getProcessById,
  IToolFunctionInterface,
} from "./process.tools.ts";
import { tool } from "langchain";
import * as z from "zod";

type RegisteredTool = IToolFunctionInterface<z.ZodTypeAny, unknown>;

export const ToolRegistry: Record<string, RegisteredTool> = {
  [getProcesses.name]: getProcesses,
  [getProcessById.name]: getProcessById,
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

export const ProcessesTools = Object.values(ToolRegistry).map((toolFn) =>
  ToolWrapper(toolFn),
);

/*
less redable form :)

export const toolsprocesses = Object.values(ToolRegistry).map(ToolWrapper);

*/
