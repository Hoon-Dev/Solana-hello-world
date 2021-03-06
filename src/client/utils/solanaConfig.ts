const DEFAULT_CONFIG = {
  "json_rpc_url": "",
  "keypair_path": "",
}

export type ConfigContent = {[key: string]: string | {[key: string]: string}} & typeof DEFAULT_CONFIG;

/**
 * yaml 파일을 파싱해 솔라나 컨피그를 구성하는 클래스
 */
export class SolanaConfig {
  private configContent: ConfigContent = DEFAULT_CONFIG;
  private static _instance: SolanaConfig;

  /**
   * 싱글턴 인스턴스 초기화 여부
   */
   public static get initialized(): boolean {
    return SolanaConfig._instance !== undefined;
  }

  /**
   * 싱글턴 인스턴스 반환 함수
   */
  public static getInstance(): SolanaConfig {
    if(SolanaConfig._instance === undefined) {
      SolanaConfig._instance = new SolanaConfig();
    }
    return SolanaConfig._instance as SolanaConfig;
  }

  /**
   * yaml 컨텐츠를 컨피그 클래스로 구조화하는 함수
   * @param content yaml 컨텐츠 내용
   */
  public set(content: string): void {
    content = content.replace(/"|'/g, "");
    const splitedContent = content.split("\n");
    if(splitedContent.length !== 0) {
      this.configContent = splitedContent.reduce<ConfigContent>((acc, cur, idx) => {
        try {
          const configRawKey = cur.split(":", 1)[0].trim();
          const configRawValue = cur.substring(cur.indexOf(configRawKey)+configRawKey.length+1, cur.length).trim();
          const isCorrectFormat = (cur.split(":").length !== 1);
          
          if(cur.startsWith(" ") === true) {
            const accKeys = Object.keys(acc);
            const lastKey = accKeys[accKeys.length - 1];
            let lastRaw = acc[lastKey];

            if(typeof lastRaw === "string") {
              lastRaw = {};
            }

            acc[lastKey] = {
              ...lastRaw,
              [configRawKey]: configRawValue
            }
          } else if(isCorrectFormat) {
            acc[configRawKey] = configRawValue;
          }
        } catch(e) {
          console.warn(`CANNOT_PARSE_${idx}_IDX_RAW`);
        }
        return acc;
      }, DEFAULT_CONFIG);
    }
  }
  
  /**
   * 키 값을 이용해 컨피그 내용 가져오는 함수
   * @param key 가져올 컨피그 키 값
   */
  public get<Type extends keyof ConfigContent>(key: Type): ConfigContent[Type] {
    return this.configContent[key] ? this.configContent[key]: "";
  }
}