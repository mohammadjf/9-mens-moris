import React from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "./auth";

function Logout(props) {
    let history = useHistory();
    let auth = useAuth();

    return auth.user ? (
        <p>
            Welcome!{" "}
            <button
                onClick={() => {
                    auth.signout(() => history.push("/login"));
                }}
            >
                Sign out
            </button>
        </p>
    ) : "";
}

export default Logout;