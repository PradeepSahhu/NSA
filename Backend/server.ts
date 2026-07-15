import { LogType } from "./Constants/LogType.ts";
import app from "./app.ts";
const Polling = () => {
  console.log(`Polling System [${LogType.Info}, time=2sec, type=Processes]`);
};

app.listen("3000", () => {
  setInterval(() => {
    Polling();
  }, 2000);
});
