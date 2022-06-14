import {Contract} from "./contract";

(async function main() {
  const contract = new Contract();
  await contract.clusterHealthCheck();
})();