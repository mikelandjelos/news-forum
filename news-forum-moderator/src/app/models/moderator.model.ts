export interface Moderator {
  readonly id: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly username: string;
  readonly password: string;
  readonly email: string;
  readonly age: number;
  readonly gender: 'm' | 'f';
}
