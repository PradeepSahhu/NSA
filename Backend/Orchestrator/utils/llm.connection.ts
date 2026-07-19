import { ChatDeepSeek } from "@langchain/deepseek";
import { createAgent } from "langchain";
import { ProcessesTools, NetworkTools } from "../tools/tool.registry.ts";

const model = new ChatDeepSeek({
  model: "deepseek-v4-flash",
});

// const res = await model.invoke({
//   messages: [{ role: "user", content: "What's the weather in San Francisco?" }],
// });

// console.log(res.messages);

const agent = createAgent({
  model,
});

export const ProcessesAgent = createAgent({
  model,
  tools: ProcessesTools,
});

export const NetworkAgent = createAgent({
  model,
  tools: NetworkTools,
});

export default agent;
