import { useQuery } from "react-query";
import { Browsers, VersionsResponse } from "@browser-scan/schema";

export const useVersions = (browser: Browsers) => {
  return useQuery("versions", async () => {
    const res = await fetch(`/versions/${browser}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const res_1 = await res.json();
    return res_1 as VersionsResponse;
  });
};
