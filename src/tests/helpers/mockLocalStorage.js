export default function localStorageMock() {
  let obj = {};

  return {
    getItem: (key) => obj[key] || null,

    setItem: (key, value) => {
      obj[key] = value;
    },

    clear: () => {
      obj = {};
    },

    removeItem: (key) => {
      delete obj[key];
    },

    getAll: () => obj,
  };
}
