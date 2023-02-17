export default () => Object.assign(window.navigator, {
  clipboard: {
    writeText: () => Promise.resolve(undefined),
    readText: () => Promise.resolve('url'),
  },
});
