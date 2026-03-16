import React, { useEffect } from "react";

export function MakePayment() {
  useEffect(() => {
    // Load jQuery first
    const jqueryScript = document.createElement("script");
    jqueryScript.src = "https://code.jquery.com/jquery-3.6.0.min.js";
    jqueryScript.async = true;
    jqueryScript.onload = () => {
      // Load Paychangu script after jQuery loads
      const script = document.createElement("script");
      script.src = "https://in.paychangu.com/js/popup.js";
      script.async = true;
      document.body.appendChild(script);
    };
    document.body.appendChild(jqueryScript);
  }, []);

  const handlePayment = () => {
    if (window.PaychanguCheckout) {
      window.PaychanguCheckout({
        public_key: "PUB-TEST-bQNIEHiRnn0JN8xQ2GMVawXuVuG8pRfG",
        tx_ref: "" + Math.floor(Math.random() * 1000000000 + 1),
        amount: 1000,
        currency: "MWK",
        callback_url: "https://example.com/callbackurl",
        return_url: "https://example.com/returnurl",
        customer: {
          email: "yourmail@example.com",
          first_name: "Mac",
          last_name: "Phiri"
        },
        customization: {
          title: "Test Payment",
          description: "Payment Description"
        },
        meta: {
          uuid: "uuid",
          response: "Response"
        }
      });
    } else {
      alert("Payment system not loaded. Please try again.");
    }
  };

  return (
    <button type="button" onClick={handlePayment} className="w-full bg-[#b13a2d] text-white py-2 rounded-md h-10">
      Pay Now
    </button>
  );
}

export default MakePayment;