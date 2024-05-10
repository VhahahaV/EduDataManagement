import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { checkAuth } from "../service/user";

const PrivateRoute = (props) => {
  const [state, setState] = useState({ hasLogin: false, hasChecked: false });

  useEffect(() => {
    checkAuth((data) => {
      setState({
        hasLogin: (data.code === 200),
        hasChecked: true,
      });
    });
  }, []);

  if (!state.hasChecked) return null;

  if (state.hasLogin) {
    return props.component;
  } else {
    return <Navigate to="/login" />;
  }
}

export default PrivateRoute;
