import * as z from "zod";
import { IToolFunctionInterface } from "../utils/Interface/ToolFnType.ts";

// all these will do the api call to get the data and do the action tool -> rest api -> daemon

//------------------ Input Schema ------------------
const GetNetworkInputSchema = z.object({
  networkId: z.string(),
});

const BlockNetworkInputSchema = z.object({
  networkId: z.string(),
});

// ----------------- Tool Function Definitions ------------

export const getNetwork: IToolFunctionInterface<typeof GetNetworkInputSchema, string> = {
  name: "",
  description: "",
  schema: GetNetworkInputSchema,
  execute: async () => {
    //do api call here
    return "";
  },
};

export const blockNetwork: IToolFunctionInterface<typeof BlockNetworkInputSchema, boolean> = {
  name: "",
  description: "",
  schema: BlockNetworkInputSchema,
  execute: async () => {
    return true;
  },
};
