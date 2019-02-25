import React from 'react';

const Loader = (props) => (
  <div className="alert alert-secondary mt-3">{props.message}</div>
);

const Error = (props) => (
  <div className="alert alert-danger mt-3">Error: {props.message}</div>
);

export {
  Loader,
  Error
};