import {
  BadRequestException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

export class NotFoundCustomException extends NotFoundException {
  constructor(message?: string | object | any, error?: string) {
    super(message, error);
  }
}
export class BadRequestCustomException extends BadRequestException {
  constructor(message?: string | object | any, error?: string) {
    super(message, error);
  }
}
export class UnauthorizedCustomException extends UnauthorizedException {
  constructor(message?: string | object | any, error?: string) {
    super(message, error);
  }
}
