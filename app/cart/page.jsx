// app/cart/page.jsx
"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]); // raw localStorage rows: { id, qty, snapshotPrice? }
  const [products, setProducts] = useState([]);   // merged server product + qty + clientId + snapshotPrice
  const [refreshToggle, setRefreshToggle] = useState(false);

  // load cart from localStorage
  useEffect(() => {
    try {
      const items = JSON.parse(localStorage.getItem("cart") || "[]");
      setCartItems(Array.isArray(items) ? items : []);
    } catch (e) {
      setCartItems([]);
    }
  }, [refreshToggle]);

  // fetch product details and merge snapshotPrice from cart row
  useEffect(() => {
    let mounted = true;

    async function fetchProducts() {
      const details = await Promise.all(
        cartItems.map(async (row) => {
          try {
            const res = await fetch(`/api/products/${row.id}`);
            const data = res.ok ? await res.json() : null;
            return {
              ...(data || {}),
              qty: row.qty ?? 1,
              clientId: row.id,
              snapshotPrice: row.snapshotPrice, // may be undefined
            };
          } catch (err) {
            console.error("Error fetching product for cart row", row, err);
            return {
              id: row.id,
              name: "Unknown product",
              qty: row.qty ?? 1,
              clientId: row.id,
            };
          }
        })
      );

      if (!mounted) return;
      setProducts(details);

      console.log(
        "cart -> server mapping:",
        details.map((d) => ({
          clientId: d.clientId,
          id: d.id,
          name: d.name,
          price: d.price,
          discountedPrice: d.discountedPrice,
          snapshotPrice: d.snapshotPrice,
        }))
      );
    }

    if (cartItems.length > 0) fetchProducts();
    else setProducts([]);

    return () => {
      mounted = false;
    };
  }, [cartItems]);

  // update quantity (updates localStorage rows)
  const updateQuantity = (clientId, newQty) => {
    if (newQty < 1) return;
    const updated = cartItems.map((r) =>
      r.id === clientId ? { ...r, qty: newQty } : r
    );
    localStorage.setItem("cart", JSON.stringify(updated));
    setRefreshToggle((s) => !s);
  };

  // delete
  const deleteItem = (clientId) => {
    const updated = cartItems.filter((r) => r.id !== clientId);
    localStorage.setItem("cart", JSON.stringify(updated));
    setRefreshToggle((s) => !s);
  };

  // price helper: prefer snapshotPrice, then price, then discountedPrice
  const unitPriceFor = (product) =>
    product?.snapshotPrice ?? product?.price ?? product?.discountedPrice ?? 0;

  const total = products.reduce(
    (acc, p) => acc + unitPriceFor(p) * (p.qty ?? 1),
    0
  );

  return (
    <div className="min-h-screen bg-[#faf9f6] flex flex-col items-center py-6 px-3">
      <div className="w-full max-w-4xl bg-white rounded-xl border border-[#e5e7eb] shadow-sm p-4 sm:p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Product List */}
        <div className="md:col-span-2">
          <h1 className="text-2xl font-bold mb-4 text-[#1a1a2e]" style={{ fontFamily: "'Outfit', sans-serif" }}>
            Your Shopping Cart
          </h1>

          {products.length === 0 ? (
            <p className="text-[#6b7280]">Your cart is empty.</p>
          ) : (
            <ul>
              {products.map((product, idx) => {
                const key =
                  product.clientId ??
                  product.id ??
                  `${product?.name || "prod"}-${idx}`;
                const unit = unitPriceFor(product);

                return (
                  <li
                    key={key}
                    className="flex flex-col sm:flex-row sm:justify-between gap-4 border-b border-[#e5e7eb] py-4"
                  >
                    <div className="flex items-start gap-4">
                      <Image
                        src={product.images?.[0] || "/placeholder.jpg"}
                        alt={product.name || "Product image"}
                        width={80}
                        height={80}
                        className="rounded-lg border border-[#e5e7eb] object-cover"
                      />
                      <div>
                        <div className="text-base font-semibold text-[#1a1a2e]">
                          {product.name}
                        </div>
                        <div className="text-sm text-[#6b7280] mt-1">
                          {product.color
                            ? `Color: ${product.color}`
                            : "Color: N/A"}
                        </div>
                        <div className="text-base font-bold mt-2 text-[#c9a84c]">
                          ₹{unit.toLocaleString()}
                        </div>
                      </div>
                    </div>

                    {/* Quantity and Actions */}
                    <div className="flex items-center gap-2 sm:self-center sm:ml-auto">
                      <div
                        className="flex items-center border border-[#e5e7eb] rounded-lg overflow-hidden"
                      >
                        <button
                          aria-label="Decrease quantity"
                          onClick={() =>
                            updateQuantity(
                              product.clientId,
                              (product.qty ?? 1) - 1
                            )
                          }
                          disabled={(product.qty ?? 1) <= 1}
                          className="w-9 h-8 flex items-center justify-center text-[#9ca3af] font-bold text-xl border-none bg-white hover:text-[#1a1a2e] transition focus:outline-none"
                          style={{ borderRight: "1px solid #e5e7eb" }}
                        >
                          –
                        </button>
                        <span
                          className="w-8 h-8 flex items-center justify-center text-[#1a1a2e] font-bold text-base bg-white"
                          style={{ textAlign: "center" }}
                        >
                          {product.qty ?? 1}
                        </span>
                        <button
                          aria-label="Increase quantity"
                          onClick={() =>
                            updateQuantity(
                              product.clientId,
                              (product.qty ?? 1) + 1
                            )
                          }
                          className="w-9 h-8 flex items-center justify-center text-[#6b7280] font-bold text-xl border-none bg-white hover:text-[#1a1a2e] transition focus:outline-none"
                          style={{ borderLeft: "1px solid #e5e7eb" }}
                        >
                          +
                        </button>
                      </div>

                      <button
                        aria-label="Remove from cart"
                        onClick={() => deleteItem(product.clientId)}
                        className="ml-1 px-3 py-1.5 text-sm rounded-lg text-white bg-red-500 hover:bg-red-600 transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* Order Summary */}
        <div className="bg-[#faf9f6] rounded-xl p-6 flex flex-col justify-between h-full border border-[#e5e7eb]">
          <h2 className="text-lg font-bold mb-4 text-[#1a1a2e]" style={{ fontFamily: "'Outfit', sans-serif" }}>
            Order Summary
          </h2>
          <div className="flex justify-between text-[#4b5563] mb-2 text-sm">
            <span>Order Value</span>
            <span>₹{total.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-[#4b5563] mb-2 text-sm">
            <span>Shipping</span>
            <span className="text-green-600 font-semibold">Free</span>
          </div>
          <div className="border-t border-[#e5e7eb] pt-4 mt-4 flex justify-between font-bold text-lg text-[#1a1a2e]">
            <span>Grand Total</span>
            <span>₹{total.toLocaleString()}</span>
          </div>
          <Link
            href="/checkout"
            className="mt-8 w-full bg-[#1a1a2e] text-white py-3 text-base font-bold rounded-lg hover:bg-[#c9a84c] transition-all duration-300 text-center block"
          >
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}
















// // app/cart/page.jsx
// "use client";
// import { useEffect, useState } from "react";
// import Image from "next/image";
// import Link from "next/link";

// export default function CartPage() {
//   const [cartItems, setCartItems] = useState([]); // raw localStorage rows: { id, qty, snapshotPrice? }
//   const [products, setProducts] = useState([]); // merged server product + qty + clientId + snapshotPrice
//   const [refreshToggle, setRefreshToggle] = useState(false);

//   // load cart from localStorage
//   useEffect(() => {
//     try {
//       const items = JSON.parse(localStorage.getItem("cart") || "[]");
//       setCartItems(Array.isArray(items) ? items : []);
//     } catch (e) {
//       setCartItems([]);
//     }
//   }, [refreshToggle]);

//   // fetch product details and merge snapshotPrice from cart row
//   useEffect(() => {
//     let mounted = true;
//     async function fetchProducts() {
//       const details = await Promise.all(
//         cartItems.map(async (row) => {
//           try {
//             const res = await fetch(`/api/products/${row.id}`);
//             const data = res.ok ? await res.json() : null;
//             return {
//               ...(data || {}),
//               qty: row.qty ?? 1,
//               clientId: row.id,
//               snapshotPrice: row.snapshotPrice, // may be undefined
//             };
//           } catch (err) {
//             console.error("Error fetching product for cart row", row, err);
//             return { id: row.id, name: "Unknown product", qty: row.qty ?? 1, clientId: row.id };
//           }
//         })
//       );

//       if (!mounted) return;
//       setProducts(details);

//       // debug log mapping
//       console.log("cart -> server mapping:", details.map(d => ({ clientId: d.clientId, id: d.id, name: d.name, price: d.price, discountedPrice: d.discountedPrice, snapshotPrice: d.snapshotPrice })));
//     }

//     if (cartItems.length > 0) fetchProducts();
//     else setProducts([]);

//     return () => { mounted = false; };
//   }, [cartItems]);

//   // update quantity (updates localStorage rows)
//   const updateQuantity = (clientId, newQty) => {
//     if (newQty < 1) return;
//     const updated = cartItems.map((r) => (r.id === clientId ? { ...r, qty: newQty } : r));
//     localStorage.setItem("cart", JSON.stringify(updated));
//     setRefreshToggle((s) => !s);
//   };

//   // delete
//   const deleteItem = (clientId) => {
//     const updated = cartItems.filter((r) => r.id !== clientId);
//     localStorage.setItem("cart", JSON.stringify(updated));
//     setRefreshToggle((s) => !s);
//   };

//   // price helper: prefer snapshotPrice, then price, then discountedPrice
//   const unitPriceFor = (product) => (product?.snapshotPrice ?? product?.price ?? product?.discountedPrice ?? 0);

//   const total = products.reduce((acc, p) => acc + unitPriceFor(p) * (p.qty ?? 1), 0);

//   return (
//     <div className="min-h-screen bg-gray-50 flex flex-col items-center py-6 px-3">
//     <div className="w-full max-w-4xl bg-white rounded-xl shadow-xl p-4 sm:p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-6"></div>
    
//         {/* Product List */}
//         <div className="md:col-span-2">
//           <h1 className="text-2xl font-bold mb-4 text-gray-900">
//             Your Shopping Cart
//           </h1>

//           {products.length === 0 ? (
//             <p className="text-gray-600">Your cart is empty.</p>
//           ) : (
//             <ul>
//               {products.map((product, idx) => {
//                 const key = product.clientId ?? product.id ?? `${product?.name || "prod"}-${idx}`;
//                 const unit = unitPriceFor(product);
//                 return (
//                   <li key={key} className="flex justify-between items-center border-b py-6">
//                     <div className="flex items-center gap-4">
//                       <Image
//                         src={product.images?.[0] || "/placeholder.jpg"}
//                         alt={product.name || "Product image"}
//                         width={80}
//                         height={80}
//                         className="rounded-lg border"
//                       />
//                       <div>
//                         <div className="text-lg font-semibold text-gray-900">
//                           {product.name}
//                         </div>
//                         <div className="text-sm text-gray-600 mt-1">
//                           {product.color ? `Color: ${product.color}` : "Color: N/A"}
//                         </div>
//                         <div className="text-md font-bold mt-2 text-[#b89f56]">
//                           ₹{unit.toLocaleString()}
//                         </div>
//                       </div>
//                     </div>

//                     {/* Quantity and Actions */}
//                     <div className="flex items-center gap-2">
//                       <div
//                         className="flex items-center"
//                         style={{
//                           border: "1px solid #e5e7eb",
//                           borderRadius: "6px",
//                           background: "#fff",
//                           overflow: "hidden",
//                         }}
//                       >
//                         <button
//                           aria-label="Decrease quantity"
//                           onClick={() => updateQuantity(product.clientId, (product.qty ?? 1) - 1)}
//                           disabled={(product.qty ?? 1) <= 1}
//                           className="w-9 h-8 flex items-center justify-center text-gray-400 font-bold text-xl border-none bg-white hover:text-black transition focus:outline-none"
//                           style={{ borderRight: "1px solid #e5e7eb" }}
//                         >
//                           –
//                         </button>
//                         <span
//                           className="w-8 h-8 flex items-center justify-center text-gray-900 font-bold text-base bg-white"
//                           style={{ textAlign: "center" }}
//                         >
//                           {product.qty ?? 1}
//                         </span>
//                         <button
//                           aria-label="Increase quantity"
//                           onClick={() => updateQuantity(product.clientId, (product.qty ?? 1) + 1)}
//                           className="w-9 h-8 flex items-center justify-center text-gray-600 font-bold text-xl border-none bg-white hover:text-black transition focus:outline-none"
//                           style={{ borderLeft: "1px solid #e5e7eb" }}
//                         >
//                           +
//                         </button>
//                       </div>

//                       <button
//                         aria-label="Remove from cart"
//                         onClick={() => deleteItem(product.clientId)}
//                         className="ml-3 px-2 py-1 text-sm rounded text-white bg-red-500 hover:bg-red-700"
//                       >
//                         Remove
//                       </button>
//                     </div>
//                   </li>
//                 );
//               })}
//             </ul>
//           )}
//         </div>

//         {/* Order Summary */}
//         <div className="bg-gray-100 rounded-lg p-6 flex flex-col justify-between h-full">
//           <h2 className="text-xl font-bold mb-4 text-gray-800">Order Summary</h2>
//           <div className="flex justify-between text-gray-700 mb-2">
//             <span>Order Value</span>
//             <span>₹{total.toLocaleString()}</span>
//           </div>
//           <div className="flex justify-between text-gray-700 mb-2">
//             <span>Shipping</span>
//             <span className="text-green-600 font-semibold">Free</span>
//           </div>
//           <div className="border-t pt-4 mt-4 flex justify-between font-bold text-lg text-black">
//             <span>Grand Total</span>
//             <span>₹{total.toLocaleString()}</span>
//           </div>
//           <Link
//             href="/checkout"
//             className="mt-8 w-full bg-[#23221d] text-white py-3 text-lg font-bold rounded-lg hover:bg-[#b89f56] hover:text-black transition text-center"
//           >
//             Proceed to Checkout
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }










// // "use client";
// // import { useEffect, useState } from "react";
// // import Image from "next/image";
// // import Link from "next/link";

// // export default function CartPage() {
// //   const [cartItems, setCartItems] = useState([]);
// //   const [products, setProducts] = useState([]);
// //   const [refresh, setRefresh] = useState(false);

// //   // load cart from localStorage (cart items shape: [{ id: "<client id>", qty: 1 }, ...])
// //   useEffect(() => {
// //     try {
// //       const items = JSON.parse(localStorage.getItem("cart") || "[]");
// //       setCartItems(Array.isArray(items) ? items : []);
// //     } catch (e) {
// //       setCartItems([]);
// //     }
// //   }, [refresh]);

// //   // Fetch product details for each cart item and attach a stable clientId
// //   useEffect(() => {
// //     async function fetchProducts() {
// //       const details = await Promise.all(
// //         cartItems.map(async (item) => {
// //           // item.id is the client-side id stored in localStorage for this cart row
// //           const res = await fetch(`/api/products/${item.id}`);
// //           const data = await res.json();

// //           // keep a stable clientId referencing the localStorage row
// //           return {
// //             // copy server-side fields (name, images, price, discountedPrice, id)
// //             ...(data || {}),
// //             qty: item.qty ?? 1,
// //             clientId: item.id, // use this to update/delete the correct localStorage item
// //           };
// //         })
// //       );
// //       setProducts(details);
// //     }

// //     if (cartItems.length > 0) fetchProducts();
// //     else setProducts([]);
// //   }, [cartItems]);

// //   // Update quantity by clientId (matches localStorage rows)
// //   const updateQuantity = (clientId, newQty) => {
// //     if (newQty < 1) return;
// //     const updated = cartItems.map((item) =>
// //       item.id === clientId ? { ...item, qty: newQty } : item
// //     );
// //     localStorage.setItem("cart", JSON.stringify(updated));
// //     setRefresh((r) => !r);
// //   };

// //   // Delete by clientId
// //   const deleteItem = (clientId) => {
// //     const updated = cartItems.filter((item) => item.id !== clientId);
// //     localStorage.setItem("cart", JSON.stringify(updated));
// //     setRefresh((r) => !r);
// //   };

// //   // Use original price (product.price) if present; fall back to discountedPrice otherwise
// //   const unitPriceFor = (product) =>
// //     (product?.price ?? product?.discountedPrice ?? 0);

// //   // Total (sum of unitPrice * qty)
// //   const total = products.reduce(
// //     (acc, p) => acc + unitPriceFor(p) * (p.qty ?? 1),
// //     0
// //   );

// //   return (
// //     <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-10 px-4">
// //       <div className="max-w-4xl w-full bg-white rounded-xl shadow-xl p-8 grid md:grid-cols-3 gap-8">
// //         {/* Product List */}
// //         <div className="md:col-span-2">
// //           <h1 className="text-2xl font-bold mb-4 text-gray-900">
// //             Your Shopping Cart
// //           </h1>

// //           {products.length === 0 ? (
// //             <p className="text-gray-600">Your cart is empty.</p>
// //           ) : (
// //             <ul>
// //               {products.map((product, idx) => {
// //                 const key =
// //                   product?.clientId ?? product?.id ?? `${product?.name || "prod"}-${idx}`;

// //                 const unit = unitPriceFor(product);
// //                 return (
// //                   <li key={key} className="flex justify-between items-center border-b py-6">
// //                     <div className="flex items-center gap-4">
// //                       <Image
// //                         src={product.images?.[0] || "/placeholder.jpg"}
// //                         alt={product.name || "Product image"}
// //                         width={80}
// //                         height={80}
// //                         className="rounded-lg border"
// //                       />
// //                       <div>
// //                         <div className="text-lg font-semibold text-gray-900">
// //                           {product.name}
// //                         </div>
// //                         <div className="text-sm text-gray-600 mt-1">
// //                           {product.color ? `Color: ${product.color}` : "Color: N/A"}
// //                         </div>
// //                         <div className="text-md font-bold mt-2 text-[#b89f56]">
// //                           ₹{unit.toLocaleString()}
// //                         </div>
// //                       </div>
// //                     </div>

// //                     {/* Quantity and Actions */}
// //                     <div className="flex items-center gap-2">
// //                       <div
// //                         className="flex items-center"
// //                         style={{
// //                           border: "1px solid #e5e7eb",
// //                           borderRadius: "6px",
// //                           background: "#fff",
// //                           overflow: "hidden",
// //                         }}
// //                       >
// //                         <button
// //                           aria-label="Decrease quantity"
// //                           onClick={() =>
// //                             updateQuantity(product.clientId, (product.qty ?? 1) - 1)
// //                           }
// //                           disabled={(product.qty ?? 1) <= 1}
// //                           className="w-9 h-8 flex items-center justify-center text-gray-400 font-bold text-xl border-none bg-white hover:text-black transition focus:outline-none"
// //                           style={{ borderRight: "1px solid #e5e7eb" }}
// //                         >
// //                           –
// //                         </button>
// //                         <span
// //                           className="w-8 h-8 flex items-center justify-center text-gray-900 font-bold text-base bg-white"
// //                           style={{ textAlign: "center" }}
// //                         >
// //                           {product.qty ?? 1}
// //                         </span>
// //                         <button
// //                           aria-label="Increase quantity"
// //                           onClick={() =>
// //                             updateQuantity(product.clientId, (product.qty ?? 1) + 1)
// //                           }
// //                           className="w-9 h-8 flex items-center justify-center text-gray-600 font-bold text-xl border-none bg-white hover:text-black transition focus:outline-none"
// //                           style={{ borderLeft: "1px solid #e5e7eb" }}
// //                         >
// //                           +
// //                         </button>
// //                       </div>

// //                       <button
// //                         aria-label="Remove from cart"
// //                         onClick={() => deleteItem(product.clientId)}
// //                         className="ml-3 px-2 py-1 text-sm rounded text-white bg-red-500 hover:bg-red-700"
// //                       >
// //                         Remove
// //                       </button>
// //                     </div>
// //                   </li>
// //                 );
// //               })}
// //             </ul>
// //           )}
// //         </div>

// //         {/* Order Summary */}
// //         <div className="bg-gray-100 rounded-lg p-6 flex flex-col justify-between h-full">
// //           <h2 className="text-xl font-bold mb-4 text-gray-800">Order Summary</h2>
// //           <div className="flex justify-between text-gray-700 mb-2">
// //             <span>Order Value</span>
// //             <span>₹{total.toLocaleString()}</span>
// //           </div>
// //           <div className="flex justify-between text-gray-700 mb-2">
// //             <span>Shipping</span>
// //             <span className="text-green-600 font-semibold">Free</span>
// //           </div>
// //           <div className="border-t pt-4 mt-4 flex justify-between font-bold text-lg text-black">
// //             <span>Grand Total</span>
// //             <span>₹{total.toLocaleString()}</span>
// //           </div>
// //           <Link
// //             href="/checkout"
// //             className="mt-8 w-full bg-[#23221d] text-white py-3 text-lg font-bold rounded-lg hover:bg-[#b89f56] hover:text-black transition text-center"
// //           >
// //             Proceed to Checkout
// //           </Link>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }






















// // // "use client";
// // // import { useEffect, useState } from "react";
// // // import Image from "next/image";
// // // import Link from "next/link";

// // // export default function CartPage() {
// // //   const [cartItems, setCartItems] = useState([]);
// // //   const [products, setProducts] = useState([]);
// // //   const [refresh, setRefresh] = useState(false);

// // //   useEffect(() => {
// // //     const items = JSON.parse(localStorage.getItem("cart") || "[]");
// // //     setCartItems(items);
// // //   }, [refresh]);

// // //   useEffect(() => {
// // //     async function fetchProducts() {
// // //       const details = await Promise.all(
// // //         cartItems.map(async (item) => {
// // //           const res = await fetch(`/api/products/${item.id}`);
// // //           const data = await res.json();
// // //           // Always use item.qty!
// // //           return { ...data, qty: item.qty, _clientId: item.id || data.id };
// // //         })
// // //       );
// // //       setProducts(details);
// // //     }
// // //     if (cartItems.length > 0) fetchProducts();
// // //     else setProducts([]);
// // //   }, [cartItems]);

// // //   // Update quantity and re-render
// // //   const updateQuantity = (idOrClientId, newQty) => {
// // //     if (newQty < 1) return;
// // //     const updated = cartItems.map((item) =>
// // //       (item.id === idOrClientId || item.id === (idOrClientId?._clientId))
// // //         ? { ...item, qty: newQty }
// // //         : item
// // //     );
// // //     localStorage.setItem("cart", JSON.stringify(updated));
// // //     setRefresh((r) => !r);
// // //   };

// // //   const deleteItem = (id) => {
// // //     const updated = cartItems.filter((item) => item.id !== id);
// // //     localStorage.setItem("cart", JSON.stringify(updated));
// // //     setRefresh((r) => !r);
// // //   };

// // //   // Always use original price
// // //   const total = products.reduce(
// // //     (acc, p) => acc + (p.price || 0) * (p.qty || 1),
// // //     0
// // //   );

// // //   return (
// // //     <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-10 px-4">
// // //       <div className="max-w-4xl w-full bg-white rounded-xl shadow-xl p-8 grid md:grid-cols-3 gap-8">
// // //         {/* Product List */}
// // //         <div className="md:col-span-2">
// // //           <h1 className="text-2xl font-bold mb-4 text-gray-900">
// // //             Your Shopping Cart
// // //           </h1>
// // //           {products.length === 0 ? (
// // //             <p className="text-gray-600">Your cart is empty.</p>
// // //           ) : (
// // //             <ul>
// // //               {products.map((product, idx) => {
// // //                 const key =
// // //                   (product && product.id) ? product.id : `${product?.name || 'prod'}-${idx}`;

// // //                 return (
// // //                   <li
// // //                     key={key}
// // //                     className="flex justify-between items-center border-b py-6"
// // //                   >
// // //                     <div className="flex items-center gap-4">
// // //                       <Image
// // //                         src={product.images?.[0] || "/placeholder.jpg"}
// // //                         alt={product.name || "Product image"}
// // //                         width={80}
// // //                         height={80}
// // //                         className="rounded-lg border"
// // //                       />
// // //                       <div>
// // //                         <div className="text-lg font-semibold text-gray-900">
// // //                           {product.name}
// // //                         </div>
// // //                         <div className="text-sm text-gray-600 mt-1">
// // //                           {product.color || "Color: N/A"}
// // //                         </div>
// // //                         {/* Show original price only */}
// // //                         <div className="text-md font-bold mt-2 text-[#b89f56]">
// // //                           ₹{(product.price ?? 0).toLocaleString()}
// // //                         </div>
// // //                       </div>
// // //                     </div>
// // //                     {/* Quantity Stepper Control */}
// // //                     <div className="flex items-center gap-2">
// // //                       <div
// // //                         className="flex items-center"
// // //                         style={{
// // //                           border: "1px solid #e5e7eb",
// // //                           borderRadius: "6px",
// // //                           background: "#fff",
// // //                           overflow: "hidden",
// // //                         }}
// // //                       >
// // //                         <button
// // //                           aria-label="Decrease quantity"
// // //                           onClick={() =>
// // //                             updateQuantity(
// // //                               product.id ?? product._clientId ?? `${key}`,
// // //                               product.qty - 1
// // //                             )
// // //                           }
// // //                           disabled={product.qty <= 1}
// // //                           className="w-9 h-8 flex items-center justify-center text-gray-400 font-bold text-xl border-none bg-white hover:text-black transition focus:outline-none"
// // //                           style={{ borderRight: "1px solid #e5e7eb" }}
// // //                         >
// // //                           –
// // //                         </button>
// // //                         <span
// // //                           className="w-8 h-8 flex items-center justify-center text-gray-900 font-bold text-base bg-white"
// // //                           style={{ textAlign: "center" }}
// // //                         >
// // //                           {product.qty}
// // //                         </span>
// // //                         <button
// // //                           aria-label="Increase quantity"
// // //                           onClick={() =>
// // //                             updateQuantity(
// // //                               product.id ?? product._clientId ?? `${key}`,
// // //                               product.qty + 1
// // //                             )
// // //                           }
// // //                           className="w-9 h-8 flex items-center justify-center text-gray-600 font-bold text-xl border-none bg-white hover:text-black transition focus:outline-none"
// // //                           style={{ borderLeft: "1px solid #e5e7eb" }}
// // //                         >
// // //                           +
// // //                         </button>
// // //                       </div>
// // //                       <button
// // //                         aria-label="Remove from cart"
// // //                         onClick={() => deleteItem(product.id ?? product._clientId ?? `${key}`)}
// // //                         className="ml-3 px-2 py-1 text-sm rounded text-white bg-red-500 hover:bg-red-700"
// // //                       >
// // //                         Remove
// // //                       </button>
// // //                     </div>
// // //                   </li>
// // //                 );
// // //               })}
// // //             </ul>
// // //           )}
// // //         </div>

// // //         {/* Order Summary */}
// // //         <div className="bg-gray-100 rounded-lg p-6 flex flex-col justify-between h-full">
// // //           <h2 className="text-xl font-bold mb-4 text-gray-800">Order Summary</h2>
// // //           <div className="flex justify-between text-gray-700 mb-2">
// // //             <span>Order Value</span>
// // //             <span>₹{total.toLocaleString()}</span>
// // //           </div>
// // //           <div className="flex justify-between text-gray-700 mb-2">
// // //             <span>Shipping</span>
// // //             <span className="text-green-600 font-semibold">Free</span>
// // //           </div>
// // //           <div className="border-t pt-4 mt-4 flex justify-between font-bold text-lg text-black">
// // //             <span>Grand Total</span>
// // //             <span>₹{total.toLocaleString()}</span>
// // //           </div>
// // //           <Link
// // //             href="/checkout"
// // //             className="mt-8 w-full bg-[#23221d] text-white py-3 text-lg font-bold rounded-lg hover:bg-[#b89f56] hover:text-black transition text-center"
// // //           >
// // //             Proceed to Checkout
// // //           </Link>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // }



// // // // "use client";
// // // // import { useEffect, useState } from "react";
// // // // import Image from "next/image";
// // // // import Link from "next/link";

// // // // export default function CartPage() {
// // // //   const [cartItems, setCartItems] = useState([]);
// // // //   const [products, setProducts] = useState([]);

// // // //   // Re-render after quantity changes
// // // //   const [refresh, setRefresh] = useState(false);

// // // //   useEffect(() => {
// // // //     const items = JSON.parse(localStorage.getItem("cart") || "[]");
// // // //     setCartItems(items);
// // // //   }, [refresh]);

// // // //   useEffect(() => {
// // // //     async function fetchProducts() {
// // // //       const details = await Promise.all(
// // // //         cartItems.map(async (item) => {
// // // //           const res = await fetch(`/api/products/${item.id}`);
// // // //           const data = await res.json();
// // // //           // ensure we always have an id (use item.id as fallback)
// // // //           return { ...data, qty: item.qty, _clientId: item.id || data.id };
// // // //         })
// // // //       );
// // // //       setProducts(details);
// // // //     }
// // // //     if (cartItems.length > 0) fetchProducts();
// // // //     else setProducts([]);
// // // //   }, [cartItems]);

// // // //   // Update quantity and re-render
// // // //   const updateQuantity = (idOrClientId, newQty) => {
// // // //     if (newQty < 1) return;
// // // //     // update based on cartItems stored id
// // // //     const updated = cartItems.map((item) =>
// // // //       (item.id === idOrClientId || item.id === (idOrClientId?._clientId)) // defensive
// // // //         ? { ...item, qty: newQty }
// // // //         : item
// // // //     );
// // // //     localStorage.setItem("cart", JSON.stringify(updated));
// // // //     setRefresh((r) => !r);
// // // //   };

// // // //   const deleteItem = (id) => {
// // // //   const updated = cartItems.filter((item) => item.id !== id);
// // // //   localStorage.setItem("cart", JSON.stringify(updated));
// // // //   setRefresh((r) => !r); // Trigger UI refresh
// // // // };


// // // //   // Only use product.price for totals
// // // //   const total = products.reduce(
// // // //     (acc, p) => acc + (p.price || 0) * (p.qty || 1),
// // // //     0
// // // //   );

// // // //   return (
// // // //     <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-10 px-4">
// // // //       <div className="max-w-4xl w-full bg-white rounded-xl shadow-xl p-8 grid md:grid-cols-3 gap-8">
// // // //         {/* Product List */}
// // // //         <div className="md:col-span-2">
// // // //           <h1 className="text-2xl font-bold mb-4 text-gray-900">
// // // //             Your Shopping Cart
// // // //           </h1>
// // // //           {products.length === 0 ? (
// // // //             <p className="text-gray-600">Your cart is empty.</p>
// // // //           ) : (
// // // //             <ul>
// // // //               {products.map((product, idx) => {
// // // //                 // create a guaranteed-unique key:
// // // //                 const key =
// // // //                   (product && product.id) ? product.id : `${product?.name || 'prod'}-${idx}`;

// // // //                 return (
// // // //                   <li
// // // //                     key={key}
// // // //                     className="flex justify-between items-center border-b py-6"
// // // //                   >
// // // //                     <div className="flex items-center gap-4">
// // // //                       <Image
// // // //                         src={product.images?.[0] || "/placeholder.jpg"}
// // // //                         alt={product.name || "Product image"}
// // // //                         width={80}
// // // //                         height={80}
// // // //                         className="rounded-lg border"
// // // //                       />
// // // //                       <div>
// // // //                         <div className="text-lg font-semibold text-gray-900">
// // // //                           {product.name}
// // // //                         </div>
// // // //                         <div className="text-sm text-gray-600 mt-1">
// // // //                           {product.color || "Color: N/A"}
// // // //                         </div>
// // // //                         <div className="text-md font-bold mt-2 text-[#b89f56]">
// // // //                           ₹{(product.price ?? 0).toLocaleString()}
// // // //                         </div>
// // // //                       </div>
// // // //                     </div>
// // // //                     {/* Quantity Stepper Control */}
// // // //                     <div className="flex items-center gap-2">
// // // //   <div
// // // //     className="flex items-center"
// // // //     style={{
// // // //       border: "1px solid #e5e7eb",
// // // //       borderRadius: "6px",
// // // //       background: "#fff",
// // // //       overflow: "hidden",
// // // //     }}
// // // //   >
// // // //     <button
// // // //       aria-label="Decrease quantity"
// // // //       onClick={() =>
// // // //         updateQuantity(
// // // //           product.id ?? product._clientId ?? `${key}`,
// // // //           product.qty - 1
// // // //         )
// // // //       }
// // // //       disabled={product.qty <= 1}
// // // //       className="w-9 h-8 flex items-center justify-center text-gray-400 font-bold text-xl border-none bg-white hover:text-black transition focus:outline-none"
// // // //       style={{ borderRight: "1px solid #e5e7eb" }}
// // // //     >
// // // //       –
// // // //     </button>
// // // //     <span
// // // //       className="w-8 h-8 flex items-center justify-center text-gray-900 font-bold text-base bg-white"
// // // //       style={{ textAlign: "center" }}
// // // //     >
// // // //       {product.qty}
// // // //     </span>
// // // //     <button
// // // //       aria-label="Increase quantity"
// // // //       onClick={() =>
// // // //         updateQuantity(
// // // //           product.id ?? product._clientId ?? `${key}`,
// // // //           product.qty + 1
// // // //         )
// // // //       }
// // // //       className="w-9 h-8 flex items-center justify-center text-gray-600 font-bold text-xl border-none bg-white hover:text-black transition focus:outline-none"
// // // //       style={{ borderLeft: "1px solid #e5e7eb" }}
// // // //     >
// // // //       +
// // // //     </button>
// // // //   </div>
// // // //   <button
// // // //     aria-label="Remove from cart"
// // // //     onClick={() => deleteItem(product.id ?? product._clientId ?? `${key}`)}
// // // //     className="ml-3 px-2 py-1 text-sm rounded text-white bg-red-500 hover:bg-red-700"
// // // //   >
// // // //     Remove
// // // //   </button>
// // // // </div>

// // // //                     {/* <div>
// // // //                       <div
// // // //                         className="flex items-center"
// // // //                         style={{
// // // //                           border: "1px solid #e5e7eb",
// // // //                           borderRadius: "6px",
// // // //                           background: "#fff",
// // // //                           overflow: "hidden",
// // // //                         }}
// // // //                       >
// // // //                         <button
// // // //                           aria-label="Decrease quantity"
// // // //                           onClick={() =>
// // // //                             updateQuantity(product.id ?? product._clientId ?? `${key}`, product.qty - 1)
// // // //                           }
// // // //                           disabled={product.qty <= 1}
// // // //                           className="w-9 h-8 flex items-center justify-center text-gray-400 font-bold text-xl border-none bg-white hover:text-black transition focus:outline-none"
// // // //                           style={{ borderRight: "1px solid #e5e7eb" }}
// // // //                         >
// // // //                           –
// // // //                         </button>
// // // //                         <span
// // // //                           className="w-8 h-8 flex items-center justify-center text-gray-900 font-bold text-base bg-white"
// // // //                           style={{ textAlign: "center" }}
// // // //                         >
// // // //                           {product.qty}
// // // //                         </span>
// // // //                         <button
// // // //                           aria-label="Increase quantity"
// // // //                           onClick={() =>
// // // //                             updateQuantity(product.id ?? product._clientId ?? `${key}`, product.qty + 1)
// // // //                           }
// // // //                           className="w-9 h-8 flex items-center justify-center text-gray-600 font-bold text-xl border-none bg-white hover:text-black transition focus:outline-none"
// // // //                           style={{ borderLeft: "1px solid #e5e7eb" }}
// // // //                         >
// // // //                           +
// // // //                         </button>
// // // //                       </div>
// // // //                     </div> */}
// // // //                   </li>
// // // //                 );
// // // //               })}
// // // //             </ul>
// // // //           )}
// // // //         </div>

// // // //         {/* Order Summary */}
// // // //         <div className="bg-gray-100 rounded-lg p-6 flex flex-col justify-between h-full">
// // // //           <h2 className="text-xl font-bold mb-4 text-gray-800">Order Summary</h2>
// // // //           <div className="flex justify-between text-gray-700 mb-2">
// // // //             <span>Order Value</span>
// // // //             <span>₹{total.toLocaleString()}</span>
// // // //           </div>
// // // //           <div className="flex justify-between text-gray-700 mb-2">
// // // //             <span>Shipping</span>
// // // //             <span className="text-green-600 font-semibold">Free</span>
// // // //           </div>
// // // //           <div className="border-t pt-4 mt-4 flex justify-between font-bold text-lg text-black">
// // // //             <span>Grand Total</span>
// // // //             <span>₹{total.toLocaleString()}</span>
// // // //           </div>
// // // //           <Link
// // // //             href="/checkout"
// // // //             className="mt-8 w-full bg-[#23221d] text-white py-3 text-lg font-bold rounded-lg hover:bg-[#b89f56] hover:text-black transition text-center"
// // // //           >
// // // //             Proceed to Checkout
// // // //           </Link>
// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }




// // // // "use client";
// // // // import { useEffect, useState } from "react";
// // // // import Image from "next/image";
// // // // import Link from "next/link";

// // // // export default function CartPage() {
// // // //   const [cartItems, setCartItems] = useState([]);
// // // //   const [products, setProducts] = useState([]);

// // // //   // Re-render after quantity changes
// // // //   const [refresh, setRefresh] = useState(false);

// // // //   useEffect(() => {
// // // //     const items = JSON.parse(localStorage.getItem("cart") || "[]");
// // // //     setCartItems(items);
// // // //   }, [refresh]);

// // // //   useEffect(() => {
// // // //     async function fetchProducts() {
// // // //       const details = await Promise.all(
// // // //         cartItems.map(async (item) => {
// // // //           const res = await fetch(`/api/products/${item.id}`);
// // // //           const data = await res.json();
// // // //           return { ...data, qty: item.qty };
// // // //         })
// // // //       );
// // // //       setProducts(details);
// // // //     }
// // // //     if (cartItems.length > 0) fetchProducts();
// // // //     else setProducts([]);
// // // //   }, [cartItems]);

// // // //   // Update quantity and re-render
// // // //   const updateQuantity = (id, newQty) => {
// // // //     if (newQty < 1) return;
// // // //     const updated = cartItems.map((item) =>
// // // //       item.id === id ? { ...item, qty: newQty } : item
// // // //     );
// // // //     localStorage.setItem("cart", JSON.stringify(updated));
// // // //     setRefresh((r) => !r);
// // // //   };

// // // //   const total = products.reduce(
// // // //     (acc, p) => acc + (p.discountedPrice || p.price) * p.qty,
// // // //     0
// // // //   );

// // // //   return (
// // // //     <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-10 px-4">
// // // //       <div className="max-w-4xl w-full bg-white rounded-xl shadow-xl p-8 grid md:grid-cols-3 gap-8">
// // // //         {/* Product List */}
// // // //         <div className="md:col-span-2">
// // // //           <h1 className="text-2xl font-bold mb-4 text-gray-900">
// // // //             Your Shopping Cart
// // // //           </h1>
// // // //           {products.length === 0 ? (
// // // //             <p className="text-gray-600">Your cart is empty.</p>
// // // //           ) : (
// // // //             <ul>
// // // //               {products.map((product, idx) => (
// // // //                 <li
// // // //                   key={product.id}
// // // //                   className="flex justify-between items-center border-b py-6"
// // // //                 >
// // // //                   <div className="flex items-center gap-4">
// // // //                     <Image
// // // //                       src={product.images?.[0] || "/placeholder.jpg"}
// // // //                       alt={product.name}
// // // //                       width={80}
// // // //                       height={80}
// // // //                       className="rounded-lg border"
// // // //                     />
// // // //                     <div>
// // // //                       <div className="text-lg font-semibold text-gray-900">
// // // //                         {product.name}
// // // //                       </div>
// // // //                       <div className="text-sm text-gray-600 mt-1">
// // // //                         {product.color || "Color: N/A"}
// // // //                       </div>
// // // //                       <div className="text-md font-bold mt-2 text-[#b89f56]">
// // // //                         ₹{(product.discountedPrice || product.price).toLocaleString()}
// // // //                       </div>
// // // //                     </div>
// // // //                   </div>
// // // //                   {/* Compact Stepper Control */}
// // // //                   <div>
// // // //                     <div
// // // //                       className="flex items-center"
// // // //                       style={{
// // // //                         border: "1px solid #e5e7eb",
// // // //                         borderRadius: "6px",
// // // //                         background: "#fff",
// // // //                         overflow: "hidden",
// // // //                       }}
// // // //                     >
// // // //                       <button
// // // //                         aria-label="Decrease quantity"
// // // //                         onClick={() => updateQuantity(product.id, product.qty - 1)}
// // // //                         disabled={product.qty <= 1}
// // // //                         className="w-9 h-8 flex items-center justify-center text-gray-400 font-bold text-xl border-none bg-white hover:text-black transition focus:outline-none"
// // // //                         style={{ borderRight: "1px solid #e5e7eb" }}
// // // //                       >
// // // //                         –
// // // //                       </button>
// // // //                       <span
// // // //                         className="w-8 h-8 flex items-center justify-center text-gray-900 font-bold text-base bg-white"
// // // //                         style={{ textAlign: "center" }}
// // // //                       >
// // // //                         {product.qty}
// // // //                       </span>
// // // //                       <button
// // // //                         aria-label="Increase quantity"
// // // //                         onClick={() => updateQuantity(product.id, product.qty + 1)}
// // // //                         className="w-9 h-8 flex items-center justify-center text-gray-600 font-bold text-xl border-none bg-white hover:text-black transition focus:outline-none"
// // // //                         style={{ borderLeft: "1px solid #e5e7eb" }}
// // // //                       >
// // // //                         +
// // // //                       </button>
// // // //                     </div>
// // // //                   </div>
// // // //                 </li>
// // // //               ))}
// // // //             </ul>
// // // //           )}
// // // //         </div>

// // // //         {/* Order Summary */}
// // // //         <div className="bg-gray-100 rounded-lg p-6 flex flex-col justify-between h-full">
// // // //           <h2 className="text-xl font-bold mb-4 text-gray-800">Order Summary</h2>
// // // //           <div className="flex justify-between text-gray-700 mb-2">
// // // //             <span>Order Value</span>
// // // //             <span>₹{total.toLocaleString()}</span>
// // // //           </div>
// // // //           <div className="flex justify-between text-gray-700 mb-2">
// // // //             <span>Shipping</span>
// // // //             <span className="text-green-600 font-semibold">Free</span>
// // // //           </div>
// // // //           <div className="border-t pt-4 mt-4 flex justify-between font-bold text-lg text-black">
// // // //             <span>Grand Total</span>
// // // //             <span>₹{total.toLocaleString()}</span>
// // // //           </div>
// // // //           <Link
// // // //             href="/checkout"
// // // //             className="mt-8 w-full bg-[#23221d] text-white py-3 text-lg font-bold rounded-lg hover:bg-[#b89f56] hover:text-black transition text-center"
// // // //           >
// // // //             Proceed to Checkout
// // // //           </Link>
// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }


// // // // // "use client";
// // // // // import { useEffect, useState } from "react";
// // // // // import Image from "next/image";
// // // // // import Link from "next/link";

// // // // // export default function CartPage() {
// // // // //   const [cartItems, setCartItems] = useState([]);
// // // // //   const [products, setProducts] = useState([]);

// // // // //   useEffect(() => {
// // // // //     const items = JSON.parse(localStorage.getItem("cart") || "[]");
// // // // //     setCartItems(items);
// // // // //   }, []);

// // // // //   useEffect(() => {
// // // // //     async function fetchProducts() {
// // // // //       const details = await Promise.all(
// // // // //         cartItems.map(async (item) => {
// // // // //           const res = await fetch(`/api/products/${item.id}`);
// // // // //           const data = await res.json();
// // // // //           return { ...data, qty: item.qty };
// // // // //         })
// // // // //       );
// // // // //       setProducts(details);
// // // // //     }
// // // // //     if (cartItems.length > 0) fetchProducts();
// // // // //     else setProducts([]);
// // // // //   }, [cartItems]);

// // // // //   // Update quantity and save to localStorage
// // // // //   const updateQuantity = (id, newQty) => {
// // // // //     if (newQty < 1) return;
// // // // //     const updated = cartItems.map((item) =>
// // // // //       item.id === id ? { ...item, qty: newQty } : item
// // // // //     );
// // // // //     setCartItems(updated);
// // // // //     localStorage.setItem("cart", JSON.stringify(updated));
// // // // //   };

// // // // //   const total = products.reduce(
// // // // //     (acc, p) => acc + (p.discountedPrice || p.price) * p.qty,
// // // // //     0
// // // // //   );

// // // // //   return (
// // // // //     <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-10 px-4">
// // // // //       <div className="max-w-4xl w-full bg-white rounded-xl shadow-xl p-8 grid md:grid-cols-3 gap-8">
// // // // //         {/* Product List */}
// // // // //         <div className="md:col-span-2">
// // // // //           <h1 className="text-2xl font-bold mb-4 text-gray-900">
// // // // //             Your Shopping Cart
// // // // //           </h1>
// // // // //           {products.length === 0 ? (
// // // // //             <p className="text-gray-600">Your cart is empty.</p>
// // // // //           ) : (
// // // // //             <ul>
// // // // //               {products.map((product, idx) => (
// // // // //                 <li
// // // // //                   key={product.id}
// // // // //                   className="flex justify-between items-center border-b py-6"
// // // // //                 >
// // // // //                   <div className="flex items-center gap-4">
// // // // //                     <Image
// // // // //                       src={product.images?.[0] || "/placeholder.jpg"}
// // // // //                       alt={product.name}
// // // // //                       width={80}
// // // // //                       height={80}
// // // // //                       className="rounded-lg border"
// // // // //                     />
// // // // //                     <div>
// // // // //                       <div className="text-lg font-semibold text-gray-900">{product.name}</div>
// // // // //                       <div className="text-sm text-gray-600 mt-1">
// // // // //                         {product.color || "Color: N/A"}
// // // // //                       </div>
// // // // //                       <div className="text-md font-bold mt-2 text-[#b89f56]">
// // // // //                         ₹{(product.discountedPrice || product.price).toLocaleString()}
// // // // //                       </div>
// // // // //                     </div>
// // // // //                   </div>
// // // // //                   <div className="flex flex-col items-end gap-2">
// // // // //                     <div className="flex items-center gap-2">
// // // // //                       <button
// // // // //                         className="px-2 py-1 border rounded text-lg font-bold"
// // // // //                         onClick={() => updateQuantity(product.id, product.qty - 1)}
// // // // //                         aria-label="Decrease quantity"
// // // // //                       >
// // // // //                         -
// // // // //                       </button>
// // // // //                       <span className="font-bold mx-2">{product.qty}</span>
// // // // //                       <button
// // // // //                         className="px-2 py-1 border rounded text-lg font-bold"
// // // // //                         onClick={() => updateQuantity(product.id, product.qty + 1)}
// // // // //                         aria-label="Increase quantity"
// // // // //                       >
// // // // //                         +
// // // // //                       </button>
// // // // //                     </div>
// // // // //                   </div>
// // // // //                 </li>
// // // // //               ))}
// // // // //             </ul>
// // // // //           )}
// // // // //         </div>

// // // // //         {/* Order Summary */}
// // // // //         <div className="bg-gray-100 rounded-lg p-6 flex flex-col justify-between h-full">
// // // // //           <h2 className="text-xl font-bold mb-4 text-gray-800">Order Summary</h2>
// // // // //           <div className="flex justify-between text-gray-700 mb-2">
// // // // //             <span>Order Value</span>
// // // // //             <span>₹{total.toLocaleString()}</span>
// // // // //           </div>
// // // // //           <div className="flex justify-between text-gray-700 mb-2">
// // // // //             <span>Shipping</span>
// // // // //             <span className="text-green-600 font-semibold">Free</span>
// // // // //           </div>
// // // // //           <div className="border-t pt-4 mt-4 flex justify-between font-bold text-lg text-black">
// // // // //             <span>Grand Total</span>
// // // // //             <span>₹{total.toLocaleString()}</span>
// // // // //           </div>
// // // // //           <Link
// // // // //             href="/checkout"
// // // // //             className="mt-8 w-full bg-[#23221d] text-white py-3 text-lg font-bold rounded-lg hover:bg-[#b89f56] hover:text-black transition text-center"
// // // // //           >
// // // // //             Proceed to Checkout
// // // // //           </Link>
// // // // //         </div>
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // }

// // // // // // "use client";
// // // // // // import { useEffect, useState } from "react";
// // // // // // import Image from "next/image";
// // // // // // import Link from "next/link";

// // // // // // export default function CartPage() {
// // // // // //   const [cartItems, setCartItems] = useState([]);
// // // // // //   const [products, setProducts] = useState([]);

// // // // // //   // Fetch cart from localStorage
// // // // // //   useEffect(() => {
// // // // // //     const items = JSON.parse(localStorage.getItem("cart") || "[]");
// // // // // //     setCartItems(items);
// // // // // //   }, []);

// // // // // //   // Fetch full product details for each item
// // // // // //   useEffect(() => {
// // // // // //     async function fetchProducts() {
// // // // // //       const details = await Promise.all(
// // // // // //         cartItems.map(async (item) => {
// // // // // //           // Change to your API route for product details
// // // // // //           const res = await fetch(`/api/products/${item.id}`);
// // // // // //           const data = await res.json();
// // // // // //           return { ...data, qty: item.qty };
// // // // // //         })
// // // // // //       );
// // // // // //       setProducts(details);
// // // // // //     }

// // // // // //     if (cartItems.length > 0) fetchProducts();
// // // // // //     else setProducts([]);
// // // // // //   }, [cartItems]);

// // // // // //   // Calculate totals
// // // // // //   const total = products.reduce(
// // // // // //     (acc, p) => acc + (p.discountedPrice || p.price) * p.qty,
// // // // // //     0
// // // // // //   );

// // // // // //   return (
// // // // // //     <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-10 px-4">
// // // // // //       <div className="max-w-4xl w-full bg-white rounded-xl shadow-xl p-8 grid md:grid-cols-3 gap-8">
// // // // // //         {/* Product List */}
// // // // // //         <div className="md:col-span-2">
// // // // // //           <h1 className="text-2xl font-bold mb-4 text-gray-900">
// // // // // //             Your Shopping Cart
// // // // // //           </h1>
// // // // // //           {products.length === 0 ? (
// // // // // //             <p className="text-gray-600">Your cart is empty.</p>
// // // // // //           ) : (
// // // // // //             <ul>
// // // // // //               {products.map((product, idx) => (
// // // // // //                 <li
// // // // // //                   key={product.id}
// // // // // //                   className="flex justify-between items-center border-b py-6"
// // // // // //                 >
// // // // // //                   <div className="flex items-center gap-4">
// // // // // //                     <Image
// // // // // //                       src={product.images?.[0] || "/placeholder.jpg"}
// // // // // //                       alt={product.name}
// // // // // //                       width={80}
// // // // // //                       height={80}
// // // // // //                       className="rounded-lg border"
// // // // // //                     />
// // // // // //                     <div>
// // // // // //                       <div className="text-lg font-semibold text-gray-900">{product.name}</div>
// // // // // //                       <div className="text-sm text-gray-600 mt-1">
// // // // // //                         {product.color || "Color: N/A"}
// // // // // //                       </div>
// // // // // //                       <div className="text-md font-bold mt-2 text-[#b89f56]">
// // // // // //                         ₹{(product.discountedPrice || product.price).toLocaleString()}
// // // // // //                       </div>
// // // // // //                     </div>
// // // // // //                   </div>
// // // // // //                   <div className="flex flex-col items-end gap-2">
// // // // // //                     <div>
// // // // // //                       Quantity: <span className="font-bold">{product.qty}</span>
// // // // // //                     </div>
// // // // // //                     {/* You can add quantity stepper controls here */}
// // // // // //                   </div>
// // // // // //                 </li>
// // // // // //               ))}
// // // // // //             </ul>
// // // // // //           )}
// // // // // //         </div>

// // // // // //         {/* Order Summary */}
// // // // // //         <div className="bg-gray-100 rounded-lg p-6 flex flex-col justify-between h-full">
// // // // // //           <h2 className="text-xl font-bold mb-4 text-gray-800">Order Summary</h2>
// // // // // //           <div className="flex justify-between text-gray-700 mb-2">
// // // // // //             <span>Order Value</span>
// // // // // //             <span>₹{total.toLocaleString()}</span>
// // // // // //           </div>
// // // // // //           <div className="flex justify-between text-gray-700 mb-2">
// // // // // //             <span>Shipping</span>
// // // // // //             <span className="text-green-600 font-semibold">Free</span>
// // // // // //           </div>
// // // // // //           <div className="border-t pt-4 mt-4 flex justify-between font-bold text-lg text-black">
// // // // // //             <span>Grand Total</span>
// // // // // //             <span>₹{total.toLocaleString()}</span>
// // // // // //           </div>
// // // // // //           <Link
// // // // // //             href="/checkout"
// // // // // //             className="mt-8 w-full bg-[#23221d] text-white py-3 text-lg font-bold rounded-lg hover:bg-[#b89f56] hover:text-black transition text-center"
// // // // // //           >
// // // // // //             Proceed to Checkout
// // // // // //           </Link>
// // // // // //         </div>
// // // // // //       </div>
// // // // // //     </div>
// // // // // //   );
// // // // // // }


// // // // // // // "use client";
// // // // // // // import { useEffect, useState } from "react";

// // // // // // // export default function CartPage() {
// // // // // // //   const [cartItems, setCartItems] = useState([]);

// // // // // // //   useEffect(() => {
// // // // // // //     const items = JSON.parse(localStorage.getItem("cart") || "[]");
// // // // // // //     setCartItems(items);
// // // // // // //   }, []);

// // // // // // //   return (
// // // // // // //     <div className="min-h-screen flex flex-col items-center justify-center bg-white p-10">
// // // // // // //       <h1 className="text-3xl font-bold mb-6 text-gray-900">Your Shopping Cart</h1>
// // // // // // //       {cartItems.length === 0 ? (
// // // // // // //         <p className="text-gray-600">Your cart is empty.</p>
// // // // // // //       ) : (
// // // // // // //         <ul className="w-full max-w-xl">
// // // // // // //           {cartItems.map((item, idx) => (
// // // // // // //             <li
// // // // // // //               key={idx}
// // // // // // //               className="flex justify-between items-center border-b py-4 text-gray-800"
// // // // // // //             >
// // // // // // //               <span>Product ID: {item.id}</span>
// // // // // // //               <span>Quantity: {item.qty}</span>
// // // // // // //             </li>
// // // // // // //           ))}
// // // // // // //         </ul>
// // // // // // //       )}
// // // // // // //     </div>
// // // // // // //   );
// // // // // // // }


// // // // // // // // // app/cart/page.jsx
// // // // // // // // "use client";

// // // // // // // // export default function CartPage() {
// // // // // // // //   return (
// // // // // // // //     <div className="min-h-screen flex flex-col items-center justify-center bg-white p-10">
// // // // // // // //       <h1 className="text-3xl font-bold mb-4">Your Shopping Cart</h1>
// // // // // // // //       <p className="text-gray-600">This page will show items added to your cart.</p>
// // // // // // // //       {/* Add your cart logic/UI here */}
// // // // // // // //     </div>
// // // // // // // //   );
// // // // // // // // }
