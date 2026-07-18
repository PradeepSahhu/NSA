export type ToolFnType<TInput = unknown, TOutput = unknown> = (
  args: TInput,
) => Promise<TOutput>;
