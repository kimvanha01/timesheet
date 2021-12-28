import * as React from "react";
import { Redirect, Route } from "react-router-dom";
import { getTokenAcess } from "../../utils/localStorage";

interface IProps {
    exact?: boolean;
    path: string;
    component: React.ComponentType<any>;
}

const PrivateRoute = ({ component: Component, ...rest }: IProps) => {
    const acessToken = getTokenAcess();
    return (
        <Route
            {...rest}
            render={(props) =>
                acessToken ? (
                    <Component {...props} />
                ) : (
                    <Redirect to={{ pathname: "/login" }} />
                )
            }
        />
    );
};

export default PrivateRoute;