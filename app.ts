import { createP2PNode } from "./src/utils/mergeMixins";
import { BaseNode } from "./src/nodes/BaseNode.js";
import { BootstrapNode } from "./src/nodes/BootstrapNode.ts";
import { RelayNode } from "./src/nodes/RelayNode.ts";
import { getPeerDetails } from "./src/utils/peerUtils.js";
import { repeat } from "./src/utils/tools.js";

// Create a new class that merges BaseNode, BootstrapNode, and RelayNode
const testNode = createP2PNode("chain", BaseNode, BootstrapNode, RelayNode);
const nodeInstance = new testNode() as RelayNode & BootstrapNode & BaseNode;

nodeInstance.create().then(async (node: any) => {
  console.log("✅ Node created:", node.libp2p.peerId.toString());
  repeat(() => {
    getPeerDetails(node.libp2p)
  }, 3000)
});
