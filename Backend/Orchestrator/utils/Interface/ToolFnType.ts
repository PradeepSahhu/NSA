import * as z from "zod";

//------------------- Function General type --------------------
type ToolFnType<TInput = unknown, TOutput = unknown> = (args: TInput) => Promise<TOutput>;

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
