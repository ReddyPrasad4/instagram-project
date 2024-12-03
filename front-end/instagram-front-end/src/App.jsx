
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/login/Login";
import Home from "./components/home/Home";
import AddPost from "./components/post/AddPost";
import Register from "./components/register/Register";
import UserPosts from "./components/post/UserPosts";
import UpdatePost from "./components/post/UpdatePost";
import ProtectedRoute from "./components/ProtectedRoute";
import UpdateUser from "./components/user/UpdateUser";


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          <Route element={<ProtectedRoute />}>
            <Route path="/home" element={<Home />} />
            <Route path="/addPost" element={<AddPost />} />
            <Route path="/updatePost" element={<UpdatePost />} />
            <Route path="/userPosts" element={<UserPosts />} />
            <Route path="/updateUser" element={<UpdateUser />} />
          </Route>

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
