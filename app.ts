import { P2PNode } from '@yourorg/libp2p-sdk/P2PNode';

const main = async () => {
  const p2p = await P2PNode.create()
  console.log('Node is ready:', p2p.libp2p.peerId.toString())

  // Example: listen for peer discovery
  p2p.libp2p.addEventListener('peer:discovery', (evt) => {
    console.log('Discovered:', evt.detail.id.toString())
  })

  // Later, stop it
  // await p2p.stop()
}

main()
