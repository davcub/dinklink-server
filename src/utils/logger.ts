import winston from "winston";
import { Logtail } from "@logtail/node";
import { LogtailTransport } from "@logtail/winston";

const { combine, timestamp, json, prettyPrint, errors } = winston.format;

const transports: winston.transport[] = [
  new winston.transports.File({ filename: "log_output.log" }),
];

// if (ENV === "production" || ENV === "staging") {
//   const token: string = BETTER_STACK_LOG_TOKEN || "";
//   const log_tail = new Logtail(token);
//   transports.push(new LogtailTransport(log_tail));
// }

export const logger = winston.createLogger({
  level: "info",
  format: combine(errors({ stack: true }), timestamp(), json(), prettyPrint()),
  transports,
});

export default logger;
