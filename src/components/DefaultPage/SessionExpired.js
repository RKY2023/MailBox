import React from "react";

const SessionExpired = (props) => {
    return (
        <>
        <h1>Your Session has been expired. Please re-login.</h1>
        <div className="m-3">
            <a href="/auth" role="button">Go to login Page</a>
        </div>
        </>
    );
};

export default SessionExpired;