import axios from "axios";
import { useQuery } from "react-query";
import { BrowsersResponse } from "./types";

export const useBrowsers = () => {
  const { data, isFetched } = useQuery("browsers", () =>
    axios.get<BrowsersResponse>("/browsers").then((res) => res.data)
  );

  return {
    isFetched,
    data,
  };
};
