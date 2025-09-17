import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route('/popular', 'routes/popular.tsx')
] satisfies RouteConfig;
