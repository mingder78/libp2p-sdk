import { createLibp2p, type Libp2p, type Libp2pOptions } from 'libp2p'
import { identify } from '@libp2p/identify'
import { ping } from '@libp2p/ping'
import {
  WebRTC,
  WebSockets,
  WebSocketsSecure,
  WebTransport,
  Circuit,
  WebRTCDirect,
} from "@multiformats/multiaddr-matcher";

export class BaseNode {
    libp2p: Libp2p;
    options: Libp2pOptions = {
        services: {
            identify: identify(),
            ping: ping(),
        }
    }
    constructor(public libp2p: Libp2p) {
        this.libp2p = libp2p;
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
    async create(): Promise<BaseNode> {
        const libp2p: Libp2p = await createLibp2p(this.options)
        await libp2p.start()
        console.log('✅ Base Node libp2p started with id:', libp2p.peerId.toString())

        libp2p.addEventListener('self:peer:update', (event) => {
            // Update multiaddrs list, only show WebRTC addresses
            const multiaddrs = libp2p.getMultiaddrs()
                .filter(ma => WebRTC.matches(ma))
                .map((ma) => {
                    const el = document.createElement('li')
                    el.textContent = ma.toString()
                    return el
                })
            // document.getElementById('multiaddrs').replaceChildren(...multiaddrs)
            console.log(...multiaddrs)
        })
        libp2p.addEventListener('connection:open', (event) => {
            console.log('Peer multiple addrs:', libp2p.getMultiaddrs().map(a => a.toString()))
        })
        libp2p.addEventListener('connection:close', (event) => {
            console.log('connection closed:', event)
        })

        return new BaseNode(libp2p);
    }

    async stop() {
        await this.libp2p.stop()
        console.log('🛑 libp2p stopped')
    }
}