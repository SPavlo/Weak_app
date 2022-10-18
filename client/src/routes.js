import Main from "./pages/Main";
import {
    BOXPAGE_ROUTE, DECOR_ROUTE,
    LOGIN_ROUTE,
    MAIN_ROUTE,
    ORDER_ROUTE,
    POSTCARD_ROUTE,
    REPORT_ROUTE
} from "./utils";
import BoxPage from "./pages/BoxPage";
import Order from "./pages/Order";
import Auth from "./pages/Auth";
import OrderPage from "./pages/OrderPage";
import ReportOrder from "./pages/ReportOrder";
import PostCardPage from "./pages/PostCardPage";
import PostCard from "./pages/PostCard";

export const authRoutes = [
    {
        path:MAIN_ROUTE,
        Component: <Main/>
    },
    {
        path:BOXPAGE_ROUTE + '/:id',
        Component: <BoxPage/>
    },
    {
        path:POSTCARD_ROUTE + '/:id',
        Component: <PostCardPage/>
    },
    {
        path:DECOR_ROUTE,
        Component: <PostCard/>
    },
    {
        path:ORDER_ROUTE,
        Component: <Order/>
    },
    {
        path:ORDER_ROUTE + '/:id',
        Component: <OrderPage/>
    },
    {
        path:REPORT_ROUTE,
        Component: <ReportOrder/>
    }


]
export const publickRoutes = [
    {
        path:LOGIN_ROUTE,
        Component: <Auth/>
    }
]