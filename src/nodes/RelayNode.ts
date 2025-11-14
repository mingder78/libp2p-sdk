import { createLibp2p, type Libp2p, type Libp2pOptions } from 'libp2p'
import { identify } from '@libp2p/identify'
import { circuitRelayServer } from '@libp2p/circuit-relay-v2'
import { webSockets } from '@libp2p/websockets'
import { noise } from '@chainsafe/libp2p-noise'
import { yamux } from '@chainsafe/libp2p-yamux' 

export class RelayNode {
    libp2p: Libp2p;
    options: Libp2pOptions = {
        addresses: {
            listen: ['/ip4/127.0.0.1/tcp/0/ws']
            // TODO check "What is next?" section
        },
        connectionEncrypters: [
            noise()
        ],
        streamMuxers: [
            yamux()
        ],
        services: {
            identify: identify(),
            relay: circuitRelayServer({
                reservations: {  // Configures reservation limits (default: unlimited for testing)
                    maxReservations: 50,
                    maxReservationsPerPeer: 10,  // Limits reservations per peer
                    reservationDuration: 300000,
                    reservationTTL: 600000
                },
                connections: {  // Limits relayed connections
                    maxIncoming: 100,
                    maxOutgoing: 100,
                    maxPerPeer: 5
                },
                // ACL: undefined  // No ACL = accepts reservations from any peer (key for "true" reservations)
                // For production: ACL: { allow: ['QmSpecificPeerID'] } to restrict
                metrics: { enabled: true }  // Optional: Enable Prometheus metrics
            })
        }
    };

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
    async create(): Promise<RelayNode> {
        const libp2p: Libp2p = await createLibp2p(this.options)
        await libp2p.start()
        console.log('✅ Relay Node libp2p started with id:', libp2p.peerId.toString())
        return new RelayNode(libp2p);
    }

    async stop() {
        await this.libp2p.stop()
        console.log('🛑 libp2p stopped')
    }
}