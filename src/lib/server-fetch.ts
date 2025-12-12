import { getCookie } from "../app/tokenHandler";

const serverFetchHelper = async (
  endpoint: string,
  options: RequestInit & { next?: { tags?: string[] } } = {}
): Promise<Response> => {
  const { headers, next, ...rest } = options;
  const accessToken = await getCookie("accessToken");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}${endpoint}`,
    {
      headers: {
        ...headers,
        Cookie: accessToken ? `accessToken=${accessToken.value}` : "",
      },
      ...rest,
      credentials: "include",
      next,
    }
  );

  return response;
};


export const serverFetch ={
    get: (endpoint: string, options: RequestInit={}): Promise<Response> => serverFetchHelper(endpoint, {...options, method: "GET" }),

    post: (endpoint: string, options: RequestInit={}): Promise<Response> => serverFetchHelper(endpoint, {...options, method: "POST" }),

    put: (endpoint: string, options: RequestInit={}): Promise<Response> => serverFetchHelper(endpoint, {...options, method: "PUT" }),

    patch: (endpoint: string, options: RequestInit={}): Promise<Response> => serverFetchHelper(endpoint, {...options, method: "PATCH" }),
    
    delete: (endpoint: string, options: RequestInit={}): Promise<Response> => serverFetchHelper(endpoint, {...options, method: "DELETE" }),
}