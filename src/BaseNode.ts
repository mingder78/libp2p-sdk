import { createLibp2p, type Libp2p, type Libp2pOptions } from 'libp2p'
import { identify } from '@libp2p/identify'
import { ping } from '@libp2p/ping'
import { kadDHT } from '@libp2p/kad-dht'
import { bootstrap } from '@libp2p/bootstrap'
import { myCustomService } from './my-service.js'

export class BaseNode {
    static libp2p: Libp2p;
    static options: Libp2pOptions = {
            services: {
                identify: identify(),
                ping: ping(),
                dht: kadDHT() as any
            }
        }
    constructor(public libp2p: Libp2p) { 
        BaseNode.libp2p = libp2p;
    }

    // ✅ static async factory
    /**
    * Create a new libp2p peer with bootstrap nodes.
    * @param none
    * @returns {Promise<P2PNode>} A promise that resolves to a P2PNode instance.
    * @example
    * ```typescript
    * import { P2PNode } from '@yourorg/libp2p-sdk/P2PNode';
    *
    * const main = async () => {
    *  const p2p = await P2PNode.create()
    *  console.log('Node is ready:', p2p.libp2p.peerId.toString())
    * // Example: listen for peer discovery
    *  p2p.libp2p.addEventListener('peer:discovery', (evt) => {
    *  console.log('Discovered:', evt.detail.id.toString())
    *  })
    *
    *  // Later, stop it
    *  // await p2p.stop()
    * }
    * main()
    * ```
    **/
    static async create(): Promise<BaseNode> {
        const libp2p: Libp2p = await createLibp2p(this.options)
        await libp2p.start()
        console.log('✅ libp2p started with id:', libp2p.peerId.toString())
        return new BaseNode(libp2p)
    }

    async stop() {
        await this.libp2p.stop()
        console.log('🛑 libp2p stopped')
    }
}

// a bootstrap node

const BOOTSTRAP_NODES = [
    // a list of bootstrap peer multiaddrs to connect to on node startup
    '/ip4/104.131.131.82/tcp/4001/ipfs/QmaCpDMGvV2BGHeYERUEnRQAwe3N8SzbUtfsmvsqQLuvuJ',
    '/dnsaddr/bootstrap.libp2p.io/ipfs/QmNnooDu7bfjPFoTZYxMNLWUQJyrVwtbZg5gBMjTezGAJN',
    '/dnsaddr/bootstrap.libp2p.io/ipfs/QmQCU2EcMqAqQPR2i9bChDtGNJchTbq5TbXJJ16u19uLTa'
]