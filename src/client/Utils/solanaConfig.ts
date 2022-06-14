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

  public static getInstance(): SolanaConfig {
    if(__dirname !== undefined) {
      SolanaConfig._instance = new SolanaConfig();
    }
    return SolanaConfig._instance as SolanaConfig;
  }

  public set(content: string): void {
    const splitedContent = content.split("\n");
    if(splitedContent.length !== 0) {
      this.configContent = splitedContent.reduce<ConfigContent>((acc, cur, idx) => {
        try {
          const configRawKey = cur.split(":", 1)[0].trim();
          const configRawValue = cur.substring(cur.indexOf(configRawKey)+configRawKey.length+1, cur.length).trim();
          
          if(cur.startsWith(" ") === true) {
            const accKeys = Object.keys(acc);
            const lastKey = accKeys[accKeys.length - 1];
            let lastRaw = acc[lastKey];

            if(typeof lastRaw === "string") {
              lastRaw = {};
            }

            acc[lastKey] = {
              ...lastRaw,
              configRawKey: configRawValue
            }
          } else if(configRawValue !== '') {
            acc[configRawKey] = configRawValue;
          }
        } catch(e) {
          console.log("CAN'T_PARSE");
        }
        return acc;
      }, DEFAULT_CONFIG);
    }
    console.log(this.configContent);
  }
  
  public get<Type extends keyof ConfigContent>(key: Type): ConfigContent[Type] {
    return this.configContent[key];
  }
}