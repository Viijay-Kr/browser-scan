import { QueryClientProvider, QueryClient } from "react-query";
import { PropsWithChildren } from "react";
import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient();

export interface ScannerProviderProps {
  devTools?: boolean;
}

export const ScannerProvider: React.FC<
  PropsWithChildren<ScannerProviderProps>
> = (props) => {
  const { children, devTools } = props;
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {devTools && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  );
};
