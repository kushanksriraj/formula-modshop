import axios from "axios";
import { useState } from "react";

export const useAxios = () => {
  const [response, setResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const apiCall = async ({ type, url, body }) => {
    try {
      setIsError(false);
      setIsLoading(true);
      const res = await axios[type](url, body);
      setResponse(res);
    } catch (error) {
      setIsError(true);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { apiCall, response, isLoading, isError };
};
