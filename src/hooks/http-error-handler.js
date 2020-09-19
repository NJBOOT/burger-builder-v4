import { useEffect, useState } from "react";

export default httpClient => {
  const [error, setError] = useState(null);

  const requestInterceptor = httpClient.interceptors.request.use(req => {
    setError(null);
    return req;
  });
  const responseInterceptor = httpClient.interceptors.response.use(
    res => res,
    error => {
      setError(error);
      console.log("WithErrorHandler: ", error);
      return Promise.reject(error);
    }
  );

  const handleErrorConfirmed = () => {
    setError(null);
  };

  useEffect(() => {
    return () => {
      httpClient.interceptors.request.eject(requestInterceptor);
      httpClient.interceptors.response.eject(responseInterceptor);
    };
  }, [
    requestInterceptor,
    responseInterceptor,
    httpClient.interceptors.request,
    httpClient.interceptors.response,
  ]);

  return [error, handleErrorConfirmed];
};
