import { format, createLogger, transports } from "winston";
import jsonStringify from "fast-safe-stringify";

const logLikeFormat = {
  transform(info: any) {
    const { timestamp, message } = info;
    const level = info[Symbol.for("level")];
    const args = info[Symbol.for("splat")] || [];
    const strArgs = args.map(jsonStringify).join(" ");
    info[
      Symbol.for("message")
    ] = `[${level}]: ${message} ${strArgs}`;
    return info;
  },
};

const logger = createLogger({
  level: "info",
  format: format.combine(format.timestamp(), logLikeFormat),
  // format: format.combine(format.timestamp(), logLikeFormat),
  transports: [new transports.Console()],
});

export default logger;
