enum METHODS {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

type Options = {
  method: METHODS;
  data?: XMLHttpRequestBodyInit | unknown;
  headers?: Record<string, string>;
  timeout?: number;
};

type OptionsWithoutMethod = Omit<Options, 'method'>;

function queryStringify(data: XMLHttpRequestBodyInit | unknown): string {
  if (!data || typeof data !== 'object') return '';

  const entries = Object.entries(data as XMLHttpRequestBodyInit);
  if (entries.length === 0) return '';
  return `?${entries
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`)
    .join('&')}`;
}

export class HTTPTransport {
  private apiUrl: string = '';

  constructor(apiPath: string) {
    this.apiUrl = `https://ya-praktikum.tech/api/v2/${apiPath}`;
  }

  public get<T>(url: string, options: OptionsWithoutMethod = {}): Promise<T> {
    return this.request<T>(`${this.apiUrl}${url}`, { ...options, method: METHODS.GET });
  }

  public post<T>(url: string, options: OptionsWithoutMethod = {}): Promise<T> {
    return this.request<T>(`${this.apiUrl}${url}`, { ...options, method: METHODS.POST });
  }

  public put<T>(url: string, options: OptionsWithoutMethod = {}): Promise<T> {
    return this.request<T>(`${this.apiUrl}${url}`, { ...options, method: METHODS.PUT });
  }

  public delete<T>(url: string, options: OptionsWithoutMethod = {}): Promise<T> {
    return this.request<T>(`${this.apiUrl}${url}`, { ...options, method: METHODS.DELETE });
  }

  private request<T>(url: string, options: Options = { method: METHODS.GET }): Promise<T> {
    const { headers = {}, method, data } = options;

    return new Promise((resolve, reject) => {
      if (!method) {
        reject(new Error('No method'));
        return;
      }

      const xhr = new XMLHttpRequest();
      const isGet = method === METHODS.GET;
      const isFormData = data instanceof FormData;

      xhr.withCredentials = true;

      const urlWithQuery = isGet && data && !isFormData ? `${url}${queryStringify(data)}` : url;
      xhr.open(method, urlWithQuery);

      if (!isFormData) {
        Object.keys(headers).forEach((key) => {
          xhr.setRequestHeader(key, headers[key]);
        });
      }

      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            const response = xhr.responseText ? JSON.parse(xhr.responseText) : null;
            resolve(response);
          } catch (error) {
            resolve(xhr.responseText as T);
          }
        } else {
          try {
            const errorResponse = xhr.responseText
              ? JSON.parse(xhr.responseText)
              : {
                  reason: xhr.statusText || `HTTP error ${xhr.status}`,
                };
            reject(errorResponse);
          } catch (error) {
            reject({
              reason: xhr.statusText || `HTTP error ${xhr.status}`,
              responseText: xhr.responseText,
            });
          }
        }
      };

      xhr.onabort = () => reject(new Error('Request aborted'));
      xhr.onerror = () => reject(new Error('Request failed'));
      xhr.ontimeout = () => reject(new Error('Request timeout'));

      if (options.timeout) {
        xhr.timeout = options.timeout;
      }

      if (isGet || !data) {
        xhr.send();
      } else if (isFormData) {
        xhr.send(data as FormData);
      } else {
        if (!headers['Content-Type']) {
          xhr.setRequestHeader('Content-Type', 'application/json');
        }
        xhr.send(JSON.stringify(data));
      }
    });
  }
}
