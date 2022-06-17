import {ContractDriver} from "./contractDriver";
import {
  getRpcUrl
} from "./utils";

(async function main() {
  const cd = new ContractDriver();

  const rpcUrl = await getRpcUrl();
  await cd.connectToCluster(rpcUrl);
})();