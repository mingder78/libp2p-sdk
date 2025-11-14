function repeat(fn: () => void, delay: number) {
  function loop() {
    fn()
    setTimeout(loop, delay)
  }
  loop()
}

export { repeat }