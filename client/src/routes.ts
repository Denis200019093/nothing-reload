import Home from './pages/Home'
import PostDetails from './pages/PostDetails'

import { HOME_AUTH, DETAILS } from "./utils/consts"

export const publicRoutes = [
    {
        path: HOME_AUTH,
        Component: Home
    },
    {
        path: DETAILS,
        Component: PostDetails
    }
]
