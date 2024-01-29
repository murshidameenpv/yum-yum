  import * as React from "react";
  import * as ReactDOM from "react-dom/client";
  import {RouterProvider} from "react-router-dom";
  import "./index.css";
  import router from "./router/Router";
  import AuthProvider from "./contexts/AuthProvider";

  import {
    useQuery,
    useMutation,
    useQueryClient,
    QueryClient,
    QueryClientProvider,
  } from "@tanstack/react-query";
  //tanstack query (react-query new version FKA)
  const queryClient = new QueryClient()

  ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        </QueryClientProvider>
      </AuthProvider>
    </React.StrictMode>
  );