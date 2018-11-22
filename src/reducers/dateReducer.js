import { DATE_HandlChange, DATE_ClickChange } from "../actions/types";
import moment from "moment";

const initialState = {
  startDate: moment()
};

export default (state = initialState, action) => {
  switch (action.type) {
    case DATE_HandlChange:
      console.log(456, action.payload.startDate);
      return {
        startDate: action.payload.startDate
      };
    case DATE_ClickChange:
      console.log(123, action.payload.startDate);
      return {
        ...state,
        startDate: action.payload.startDate
      };
    default:
      return state;
  }
};