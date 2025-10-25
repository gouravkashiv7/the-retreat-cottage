"use client";
const { createContext, useContext, useState } = require("react");

const ReservationContext = createContext();

const initialState = { from: undefined, to: undefined };

function ReservationProvider({ children }) {
  const [range, setRange] = useState(initialState);

  const resetRange = () => {
    setRange({ from: undefined, to: undefined });
  };

  return (
    <ReservationContext.Provider value={{ range, setRange, resetRange }}>
      {children}
    </ReservationContext.Provider>
  );
}

function useReservation() {
  const context = useContext(ReservationContext);
  if (context === "undefined")
    throw new Error("ReservationContext was used outside of scope.");
  return context;
}

export { ReservationProvider, useReservation };
