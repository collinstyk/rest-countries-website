import { Route, Routes } from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import useTheme from "./hooks/useTheme";
import PageNotFound from "./pages/PageNotFound";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

function App() {
  const theme = useTheme()?.theme;

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />

      <div
        className={`w-full ${theme === "Light" ? "bg-[hsl(0,0%,94%)]" : "bg-[hsl(207,26%,19%)]"}`}
      >
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Home />} />
            <Route
              // Subject to change
              path="/country-details/:id"
              element={<Detail />}
            />
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </div>
    </QueryClientProvider>
  );
}

export default App;
