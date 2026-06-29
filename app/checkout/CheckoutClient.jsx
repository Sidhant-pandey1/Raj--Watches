// app/checkout/checkoutclient.jsx
"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";

const RAZORPAY_KEY_ID = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;

const loadScript = (src) => {
  return new Promise((resolve) => {
    if (document.querySelector(`script[src="${src}"]`)) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const buyNow = searchParams.get("buyNow");
  const productId = searchParams.get("productId");
  const [checkoutItems, setCheckoutItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("Fill all details and click Checkout");
  const [formData, setFormData] = useState({
    customerName: "",
    customerEmail: "",
    phoneNumber: "",
    address: "",
    pincode: "",
  });

  // Load Razorpay
  useEffect(() => {
    loadScript("https://checkout.razorpay.com/v1/checkout.js");
  }, []);

  // Decide what products to checkout (take snapshotPrice if present in localStorage rows)
  useEffect(() => {
    if (buyNow && productId) {
      // buyNow route: single product id (no snapshotPrice unless you add it to query)
      setCheckoutItems([{ id: productId, qty: 1 }]);
    } else {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      // cart rows expected shape: { id: <productId>, qty: <number>, snapshotPrice?: <number> }
      setCheckoutItems(Array.isArray(cart) ? cart : []);
    }
  }, [buyNow, productId]);

  // Helper: prefer snapshotPrice, then price, then discountedPrice
  const unitPriceFor = (p) => p?.price ?? 0;

  //   const unitPriceFor = (p) => (p?.snapshotPrice ?? p?.price ?? p?.discountedPrice ?? 0);

  // Fetch product details for all items to checkout and merge snapshotPrice from row
  useEffect(() => {
    if (!checkoutItems || checkoutItems.length === 0) {
      setProducts([]);
      return;
    }

    const fetchProducts = async () => {
      try {
        const details = await Promise.all(
          checkoutItems.map(async (item) => {
            try {
              const res = await fetch(`/api/products/${item.id}`);
              const serverData = res.ok ? await res.json() : null;

              // Merge server data and cart-row snapshotPrice/qty
              return {
                ...(serverData || {}),
                qty: item.qty ?? 1,
                snapshotPrice: item.snapshotPrice, // might be undefined
              };
            } catch (err) {
              console.error(
                "Error fetching product for checkout row",
                item,
                err
              );
              return {
                id: item.id,
                name: "Unknown product",
                qty: item.qty ?? 1,
                snapshotPrice: undefined,
              };
            }
          })
        );
        setProducts(details);
      } catch (err) {
        console.error("Error fetching checkout products:", err);
        setMessage("⚠️ Error loading products");
        setProducts([]);
      }
    };

    fetchProducts();
  }, [checkoutItems]);

  const handleInputChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCheckout = async () => {
    const { customerName, customerEmail, phoneNumber, address, pincode } =
      formData;
    if (
      !customerName ||
      !customerEmail ||
      !phoneNumber ||
      !address ||
      !pincode
    ) {
      setMessage("❌ Please fill all required fields!");
      return;
    }
    if (!products || products.length === 0) {
      setMessage("❌ No products found!");
      return;
    }
    setLoading(true);
    setMessage("Creating order...");

    try {
      const shippingAddress = `${address}, ${pincode}`;

      // Build items payload using unitPriceFor to ensure consistent totals
      const items = products.map((p) => ({
        watchId: p.id,
        quantity: p.qty || 1,
        unitPrice: unitPriceFor(p),
      }));

      const totalPrice = products.reduce(
        (acc, p) => acc + unitPriceFor(p) * (p.qty || 1),
        0
      );

      const orderResponse = await fetch("/api/order/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items,
          customerName,
          customerEmail,
          phoneNumber,
          shippingAddress,
          totalPrice,
        }),
      });

      const orderData = await orderResponse.json();
      if (!orderResponse.ok) {
        setMessage(
          `Order creation failed: ${orderData.message || orderData.error || "unknown"
          }`
        );
        setLoading(false);
        return;
      }

      const options = {
        key: RAZORPAY_KEY_ID,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Watch E-Store",
        description: "Purchase Watch Order",
        order_id: orderData.razorpayOrderId,
        handler: async function (response) {
          setMessage("Payment successful. Verifying order...");
          const verificationResponse = await fetch("/api/order/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
              customerName,
              customerEmail,
              shippingAddress,
              orderId: orderData.orderId,
              items,
            }),
          });

          const verificationData = await verificationResponse.json();
          if (verificationResponse.ok && verificationData.verified) {
            setMessage(
              `✅ Payment confirmed! Order ID: ${verificationData.orderId}`
            );
            setFormData({
              customerName: "",
              customerEmail: "",
              phoneNumber: "",
              address: "",
              pincode: "",
            });
            if (!buyNow) localStorage.removeItem("cart");
          } else {
            setMessage(
              `❌ Verification failed: ${verificationData.message || "Payment not secure."
              }`
            );
          }
          setLoading(false);
        },
        prefill: {
          name: customerName,
          email: customerEmail,
          contact: phoneNumber,
        },
        theme: { color: "#1a1a2e" },
      };

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", (response) => {
        setMessage(`❌ Payment Failed: ${response.error.description}`);
        setLoading(false);
      });
      rzp.open();
    } catch (error) {
      console.error(error);
      setMessage("❌ Something went wrong!");
      setLoading(false);
    }
  };

  // Grand total (consistent with order payload)
  const grandTotal = products.reduce(
    (acc, p) => acc + unitPriceFor(p) * (p.qty || 1),
    0
  );

  return (
    <div className="min-h-screen bg-[#faf9f6] flex justify-center items-start py-12 px-4">
      <div className="w-full max-w-3xl bg-white shadow-sm border border-[#e5e7eb] rounded-xl p-8 sm:p-10">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#1a1a2e] text-center mb-10" style={{ fontFamily: "'Outfit', sans-serif" }}>
          Secure Checkout
        </h1>

        {products.length > 0 ? (
          <>
            {products.map((product, idx) => (
              <div
                key={product.id ?? `prod-${idx}`}
                className="flex flex-col sm:flex-row gap-6 sm:gap-8 mb-8 items-center"
              >
                <div className="relative w-48 h-48 sm:w-56 sm:h-56 flex-shrink-0 rounded-xl overflow-hidden border border-[#e5e7eb]">
                  <Image
                    src={product.images?.[0] || "/images/RajWatches.png"}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <h2 className="text-xl font-semibold text-[#1a1a2e]">
                    {product.name}
                  </h2>
                  <p className="text-[#6b7280] mt-2 text-lg">
                    ₹{unitPriceFor(product).toLocaleString()}
                  </p>
                  <p className="mt-2 text-base text-[#4b5563]">
                    Quantity: {product.qty || 1}
                  </p>
                  <p className="mt-4 text-lg font-bold text-[#1a1a2e]">
                    Total: ₹
                    {(
                      unitPriceFor(product) * (product.qty || 1)
                    ).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}

            {/* Grand Total */}
            <div className="w-full my-8 flex justify-end">
              <div className="text-xl font-bold text-[#1a1a2e] bg-[#faf9f6] rounded-lg px-6 py-3 border border-[#e5e7eb]">
                Grand Total: ₹{grandTotal.toLocaleString()}
              </div>
            </div>
          </>
        ) : (
          <p className="text-center text-[#6b7280] mb-6">
            Loading product details...
          </p>
        )}

        <div className="space-y-4">
          {[
            "customerName",
            "customerEmail",
            "phoneNumber",
            "address",
            "pincode",
          ].map((field) => (
            <div key={field}>
              <label className="block text-[#1a1a2e] mb-1.5 font-semibold capitalize text-sm">
                {field.replace(/([A-Z])/g, " $1")}
              </label>
              <input
                type={
                  field === "customerEmail"
                    ? "email"
                    : field === "phoneNumber" || field === "pincode"
                      ? "tel"
                      : "text"
                }
                name={field}
                value={formData[field]}
                onChange={handleInputChange}
                placeholder={`Enter your ${field
                  .replace(/([A-Z])/g, " $1")
                  .toLowerCase()}`}
                className="w-full border border-[#e5e7eb] rounded-lg px-4 py-3 bg-white text-[#1a1a2e] placeholder-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#c9a84c]/40 focus:border-[#c9a84c] transition-all duration-200 text-sm"
                required
              />
            </div>
          ))}
        </div>

        <button
          onClick={handleCheckout}
          disabled={loading || !RAZORPAY_KEY_ID}
          className="w-full mt-8 py-3.5 bg-[#1a1a2e] text-white font-semibold rounded-lg hover:bg-[#c9a84c] transition-all duration-300 active:scale-[0.98] shadow-sm text-sm tracking-wide disabled:opacity-50"
        >
          {loading ? "Processing..." : "Checkout and Pay"}
        </button>

        <p className="mt-5 text-center text-[#4b5563] text-sm font-medium">{message}</p>

        {!RAZORPAY_KEY_ID && (
          <p className="mt-2 text-center text-red-500 text-sm">
            ⚠️ Missing Razorpay Key ID — set NEXT_PUBLIC_RAZORPAY_KEY_ID in .env
          </p>
        )}
      </div>
    </div>
  );
}
