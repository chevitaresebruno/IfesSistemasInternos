import React from "react";
import LoginLayout from "../layouts/login/LoginLayout";


const PATHS: {[key: string]: {name: string, element: React.FC}} = {
    "LOGIN": {
        name: "login",
        element: LoginLayout,
    },
}


export default PATHS;

