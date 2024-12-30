import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import Register from "./pages/Register";
import Login from "./pages/Login";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <Layout>
                <p>Home page</p>
              </Layout>
            }
          />
          <Route
            path="register"
            element={
              <Layout>
                <Register />
              </Layout>
            }
          />
          <Route
            path="login"
            element={
              <Layout>
                {" "}
                <Login />
              </Layout>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
