import os from "os";
import fs from "fs";
import path from "path";

import {SolanaConfig} from "./solanaConfig";

/**
 * 솔라나 컨피그 객체 가져오는 함수
 */
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

/**
 * 설정된 솔라나 RPC URL 반환 해주는 함수
 */
export async function getRpcUrl(): Promise<string> {
  return (await getConfig()).get("json_rpc_url");
}