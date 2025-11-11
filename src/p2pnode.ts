import { createLibp2p, type Libp2p } from 'libp2p'
import { bootstrap } from '@libp2p/bootstrap'

export class P2PNode {
    private constructor(public libp2p: Libp2p) { }

    // ✅ static async factory
    static async create(): Promise<P2PNode> {
        const libp2p: Libp2p = await createLibp2p({
            peerDiscovery: [
                bootstrap({
                    list: [
                        // a list of bootstrap peer multiaddrs to connect to on node startup
                        '/ip4/104.131.131.82/tcp/4001/ipfs/QmaCpDMGvV2BGHeYERUEnRQAwe3N8SzbUtfsmvsqQLuvuJ',
                        '/dnsaddr/bootstrap.libp2p.io/ipfs/QmNnooDu7bfjPFoTZYxMNLWUQJyrVwtbZg5gBMjTezGAJN',
                        '/dnsaddr/bootstrap.libp2p.io/ipfs/QmQCU2EcMqAqQPR2i9bChDtGNJchTbq5TbXJJ16u19uLTa'
                    ]
                })
            ]
        })
        console.log('✅ libp2p started with id:', libp2p.peerId.toString())
        return new P2PNode(libp2p)
    }

    async stop() {
        await this.libp2p.stop()
        console.log('🛑 libp2p stopped')
    }
}
