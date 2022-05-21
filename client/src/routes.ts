import Home from './pages/Home'
import Auth from './pages/Auth'

import { HOME_AUTH, AUTH } from "./utils/consts"

export const publicRoutes = [
    {
        path: HOME_AUTH,
        Component: Home
    },
    {
        path: AUTH,
        Component: Home
    }
]
