import { useEffect } from "react";
import { FaArrowRight } from "react-icons/fa";

import useFetch from "../../utils/useFetch";


/** Component: a Function that accepts props and returns a description of its UI */
export const BookablesList = ({ bookable, setBookable }) => {
  

  const {
    data: bookables = [],
    status,
    error,
  } = useFetch("http://localhost:3001/bookables");

  const group = bookable?.group;

  const bookablesInGroup = bookables.filter((b) => b.group === group);
  const groups = [...new Set(bookables.map((b) => b.group))]; //Creates a new array of unique values & ignore all repeated

  /** Handling side effects */
  useEffect(() => {
    setBookable(bookables[0]);
  }, [bookables, setBookable]);

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

  if (status === "error") {
    return <p>{error.message}</p>;
  }

  if (status === "loading") {
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
        <button className="btn" onClick={nextBookable} autoFocus>
          <FaArrowRight />
          <span>Next</span>
        </button>
      </p>
    </div>
  );
};
