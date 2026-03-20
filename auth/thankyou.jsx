import { Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";

export function ThankYou() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full text-center">
        <CheckCircle className="mx-auto mb-4 h-12 w-12 text-green-500" />
        <h2 className="text-2xl font-bold mb-2">Thank You!</h2>
        <p className="text-gray-600 mb-6">
          Your registration and payment were successful.
        </p>
        <Link
          to="/"
          className="inline-block bg-[#b13a2d] text-white px-6 py-2 rounded-md hover:bg-[#8b2a23] transition"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
}

export default ThankYou;