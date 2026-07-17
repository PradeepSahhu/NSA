import agent from "./utils/llm.connection.ts";
console.log("hello orchestrator");

const orchestrator = async () => {
  const messages = [{ role: "user", content: "can you call the tool?" }];
  const res = await agent.invoke({ messages });

  console.log(res.messages);
};

orchestrator();
