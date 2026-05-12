export interface JwtPayload {
  sub: string;
  role: string;
}

export interface RequestUser {
  userId: string;
  role: string;
}
