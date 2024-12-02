import React from "react";

const DefaultPage = (props) => {
    return (
        <>
        <h1>Please go to Login Page.</h1>
        <div className="m-3">
            <a href="/auth" role="button">Go to login Page</a>
        </div>
        </>
    );
};

export default DefaultPage;