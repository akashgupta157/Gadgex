"use client";
import axios from "axios";
import Script from "next/script";
import React, { useCallback, useState } from "react";
import { configure } from "@/utils/misc";
import { redirect } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { clearCart } from "@/redux/slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { CircleAlert, CircleCheckBig } from "lucide-react";

export default function Razorpay() {
  const { toast } = useToast();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { orderData } = useSelector((state) => state.razorpay);
  const config = configure(user?.token);
  const [isProcessing, setIsProcessing] = useState(false);

  const showToast = useCallback(
    (icon, message, variant) => {
      toast({
        title: (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            {icon}
            {message}
          </div>
        ),
        variant,
      });
    },
    [toast]
  );

  const handlePayment = async () => {
    setIsProcessing(true);
    try {
      const { data } = await axios.post("/api/user/razorpay", {
        amount: orderData.totalAmount,
      });
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: orderData.totalAmount * 100,
        currency: "INR",
        name: "Gadgex",
        description: "Order Payment",
        order_id: data.order.id,
        handler: async (response) => {
          const res = await axios.post(
            "/api/user/orderhistory",
            { ...orderData, razorpayOrderId: response.razorpay_order_id },
            config
          );
          if (!res.data.success) {
            showToast(<CircleAlert />, res.data.error, "error");
            return;
          }
          showToast(<CircleCheckBig />, "Payment successful", "success");
          dispatch(clearCart());
          await axios.patch("/api/user/emptyCart", {}, config);
          redirect("/orderconfirm?id=" + res.data.newOrder._id);
        },
        prefill: {
          name: user.name,
          email: user.email,
          contact: user.phone,
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Error processing payment:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="bg-white shadow-md mx-auto p-6 rounded-lg max-w-md">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />

      <div className="mb-6">
        <h2 className="mb-4 font-bold text-gray-800 text-2xl">Order Summary</h2>
        <div className="space-y-4">
          {orderData.products.map((product) => (
            <div key={product._id} className="flex items-start pb-4 border-b">
              <img
                src={product.image[0]}
                alt={product.name}
                className="mr-4 rounded w-20 h-20 object-contain"
              />
              <div>
                <h3 className="font-medium text-gray-900">{product.name}</h3>
                <p className="text-gray-500 text-sm">Brand: {product.brand}</p>
                <p className="font-semibold text-gray-900 text-lg">
                  ₹
                  {(
                    product.price -
                    (product.price * product.discount) / 100
                  ).toLocaleString()}
                  {product.discount > 0 && (
                    <span className="ml-2 text-gray-500 text-sm line-through">
                      ₹{product.price.toLocaleString()}
                    </span>
                  )}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h3 className="mb-2 font-semibold text-gray-800 text-lg">
          Shipping Address
        </h3>
        <div className="bg-gray-50 p-4 rounded">
          <p className="text-gray-700">{orderData.address.street}</p>
          <p className="text-gray-700">
            {orderData.address.city}, {orderData.address.state}{" "}
            {orderData.address.pinCode}
          </p>
          <p className="text-gray-700">{orderData.address.country}</p>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex justify-between mb-2">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-medium">
            ₹{orderData.totalAmount.toLocaleString()}
          </span>
        </div>
        <div className="flex justify-between mb-2">
          <span className="text-gray-600">Payment Method</span>
          <span className="font-medium">{orderData.paymentMethod}</span>
        </div>
        <div className="mt-4 pt-4 border-t">
          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>₹{orderData.totalAmount.toLocaleString()}</span>
          </div>
        </div>
      </div>

      <button
        onClick={handlePayment}
        disabled={isProcessing}
        className={`w-full py-3 px-4 rounded-md font-medium text-white ${
          isProcessing
            ? "bg-blue-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {isProcessing ? "Processing..." : "Proceed to Payment"}
      </button>
    </div>
  );
}
