import Controller from "./Controller";
import { UserCreateDto, UserLoginDto } from "../dto/AccountDto";

export default class AccountController extends Controller {
  async createUser(userDto: UserCreateDto) {
    await this.post(`api/accounts/`, userDto);
  }

  async login(userDto: UserLoginDto): Promise<{ token: string }> {
    const res = await this.post<UserLoginDto, { token: string }>(
      `api/accounts/login`,
      userDto
    );

    return res;
  }
}
