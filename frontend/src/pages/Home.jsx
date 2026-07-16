import React from "react";
import api from "../utils/axios.js";
import { auth, googleProvider } from "../utils/firebase.js";
import { FcGoogle } from "react-icons/fc";
import { signInWithPopup } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../redux/user.slice.js";
export default function Home() {
  const { userData } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleLogin = async (token) => {
    try {
      const { data } = await api.post("api/auth/login", { token });
      // console.log("Login response:", data);
      dispatch(setUserData(data));
    } catch (error) {
      console.error("Login request failed:", error);
    }
  };

  const googleLogin = async () => {
    const result = await signInWithPopup(auth, googleProvider);
    const token = await result.user.getIdToken();
    console.log("Firebase token:", token);
    await handleLogin(token);
    // console.log("Firebase user:", result.user);

    // console.error("Google login failed:", error);
    console.log(result);
  };
  return (
    <div className="h-screen flex bg-[#0d0f14] text-white overflow-hidden">
      {!userData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="w-[340px] bg-[#13151c] border border-white/[0.08] rounded-2xl p-7 flex flex-col gap-5">
            <div className="flex flex-col gap-1">
              <h2 className="text-[17px] font-semibold text-slate-100 tracking-tight">
                Welcome to CortexAI
              </h2>
              <p className="text-[13px] text-slate-500">
                Please login to continue using the app.
              </p>
            </div>
            <div>
              <button
                onClick={googleLogin}
                className="w-full flex items-center justify-center gap-3 py-[11px] rounded-xl text-sm font-medium text-black/90 bg-white hover:bg-gray-200  transition-all duration-150 cursor-pointer "
              >
                <FcGoogle size={15} /> Continue with Google
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
