import { configureStore  } from "@reduxjs/toolkit";
import AuthSlice from "./AuthSlice";
import MailSlice from "./MailSlice";
import UISlice from "./UISlice";

const store = configureStore({
    reducer: {
        auth: AuthSlice.reducer,
        mail: MailSlice.reducer,
        ui: UISlice.reducer,
    }
});

export default store;