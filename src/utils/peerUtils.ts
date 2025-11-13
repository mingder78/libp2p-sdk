export const bootstrapPeers = [
  '/dns6/14490944-bced-4f7a-90d0-5469826d6d01.pub.instances.scw.cloud/tcp/443/wss/p2p/12D3KooW9scFmH8UkU39qG5WKWY5WW3MRTERUqLPCoqLQ1oAPpS4'
]

export function getPeerDetails(libp2p) {
  console.log("👥 Connected peers:")
  for (const connection of libp2p.getConnections()) {
    console.log(connection.remoteAddr.toString())
    // Logs the PeerId string and the observed remote multiaddr of each Connection
  }
}
