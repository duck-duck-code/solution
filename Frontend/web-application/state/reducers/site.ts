import { SET_PAGE, SET_MODE, Page } from "../types";

export interface SiteState {
  page: Page;
  mode: "light" | "dark";
}

const initialState: SiteState = {
  page: "search",
  mode: /* (localStorage.getItem("mode") as "light" | "dark") ||  */"light",
};

export default function (state = initialState, action): SiteState {
  const { type, payload } = action;
  switch (type) {
    case SET_PAGE:
      return {
        ...state,
        page: payload,
      };
    case SET_MODE:
      return {
        ...state,
        mode: payload,
      };
    default:
      return state;
  }
}
