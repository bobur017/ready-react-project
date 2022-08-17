import { createSlice } from "@reduxjs/toolkit";
import { setApi } from "./ApiCall";
const slice = createSlice({
    name: "myReducer",
    initialState: {
        result: {},
        resultAnalis: {},
        user: [],
        token: {},
        error: {},
        image: []
    },
    reducers: {
        resultReducer: (state, action) => {
            state.result = action.payload;
        },
        imageReducer: (state, action) => {
            state.result = action.payload;
        },
        resultAnalisReducer: (state, action) => {
            state.resultAnalis = action.payload;
        },
        tokenReducer: (state, action) => {
            state.token = action.payload;
        },
        errorReducer: (state, action) => {
            state.error = action.payload;
        },
        userReducer: (state, action) => {
            state.user = action.payload;
        }
    }
})

function getToken() {
    return localStorage.getItem("Authorization");
}
function getRole() {
    return localStorage.getItem("role");
}

function getId() {
    return localStorage.getItem("id");
}



export const login = (data) => setApi({
    url: "/qr/api/user/signIn",
    method: "post",
    data,
    success: slice.actions.tokenReducer,
    error: slice.actions.errorReducer
});


export default slice.reducer;