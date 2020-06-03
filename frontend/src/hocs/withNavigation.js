import React, { Fragment } from "react";
import Header from "../components/Header";

export default function withHeader(WrappedComponent) {
  return (props) => (
    <Fragment>
      <Header />
      <WrappedComponent />
    </Fragment>
  );
}
