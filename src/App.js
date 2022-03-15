import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useLocalStorage } from "./utils/useLocalStorage";

//Layouts
import { Layouts } from "./data/layouts/Layouts";

//Pages
import { Pages } from "./pages/Pages";

const PrivateRoute = ({ element }) => {
  const { PrivateLayout } = Layouts();
  const [auth] = useLocalStorage("auth", null);
  if (typeof auth.id === "undefined") {
    return <Navigate to="/login" />;
  } else {
    return <PrivateLayout element={element} />;
  }
};

function App() {
  const { Login, Dashboard, Classroom } = Pages();
  const { PublicLayout, ClassroomLayout } = Layouts();
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Navigate to="/login" />} />
          <Route
            path="/login"
            exact
            element={<PublicLayout element={<Login />} />}
          />
          <Route
            path="/dashboard"
            exact
            element={<PrivateRoute element={<Dashboard />} />}
          />
          <Route
            path="/startcall/:sessionid"
            exact
            element={<ClassroomLayout element={<Classroom />} />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
