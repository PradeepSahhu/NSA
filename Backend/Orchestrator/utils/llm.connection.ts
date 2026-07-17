import { ChatDeepSeek } from "@langchain/deepseek";
import { createAgent } from "langchain";
import { tool } from "@langchain/core/tools";

const model = new ChatDeepSeek({
  model: "deepseek-v4-flash",
});

const weather = tool(
  async () => {
    return "hello";
  },
  {
    name: "useless_tool",
    description: "useless tool to just check if the agent can call the tool",
  },
);
const weatherTools = [weather];

// const res = await model.invoke({
//   messages: [{ role: "user", content: "What's the weather in San Francisco?" }],
// });

// console.log(res.messages);

const agent = createAgent({
  model,
  tools: weatherTools,
});

export default agent;
