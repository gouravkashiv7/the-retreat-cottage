import Spinner from "@/app/_components/Spinner";

function RetreatSpinner() {
  return (
    <div className="grid justify-center items-center">
      <Spinner />
      <p className="text-xl text-primary-200"> Loading retreats data !!</p>
    </div>
  );
}

export default RetreatSpinner;
