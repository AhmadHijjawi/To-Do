const initialState = {
  loggedUser: JSON.parse(sessionStorage.getItem("LoggedUser")) || undefined,
};

export default function user(state = initialState, { payload, type }) {
  switch (type) {
    case "LOGIN":
      sessionStorage.setItem("LoggedUser", JSON.stringify(payload));
      return {
        ...state,
        loggedUser: JSON.parse(sessionStorage.getItem("LoggedUser")),
      };

    default:
      return state;
  }
}
