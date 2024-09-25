export const debounce = (func, delay) => {
      let debounceTimer;
      return (...args) => {
        if (debounceTimer) clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
          func(...args);
        }, delay);
      };
    };