import { createLibp2p, type Libp2p, type Libp2pOptions } from 'libp2p'
import { bootstrap } from '@libp2p/bootstrap'
import { pubsubPeerDiscovery } from "@libp2p/pubsub-peer-discovery";
import { gossipsub } from "@chainsafe/libp2p-gossipsub";
import { noise } from "@chainsafe/libp2p-noise";
import { yamux } from "@chainsafe/libp2p-yamux";
import { webSockets } from "@libp2p/websockets";
import { webTransport } from "@libp2p/webtransport";
import { webRTC } from "@libp2p/webrtc";
import { circuitRelayTransport} from "@libp2p/circuit-relay-v2";
import { getPeerDetails, bootstrapPeers } from "../../src/utils/peerUtils.js";

export class BootstrapNode {
    // a bootstrap node

    static RELAY_NODES = [
        '/dns6/14490944-bced-4f7a-90d0-5469826d6d01.pub.instances.scw.cloud/tcp/443/wss/p2p/12D3KooW9scFmH8UkU39qG5WKWY5WW3MRTERUqLPCoqLQ1oAPpS4'
    ]

    static BOOTSTRAP_NODES = [
        // a list of bootstrap peer multiaddrs to connect to on node startup
        '/ip4/104.131.131.82/tcp/4001/ipfs/QmaCpDMGvV2BGHeYERUEnRQAwe3N8SzbUtfsmvsqQLuvuJ',
        '/dnsaddr/bootstrap.libp2p.io/ipfs/QmNnooDu7bfjPFoTZYxMNLWUQJyrVwtbZg5gBMjTezGAJN',
        '/dnsaddr/bootstrap.libp2p.io/ipfs/QmQCU2EcMqAqQPR2i9bChDtGNJchTbq5TbXJJ16u19uLTa'
    ]
    libp2p: Libp2p;
    options: Libp2pOptions = {
            addresses: {
      listen: [
        // 👇 Required to create circuit relay reservations in order to hole punch browser-to-browser WebRTC connections
        "/p2p-circuit",
        // 👇 Listen for webRTC connection
        "/webrtc",
      ],
    },
    transports: [
      webSockets({
        // 允許所有WebSocket連接包括不帶TLS的
      }),
     
      // 👇 Required to create circuit relay reservations in order to hole punch browser-to-browser WebRTC connections
      // 添加@libp2p/circuit-relay-v2-transport支持
      circuitRelayTransport({
        discoverRelays: 1,
      }),
    ],
    connectionEncrypters: [noise()],
    streamMuxers: [yamux()],
    connectionGater: {
      // Allow private addresses for local testing
      denyDialMultiaddr: async () => false,
    },
        peerDiscovery: [
            bootstrap({
                list:
                    bootstrapPeers, // use the bootstrapPeers array defined in peerUtils.ts
            }),
            pubsubPeerDiscovery({
                interval: 10_000,
                topics: ['browser-peer-discovery'],
            })
        ],
        services: {
            pubsub: gossipsub({
                allowPublishToZeroPeers: true, // Example option
            }),
        }
    };

    constructor(public libp2p: Libp2p) {
        this.libp2p = libp2p;
    }
    async create(): Promise<BootstrapNode> {
        console.log('options', this.options)
        const libp2p: Libp2p = await createLibp2p(this.options)

        libp2p.addEventListener('peer:discovery', async (evt) => {
            console.log('🤴 Discovered peer:', evt.detail.id.toString()) // Emitted when a peer has been found
            const maddrs = evt.detail.multiaddrs.map((ma) =>
                ma.encapsulate(`/p2p/${evt.detail.id.toString()}`)
            );
            console.log(
                `Discovered new peer (${evt.detail.id.toString()}). Dialling:`,
                maddrs.map((ma) => ma.toString())
            );
            try {
                await libp2p.dial(maddrs); // dial the new peer
                console.log(`Successfully connected to peer: ${evt.detail.id.toString()}`);
            } catch (err) {
                // Silently handle connection failures - this is normal in P2P networks
                // Only log if it's an unexpected error type
                if (!err.message.includes('Could not connect')) {
                    console.warn(`Unexpected P2P error: ${err.message}`);
                }
            }
        });
        await libp2p.start()
        console.log('✅ Bootstrap Node libp2p started with id:', libp2p?.peerId.toString())
        return new BootstrapNode(libp2p)
    }

    async stop() {
        await this.libp2p.stop()
        console.log('🛑 libp2p stopped')
    }
}