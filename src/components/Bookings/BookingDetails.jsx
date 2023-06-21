import React from "react";

export const BookingDetails = ({ booking, bookable }) => {
  return (
    <div className="booking-details placeholder">
      <h3>Booking Details</h3>
      <p>{booking}</p>
      <p>{bookable?.title || "Loading"}</p>
    </div>
  );
};
