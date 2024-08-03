type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

export interface RequestOptions {
  url: string;
  method: HttpMethod;
  body?: any;
  //token?: string;
  //headers?: Record<string, string>;
}