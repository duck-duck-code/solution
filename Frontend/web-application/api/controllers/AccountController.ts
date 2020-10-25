import Controller from "./Controller";
import { UserCreateDto, UserLoginDto } from "../dto/AccountDto";
import { baseUrl } from "..";

export default class AccountController extends Controller {
  async createUser(userDto: UserCreateDto) {
    await this.post(`${baseUrl}/api/accounts/`, userDto);
  }

  async login(userDto: UserLoginDto): Promise<{ token: string }> {
    const res = await this.post<UserLoginDto, { token: string }>(
      `${baseUrl}/api/accounts/login`,
      userDto
    );

    return res;
  }
}
