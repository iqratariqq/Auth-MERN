import { motion } from "framer-motion";
import { AuthStore } from "../store/authStore";
import { formatDate } from "../Utilis/date";
import { Loader2 } from "lucide-react";

const DashboardPage = () => {
  const {logout,isLoading,error,user} = AuthStore();
  const handleLogout = async (e) => {
    e.preventDefault();
    await logout();
  };
  console.log("user in dashboard page", user);

  return (
    <motion.div
      className="max-w-md w-full mx-auto p-4 bg-gray-900  backdrop-filter backdrop-blur-lg bg-opacity-80 shadow-2xl rounded-xl border border-gray-600"
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-3xl font-bold   bg-gradient-to-r from-green-500 to-green-950 bg-clip-text text-transparent  mb-4 text-center ">
        Dashboard
      </h3>
      <div className="space-y-6">
        <motion.div
          className="p-4 bg-gray-800 rounded-lg shadow-md bg-opacity-40 border  border-gray-700"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h4 className="text-xl font-semibold text-green-400 mb-3">
            Profile Information
          </h4>
          <p className="text-gray-300">Name: {user.name}</p>
          <p className="text-gray-300">Email: {user.email}</p>
        </motion.div>
        <motion.div
          className="p-4 bg-gray-800 rounded-lg shadow-md bg-opacity-40 border  border-gray-700"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h4 className="text-xl font-semibold text-green-400 mb-3">
            Activity Details
          </h4>
          <p className="text-gray-300">
            {user.lastlogin ? (
              <span>Last Login: {formatDate(user.lastlogin)} </span>
            ) : (
              " You Just SignUP"
            )}
          </p>
          <p className="text-gray-300">
            {user.lastlogin ? (
              <span>Joined: {formatDate(user.createdAt)} </span>
            ) : (
              " You Just SignUP"
            )}
          </p>
        </motion.div>
      </div>
      <motion.div
      className="mt-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >

      {error && <p className="text-red-500 font-semibold mt-3">{error}</p>}
        <motion.button
          className="w-full bg-gradient-to-r from-green-500 to-emerald-800 bg-opacity-15  py-3 text-white font-bold text-xl shadow-2xl outline-none hover:from-green-600 hover:to-emerald-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 px-4 focus:ring-offset-2 focus:ring-offset-gray-900 rounded-sm  mt-5"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.5 }}
          onClick={(e)=>handleLogout(e)}
        >
          {isLoading ? <Loader2 className="m-auto size-15 animate-spin"/>: " Log Out"}
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default DashboardPage;
