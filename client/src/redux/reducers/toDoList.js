const initialState = {
  toDoList: JSON.parse(sessionStorage.getItem("toDoList")) || [],
};

export default function toDoList(state = initialState, { payload, type }) {
  switch (type) {
    case "TODO_LIST":
      sessionStorage.setItem("toDoList", JSON.stringify(payload));
      return {
        ...state,
        toDoList: JSON.parse(sessionStorage.getItem("toDoList")),
      };

    default:
      return state;
  }
}
