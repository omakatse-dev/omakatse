export default function ProgressBar({
  currentStep,
  totalSteps,
}: {
  currentStep: number;
  totalSteps: number;
}) {
  const fill = Number(((currentStep / totalSteps) * 100).toFixed(0));
  return (
    <div className="flex flex-col items-center">
      Step {currentStep} of {totalSteps} {fill}
      <div className="h-2 bg-gray-50 w-96 rounded-full border-secondary mt-2">
        <div
          className={`h-full bg-gray-200 rounded-full`}
          style={{ width: `${fill}%` }}
        />
      </div>
    </div>
  );
}
