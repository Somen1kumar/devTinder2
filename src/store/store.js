import { configureStore } from "@reduxjs/toolkit";
import loginCluster from './loginCluster'


const Store = configureStore({
    reducer: {
        loginReducer: loginCluster
    }
});

export default Store;