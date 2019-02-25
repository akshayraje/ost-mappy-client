import React from 'react';
import { ReactComponent as LoaderIcon } from './../assets/images/loader.svg';

const Loader = (props) => (
  <LoaderIcon/>
);

const Error = (props) => (
  <div className="alert alert-danger mt-3">Error: {props.message}</div>
);

export {
  Loader,
  Error
};