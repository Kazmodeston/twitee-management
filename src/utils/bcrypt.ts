import * as bcrypt from 'bcrypt';
import { Md5 } from 'ts-md5';

export function hashPassword(rawPassword: string): string {
  const SALT = 10;
  const hash = bcrypt.hashSync(rawPassword, SALT);
  return hash;
}

export function generateActivationCode(): string {
  const codeOne = new Date().getTime() + (Math.random() * 1e32).toString(36);
  const codeTwo = new Date().getTime().toString(36).substring(2, 36);

  return codeOne + codeTwo;
}

export function md5(value: string): string {
  return Md5.hashStr(value);
}
