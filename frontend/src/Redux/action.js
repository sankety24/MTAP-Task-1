import {
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  ADMIN_LOGIN_REQUEST,
  ADMIN_LOGIN_SUCCESS,
  ADMIN_LOGIN_FAILURE,
  ADD_TO_BAG,
} from "./actionTypes";

export const loginSuccess = (payload) => ({
  type: LOGIN_SUCCESS,
  payload,
});

export const loginFailure = () => ({
  type: LOGIN_FAILURE,
});

export const adminLoginRquest = () => {
  return {
    type: ADMIN_LOGIN_REQUEST,
  };
};

export const adminLoginSuccess = (payload) => {
  return {
    type: ADMIN_LOGIN_SUCCESS,
    payload,
  };
};

export const adminLoginFailure = () => {
  return {
    type: ADMIN_LOGIN_FAILURE,
  };
};

export const add_to_bag = ( payload) => {
  return {
    type: ADD_TO_BAG,
    payload,
  };
};

// export {loginSuccess,loginFailure,adminLoginSuccess};
