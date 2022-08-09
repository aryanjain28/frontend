import axios, { Axios, AxiosRequestHeaders } from "axios";

const axiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BACKEND_API_BASE_URL}/`,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "*",
  },
  withCredentials: false,
});

export function GET<Params, Response>(
  url: string,
  params?: Params,
  headers?: AxiosRequestHeaders
): Promise<Response> {
  return axiosInstance.get(url, { params, headers }).then((res) => res.data);
}

export function POST<Payload, Response>(
  url: string,
  data: Payload,
  headers?: AxiosRequestHeaders
): Promise<Response> {
  return axiosInstance.post(url, data, { headers }).then((res) => res.data);
}

export function PUT<Payload, Response>(
  url: string,
  data: Payload,
  headers?: AxiosRequestHeaders
): Promise<Response> {
  return axiosInstance.put(url, data, { headers }).then((res) => res.data);
}

export function PATCH<Payload, Response>(
  url: string,
  data: Payload,
  headers?: AxiosRequestHeaders
): Promise<Response> {
  return axiosInstance.patch(url, data, { headers }).then((res) => res.data);
}

export function DELETE<Params, Response>(
  url: string,
  params: Params,
  headers?: AxiosRequestHeaders
): Promise<Response> {
  return axiosInstance
    .delete(url, { data: params, headers })
    .then((res) => res.data);
}
