"use client";
const { createContext, useContext, useState } = require("react");

const ReservationContext = createContext();

const initialState = { from: undefined, to: undefined };

function ReservationProvider({ children }) {
  const [range, setRange] = useState(initialState);
  const [numGuests, setNumGuests] = useState(2);

  const resetRange = () => {
    setRange({ from: undefined, to: undefined });
  };

  function updateGuests(guestsCount) {
    console.log(guestsCount);
    setNumGuests(guestsCount);
  }

  return (
    <ReservationContext.Provider
      value={{ range, setRange, resetRange, numGuests, updateGuests }}
    >
      {children}
    </ReservationContext.Provider>
  );
}

function useReservation() {
  const context = useContext(ReservationContext);
  if (context === undefined)
    throw new Error("ReservationContext was used outside of scope.");
  return context;
}

export { ReservationProvider, useReservation };
