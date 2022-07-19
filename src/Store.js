import { configureStore } from "@reduxjs/toolkit";
import qr from "./QrReducer";
import Api from "./Api"

export default configureStore({
    reducer: {
        qr,
    },
    middleware: [Api],
});