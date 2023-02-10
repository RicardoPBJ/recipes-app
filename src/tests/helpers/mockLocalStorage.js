export default localStorageMock = () => {
  let obj = {};

  return {
    getItem(key) {
      return obj[key] || null;
    },

    setItem(key, value) {
      obj[key] = value;
    },

    clear() {
      obj = {};
    },

    removeItem(key) {
      delete obj[key];
    },

    getAll() {
      return obj;
    },
  };
};
