import { Router } from "express";
import { UserRoutes } from "../modules/user/user.route";
import { CarRoutes } from "../modules/cars/cars.route";
import { BookingsRoute } from "../modules/bookings/bookings.route";

const router = Router()

const moduleRoutes = [
    {
        path: "/auth",
        route: UserRoutes
    },
    {
        path: "/cars",
        route: CarRoutes
    },
    {
        path: "",
        route: BookingsRoute
    },
    {
        path: "/bookings",
        route: BookingsRoute
    },
]

moduleRoutes.forEach(route => router.use(route.path, route.route))

export default router;