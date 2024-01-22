import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Detail from "../pages/Detail";

const publicRoutes = [
    { path: "/", component: Home },
    { path: "/login", component: Login, layout: null },
    { path: "/register", component: Register, layout: null },
    { path: "/detail/:id", component: Detail},
]

const privateRoutes = []

export { publicRoutes, privateRoutes }