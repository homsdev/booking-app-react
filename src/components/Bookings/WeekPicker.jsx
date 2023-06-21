import { useRef } from "react";

import {
  FaChevronLeft,
  FaCalendarDay,
  FaChevronRight,
  FaCalendarCheck,
} from "react-icons/fa";

/**
 * Controlled component: use hooks to manage state and getting react to update the DOM
 * Uncontrolled component: read its state from the DOM
 */

/**
 *
 * @param {Function} dispatchFunction
 * @returns
 */
export const WeekPicker = ({ dispatch }) => {
  const textBoxRef = useRef();

  function goToDate() {
    dispatch({
      type: "SET_DATE",
      payload: textBoxRef.current.value,
    });
  }

  return (
    <div>
      <p className="date-picker">
        <button className="btn" onClick={() => dispatch({ type: "PREV_WEEK" })}>
          <FaChevronLeft />
          <span>Prev</span>
        </button>

        <button className="btn" onClick={() => dispatch({ type: "TODAY" })}>
          <FaCalendarDay />
          <span>Today</span>
        </button>

        <span>
          <input
            type="text"
            ref={textBoxRef}
            placeholder="e.g. 2020-9-02"
            defaultValue="2020-06-24"
          />
          <button className="go btn" onClick={goToDate}>
            <FaCalendarCheck />
            <span>Go</span>
          </button>
        </span>

        <button className="btn" onClick={() => dispatch({ type: "NEXT_WEEK" })}>
          <FaChevronRight />
          <span>Next</span>
        </button>
      </p>
      {/* <p>
        {week.start.toDateString()} - {week.end.toDateString()}
      </p> */}
    </div>
  );
};
