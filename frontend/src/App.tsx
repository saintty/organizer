import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
  RouterProvider,
} from "react-router-dom";

import AuthorizationPage from "@pages/Authorization";
import RegistrationPage from "@pages/Registration";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route path="auth" element={<AuthorizationPage />} />
      <Route path="register" element={<RegistrationPage />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
