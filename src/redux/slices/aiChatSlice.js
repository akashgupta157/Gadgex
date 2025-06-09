import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchChatHistory = createAsyncThunk(
  "aiChat/fetchChatHistory",
  async ({ productId, config }) => {
    try {
      const {
        data: { history },
      } = await axios.get(
        `/api/product/ai-chat?productId=${productId}`,
        config
      );
      return history;
    } catch (error) {
      console.error("Error fetching chat history:", error);
      throw new Error(
        error.response?.data?.message || "Failed to fetch chat history"
      );
    }
  }
);

export const sendMessage = createAsyncThunk(
  "aiChat/sendMessage",
  async ({ productId, question, config }) => {
    try {
      const { data } = await axios.post(
        `/api/product/ai-chat`,
        { productId, question },
        config
      );
      return { answer: data.answer };
    } catch (error) {
      console.error("Error sending message:", error);
      throw new Error(
        error.response?.data?.message || "Failed to send message"
      );
    }
  }
);
const initialState = {
  messages: [],
  loading: false,
  loadingAnswer: false,
  error: null,
};

const aiChatSlice = createSlice({
  name: "aiChat",
  initialState,
  reducers: {
    addQuestion: (state, action) => {
      state.messages = [
        ...state.messages,
        {
          question: action.payload,
          answer: "",
          isLoading: true,
          timestamp: new Date().toISOString(),
        },
      ];
    },
    clearMessages: (state) => {
      state.messages = [];
      state.loading = false;
      state.loadingAnswer = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChatHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchChatHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.messages = action.payload.map((msg) => ({
          ...msg,
          isLoading: false,
        }));
      })
      .addCase(fetchChatHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(sendMessage.pending, (state) => {
        state.loadingAnswer = true;
        state.error = null;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.loadingAnswer = false;
        const { answer } = action.payload;
        const lastIndex = state.messages.length - 1;
        if (lastIndex >= 0) {
          state.messages[lastIndex] = {
            ...state.messages[lastIndex],
            answer,
            isLoading: false,
            timestamp: new Date().toISOString(),
          };
        }
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.loadingAnswer = false;
        state.error = action.error.message;
        const lastIndex = state.messages.length - 1;

        if (lastIndex >= 0) {
          state.messages[lastIndex] = {
            ...state.messages[lastIndex],
            answer: "Sorry, I couldn't process your question",
            isLoading: false,
          };
        }
      });
  },
});
export default aiChatSlice.reducer;

export const { clearChat, addQuestion, clearMessages } = aiChatSlice.actions;
