import { useQuery } from "react-query";
import { BrowsersResponse } from "@browser-scan/schema";

export const useBrowsers = () => {
  const { data, isLoading, isFetched } = useQuery("browsers", async () => {
    const res = await fetch("/browsers", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const res_1 = await res.json();
    return res_1 as BrowsersResponse;
  });
  return {
    data,
    isLoading,
    isFetched,
  };
};
