import {ContractDriver} from "./contractDriver";
import {
  getRpcUrl,
  getPayer
} from "./utils";

(async function main() {
  const cd = new ContractDriver();

  const rpcUrl = await getRpcUrl();
  await cd.connectToCluster(rpcUrl);

  const executorKeypair = await getPayer();
  cd.setPayer(executorKeypair);
})();