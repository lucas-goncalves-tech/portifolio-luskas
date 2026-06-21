import { BaseException } from './BaseException';

export class NotFoundException extends BaseException {
  constructor(message: string = 'Resource not found') {
    super(message, 404);
  }
}
