export function user(state, action) {
    switch (action.type) {
      case "LOGGED_IN_USER":
        return { ...state, user: action.payload };
      case "LOGOUT_USER":
        return state = null;
        case "RESERVATION_DONE":
          return {...state, reservation: true}
        case "RESERVATION_LOGIN_TEMP":
          return {...state, login_temp: false}
      default:
        return state;
    }
  }