import { useState, useEffect, useRef } from "react";
import { FaArrowRight } from "react-icons/fa";

import getData from "../../utils/api";

/** Component: a Function that accepts props and returns a description of its UI */
export const BookablesList = ({ bookable, setBookable }) => {
  
  /**Array with two elements: Value, updaterFunction */
  /**You can pass a function to set a lazy initial state */
  /*const [value,setValue] = useState(()-> return initialState)*/
  const [bookables, setBookables] = useState([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const group = bookable?.group;

  const bookablesInGroup = bookables.filter((b) => b.group === group);
  const groups = [...new Set(bookables.map((b) => b.group))]; //Creates a new array of unique values & ignore all repeated

  /** Handling side effects */
  useEffect(() => {
    getData("http://localhost:3001/bookables")
      .then((bookables) => {
        setBookable(bookables[0]);
        setBookables(bookables);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });
  }, [setBookable]);

  /**Event Handler: function that runs in response to an event */
  function changeGroup({ target }) {
    const bookablesInSelectedGroup = bookables.filter(
      (b) => b.group === target.value
    );
    setBookable(bookablesInSelectedGroup[0]);
  }

  function changeBookable(selectedBookable) {
    setBookable(selectedBookable);
  }

  function nextBookable() {
    const i = bookablesInGroup.indexOf(bookable);
    const nextIndex = (i + 1) % bookablesInGroup.length;
    const nextBookable = bookablesInGroup[nextIndex];
    setBookable(nextBookable);
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  if (isLoading) {
    return <p>Spinner Loading Bookables...</p>;
  }

  /**UI: Description of elements that make up a user interface */
  return (
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
          <li key={b.id} className={b.id === bookable.id ? "selected" : null}>
            <button className="btn" onClick={() => changeBookable(b)}>
              {b.title}
            </button>
          </li>
        ))}
      </ul>
      <p>
        <button
          className="btn"
          onClick={nextBookable}
          autoFocus
        >
          <FaArrowRight />
          <span>Next</span>
        </button>
      </p>
    </div>
  );
};
