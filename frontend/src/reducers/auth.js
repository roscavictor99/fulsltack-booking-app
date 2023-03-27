let userState;
if (localStorage.getItem('auth')) {
  userState = JSON.parse(localStorage.getItem('auth'));
} else userState = null;

export const authReducer = (state = userState, action) => {
  switch (action.type) {
    case 'LOGGED_IN_USER':
      return { ...state, ...action.payload };
    case 'LOGOUT':
      return (state = null);
    default:
      return state;
  }
};
