import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
  RouterProvider,
} from "react-router-dom";

import Home from "@pages/Home";
import AuthorizationPage from "@pages/Authorization";
import RegistrationPage from "@pages/Registration";
import ProtectedRoute from "@pages/ProtectedRoute";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route
        index
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route path="auth" element={<AuthorizationPage />} />
      <Route path="register" element={<RegistrationPage />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
