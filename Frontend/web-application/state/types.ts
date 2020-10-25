import { UserBaseDto } from "../../api/dto/AccountDto";
import { PointData } from "../api/dto/SearchDto";

export const SET_USER = "SET_USER";

export interface SetUserAction {
  type: typeof SET_USER;
  payload: UserBaseDto;
}

export const SET_POINTS = "SET_POINTS";

export interface SetPointsAction {
  type: typeof SET_POINTS;
  payload: Array<PointData>;
}

export const SET_PAGE = "SET_PAGE";
export const SET_MODE = "SET_MODE";

export type Page =
  | "shoplist"
  | "favourite"
  | "search"
  | "recently"
  | "settings";

export interface SetPageAction {
  type: typeof SET_PAGE;
  payload: Page;
}

export interface SetModeAction {
  type: typeof SET_MODE;
  payload: "light" | "dark";
}
