export enum ErrorStatusCode {
  BadRequest = 400,
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  InternalServerError = 500
}

export enum SuccessStatusCode {
  OK = 200,
  Created = 201,
  Accepted = 202
}

export type SuccessResponse<T> = {
  success: true;
  status: SuccessStatusCode;
  data: T;
  error: undefined;
};

export type ErrorResponse = {
  success: false;
  status: ErrorStatusCode;
  error: string;
};

export type DatabaseResponse<T> = SuccessResponse<T> | ErrorResponse;