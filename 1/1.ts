import { readFile } from "util/file";
import logger from "util/logger";
import { splitOnNewline } from 'util/string';

const run = async () => {
  const res = await readFile("package.json");
  const lines = splitOnNewline(res)
  logger.info('lines', lines)
};
run();
