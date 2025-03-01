import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  darkMode: false,
  sidebarOpen: false,
}

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen
    },
    setSidebarOpen: (state, action) => {
      state.sidebarOpen = action.payload
    },
  },
})

export const { toggleDarkMode, toggleSidebar, setSidebarOpen } = uiSlice.actions

export const selectUI = (state) => state.ui
export const selectDarkMode = (state) => state.ui.darkMode
export const selectSidebarOpen = (state) => state.ui.sidebarOpen

export default uiSlice.reducer

