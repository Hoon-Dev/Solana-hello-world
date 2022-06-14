import os from "os";
import fs from "fs";
import path from "path";

import {SolanaConfig} from "./solanaConfig";

export async function getConfig(): Promise<SolanaConfig> {
  const CONFIG_FILE_PATH = path.resolve(
    os.homedir(),
    ".config",
    "solana",
    "cli",
    "config.yml",
  );

  const solanaConfig = SolanaConfig.getInstance();
  try {
    const configContent = await fs.promises.readFile(CONFIG_FILE_PATH, {encoding: "utf-8"});
    solanaConfig.set(configContent);
  }
  catch(e) {}
  return solanaConfig;
}
