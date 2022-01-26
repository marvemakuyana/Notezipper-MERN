import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension';
import { userLoginReducer, userRegisterReducer } from "./reducers/useReducers";
import { noteCreateReducer, noteDeleteeducer, noteListReducer, noteUpdateReducer } from "./reducers/notesReducer";

const reducer = combineReducers({
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    noteList: noteListReducer,
    noteCreate: noteCreateReducer,
    noteUpdate: noteUpdateReducer,
    noteDelete: noteDeleteeducer
});

const userInfoFronStorage = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null

const initialState = {
    userLogin: {
        userInfo: userInfoFronStorage
    }
};

const middleware = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;