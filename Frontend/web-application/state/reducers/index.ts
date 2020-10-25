import { combineReducers } from "redux";
import user, { UserState } from "./user";
import geo, { GeoState } from "./geo";
import site, { SiteState } from "./site";

export interface AppState {
  user: UserState;
  geo: GeoState;
  site: SiteState;
}

export default combineReducers<AppState>({
  user,
  geo,
  site,
});
