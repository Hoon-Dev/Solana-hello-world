import type Types from "types/contractDriver";
export type {Types};

import {
  Connection,
  Keypair
} from "@solana/web3.js";

export class ContractDriver {
  private connection: Connection | undefined;

  constructor() {}

  /**
   * 클러스터로 연결하는 함수
   */
  async connectToCluster(rpcUrl: string): Promise<Types.Status> {
    try {
      this.connection = new Connection(rpcUrl, "confirmed");
      const {"solana-core": version} = await this.connection.getVersion();
      console.log(`
클러스터 연결 성공!
- RPC URL: ${rpcUrl}
- version: ${version}`);
    } catch(e) {
      console.log(`
클러스터 연결 실패
- RPC URL: ${rpcUrl}`);
      return false;
    }
    return true;
  }

  /**
   * 컨트랙트 실행에 지불자를 지정하는 함수
   */
  setPayer(keypair: Keypair) {
    
  }
}