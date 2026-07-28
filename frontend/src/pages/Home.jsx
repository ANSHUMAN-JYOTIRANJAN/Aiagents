import { useDispatch, useSelector } from "react-redux";
import { FaGoogle } from "react-icons/fa";
// import ArtifactPanel from "../components/ArtifactPanel";
// import ChatArea from "../components/ChatArea";
// import Sidebar from "../components/Sidebar";
import ArtifactPanel from "../components/ArtifactPannel";
import ChatArea from "../components/chatArea";
import Sidebar from "../components/sideBar";
import api from "../utils/axios";
import { setUserData } from "../redux/user.slice";
import { signInWithPopup } from "firebase/auth";
// import { auth, googleProvider } from "../../firebase";
import { auth, googleProvider } from "../utils/firebase.js"
function Home()
{
  const { userData } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const login = async (token) =>
  {
    try {
      const { data } = await api.post(`/api/auth/login`, { token });
      dispatch(setUserData(data?.user ?? data));
    } catch (error) {
      console.log(error);
    }
  };
  const handleGoogleLogin = async () =>
  {
    const result = await signInWithPopup(auth, googleProvider);
    const token = await result.user.getIdToken();
    await login(token);
  };
  const handleGoogleSignUp = async () =>
  {
    await handleGoogleLogin();
  };

  return (
    <div className="h-screen flex bg-[#0d0f14] text-white overflow-hidden">
      <Sidebar />
      <ChatArea />
      <ArtifactPanel />

      {!userData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
          <div className="w-full max-w-3xl rounded-3xl bg-[#12131a] border border-white/[0.08] p-8 shadow-2xl shadow-black/40">
            <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
              <div className="flex flex-col justify-center gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-indigo-300/80">Welcome to CortexAI</p>
                  <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">
                    Your AI workspace starts here.
                  </h2>
                </div>
                <p className="text-sm leading-6 text-slate-400">
                  Sign in or sign up with Google to unlock your chat history, saved conversations, and personalized AI assistant.
                </p>
                <div className="grid gap-3 sm:grid-cols-2">
                  <button
                    onClick={handleGoogleLogin}
                    className="flex items-center justify-center gap-2 rounded-2xl border border-indigo-500/30 bg-gradient-to-br from-indigo-500 to-violet-700 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition-all duration-150 hover:from-indigo-400 hover:to-violet-600"
                  >
                    <FaGoogle size={16} />
                    Continue with Google
                  </button>
                  <button
                    onClick={handleGoogleSignUp}
                    className="flex items-center justify-center gap-2 rounded-2xl border border-white/[0.12] bg-white/5 px-5 py-3 text-sm font-semibold text-slate-100 transition-all duration-150 hover:bg-white/10"
                  >
                    <FaGoogle size={16} />
                    Sign up with Google
                  </button>
                </div>
                <p className="text-xs text-slate-500">
                  Once signed in, you will gain access to the full CortexAI workspace.
                </p>
              </div>
              <div className="rounded-3xl border border-white/[0.06] bg-white/5 p-6 shadow-inner shadow-black/20">
                <h3 className="text-lg font-semibold text-white">What you get</h3>
                <ul className="mt-5 space-y-3 text-sm text-slate-300">
                  <li className="flex gap-3">
                    <span className="mt-1 h-2.5 w-2.5 rounded-full bg-emerald-400" />
                    Access your chat records and continue where you left off.
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-1 h-2.5 w-2.5 rounded-full bg-emerald-400" />
                    Use AI tools for chat, code, image generation, and more.
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-1 h-2.5 w-2.5 rounded-full bg-emerald-400" />
                    Secure sign-in through Google and your session stays active.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
