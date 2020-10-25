import { PointData } from "../../api/dto/SearchDto";
import { SET_POINTS, SetPointsAction } from "../types";

export interface GeoState {
  points: Array<PointData>;
}

const initialState: GeoState = {
  points: [],
};

export default function (
  state = initialState,
  action: SetPointsAction
): GeoState {
  const { type, payload } = action;
  switch (type) {
    case SET_POINTS:
      return {
        ...state,
        points: [...payload],
      };
    default:
      return state;
  }
}
