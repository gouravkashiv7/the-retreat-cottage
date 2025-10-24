import BookingForm from "./BookingForm";

// This is now just a wrapper that passes props to the client component
export default function BookingSummary(props) {
  return <BookingForm {...props} />;
}
