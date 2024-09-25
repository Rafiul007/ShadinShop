export const saveCartToLocalStorage = (cart) => {
      try {
        const serializedCart = JSON.stringify(cart);
        localStorage.setItem("cart", serializedCart);
      } catch (e) {
        console.error("Could not save cart to localStorage", e);
      }
    };
    
    export const loadCartFromLocalStorage = () => {
      try {
        const serializedCart = localStorage.getItem("cart");
        if (serializedCart === null) {
          return undefined;
        }
        return JSON.parse(serializedCart);
      } catch (e) {
        console.error("Could not load cart from localStorage", e);
        return undefined;
      }
    };