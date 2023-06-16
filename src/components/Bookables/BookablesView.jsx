import React, { useState,useCallback } from "react";

import { BookablesList } from "./BookablesList";
import { BookableDetails } from "./BookableDetails";

export const BookablesView = () => {
  /**
   * const [state, dispatch] = useReducer(reducer, initialState);
   * state: The current value of each property
   * dispach: Dispatch fucntion passes an action to the reducer
   * reducer: uses an action to create a new state
   * initalState: The inital valeu of each property
   * initFn: Uses initialization arguments to generate initial state
   * const [state, dispatcher] = useReducer(reducer, initialState);
   */

  const [bookable, setBookable] = useState();


  /**
   * const stableFunction = useCallback(functionToCache,dependencyList)
   */
  const updateBookable = useCallback((selected) => {
    if (selected) {
      selected.lastShown = Date.now();
      setBookable(selected);
    }
  },[]);

  return (
    <>
      <BookablesList bookable={bookable} setBookable={updateBookable} />
      <BookableDetails bookable={bookable} />
    </>
  );
};
