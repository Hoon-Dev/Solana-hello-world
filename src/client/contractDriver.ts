import type Types from "types/contractDriver";
export type {Types};

import {
  Connection,
  Keypair,
  PublicKey
} from "@solana/web3.js";

function DEBUG_MSG(messages: string | string[]) {
  console.log(typeof messages === "string" ? messages : messages.join("\n"), "\n");
}

export class ContractDriver {
  private connection: Connection | undefined;
  private payer: Keypair | undefined;

  constructor(private programPubkey: PublicKey) {}

  /**
   * 클러스터로 연결하는 함수
   */
  async connectToCluster(rpcUrl: string): Promise<Types.Status> {
    try {
      this.connection = new Connection(rpcUrl, "confirmed");
      const {"solana-core": version} = await this.connection.getVersion();
      DEBUG_MSG([
        "클러스터 연결 성공!",
        `- RPC URL: ${rpcUrl}`,
        `- version: ${version}`
      ]);
    } catch(e) {
      DEBUG_MSG([
        "클러스터 연결 실패",
        `- RPC URL: ${rpcUrl}`
      ]);
      return false;
    }
    return true;
  }

  /**
   * 컨트랙트 실행에 지불자를 지정하는 함수
   */
  async setPayer(keypair: Keypair): Promise<Types.Status> {
    try {
      this.payer = keypair;
      const balance = await this.connection?.getBalance(this.payer.publicKey);
      DEBUG_MSG([
        "지갑 연결 성공!",
        `- 퍼블릭키: ${this.payer.publicKey}`,
        `- 남은 잔액: ${balance} SOL`
      ]);
    } catch(e) {
      DEBUG_MSG([
        "지갑 연결 실패",
        `- 퍼블릭키: ${this.payer?.publicKey}`
      ]);
      return false;
    }
    return true;
  }
}