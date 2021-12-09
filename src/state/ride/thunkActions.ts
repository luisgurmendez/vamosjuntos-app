import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppState } from "state/types";
import { Ride } from "types/models";

const a = createAsyncThunk<any, {ride:Ride}, {state:AppState}>('action name', async ({ride}, {dispatch}) => {

});


