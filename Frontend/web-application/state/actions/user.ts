import { SET_USER, SetUserAction } from "../types";
import { UserBaseDto } from "../../../api/dto/AccountDto";

export const setCityName = (user: UserBaseDto): SetUserAction => {
  return {
    type: SET_USER,
    payload: user,
  };
};
