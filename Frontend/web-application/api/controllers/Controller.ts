import axious, { AxiosError, AxiosRequestConfig } from "axios";

export default class Controller {
  protected async post<T, K>(
    url: string,
    data?: T,
    config?: AxiosRequestConfig
  ): Promise<K> {
    try {
      const res = await axious.post(url, data, config);

      return res.data as K;
    } catch (err) {
      throw (err as AxiosError).response;
    }
  }

  protected async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    try {
      const res = await axious.get(url, config);

      return res.data as T;
    } catch (err) {
      throw (err as AxiosError).response;
    }
  }
}
