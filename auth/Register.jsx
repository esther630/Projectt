import { Link } from "react-router-dom";
import { useState } from "react";
import { BookOpen, ArrowLeft, ArrowRight, Check, PenTool, } from "lucide-react";
import axios from "axios";
import LoginPage from "./login";


const membershipFees = { budding: 5000, established: 10000, women_desk: 7000, religious: 5000, school_affiliate: 2000, non_fiction: 8000 };

 const MEMBERSHIP_TYPES = {
  Budding: 'budding',
 Established: 'established',
  Women_Desk: 'women_desk',
  Religious: 'religious',
  School_Affiliates: 'school_affiliate',
  Non_Fiction: 'non_fiction'
};

 const USER_ROLES = {
  READER: 'reader',
  WRITER: 'writer',
  EDITOR: 'editor',
  ADMIN: 'admin'
};

const EmptyFields = ()=>{
 if (!name || !email || !password || !confirmPassword) {
  alert("Please fill in all required fields");
  return false;
}else if (password !== confirmPassword) {
    alert("Passwords do not match");
    return false;
  }else{
    handleSubmit();
  }
}



export function RegisterPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "", email: "", password: "", confirmPassword: "", role: "writer", membershipType: "", bio: "", agreeTerms: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const updateFormData = (field, value) => setFormData((prev) => ({ ...prev, [field]: value }));

