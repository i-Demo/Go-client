import Home from "~/pages/Home";

// Public Routes
const publicRoutes = [
    { path: "/", element: <Home /> },
];
const privateRoutes = [{}];

export { publicRoutes, privateRoutes };
