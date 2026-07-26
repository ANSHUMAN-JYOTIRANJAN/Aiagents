import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export default function MessageList()
{

    const bottomref = useRef(null);
    const { messages, isLoading } = useSelector(state => state.message);
    const { selectedConversation } = useSelector(state => state.conversation);
    const dispatch = useDispatch();

    useEffect(() =>
    {

    })
    return (
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {messages.length === 0 && !isLoading ? (
                <div className="h-full flex flex-col items-center justify-center gap-4 text-center">
                    <div className="flex flex-col gap-1.5">
                        <h1 className="text-[20px] font-semibold text-slate-200 tracking-tight">CodexAI</h1>
                        <h3 className="text-[15px] font-semibold text-slate-400 tracking-tight">How can I help you?</h3>
                        <p className="text-[13px] text-slate-600 max-w-[260px] leading-relaxed">Ask me anything — code, ideas, explanations, or just a quick question.</p>
                    </div>
                    <div className="flex flex-wrap justify-center gap-2 mt-1">
                        {["Write a Netflix clone", "Explain Redis", "Build a dashboard"].map((s) => (
                            <button
                                key={s}
                                className="text-[12px] text-slate-400 bg-white/[0.04] border border-white/[0.07] px-3.5 py-1.5 rounded-lg hover:bg-white/[0.08] hover:text-slate-200 transition-colors duration-150 cursor-pointer"
                            >
                                {s}
                            </button>
                        ))}
                    </div>
                </div>
            ) : (
                <>
                    {messages.map((msg, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.22, ease: "easeOut" }}
                        >
                            <MessageBubble role={msg.role} content={msg.content} images={msg?.images || []} />
                        </motion.div>
                    ))}

                    {isLoading && (
                        <motion.div
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                        >
                            <GeneratingIndicator />
                        </motion.div>
                    )}

                </>
            )}
            <div ref={bottomRef} />
        </div>
    )
}
