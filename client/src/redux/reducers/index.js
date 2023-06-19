import { combineReducers } from "redux";
import user from "./user";
import toDoList from "./toDoList";

const reducers = combineReducers({
  user: user,
  toDoList: toDoList,
});

export default reducers;
