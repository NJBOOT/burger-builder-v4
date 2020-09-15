import React from "react";
import classes from "./Modal.module.css";
import Aux from "../../../hoc/Aux/Aux";
import Backdrop from "../Backdrop/Backdrop";

class Modal extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.visible !== this.props.visible ||
      nextProps.children !== this.props.children
    );
  }
  render() {
    return (
      <Aux>
        <Backdrop visible={this.props.visible} close={this.props.modalClose} />
        <div
          className={classes.Modal}
          style={{
            transform: this.props.visible
              ? "translateY(0)"
              : "translateY(-100vh)",
            opacity: this.props.visible ? 1 : 0,
          }}
        >
          {this.props.children}
        </div>
      </Aux>
    );
  }
}

export default Modal;
