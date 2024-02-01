export enum HttpMethods {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export default function superFetch<T>(
  url: string,
  method: HttpMethods = HttpMethods.GET,
  options?: RequestInit
): Promise<T> {
  if (method != HttpMethods.GET) {
    // Add JSON headers
    options = {
      headers: {
        'Content-Type': 'application/json',
      },
      ...options,
    };
  }

  return fetch(url, { method, ...options }).then((response: Response) => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }

    if (response.headers.get('Content-Type')?.includes('application/json')) {
      return response.json();
    }

    return response;
  });
}
