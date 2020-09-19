import React, { useEffect, useState } from "react";
import Modal from "../../components/UI/Modal/Modal";

const withErrorHandler = (WrappedComponent, axios) => {
  const WithErrorHandler = props => {
    const [error, setError] = useState(null);
    const requestInterceptor = axios.interceptors.request.use(req => {
      setError(null);
      return req;
    });
    const responseInterceptor = axios.interceptors.response.use(
      res => res,
      error => {
        setError(error);
        console.log("WithErrorHandler: ", error);
        return Promise.reject(error);
      }
    );
    useEffect(() => {
      return () => {
        axios.interceptors.request.eject(requestInterceptor);
        axios.interceptors.response.eject(responseInterceptor);
      };
    }, [requestInterceptor, responseInterceptor]);
    return (
      <>
        <Modal visible={error !== null} modalClose={() => setError(null)}>
          {error !== null ? error.message : null}
        </Modal>
        <WrappedComponent {...props} />
      </>
    );
  };
  return WithErrorHandler;
};
export default withErrorHandler;

// import React, { useState, useEffect } from "react";
// import Modal from "../../components/UI/Modal/Modal";
// import Aux from "../Aux/Aux";

// const withErrorHandler = (WrappedComponent, axios) => {
//   return props => {
//     const [error, setError] = useState(null);

//     const reqInterceptor = axios.interceptors.request.use(req => {
//       setError(null);
//       return req;
//     });
//     const resInterceptor = axios.interceptors.response.use(
//       res => res,
//       err => {
//         setError(err);
//       }
//     );

//     useEffect(() => {
//       return () => {
//         axios.interceptors.request.eject(reqInterceptor);
//         axios.interceptors.response.eject(resInterceptor);
//       };
//     }, [reqInterceptor, resInterceptor]);

//     const errorConfirmedHandler = () => {
//       setError(null);
//     };

//     return (
//       <Aux>
//         <Modal visible={error} modalClose={errorConfirmedHandler}>
//           {error ? error.message : null}
//         </Modal>
//         <WrappedComponent {...props} />
//       </Aux>
//     );
//   };
// };

// export default withErrorHandler;
