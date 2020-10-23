import { UserBaseDto } from "../../api/dto/AccountDto";

export const SET_USER = "SET_USER";

export interface SetUserAction {
  type: typeof SET_USER;
  payload: UserBaseDto;
}
