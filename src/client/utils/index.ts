import os from "os";
import fs from "fs";
import path from "path";

import {SolanaConfig} from "./solanaConfig";
import {Keypair} from "@solana/web3.js";

/**
 * 솔라나 컨피그 객체 가져오는 함수
 */
export async function getConfig(): Promise<SolanaConfig> {
  if(SolanaConfig.initialized) {
    return SolanaConfig.getInstance();
  } else {
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
}

/**
 * 설정된 솔라나 RPC URL 반환 해주는 함수
 */
export async function getRpcUrl(): Promise<string> {
  return (await getConfig()).get("json_rpc_url");
}

/**
 * 실행 컴퓨터에서 솔라나 지불을 담당할 키 쌍 가져오는 함수
 */
export async function getLocalkeypair(): Promise<Keypair> {
  const secretKeyFilePath = (await getConfig()).get("keypair_path");
  try {
    return createKeypairFromFile(secretKeyFilePath);
  } catch(e) {
    throw "CANNOT_CREATE_KEYPAIR"
  }
}

/**
 * 파일 경로에 있는 시크릿키로 키 쌍을 만드는 함수
 * @param secretKeyFilePath 시크릿키 파일 경로
 */
export async function createKeypairFromFile(secretKeyFilePath: string): Promise<Keypair> {
  try {
    const secretKey = await fs.promises.readFile(secretKeyFilePath, {encoding: "utf-8"});
    return Keypair.fromSecretKey(Uint8Array.from(JSON.parse(secretKey))); 
  } catch(e) {
    throw "CANNOT_READ_SECRETKEY";
  }
}