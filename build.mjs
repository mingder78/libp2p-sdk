import dts from 'bun-plugin-dts'

await Bun.build({
  entrypoints: ['./src/modules/User.ts', './src/modules/Todo.ts', './src/index.ts'],
  outdir: './dist',
  minify: true,
  plugins: [dts()]
})
