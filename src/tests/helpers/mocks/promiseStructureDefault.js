export default (mock) => Promise
  .resolve({
    ok: true,
    status: 200,
    json: () => Promise.resolve(mock),
  });
