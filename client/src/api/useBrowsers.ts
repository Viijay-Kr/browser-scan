import axios from "axios";
import { useQuery } from "react-query";

export const useBrowsers = () => {
  const { data, isFetched } = useQuery("browsers", () =>
    axios
      .get<{ browsers_list: Record<string, string> }>("/browsers")
      .then((res) => res.data)
  );

  return {
    isFetched,
    data,
  };
};
