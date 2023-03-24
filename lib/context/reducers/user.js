export function user(state, action) {
    switch (action.type) {
      case "LOGGED_IN_USER":
        return { ...state, user: action.payload };
      case "LOGOUT_USER":
        return state = null;
        case "RESERVATION_DONE":
          return {...state, reservation: action.payload}
        case "RESERVATION_LOGIN_TEMP":
          return {...state, login_temp: action.payload}
          case "USER_UPDATE":
          return {...state, update: action.payload}
      default:
        return state;
    }
  }