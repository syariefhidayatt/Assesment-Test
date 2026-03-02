import { createBrowserRouter, RouterProvider } from "react-router-dom";
import FilterPage from "./components/FilterPage";
import { createRoot } from "react-dom/client";
import "./index.css";

export default async function fetchregions() {
  const res = await fetch("/data/indonesia_regions.json");
  const data = await res.json();
  return data;
}

const router = createBrowserRouter([
  {
    path: "/",
    loader: fetchregions,
    HydrateFallback: () => <div>Loading...</div>,
    element: (
      <div>
        <FilterPage />
      </div>
    ),
  },

  {
    path: "provinces",
    element: <div>Provinces</div>,
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />,
);
