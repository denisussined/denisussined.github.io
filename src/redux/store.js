import {configureStore} from "@reduxjs/toolkit";
import matrixReducer from "./matrixReducer";

const store = configureStore({
    reducer: {
        matrixData: matrixReducer
    }
})

export default store