import type Types from "types/contract";
export type {Types};

import {
  getRpcUrl
} from "./utils";

import {Connection} from "@solana/web3.js";

export class Contract {
  constructor() {}

  /**
   * 클러스터의 상태를 체크하는 함수
   */
  async clusterHealthCheck(): Promise<Types.Status> {
    const rpcUrl = await getRpcUrl();
    try {
      const connection = new Connection(rpcUrl, "confirmed");
      const {"solana-core": version} = await connection.getVersion();
      console.log(`
클러스터 연결 성공!
- RPC URL: ${rpcUrl}
- version: ${version}
`);
    } catch(e) {
      console.log(`
클러스터 연결 실패
- RPC URL: ${rpcUrl}
`);
      return false;
    }
    return true;
  }
}