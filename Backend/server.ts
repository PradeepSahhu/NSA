import { LogType } from "./Constants/LogType.ts";
const Polling = () => {
  console.log(`Polling System [${LogType.Info}, time=2sec, type=Processes]`);
};

setInterval(() => {
  Polling();
}, 2000);
