import { SET_USER, SetUserAction } from "../types";
import { UserBaseDto } from "../../../api/dto/AccountDto";

export interface UserState extends UserBaseDto {}

const initialState: UserState = {
  userName: "",
  email: "",
  firstName: "",
  lastName: "",
};

export default function (
  state = initialState,
  action: SetUserAction
): UserState {
  const { type, payload } = action;
  switch (type) {
    case SET_USER:
      return {
        ...state,
        ...payload,
      };
    default:
      return state;
  }
}
