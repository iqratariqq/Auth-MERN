import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { AuthStore } from "../store/authStore";
import toast from "react-hot-toast";

const VerifyEmail = () => {
  const [code, setcode] = useState(["", "", "", ""]);
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const {verifyuseremail,error,isLoading}=AuthStore()

  const handleChange = async (index, value) => {
    const newCode = [...code];

    if (value.length >1) {
      const pastedCode = value.slice(0, 4).split("");
      for (let i = 0; i < 4; i++) {
        newCode[i] = pastedCode[i] || "";
      }
       setcode(newCode);
      //focus on the last non empty input or first non empty input
      const lastfilledIndex = newCode.findLastIndex((digit) => digit !== "");
      const nextIndex = lastfilledIndex < 3 ? lastfilledIndex + 1 : 3;
      inputRefs.current[nextIndex ]?.focus();
    } else {
      newCode[index] = value;

      setcode(newCode); 
      if (value && index < 3) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmite=async(e)=>{
    e.preventDefault();
    const verificationCode=code.join("");
    console.log("verificationCode",verificationCode)
    try {
      await verifyuseremail(verificationCode)
      console.log("verify successfully")
      navigate('/')
      toast.success("Email verified successfully")

    } catch (error) {
      
      console.log("error in verification email",error)
    }
  }

  return (
    <div className=" max-w-md  w-full bg-gray-800 backdrop-blur-xl bg-opacity-50 shadow-xl overflow-hidden rounded-2xl ">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 10 }}
        transition={{ duration: 0.5 }}
        className=" max-w-md  w-full bg-gray-800 backdrop-blur-xl bg-opacity-50 shadow-2xl overflow-hidden rounded-2xl p-8"
      >
        <h1 className=" bg-gradient-to-r from-green-500 to-emerald-500 text-transparent bg-clip-text font-bold text-center text-2xl mb-4">
          Verify Your Email
        </h1>
        <p className="text-sm text-gray-300 text-center mb-6">
          check your email,for verification code
        </p>
        <form className="space-y-6" onSubmit={(e)=>handleSubmite(e)}>
          <div className="flex justify-center space-x-4">
            {code.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                maxLength={4}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-12 text-center text-2xl font-bold bg-gray-700 text-white border-2 border-gray-500 outline-none rounded-lg focus:border-green-700 "
              />
            ))}
          </div>
          {error && <p className="text-red-500 font-semibold m-auto ">{error}</p>}
          <motion.button
            className="w-full bg-gradient-to-r from-green-600 to-emerald-800 bg-opacity-15  py-3 text-white font-bold text-xl shadow-2xl outline-none hover:from-green-600 hover:to-emerald-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 px-4 focus:ring-offset-2 focus:ring-offset-gray-900 rounded-sm mt-4 mb-4"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.5 }}
            disabled={isLoading}
            type="submit"
          >
            {isLoading ? (
              <Loader2 className="animate-spin mx-auto size-7" />
            ) : (
              "Verify Email"
            )}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default VerifyEmail;
