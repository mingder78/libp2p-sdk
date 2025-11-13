import { mergeWithStrategy } from "./src/utils/mergeMixins";
import { createLibp2p, type Libp2p, type Libp2pOptions } from 'libp2p'
import { identify } from '@libp2p/identify'
import { ping } from '@libp2p/ping'
import { kadDHT } from '@libp2p/kad-dht'
import { bootstrap } from '@libp2p/bootstrap'
import { BaseNode } from "./src/nodes/BaseNode.js";
import { BootstrapNode } from "./src/nodes/BootstrapNode.ts";
import { RelayNode } from "./src/nodes/RelayNode.ts";
import { getPeerDetails, bootstrapPeers } from "./src/utils/peerUtils.js";

class C {
  config = { c: 3, nested: { y: 2 } };
  sayC() { console.log("C"); }
  greet() { console.log("Hello from C"); }
}

const testNode = mergeWithStrategy("chain", BaseNode, BootstrapNode);

const m = new testNode();

m.create().then(async (node) => {
  console.log("✅ Node created:", node.libp2p.peerId.toString());
  // Use the node...
  //await node.stop();
  repeat(() => {
    getPeerDetails(node.libp2p)
  }, 3000)
});

function repeat(fn: () => void, delay: number) {
  function loop() {
    fn()
    setTimeout(loop, delay)
  }
  loop()
}

// Example usage:
