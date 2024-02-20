import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { RecoilRoot, useSetRecoilState } from "recoil";
import Login from "./Components/Login";
import Signup from "./Components/Singup";
import Todos from "./Components/Todos";
import { authState } from "./Store/authState";
import useSWR from "swr";
import "./App.css";

function App() {
  return (
    <RecoilRoot>
      <InitState />
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/todos" element={<Todos />} />
        </Routes>
      </Router>
    </RecoilRoot>
  );
}
const fetcher = (url: string) =>
  fetch(url, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  }).then((res) => res.json());
function InitState() {
  const setAuthState = useSetRecoilState(authState);
  const { data, error, isLoading } = useSWR(
    "http://localhost:3000/auth/me",
    fetcher
  );
  if (isLoading) return <div>Loading...</div>;
  if (error || data.err) {
    console.log(error);
  }
  setAuthState({
    username: data.username,
    token: "test",
  });

  return <></>;
}

export default App;
