import { BaseException } from './BaseException';

export class BadRequestException extends BaseException {
  constructor(message: string = 'Bad request') {
    super(message, 400);
  }
}
