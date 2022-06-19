import {ContractDriver} from "./contractDriver";
import {
  getRpcUrl,
  getLocalkeypair,
  createKeypairFromFile
} from "./utils";
import Config from "./config";

(async function main() {
  try {
    const {publicKey} = await createKeypairFromFile(Config.path.PROGRAM_KEYPAIR_PATH);
    const cd = new ContractDriver(publicKey);
  
    const rpcUrl = await getRpcUrl();
    await cd.connectToCluster(rpcUrl);
  
    const executorKeypair = await getLocalkeypair();
    cd.setPayer(executorKeypair);
  } catch(errorMessage) {
    console.log(errorMessage);
  }
})();