import Home from './pages/Home'
import PostDetails from './pages/PostDetails'
import Subscribes from './pages/Subscribes'
import Bookmarks from './pages/Bookmarks'

import { HOME_AUTH, DETAILS, SUBSCRIBES, BOOKMARKS } from "./utils/consts"

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
    }
]
