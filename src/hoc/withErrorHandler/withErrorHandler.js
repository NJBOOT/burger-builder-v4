import React from "react";
import Modal from "../../components/UI/Modal/Modal";
import Aux from "../Aux/Aux";

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends React.Component {
    isMount = false;
    state = {
      error: null,
    };

    UNSAFE_componentWillMount() {
      this.isMount = true;
      this.reqInt = axios.interceptors.request.use(req => {
        if (this.isMount) {
          this.setState({ error: null });
        }
        return req;
      });
      this.resInt = axios.interceptors.response.use(
        res => res,
        err => {
          if (this.isMount) {
            this.setState({ error: err });
          }
        }
      );
    }

    componentWillUnmount() {
      axios.interceptors.request.eject(this.reqInt);
      axios.interceptors.response.eject(this.resInt);
      this.isMount = false;
    }

    handleErrorConfirmed = () => {
      this.setState({ error: null });
    };
    render() {
      return (
        <Aux>
          <Modal
            visible={this.state.error}
            modalClose={this.handleErrorConfirmed}
          >
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...this.props} />
        </Aux>
      );
    }
  };
};

export default withErrorHandler;
