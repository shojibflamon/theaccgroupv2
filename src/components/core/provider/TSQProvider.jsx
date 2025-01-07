'use client'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: false,
    },
  },
});

const TSQProvider = ({ children }) => {
  //   const [queryClient] = useState(
  //     () =>
  //       new QueryClient({
  //         defaultOptions: {
  //           queries: {
  //             staleTime: 5 * 1000,
  //           },
  //         },
  //       })
  //   );
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default TSQProvider;
