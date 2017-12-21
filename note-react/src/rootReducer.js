import { combineReducers } from "redux";

import user from "./reducers/user";
import notes from "./reducers/notes";

export default combineReducers({
  user,
  notes
});
