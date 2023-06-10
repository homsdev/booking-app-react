import { getWeek } from "../../utils/date-wrangler";

/**
 * Reducer:Creates a new state from the current state depending on the action
 * Initial State Tha values of variables and properties when component first runs
 * Dispatch function Tells the reducer what action to take
 * @param {Object} state The values os variables and properties at a particulas point in execution
 * @param {object} action Information used by the reducer to update the state 
 * @returns 
 */
export default function reducer(state, action) {
  switch (action.type) {
    case "NEXT_WEEK":
      return getWeek(state.date, 7);
    case "PREV_WEEK":
      return getWeek(state.date, -7);
    case "TODAY":
      return getWeek(new Date());
    case "SET_DATE":
      return getWeek(new Date(action.payload));
    default:
      throw new Error(`Unknow action type: ${action.type}`);
  }
}
