import { NonCompatibleTuple } from "@browser-scan/schema";

export const parse_result = (message: string): NonCompatibleTuple => {
  const [_, line_num, col_num, ...rest] = message.split(":");
  return [`${line_num}:${col_num}`, rest.join("")];
};
