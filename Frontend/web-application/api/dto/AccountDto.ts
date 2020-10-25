export interface UserBaseDto {
  userName: string;
  email: string;
  firstName: string;
  lastName: string;
}

export interface UserCreateDto extends UserBaseDto {
  password: string;
}

export interface UserLoginDto {
  email: string;
  password: string;
}
