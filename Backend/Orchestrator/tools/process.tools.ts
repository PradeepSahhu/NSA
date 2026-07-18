import { ToolFnType } from "../utils/Interface/ToolFnType";
import * as z from "zod";
// all these will do the api call to get the data and do the action tool -> rest api -> daemon

// this file will only contain methods -> it will be wrapped to methods later

//------------------ Input schema --------------------
const GetProcessesInputSchema = z.object({});
const GetProcessByIdInputSchema = z.object({
  id: z.string(),
});

// ------------------ Function type interfaces ----------------
interface IBaseToolFunctionInterface {
  name: string;
  description: string;
}

export interface IToolFunctionInterface<
  TSchema extends z.ZodTypeAny,
  TOutput,
> extends IBaseToolFunctionInterface {
  schema: TSchema;
  execute: ToolFnType<z.infer<TSchema>, TOutput>;
}

// --------------------- Functions definitions -------------------
export const getProcesses: IToolFunctionInterface<
  typeof GetProcessesInputSchema,
  string
> = {
  name: "get_processes",
  description: "",
  schema: GetProcessesInputSchema,
  execute: async () => {
    // api call
    return "success";
  },
};

export const getProcessById: IToolFunctionInterface<
  typeof GetProcessByIdInputSchema,
  string
> = {
  name: "get_process_by_id",
  description: "",
  schema: GetProcessByIdInputSchema,
  execute: async ({ id }) => {
    // api call
    console.log(id);
    return "{'processId':1278}";
  },
};
