import { DATE_HandlChange, DATE_ClickChange } from "./types";

export const dateHandleChange = date => dispatch => {
  dispatch({
    type: DATE_HandlChange,
    payload: {
      startDate: date
    }
  });
};
