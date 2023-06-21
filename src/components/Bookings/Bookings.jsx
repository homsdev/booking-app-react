import React, { useReducer, useState } from "react";

import weekReducer from "./weekReducer";
import { getWeek } from "../../utils/date-wrangler";
import { WeekPicker } from "./WeekPicker";
import { BookingsGrid } from "./BookingsGrid";
import { BookingDetails } from "./BookingDetails";

export const Bookings = ({ bookable }) => {
  /**
   * const [state, dispatch] = useReducer(reducer, initialState);
   * state: The current value of each property
   * dispach: Dispatch fucntion passes an action to the reducer
   * reducer: uses an action to create a new state
   * initalState: The inital valeu of each property
   * initFn: Uses initial state to specify how inital state is set
   * const [state, dispatcher] = useReducer(reducer, initialState,initFn?);
   */
  const [week, dispatch] = useReducer(weekReducer, new Date(), getWeek);

  const [booking,setBooking] = useState(null);

  return (
    <div className="bookings">
        <div>
            <WeekPicker dispatch={dispatch} />

            <BookingsGrid
                week={week}
                bookable={bookable}
                booking={booking}
                setBooking={setBooking}
            />
        </div>
        <BookingDetails 
            booking={booking}
            bookable={bookable}
        />
    </div>
  );
};
