import { useState } from "react";

//export const myVariable = 'Hello, world!';

export const CartState = () => {
  const [cartCount, updateCartCount] = useState(4);

  return [cartCount, updateCartCount];
};

