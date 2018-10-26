import { DATE_HANDLER } from "../actions/types";
import moment from "moment";

const initialState = {
  startDate: moment()
};

export default (state = initialState, action) => {
  switch (action.type) {
    case DATE_HANDLER:
      return {};

    default:
      return state;
  }
};
