import { useState } from "react";
import { ChartBar, MessageSquare } from "lucide-react";
import { useSelector } from "react-redux";
// import ThemePicker from "./ThemePicker";

export default function Navbar({ chatBg, setChatBg })
{
  const { conversations, selectedConversation } = useSelector(state => state.conversation);
  const { messages } = useSelector(state => state.message);
  const [showPicker, setShowPicker] = useState(false);
  return (
    <div className="relative h-14 flex items-center justify-between px-5 border-b border-white/[0.06] bg-[#0d0f14]/90 backdrop-blur-sm">

      {/* Left — chat title */}
      <div className="flex items-center gap-2.5">
        <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-indigo-500/10 border border-indigo-500/20">
          <MessageSquare size={13} className="text-indigo-400" />
        </div>
        <h2 className="text-[14px] font-semibold text-slate-100 tracking-tight">
          {selectedConversation?.title}
        </h2>
        <span className="text-[10px] font-medium text-slate-600 bg-white/[0.04] border border-white/[0.06] px-2 py-0.5 rounded-full">
          {messages.length} Messages
        </span>
      </div>

      {/* Right — background picker */}
      {/* <div className="flex items-center gap-3">
        <button
          onClick={() => setShowPicker((prev) => !prev)}
          className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-[11px] text-slate-300 transition-all duration-200 hover:border-white/30"
          type="button"
        >
          <ChartBar size={14} className="text-cyan-300" />
          Theme
        </button>

        {/* {showPicker && (
          // <div className="absolute right-5 top-full z-20 mt-2 w-[280px] rounded-[28px] border border-white/[0.08] bg-[#0b0d14]/95 p-4 shadow-[0_25px_120px_rgba(0,0,0,0.25)] backdrop-blur-xl">
          //   <ThemePicker color={chatBg} setColor={setChatBg} />
          // </div>
        )} */}
      {/* </div> */} 
    </div>
  );
}