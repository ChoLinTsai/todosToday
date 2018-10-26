import { DATE_HandlChange } from "../actions/types";
import moment from "moment";

const initialState = {
  startDate: moment()
};

export default (state = initialState, action) => {
  switch (action.type) {
    case DATE_HandlChange:
      return {
        startDate: action.payload.startDate
      };
    default:
      return state;
  }
};
