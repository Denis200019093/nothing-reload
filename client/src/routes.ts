import Home from './pages/Home'
import PostDetails from './pages/PostDetails'
import Subscribes from './pages/Subscribes'
import Bookmarks from './pages/Bookmarks'
import User from './pages/User'

import { HOME_AUTH, DETAILS, SUBSCRIBES, BOOKMARKS, USER_INFO } from "./utils/consts"

export const publicRoutes = [
    {
        path: HOME_AUTH,
        Component: Home
    },
    {
        path: DETAILS,
        Component: PostDetails
    },
    {
        path: SUBSCRIBES,
        Component: Subscribes
    },
    {
        path: BOOKMARKS,
        Component: Bookmarks
    },
    {
        path: USER_INFO,
        Component: User
    }
]
