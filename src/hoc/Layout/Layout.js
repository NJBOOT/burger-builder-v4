import React from "react";
import { connect } from "react-redux";
import classes from "./Layout.module.css";
import Aux from "../Aux/Aux";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

class Layout extends React.Component {
  state = {
    showSideDrawer: false,
  };

  closeSideDrawer = () => {
    this.setState({ showSideDrawer: false });
  };
  handleToggleSideDrawer = () => {
    this.setState(prevState => {
      return { showSideDrawer: !prevState.showSideDrawer };
    });
  };

  render() {
    return (
      <Aux>
        <Toolbar
          isAuth={this.props.isAuthenticated}
          handleToggleSideDrawer={this.handleToggleSideDrawer}
        />
        <SideDrawer
          isAuth={this.props.isAuthenticated}
          showSideDrawer={this.state.showSideDrawer}
          closeSideDrawer={this.closeSideDrawer}
        />
        <main className={classes.Content}>{this.props.children}</main>
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

export default connect(mapStateToProps)(Layout);
