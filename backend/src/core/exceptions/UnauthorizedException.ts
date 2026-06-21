import { BaseException } from './BaseException';

export class UnauthorizedException extends BaseException {
  constructor(message: string = 'Unauthorized access') {
    super(message, 401);
  }
}
