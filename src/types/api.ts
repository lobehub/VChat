export enum ErrorTypeEnum {
  API_KEY_MISSING = 'API_KEY_MISSING',
  OPENAI_API_ERROR = 'OPENAI_API_ERROR',
  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
}

export interface APIErrorResponse {
  success: boolean;
  message: string;
  errorType: ErrorTypeEnum;
}
