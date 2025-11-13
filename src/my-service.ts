// my-service.js
export function myCustomService() {
  return (components: any) => {
    // You get access to libp2p internals via `components`
    const { peerId, peerStore, events } = components

    // internal state
    let started = false

    const start = async () => {
      started = true
      console.log(`[my-service] started for peer: ${peerId.toString()}`)

      // listen to libp2p events (optional)
      events.addEventListener('peer:connect', (evt: any) => {
        console.log('[my-service] connected to', evt.detail)
      })
    }

    const stop = async () => {
      started = false
      console.log('[my-service] stopped')
    }

    // You can expose your own public API here
    const sayHello = async (peer: any) => {
      if (!started) throw new Error('my-service not started')
      console.log(`[💩 my-service] saying hello to ${peer.toString()}`)
      // you could send a message over a protocol here
    }

    // the returned object is the service API
    return { start, stop, sayHello }
  }
}
