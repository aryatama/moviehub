import { combineReducers } from "redux";

import { authReducer } from './AuthReducer'
import { messageReducer } from "./MessageReducer";
import { moviesReducer } from "./MovieReducer";
import { reviewsReducer } from "./ReviewReducer";
import { profileReducer } from "./ProfileReducer";

export default combineReducers({
    auth: authReducer,
    message : messageReducer,
    movies : moviesReducer,
    reviews : reviewsReducer,
    profile : profileReducer
})