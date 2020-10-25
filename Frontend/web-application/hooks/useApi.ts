import { useState } from "react";
import { api } from "../api/index";

type APIMethod<T, M> = (request: T) => Promise<M>;

export const useApi = <T, M>(
  apiMethod: APIMethod<T, M>
): [M | undefined, boolean, (arg: T) => Promise<M>, any] => {
  const [response, setResponse] = useState<M | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [errors, setError] = useState<Error | undefined>(undefined);

  const makeRequest = async (req: T) => {
    setLoading(true);
    setError(undefined);

    try {
      const res = await apiMethod.call(api.controller, req);
      setResponse(res);
      return res;
    } catch (error) {
      setError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return [response, loading, makeRequest, errors];
};
