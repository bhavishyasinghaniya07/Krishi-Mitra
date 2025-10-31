import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/axios";

const initialState = {
  messages: [],
};

export const fetchMessages = createAsyncThunk(
  "messages/fetchMessages",
  async ({ token, userId }) => {
    const { data } = await api.post(
      "/api/message/get",
      { to_user_id: userId },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    // Always return a consistent structure
    if (data.success) {
      // Some APIs return 'message' instead of 'messages'
      return data.messages || data.message || [];
    } else {
      return [];
    }
  }
);

const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    setMessages: (state, action) => {
      state.messages = Array.isArray(action.payload)
        ? action.payload
        : [action.payload];
    },
    addMessages: (state, action) => {
      if (!Array.isArray(state.messages)) state.messages = [];
      state.messages = [...state.messages, action.payload];
    },
    resetMessages: (state) => {
      state.messages = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMessages.fulfilled, (state, action) => {
      state.messages = Array.isArray(action.payload)
        ? action.payload
        : [action.payload];
    });
  },
});

export const { setMessages, addMessages, resetMessages } =
  messagesSlice.actions;

export default messagesSlice.reducer;
