import * as fs from "fs";
import logger from "./logger";

export async function readFile(file: string): Promise<string> {
  logger.debug("Reading file", file);
  return new Promise((resolve, reject) => {
    fs.readFile(file, { encoding: "utf8" }, (err, data) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(data);
    });
  });
}

export async function readFileBetter(file: string): Promise<string> {
  logger.debug("Reading file", file);
  return new Promise((resolve, reject) => {
    fs.readFile(file, { encoding: "utf8" }, (err, data) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(data.replace(/\n$/, ""));
    });
  });
}
