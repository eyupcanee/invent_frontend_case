import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MovieOptions {
  title: string;
  type: "movie" | "series" | "episode";
  year: string | undefined;
}

const initialState: MovieOptions = {
  title: "Pokemon",
  type: "movie",
  year: undefined,
};

const movieOptionSlice = createSlice({
  name: "movieOptions",
  initialState,
  reducers: {
    changeTitle(state, actions: PayloadAction<string>) {
      state.title = actions.payload;
    },
    changeType(state, actions: PayloadAction<"movie" | "series" | "episode">) {
      state.type = actions.payload;
    },
    changeYear(state, actions: PayloadAction<string>) {
      state.year = actions.payload;
    },
  },
});

export const { changeTitle, changeType, changeYear } = movieOptionSlice.actions;

export default movieOptionSlice.reducer;
