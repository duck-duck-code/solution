import { useSelector, useDispatch } from "react-redux";
import { setMode } from "../state/actions/site";
import { AppState } from "../state/reducers";
import { SiteState } from "../state/reducers/site";

export default function useColorMode(): ["light" | "dark", () => void] {
  const site: SiteState = useSelector((state: AppState) => state.site);
  const dispatch = useDispatch();

  const changeMode = () => {
    if (site.mode === "light") dispatch(setMode("dark"));
    else dispatch(setMode("light"));
  };

  return [site.mode, changeMode];
}
