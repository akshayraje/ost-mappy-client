import React from "react";
import { ReactComponent as Loader } from "./../assets/images/loader.svg";

const Error = props => <div className="alert alert-danger mt-3">Error: {props.message}</div>;

export { Loader, Error };
