const AuthReducer = (state:any, action:any) => {
  switch (action.type) {
    case "LOGIN": {
      return {
        currentUser: localStorage.getItem('token')
      };
    }
    case "LOGOUT": {
      return {
        currentUser: null,
      };
    }
    default:
      return state;
  }
};

export default AuthReducer;
