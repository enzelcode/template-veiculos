/**
 * Types para respostas da API
 */

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface ApiErrorResponse {
  success: false;
  error: string;
  details?: Record<string, string[]>;
}

export interface ApiSuccessResponse<T> {
  success: true;
  data: T;
  message?: string;
}

/**
 * Resposta de upload de imagem
 */
export interface UploadResponse {
  url: string;
  filename: string;
}

/**
 * Parâmetros de query string
 */
export interface QueryParams {
  [key: string]: string | number | boolean | undefined;
}
