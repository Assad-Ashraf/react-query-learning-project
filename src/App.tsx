import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { ReactQueryDevtools } from "react-query/devtools";
import { QueryClientProvider, QueryClient, QueryCache } from "react-query";

function App() {
  const [count, setCount] = useState(0);

  // const mutationTwaek = () => QueryCache.refetc;
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} position={"bottom-right"} />
    </QueryClientProvider>
  );
}

export default App;
