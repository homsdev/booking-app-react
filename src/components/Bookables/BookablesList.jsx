import { useReducer, useEffect, useRef } from "react";
import data from "../../static.json";
import { FaArrowRight } from "react-icons/fa";

import reducer from "./reducer";

import getData from "../../utils/api";

const { days, sessions } = data;

const initialState = {
  group: "Rooms",
  bookableIndex: 0,
  hasDetails: true,
  bookables: [],
  isLoading: true,
  error: false,
};

/** Component: a Function that accepts props and returns a description of its UI */
export const BookablesList = () => {
  /**
   * state: The current value of each property
   * dispach: Dispatch fucntion passes an action to the reducer
   * reducer: uses an action to create a new state
   * initalState: The inital valeu of each property
   * initFn: Uses initialization arguments to generate initial state
   */
  const [state, dispatch] = useReducer(reducer, initialState);
  const timerRef = useRef(null);
  const nextButtonRef = useRef();

  const { group, bookableIndex, bookables } = state;
  const { hasDetails, isLoading, error } = state;

  /**Array with two elements: Value, updaterFunction */
  //const [group, setGroup] = useState("Kit");
  //const [bookableIndex, setBookableIndex] = useState(1);
  //const [hasDetails, setHasDetails] = useState(false);

  /**You can pass a function to set a lazy initial state */
  /*const [value,setValue] = useState(()-> return initialState)*/

  const bookablesInGroup = bookables.filter((b) => b.group === group);

  //Creates a new array of unique values & ignore all repeated
  const groups = [...new Set(bookables.map((b) => b.group))];

  const bookable = bookablesInGroup[bookableIndex];

  /**Event Handler: function that runs in response to an event */

  /*
  function nextBookable() {
    // setValue(oldValue => oldValue + 1);
    setBookableIndex((bookableIndex + 1) % bookablesInGroup.length);
  }*/

  function changeGroup({ target }) {
    dispatch({ type: "SET_GROUP", payload: target.value });
  }

  function changeBookable(selectedIndex) {
    dispatch({ type: "SET_BOOKABLE", payload: selectedIndex });
    nextButtonRef.current.focus();
  }

  function nextBookable() {
    dispatch({ type: "NEXT_BOOKABLE" });
  }

  function stopPresentation() {
    window.clearInterval(timerRef.current);
  }

  useEffect(() => {
    dispatch({ type: "FETCH_BOOKABLES_REQUEST" });

    getData("http://localhost:3001/bookables")
      .then((bookables) =>
        dispatch({
          type: "FETCH_BOOKABLES_SUCCESS",
          payload: bookables,
        })
      )
      .catch((error) =>
        dispatch({
          type: "FETCH_BOOKABLES_ERROR",
          payload: error,
        })
      );
  }, []);

  useEffect(()=>{
    
    timerRef.current = setInterval(()=>{
      !isLoading && dispatch({type:'NEXT_BOOKABLE'});
    },3000);

    return stopPresentation;
  },[isLoading]);//TODO: Use Data instead of loading

  if (error) {
    return <p>{error.message}</p>;
  }

  if (isLoading) {
    return <p>Spinner Loading Bookables...</p>;
  }

  /**UI: Description of elements that make up a user interface */
  return (
    <>
      <div>
        <select value={group} onChange={changeGroup}>
          {groups.map((g, i) => (
            <option value={g} key={g}>
              {g}
            </option>
          ))}
        </select>
        <ul className="bookables items-list-nav">
          {bookablesInGroup.map((b, i) => (
            <li key={b.id} className={i === bookableIndex ? "selected" : null}>
              <button className="btn" onClick={() => changeBookable(i)}>
                {b.title}
              </button>
            </li>
          ))}
        </ul>
        <p>
          <button className="btn" onClick={nextBookable} ref={nextButtonRef} autoFocus>
            <FaArrowRight />
            <span>Next</span>
          </button>
        </p>
      </div>

      {bookable && (
        <div className="bookable-details">
          <div className="item">
            <div className="item-header">
              <h2>{bookable.title}</h2>

              <span className="controls">
                <label>
                  <input
                    type="checkbox"
                    checked={hasDetails}
                    // onChange={() => setHasDetails((hasDetails) => !hasDetails)}
                    onChange={() => dispatch({ type: "TOGGLE_HAS_DETAILS" })}
                  />
                  Show Details
                </label>
                <button className="btn" onClick={stopPresentation}>
                  Stop
                </button>
              </span>
            </div>
            <p>{bookable.notes}</p>
            {hasDetails && (
              <div className="item-details">
                <h3>Availability</h3>
                <div className="bookable-availability">
                  <ul>
                    {bookable.days.sort().map((d) => (
                      <li key={d}>{days[d]}</li>
                    ))}
                  </ul>
                  <ul>
                    {bookable.sessions.map((s) => (
                      <li key={s}>{sessions[s]}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
