import { createSlice } from "@reduxjs/toolkit";

const mailFilterSlice = createSlice({
  name: "mail_filter",
  initialState: {
    searchText: "",
    selectedSenderOptions: undefined,
    selectedPriorityOptions: undefined,
    startDate: null,
    endDate: null,
    focusedDate: null,
  },
  reducers: {
    setSearchText(state, action) {
      state.searchText = action.payload;
    },
    setSelectedSenderOptions(state, action) {
      state.selectedSenderOptions = action.payload;
    },
    setSelectedPriorityOptions(state, action) {
      state.selectedPriorityOptions = action.payload;
    },
    setStartDate(state, action) {
      state.startDate = action.payload;
    },
    setEndDate(state, action) {
      state.endDate = action.payload;
    },
    setFocusedDate(state, action) {
      state.focusedDate = action.payload;
    },
  },
});

export const {
  setSearchText,
  setSelectedSenderOptions,
  setSelectedPriorityOptions,
  setStartDate,
  setEndDate,
  setFocusedDate,
} = mailFilterSlice.actions;

export default mailFilterSlice.reducer;
