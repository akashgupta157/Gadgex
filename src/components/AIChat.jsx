import { Button } from "./ui/button";
import { configure } from "@/utils/misc";
import { useToast } from "@/hooks/use-toast";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useRef, useState } from "react";
import { Bot, CircleAlert, Loader2, Send, X } from "lucide-react";
import {
  addQuestion,
  clearMessages,
  fetchChatHistory,
  sendMessage,
} from "@/redux/slices/aiChatSlice";

export default function AIChat({ productId, showChat, setShowChat }) {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const { user } = useSelector((state) => state.user);
  const { isDark } = useSelector((state) => state.theme);
  const { messages, loading, loadingAnswer, error } = useSelector(
    (state) => state.aiChat
  );

  const [question, setQuestion] = useState("");
  const [displayedAnswers, setDisplayedAnswers] = useState({});
  const chatEndRef = useRef(null);
  const typingIntervals = useRef({});
  const scrollTimeoutRef = useRef(null);

  const showToast = (icon, message, variant) => {
    toast({
      title: (
        <div className="flex items-center gap-2">
          {icon}
          {message}
        </div>
      ),
      variant,
    });
  };

  useEffect(() => {
    if (showChat) {
      dispatch(clearMessages());
      dispatch(fetchChatHistory({ productId, config: configure(user?.token) }));
    }
  }, [productId, showChat, dispatch, user]);

  useEffect(() => {
    if (error) {
      showToast(<CircleAlert className="text-red-500" />, error, "destructive");
    }
  }, [error, showToast]);

  useEffect(() => {
    messages.forEach((msg, index) => {
      if (typingIntervals.current[index]) {
        clearInterval(typingIntervals.current[index]);
        delete typingIntervals.current[index];
      }

      if (
        msg.answer &&
        !msg.isLoading &&
        displayedAnswers[index] !== msg.answer
      ) {
        if (
          msg.timestamp &&
          Date.now() - new Date(msg.timestamp).getTime() > 1000
        ) {
          setDisplayedAnswers((prev) => ({ ...prev, [index]: msg.answer }));
        } else {
          animateTyping(index, msg.answer);
        }
      }
    });

    scrollToBottom();

    return () => {
      Object.values(typingIntervals.current).forEach((interval) =>
        clearInterval(interval)
      );
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, [messages]);

  const animateTyping = (index, answer) => {
    let i = 0;
    const speed = 20;

    typingIntervals.current[index] = setInterval(() => {
      setDisplayedAnswers((prev) => ({
        ...prev,
        [index]: answer.slice(0, i),
      }));

      if (i % 5 === 0 || i === answer.length) {
        scrollToBottom();
      }

      i++;
      if (i > answer.length) {
        clearInterval(typingIntervals.current[index]);
        delete typingIntervals.current[index];
      }
    }, speed);
  };

  const scrollToBottom = () => {
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    scrollTimeoutRef.current = setTimeout(() => {
      chatEndRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }, 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!question.trim() || loadingAnswer) return;

    dispatch(addQuestion(question));
    setQuestion("");
    scrollToBottom();

    dispatch(
      sendMessage({ productId, question, config: configure(user?.token) })
    );
  };

  return (
    <div
      className={`flex flex-col h-[70vh] sm:h-[500px] w-full sm:w-[400px] mx-auto rounded-xl shadow-md ${
        isDark ? "bg-zinc-950" : "bg-white"
      }`}
    >
      {/* Chat Header */}
      <div className="flex justify-between items-center bg-[#38B854] border border-[#38B854] rounded-t-xl">
        <div className="flex items-center gap-2 px-4 py-2 font-semibold text-white text-lg">
          <span role="img" aria-label="AI">
            🤖
          </span>
          AI Chatbot
        </div>

        <Button
          onClick={() => setShowChat(false)}
          aria-label="Close Chat"
          className="bg-transparent hover:bg-transparent text-white"
        >
          <X />
        </Button>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 space-y-4 px-3 sm:px-4 py-2 overflow-y-scroll hide-scrollbar">
        {loading && messages.length === 0 ? (
          <div className="flex justify-center items-center h-full">
            <Loader2 className="size-10 text-[#38B854] animate-spin" />
          </div>
        ) : messages.length === 0 ? (
          <div className="flex flex-col justify-center items-center px-2 h-full text-gray-400 text-center">
            <CircleAlert className="mb-2 w-8 h-8" />
            <span>No chat history yet. Start a conversation!</span>
          </div>
        ) : (
          messages.map((msg, idx) => (
            <div key={idx} className="space-y-4">
              {/* User question */}
              <div className="flex justify-end items-start gap-2">
                <div className="bg-[#38B854] px-3 py-2 rounded-lg max-w-[90%] sm:max-w-[80%] text-white text-sm">
                  {msg.question}
                </div>
                <div className="flex justify-center items-center bg-[#38B854] rounded-full size-7 text-white text-sm shrink-0">
                  {user?.name[0]?.toUpperCase()}
                </div>
              </div>

              {/* AI answer */}
              <div className="flex items-start gap-2">
                <div className="flex justify-center items-center bg-gray-200 rounded-full size-7 text-gray-800 shrink-0">
                  <Bot className="w-4 h-4" />
                </div>
                <div
                  className={`max-w-[90%] sm:max-w-[80%] rounded-lg px-3 py-2 ${
                    isDark
                      ? "bg-zinc-800 text-white"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {msg.isLoading ? (
                    <div className="flex gap-1">
                      <div className="bg-gray-400 rounded-full w-2 h-2 animate-bounce" />
                      <div
                        className="bg-gray-400 rounded-full w-2 h-2 animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      />
                      <div
                        className="bg-gray-400 rounded-full w-2 h-2 animate-bounce"
                        style={{ animationDelay: "0.4s" }}
                      />
                    </div>
                  ) : (
                    displayedAnswers[idx] || ""
                  )}
                </div>
              </div>
            </div>
          ))
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Chat Input */}
      <form onSubmit={handleSubmit} className="flex border rounded-b-xl">
        <input
          type="text"
          className={`flex-1 px-4 py-3 outline-none rounded-bl-xl ${
            isDark ? "bg-zinc-950 text-white" : "bg-white"
          }`}
          placeholder="Type your question..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          disabled={loadingAnswer}
        />
        <Button
          type="submit"
          className="bg-transparent hover:bg-[#38B854]/20 disabled:opacity-50 rounded-none rounded-br-xl h-full text-[#38B854]"
          disabled={loadingAnswer || !question.trim()}
        >
          {loadingAnswer ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Send />
          )}
        </Button>
      </form>
    </div>
  );
}
