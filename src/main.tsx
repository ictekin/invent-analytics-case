import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import StreamDetail from "./components/StreamDetail.tsx";
import "./index.scss";
import { store } from "./store/store.ts";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/detail/:name",
    element: <StreamDetail />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
