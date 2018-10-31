import { DATE_HandlChange, DATE_ClickChange } from "./types";

export const dateHandleChange = date => dispatch => {
  dispatch({
    type: DATE_HandlChange,
    payload: {
      startDate: date
    }
  });
};

export const dateClickChange = number => (dispatch, getState) => {
  dispatch({
    type: DATE_ClickChange,
    payload: {
      startDate: getState().dateData.startDate.add(number, "d")
    }
  });
};
