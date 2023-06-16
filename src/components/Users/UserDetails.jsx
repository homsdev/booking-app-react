import React from "react";

export const UserDetails = ({ user }) => {
  return (
    user && 
    <div className="bookable-details">
      <div className="item">
        <div className="item-header">
          <h2>{user.name}</h2>
        </div>
        <h3>{user.title}</h3>
        <p>{user.notes}</p>
      </div>
    </div>
  );
};
