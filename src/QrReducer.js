import { createSlice } from "@reduxjs/toolkit";
import { setApi } from "./ApiCall";
const slice = createSlice({
    name: "qr",
    initialState: {
        result: {},
        resultAnalis: {},
        user: [],
        token: {},
        error: {}
    },
    reducers: {
        resultReducer: (state, action) => {
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

export const addAnalys = (data) => setApi({
    url: "/test/api/img",
    method: "post",
    headers: {
        "Content-Type": "multipart/form-data",
    },
    data,
    success: slice.actions.resultReducer,
    error: slice.actions.errorReducer
});

export const addAnalys2 = (data) => setApi({
    url: "/test/api/img/1",
    method: "get",
    // headers: {
    //     "Content-Type": "multipart/form-data",
    // },
    // data,
    success: slice.actions.resultReducer,
    error: slice.actions.errorReducer
});

export const getAll = () => setApi({
    url: "/qr/api/analysis",
    method: "get",
    headers: {
        Authorization: getToken(),
        role: getRole(),
        id: getId(),

    },

    success: slice.actions.userReducer,
    error: slice.actions.errorReducer
});

export const getOne = (id) => setApi({
    url: "/qr/api/analysis/getOne/" + id?.id,
    method: "get",
    headers: {
        Authorization: getToken(),
        role: getRole(),
        id: getId(),
    },
    success: slice.actions.resultAnalisReducer,
    error: slice.actions.errorReducer
});

export const blocked = (id) => setApi({
    url: "/qr/api/analysis/" + id?.id,
    method: "put",
    headers: {
        Authorization: getToken(),
        role: getRole(),
        id: getId(),
    },
    success: slice.actions.resultReducer,
    error: slice.actions.errorReducer
});

export const deleteAnalysis = (id) => setApi({
    url: "/qr/api/analysis/" + id?.id,
    method: "delete",
    headers: {
        Authorization: getToken(),
        role: getRole(),
        id: getId(),
    },
    success: slice.actions.resultReducer,
    error: slice.actions.errorReducer
});


export default slice.reducer;