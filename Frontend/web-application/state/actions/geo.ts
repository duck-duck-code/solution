import { SET_POINTS, SetPointsAction } from "../types";
import { PointData } from "../../api/dto/SearchDto";

export const setPoints = (points: Array<PointData>): SetPointsAction => {
  return {
    type: SET_POINTS,
    payload: points,
  };
};
