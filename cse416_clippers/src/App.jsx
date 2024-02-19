import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import MapPage from './pages/map';
const router = createBrowserRouter([
  {
    path: "/",
    element:
    <>
      <MapPage />
    </>
  },
]);

export default function App() {
  return (
      <RouterProvider
          router={router}
      />
      
  );
}