const handleSubmit = async () => {
  const { name, email, password, role } = formData;

 
  if (!name || !email || !password) {
    alert("Please fill in all required fields");
    return;
  }

  if (role === "reader") {
    try {
      // Use JSON instead of FormData for simplicity
      const url = "http://localhost/project/PHP/reg_reader.php";

      const response = await axios.post(url, {
        name,
        email,
        password,
      });

      const data = response.data;

      if (data.success) {
        alert("Registration successful!");
        window.location.href ="/";
      } else {
        alert("Registration failed: " + data.message);
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred during registration.");
    }

  }

  // You can handle writers similarly...
  if (role === "writer") {
  // Generate a unique transaction reference
  const tx_ref = `TX-${Date.now()}`;

  // Save the registration temporarily on your server
  try {
    await axios.post("http://localhost/project/PHP/temp_register.php", {
      tx_ref,
      name,
      email,
      password,
      bio: formData.bio,
      membershipType: formData.membershipType
    });
  } catch (err) {
    console.error(err);
    alert("Could not start registration. Try again.");
    return;
  }

  // Trigger payment popup
  PaychanguCheckout({
    public_key: "PUB-TEST-bQNIEHiRnn0JN8xQ2GMVawXuVuG8pRfG",
    tx_ref: tx_ref,
    amount:membershipFees[formData.membershipType],
    currency: "MWK",
    callback_url: "http://localhost:5173/PHP/payment_callback.php",  // where Paychangu will send payment status
    return_url: "http://localhost:5173/auth/thankyou",  // redirect user after payment
    customer: { email, first_name: name },
    customization: {
      title: "Writer Membership",
      description: "Writer Registration Payment"
    }
  });
}
};

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-black mb-8">
          <ArrowLeft className="h-4 w-4" /> Back to Home
        </Link>

        {/* Card Replacement */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8">
          <div className="text-center mb-8">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-[#b13a2d] mb-4">
              <BookOpen className="h-7 w-7 text-white" />
            </div>
            <h2 className="text-2xl font-serif font-bold">Join MAWU</h2>
            <p className="text-gray-500 text-sm">Step {step} of 3</p>
          </div>

          <form onSubmit={(e) => e.preventDefault()}>
            {/* Step 1: Account Details */}
            {step === 1 && (
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Full Name</label>
                  <input placeholder="enter full name" type="text" className="w-full mt-1 p-2 border rounded-md" value={formData.name} onChange={(e) => updateFormData("name", e.target.value)} />
                </div>
                <div>
                  <label className="text-sm font-medium">Email</label>
                  <input placeholder="you@example.com" type="email" className="w-full mt-1 p-2 border rounded-md" value={formData.email} onChange={(e) => updateFormData("email", e.target.value)} />
                </div>
                <div>
                  <label className="text-sm font-medium">Password</label>
                  <input placeholder="create password" type="password" className="w-full mt-1 p-2 border rounded-md" value={formData.password} onChange={(e) => updateFormData("password", e.target.value)} />
                </div>
                <div>
                  <label className="text-sm font-medium">Confirm Password</label>
                  <input placeholder="confirm password" type="password" className="w-full mt-1 p-2 border rounded-md" />
                </div>
                
                <button type="button" className="w-full bg-[#b13a2d] text-white py-2 rounded-md"  onClick={() => setStep(2)}>
                  Continue <ArrowRight className="inline h-4 w-4" />
                </button>
              </div>
            )}

            {/* step2: role and membership*/}
     {step===2&&(
    <div className="space-y-6">
        <div className="space-y-3">
            <label className="block text-sm font-medium">I want to join as</label>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <input
                        type="radio"
                        id="reader"
                        name="role"
                        value="reader"
                        checked={formData.role === "reader"}
                        onChange={(e) => updateFormData("role", e.target.value)}
                        className="peer hidden"
                    />
                    <label htmlFor="reader"
                        className={`flex flex-col items-center justify-center rounded-lg border-2 p-4 hover:bg-secondary/50 cursor-pointer transition-all ${
                            formData.role === "reader" 
                                ? "border-[#b13a2d] bg-red-50" 
                                : "border-muted bg-popover"
                        }`}>
                        <BookOpen className="mb-2 h-6 w-6" />
                        <span className="font-medium">Reader</span>
                        <span className="text-xs text-muted-foreground">Free</span>
                    </label>
                </div>

                <div>
                    <input
                        type="radio"
                        id="writer"
                        name="role"
                        value="writer"
                        checked={formData.role === "writer"}
                        onChange={(e) => updateFormData("role", e.target.value)}
                        className="peer hidden"
                    />
                    <label htmlFor="writer"
                        className={`flex flex-col items-center justify-center rounded-lg border-2 p-4 hover:bg-secondary/50 cursor-pointer transition-all ${
                            formData.role === "writer" 
                                ? "border-[#b13a2d] bg-red-50" 
                                : "border-muted bg-popover"
                        }`}>
                        <PenTool className="mb-2 h-6 w-6" />
                        <span className="font-medium">Writer</span>
                        <span className="text-xs text-muted-foreground">Membership fee</span>
                    </label>
                </div>
            </div>

            {/* Membership Type - Only show for Writers */}
            {formData.role === "writer" && (
                <div>
                    <label htmlFor="membertype" className="block text-sm font-medium">Membership Type</label>
                    <select 
                        id="membertype"
                        className="w-full mt-1 p-2 border-2 border-gray-300 rounded-md focus:border-[#b13a2d] focus:outline-none"
                        value={formData.membershipType}
                        onChange={(e) => updateFormData("membershipType", e.target.value)}
                    >
                        <option value="" disabled selected hidden>Select membership type</option>
                        {Object.entries(MEMBERSHIP_TYPES).map(([key, value]) => (
                            <option key={value} value={value}>
                                {key}
                            </option>
                        ))}
                    </select>

                    {/* Price Popup - Show when membership is selected */}
                    {formData.membershipType && (
                        <div className="mt-4 p-4 bg-gray-90 border-2 border-black-300 rounded-lg">
                            <label className="block text-sm font-medium mb-2">
                                Price: MWk{membershipFees[formData.membershipType]}
                            </label>
                           
                        </div>
                    )}
                <div className="flex flex-col gap-2">
                   <br /> <label htmlFor="bio" className="block text-sm font-medium">Short Bio (optional)</label>
                <textarea type="text" placeholder="Tell readers a bit about yourself(50-100 words)"
                 className="border border-gray-300 rounded-md focus:border-[#b13a2d] focus:outline-none h-18 p-2 resize-none"
                 value={formData.bio} onChange={(e) => updateFormData("bio", e.target.value)}/>
                 </div>

                </div>
            )}
        </div>

        

        {/* Navigation Buttons */}
        <div className="flex gap-4 mt-8">
            <button 
                type="button" 
                className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-md hover:bg-gray-400 transition"
                onClick={() => setStep(1)}
            >
                <ArrowLeft className="inline h-4 w-4 mr-2" /> Back
            </button>
            <button 
                type="button" 
                className="flex-1 bg-[#b13a2d] text-white py-2 rounded-md hover:bg-[#8b2a23] transition disabled:bg-gray-300"
                onClick={() => setStep(3)}
                disabled={!formData.role || (formData.role === "writer" && !formData.membershipType)}
            >
                Continue <ArrowRight className="inline h-4 w-4 ml-2" />
            </button>
        </div>
    </div>
    )}

            {/* Step 3: Confirmation */}
{step === 3 && (
  <div className="space-y-6">
    <div className="text-center">
      <Check className="mx-auto mb-2 h-12 w-12 text-green-500" />
      <h3 className="text-lg font-medium">You're all set!</h3>
      <p className="text-gray-500 text-sm">Click the button below to complete your registration.</p>
    </div>

    {/* Display summary */}
    <div className="bg-gray-50 p-4 rounded-lg space-y-2">
      <p><strong>Name:</strong> {formData.name}</p>
      <p><strong>Email:</strong> {formData.email}</p>
      <p><strong>Role:</strong> {formData.role.charAt(0).toUpperCase() + formData.role.slice(1)}</p>
      {formData.role === "writer" && (
        <p><strong>Membership:</strong> {Object.keys(MEMBERSHIP_TYPES).find(key => MEMBERSHIP_TYPES[key] === formData.membershipType)}</p>
      )}
       <p><strong>Fee:</strong>{membershipFees[formData.membershipType]}</p>
    </div>

    {/* Navigation Buttons */}
    <div className="flex gap-4 mt-8">
      <button 
        type="button" 
        className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-md hover:bg-gray-400 transition h-10"
        onClick={() => setStep(2)}
      >
        <ArrowLeft className="inline h-4 w-4 mr-2" /> Back
      </button>
      <button 
        type="button" 
        className="flex-1 bg-[#b13a2d] text-white py-2 rounded-md hover:bg-[#8b2a23] transition disabled:bg-gray-300 h-10"
        onClick={() => handleSubmit()}
      >
        {formData.role === "writer" ? "Proceed to Payment" : "Complete Registration"} <ArrowRight className="inline h-4 w-4 ml-2" />
      </button>
    </div>
  </div>
)}

            
          </form>

          <div className="mt-6 text-center text-sm">
            Already have an account? <Link to="/auth/login" className="text-[#b13a2d] font-medium underline">Sign in</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;