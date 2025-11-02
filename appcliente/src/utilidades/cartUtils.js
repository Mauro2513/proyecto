export const calcularSubtotal = (cartItems, quantities) => {
    const subtotal = cartItems.reduce((acc, food) => acc + food.precio * quantities[food.id], 0);
    const shipping = subtotal === 0 ? 0.0 : 5000; // costo fijo de envio
    const tax = subtotal * 0.08; // 8% de impuesto
    const total = subtotal + shipping + tax;

    return { subtotal, shipping, tax, total };
}