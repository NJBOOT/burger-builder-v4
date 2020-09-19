import React, { useState } from "react";
import { connect } from "react-redux";
import classes from "./Layout.module.css";
import Aux from "../Aux/Aux";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

const Layout = props => {
  const [showSideDrawer, setShowSideDrawer] = useState(false);

  const closeSideDrawer = () => {
    setShowSideDrawer(false);
  };
  const handleToggleSideDrawer = () => {
    setShowSideDrawer(!showSideDrawer);
  };

  return (
    <Aux>
      <Toolbar
        isAuth={props.isAuthenticated}
        handleToggleSideDrawer={handleToggleSideDrawer}
      />
      <SideDrawer
        isAuth={props.isAuthenticated}
        showSideDrawer={showSideDrawer}
        closeSideDrawer={closeSideDrawer}
      />
      <main className={classes.Content}>{props.children}</main>
    </Aux>
  );
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

export default connect(mapStateToProps)(Layout);
