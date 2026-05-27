import { createSlice } from "@reduxjs/toolkit";


const defaultValue ={};

const Cluster = createSlice({
    name: "login",
    initialState:{
        loginDetails: defaultValue
    },
    reducers: {
        loginDetails: (state, action) => {
            return {
                ...state,
                loginDetails: action.payload
            }
        },
        logoutDetails:(state) => {
            return {
                ...state,
                loginDetails: defaultValue
            }
        }
    }
});

export const {loginDetails, logoutDetails} = Cluster.actions;
export default Cluster.reducer;