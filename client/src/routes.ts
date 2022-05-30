import Home from './pages/Home'
import PostDetails from './pages/PostDetails'
import Subscribes from './pages/Subscribes'
import Bookmarks from './pages/Bookmarks'
import User from './pages/User'
import FoundItems from './pages/FoundItems'

import { HOME_AUTH, DETAILS, SUBSCRIBES, BOOKMARKS, USER_INFO, FOUND_ITEMS } from "./utils/consts"

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
    },
    {
        path: FOUND_ITEMS,
        Component: FoundItems
    }
]
