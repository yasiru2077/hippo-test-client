import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import Write from "./pages/write/Write";
import { Context } from "./context/Context";
import { useContext } from "react";
import SinglePost from "./components/singlepost/SinglePost";


function App() {
  const { user } = useContext(Context);
  return (
    
  <Router>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/register" element={user ? <Home /> : <Register />}/>
      <Route path="/login" element={user ? <Home /> : <Login />}/>
      <Route path="/write" element={user ? <Write /> : <Login />}/>
      <Route path="/post/:id" element={<SinglePost />} />
      
    </Routes>
  </Router>
  );
}

export default App;
