import { useMutation } from "react-query";
import axios from "axios";
import { ScannerResponse } from "./types";

export const useScanner = () => {
  const { data, isSuccess, mutate } = useMutation(
    "scanner",
    async (body: {
      version: string;
      project_path: string;
      browser: string;
    }) => {
      const res = await axios.post<ScannerResponse>("/scan", body, {
        headers: {
          "Content-type": "application/json",
        },
      });
      return res.data;
    }
  );
  return { data, isSuccess, mutate };
};
