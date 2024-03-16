import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
  RouterProvider,
} from "react-router-dom";

import AuthorizationPage from "@pages/Authorization";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route path="auth" element={<AuthorizationPage />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
