// types.d.ts
import type { myCustomService } from './my-service.js'

declare module '@libp2p/interface' {
  interface ServiceMap {
    myCustom: Awaited<ReturnType<ReturnType<typeof myCustomService>>>
  }
}
