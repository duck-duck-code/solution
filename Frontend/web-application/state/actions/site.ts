import {
  SET_PAGE,
  SetPageAction,
  Page,
  SET_MODE,
  SetModeAction,
} from "../types";

export const setPage = (page: Page): SetPageAction => {
  return {
    type: SET_PAGE,
    payload: page,
  };
};

export const setMode = (mode: "light" | "dark"): SetModeAction => {
  localStorage.setItem("mode", mode);

  return {
    type: SET_MODE,
    payload: mode,
  };
};
