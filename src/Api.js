import axios from "axios";

const api = ({ dispatch }) => (next) => (action) => {
    if (action.type !== 'api/call') {
        next(action);
        return;
    } else {
        const { url, method, data, headers, params, success, error } = action.payload;
        console.log(data, url, "data");
        axios({
            // baseURL: "https://jsonplaceholder.typicode.com",
            baseURL: "https://185.217.131.74:8899",
            // baseURL: "http://192.168.43.134:8899",
            url,
            method,
            data,
            headers,
            params
        }).then(res => {
            dispatch({
                type: success,
                payload: res.data
            });
            console.log(res.data, "success");
        }).catch(err => {
            dispatch({
                type: error,
                payload: err?.response?.data
            });
            console.log(err?.response?.data, "error");
        });
    }
}
export default api;