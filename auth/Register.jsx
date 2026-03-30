import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { BookOpen, ArrowLeft, ArrowRight, Check, PenTool } from "lucide-react";
import axios from "axios";

const membershipFees = {
  budding: 5000,
  established: 10000,
  women_desk: 7000,
  religious: 5000,
  school_affiliate: 2000,
  non_fiction: 8000,
};

const MEMBERSHIP_TYPES = {
  Budding: "budding",
  Established: "established",
  Women_Desk: "women_desk",
  Religious: "religious",
  School_Affiliates: "school_affiliate",
  Non_Fiction: "non_fiction",
};

export function RegisterPage() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "", // now used
    role: "writer",
    membershipType: "",
    bio: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const updateFormData = (field, value) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  // Validate step 1 before proceeding
  const handleStep1Continue = () => {
    const { name, email, password, confirmPassword } = formData;
    if (!name || !email || !password || !confirmPassword) {
      alert("Please fill in all required fields");
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    setStep(2);
  };

  const handleSubmit = async () => {
    const { name, email, password, role } = formData;
    setIsLoading(true);

    try {
      if (role === "reader") {
        const response = await axios.post(
          "http://localhost/project/PHP/reg_reader.php",
          { name, email, password }
        );
        const data = response.data;

        if (data.success) {
          // Store user in localStorage so the home page can read it
          localStorage.setItem("user", JSON.stringify(data.user));
          navigate("/", { state: { user: data.user } });
        } else {
          alert("Registration failed: " + data.message);
        }
      }

      if (role === "writer") {
        const tx_ref = `TX-${Date.now()}`;

        await axios.post("http://localhost/project/PHP/temp_register.php", {
          tx_ref,
          name,
          email,
          password,
          bio: formData.bio,
          membershipType: formData.membershipType,
        });

        // Paychangu will redirect to succes.php?tx_ref=...
        // succes.php sets the session, then the callback_url should
        // redirect to the writer dashboard. Update callback_url below:
        PaychanguCheckout({
          public_key: "PUB-TEST-bQNIEHiRnn0JN8xQ2GMVawXuVuG8pRfG",
          tx_ref,
          amount: membershipFees[formData.membershipType],
          currency: "MWK",
          callback_url: `http://localhost/project/PHP/succes.php?tx_ref=${tx_ref}`,
          return_url: `http://localhost:5173/writer/dashboard`, // redirect after payment
          customer: { email, first_name: name },
          customization: {
            title: "Writer Membership",
            description: "Writer Registration Payment",
          },
        });
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred during registration.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-black mb-8"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Home
        </Link>

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
                  <label className="text-sm font-medium">User Name</label>
                  <input
                    placeholder="Create your username"
                    type="text"
                    className="w-full mt-1 p-2 border rounded-md"
                    value={formData.name}
                    onChange={(e) => updateFormData("name", e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Email</label>
                  <input
                    placeholder="you@example.com"
                    type="email"
                    className="w-full mt-1 p-2 border rounded-md"
                    value={formData.email}
                    onChange={(e) => updateFormData("email", e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Password</label>
                  <input
                    placeholder="Create password"
                    type="password"
                    className="w-full mt-1 p-2 border rounded-md"
                    value={formData.password}
                    onChange={(e) => updateFormData("password", e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Confirm Password</label>
                  {/* Fixed: now wired to formData.confirmPassword */}
                  <input
                    placeholder="Confirm password"
                    type="password"
                    className="w-full mt-1 p-2 border rounded-md"
                    value={formData.confirmPassword}
                    onChange={(e) => updateFormData("confirmPassword", e.target.value)}
                  />
                </div>

                <button
                  type="button"
                  className="w-full bg-[#b13a2d] text-white py-2 rounded-md"
                  onClick={handleStep1Continue}
                >
                  Continue <ArrowRight className="inline h-4 w-4" />
                </button>
              </div>
            )}

            {/* Step 2: Role & Membership */}
            {step === 2 && (
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
                      <label
                        htmlFor="reader"
                        className={`flex flex-col items-center justify-center rounded-lg border-2 p-4 hover:bg-secondary/50 cursor-pointer transition-all ${
                          formData.role === "reader"
                            ? "border-[#b13a2d] bg-red-50"
                            : "border-muted bg-popover"
                        }`}
                      >
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
                      <label
                        htmlFor="writer"
                        className={`flex flex-col items-center justify-center rounded-lg border-2 p-4 hover:bg-secondary/50 cursor-pointer transition-all ${
                          formData.role === "writer"
                            ? "border-[#b13a2d] bg-red-50"
                            : "border-muted bg-popover"
                        }`}
                      >
                        <PenTool className="mb-2 h-6 w-6" />
                        <span className="font-medium">Writer</span>
                        <span className="text-xs text-muted-foreground">Membership fee</span>
                      </label>
                    </div>
                  </div>

                  {formData.role === "writer" && (
                    <div>
                      <label htmlFor="membertype" className="block text-sm font-medium">
                        Membership Type
                      </label>
                      <select
                        id="membertype"
                        className="w-full mt-1 p-2 border-2 border-gray-300 rounded-md focus:border-[#b13a2d] focus:outline-none"
                        value={formData.membershipType}
                        onChange={(e) => updateFormData("membershipType", e.target.value)}
                      >
                        <option value="" disabled hidden>
                          Select membership type
                        </option>
                        {Object.entries(MEMBERSHIP_TYPES).map(([key, value]) => (
                          <option key={value} value={value}>
                            {key}
                          </option>
                        ))}
                      </select>

                      {formData.membershipType && (
                        <div className="mt-4 p-4 bg-gray-50 border-2 border-gray-300 rounded-lg">
                          <p className="text-sm font-medium">
                            Fee: MWK {membershipFees[formData.membershipType].toLocaleString()}
                          </p>
                        </div>
                      )}

                      <div className="flex flex-col gap-2 mt-4">
                        <label htmlFor="bio" className="block text-sm font-medium">
                          Short Bio (optional)
                        </label>
                        <textarea
                          id="bio"
                          placeholder="Tell readers a bit about yourself (50–100 words)"
                          className="border border-gray-300 rounded-md focus:border-[#b13a2d] focus:outline-none h-20 p-2 resize-none"
                          value={formData.bio}
                          onChange={(e) => updateFormData("bio", e.target.value)}
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex gap-4 mt-8">
                  <button
                    type="button"
                    className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-md"
                    onClick={() => setStep(1)}
                  >
                    <ArrowLeft className="inline h-4 w-4 mr-2" /> Back
                  </button>
                  <button
                    type="button"
                    className="flex-1 bg-[#b13a2d] text-white py-2 rounded-md disabled:bg-gray-300"
                    onClick={() => setStep(3)}
                    disabled={
                      !formData.role ||
                      (formData.role === "writer" && !formData.membershipType)
                    }
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
                  <p className="text-gray-500 text-sm">
                    Click the button below to complete your registration.
                  </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg space-y-2 text-sm">
                  <p><strong>Name:</strong> {formData.name}</p>
                  <p><strong>Email:</strong> {formData.email}</p>
                  <p>
                    <strong>Role:</strong>{" "}
                    {formData.role.charAt(0).toUpperCase() + formData.role.slice(1)}
                  </p>
                  {formData.role === "writer" && (
                    <>
                      <p>
                        <strong>Membership:</strong>{" "}
                        {Object.keys(MEMBERSHIP_TYPES).find(
                          (key) => MEMBERSHIP_TYPES[key] === formData.membershipType
                        )}
                      </p>
                      <p>
                        <strong>Fee:</strong> MWK{" "}
                        {membershipFees[formData.membershipType]?.toLocaleString()}
                      </p>
                    </>
                  )}
                </div>

                <div className="flex gap-4 mt-8">
                  <button
                    type="button"
                    className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-md h-10"
                    onClick={() => setStep(2)}
                  >
                    <ArrowLeft className="inline h-4 w-4 mr-2" /> Back
                  </button>
                  <button
                    type="button"
                    className="flex-1 bg-[#b13a2d] text-white py-2 rounded-md disabled:bg-gray-300 h-10"
                    onClick={handleSubmit}
                    disabled={isLoading}
                  >
                    {isLoading
                      ? "Please wait..."
                      : formData.role === "writer"
                      ? "Proceed to Payment"
                      : "Complete Registration"}
                    <ArrowRight className="inline h-4 w-4 ml-2" />
                  </button>
                </div>
              </div>
            )}
          </form>

          <div className="mt-6 text-center text-sm">
            Already have an account?{" "}
            <Link to="/auth/login" className="text-[#b13a2d] font-medium underline">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;