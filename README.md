# my-project (template) with lib typedoc

## example code

👉cat app.ts
```
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
```

## install
To install dependencies:

```bash
bun install
```

To run dev:

```bash
bun dev
```

This project was created using `bun init` in bun v1.2.20. [Bun](https://bun.com) is a fast all-in-one JavaScript runtime.

## run

```sh
👉$ link
👉$ link @yourorg/libp2p-sdk
```
👉$ dev
```
$ bun --watch ./app.ts
✅ libp2p started with id: 12D3KooWPVCCFnDnUScFRjLCZwmkcxk4nwT5AziMgrHP4MiyGHCT
Node is ready: 12D3KooWPVCCFnDnUScFRjLCZwmkcxk4nwT5AziMgrHP4MiyGHCT
Discovered: QmaCpDMGvV2BGHeYERUEnRQAwe3N8SzbUtfsmvsqQLuvuJ
Discovered: QmNnooDu7bfjPFoTZYxMNLWUQJyrVwtbZg5gBMjTezGAJN
Discovered: QmQCU2EcMqAqQPR2i9bChDtGNJchTbq5TbXJJ16u19uLTa
```
## vitest

👉$ run test
```sh
$ vitest

 DEV  v4.0.8 /private/tmp/my-libp2p-sdk

 ✓ test/scientific-calculator.test.ts (4 tests) 10ms
 ✓ test/calculator.test.ts (8 tests) 11ms
 ✓ test/sum.test.ts (1 test) 3ms

 Test Files  3 passed (3)
      Tests  13 passed (13)
   Start at  13:48:41
   Duration  899ms (transform 497ms, setup 0ms, collect 605ms, tests 25ms, environment 1ms, prepare 30ms)

 PASS  Waiting for file changes...
       press h to show help, press q to quit
```

## bun test

```
👉$
 test
bun test v1.2.20 (6ad208bc)

test/sum.test.ts:
✓ adds 1 + 2 to equal 3 [1.90ms]

test/scientific-calculator.test.ts:
✓ ScientificCalculator > inherits basic operations [0.90ms]
✓ ScientificCalculator > can calculate power and square root
✓ ScientificCalculator > throws error for invalid sqrt input [0.55ms]
✓ ScientificCalculator > overrides multiply with custom behavior [1.86ms]

test/calculator.test.ts:
✓ Calculator > should add numbers correctly
✓ Calculator > should subtract correctly
✓ Calculator > should multiply correctly
✓ Calculator > should divide correctly and handle decimals [0.10ms]
✓ Calculator > should throw error when dividing by zero
✓ Calculator > should record calculation history [1.19ms]
✓ Calculator > should support custom precision
✓ Calculator > should clear history properly

 13 pass
 0 fail
 27 expect() calls
Ran 13 tests across 3 files. [50.00ms]
```

## build typedoc and show docs

```sh
👉$ type-docs
// and
👉$ show-docs
```
## npm publish

👉$ npm publish --access public
```
> @yourorg/my-libp2p-sdk@0.0.2 prepublishOnly
> bun run build && bun type-docs

$ bun run build.mjs
$ typedoc
./src/modules/Peer.ts:7:3 - [warning] Encountered an unknown block tag @method

7     * @method addTodo {Function} - Adds new todo

./src/modules/Peer.ts:8:3 - [warning] Encountered an unknown block tag @method

8     * @method getTodos {Function} - Retrieves all todos

./src/modules/User.ts:7:3 - [warning] Encountered an unknown block tag @method

7     * @method addTodo {Function} - Adds new todo

./src/modules/User.ts:8:3 - [warning] Encountered an unknown block tag @method

8     * @method getTodos {Function} - Retrieves all todos

[warning] CalculationResult, defined in @yourorg/my-libp2p-sdk/types/calculator.d.ts, is referenced by calculator.Calculator.getHistory but not included in the documentation
[warning] CalculatorOptions, defined in @yourorg/my-libp2p-sdk/types/calculator.d.ts, is referenced by calculator.Calculator.constructor.options but not included in the documentation
[info] html generated at ./docs/api
[warning] Found 0 errors and 6 warnings
npm notice
npm notice 📦  @yourorg/my-libp2p-sdk@0.0.2
npm notice Tarball Contents
npm notice 2.7kB README.md
npm notice 1.3kB dist/index.d.ts
npm notice 1.2kB dist/index.js
npm notice 489B dist/modules/Todo.d.ts
npm notice 146B dist/modules/Todo.js
npm notice 833B dist/modules/User.d.ts
npm notice 145B dist/modules/User.js
npm notice 143B docs/api/.nojekyll
npm notice 221B docs/api/assets/hierarchy.js
npm notice 2.8kB docs/api/assets/highlight.css
npm notice 12.9kB docs/api/assets/icons.js
npm notice 12.3kB docs/api/assets/icons.svg
npm notice 51.3kB docs/api/assets/main.js
npm notice 426B docs/api/assets/navigation.js
npm notice 2.3kB docs/api/assets/search.js
npm notice 49.4kB docs/api/assets/style.css
npm notice 22.3kB docs/api/classes/calculator.Calculator.html
npm notice 17.3kB docs/api/classes/modules_Peer.default.html
npm notice 15.0kB docs/api/classes/modules_Todo.default.html
npm notice 17.3kB docs/api/classes/modules_User.default.html
npm notice 27.8kB docs/api/classes/scientific-calculator.ScientificCalculator.html
npm notice 6.5kB docs/api/functions/modules_utils.main.html
npm notice 6.2kB docs/api/functions/modules_utils.peerIdIs.html
npm notice 6.4kB docs/api/functions/modules_utils.sqrt.html
npm notice 6.4kB docs/api/functions/sum.sum.html
npm notice 5.3kB docs/api/hierarchy.html
npm notice 24.4kB docs/api/index.html
npm notice 10.9kB docs/api/modules.html
npm notice 6.5kB docs/api/modules/calculator.html
npm notice 7.3kB docs/api/modules/index.html
npm notice 6.5kB docs/api/modules/modules_Peer.html
npm notice 6.5kB docs/api/modules/modules_Todo.html
npm notice 6.5kB docs/api/modules/modules_User.html
npm notice 7.8kB docs/api/modules/modules_utils.html
npm notice 6.6kB docs/api/modules/scientific-calculator.html
npm notice 6.4kB docs/api/modules/sum.html
npm notice 1.3kB package.json
npm notice Tarball Details
npm notice name: @yourorg/my-libp2p-sdk
npm notice version: 0.0.2
npm notice filename: yourorg-my-libp2p-sdk-0.0.2.tgz
npm notice package size: 47.0 kB
npm notice unpacked size: 359.8 kB
npm notice shasum: 4b3e8d9a1e8877a10113896805bdb124bb86601b
npm notice integrity: sha512-bUe8m9fpuR6j3[...]la5lKHgdVBL0A==
npm notice total files: 37
npm notice
npm notice Publishing to https://registry.npmjs.org/ with tag latest and public access
npm error code EPRIVATE
npm error This package has been marked as private
npm error Remove the 'private' field from the package.json to publish it.
npm error A complete log of this run can be found in: /Users/ming2/.npm/_logs/2025-11-11T05_52_53_567Z-debug-0.log
```

