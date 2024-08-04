import { RequestOptions } from "../../interfaces/repositoriesInterfaces";

export default class BaseRepository{
    protected API_URL:string =  import.meta.env.VITE_API_URL as string;

    async apiRequest<T>(options: RequestOptions): Promise<T> {
        const { url, method, body,/* token, headers = {} */ } = options;
      
        const defaultHeaders: Record<string, string> = {
          "Content-Type": "application/json",
          //...headers,
        };
      
        /*
        if (token) {
          defaultHeaders["Authorization"] = `Bearer ${token}`;
        }
        */
      
        const config: RequestInit = {
          method,
          headers: defaultHeaders,
          credentials: "include",
        };
      
        if (body) {
          config.body = JSON.stringify(body);
        }
      
        try {
          const response = await fetch(url, config);
      
          const result = {
            status: response.status,
            ok: response.ok,
            data: null as any,
            error: null as string | null,
          };
      
          if (response.ok) {
            result.data = await response.json();
          } else {
            result.error = await response.text();
          }
      
          return result as T;
        } catch (error) {
          console.error("Network error:", error);
          return { error: "Network error", status: 0, ok: false } as T;
        }
      }
}