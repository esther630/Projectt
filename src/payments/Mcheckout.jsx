import React, { useEffect } from "react";

export function MakePayment() {

  return (
   <div>
        <h1 className="text-2xl font-bold mb-4">Payment Page</h1>
        <p className="mb-4">This is where the payment processing will happen.</p>
        <button 
          className="bg-[#b13a2d] text-white px-4 py-2 rounded-md hover:bg-[#8e2e24]"  
            onClick={() => {
              MakePayment();
            }}
        >
          Pay Now
        </button>   
        
   </div>
  );
}

export default MakePayment;