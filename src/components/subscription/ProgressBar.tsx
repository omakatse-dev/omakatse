export default function ProgressBar({
  currentStep,
  totalSteps,
  showSteps = true,
  className,
}: {
  currentStep: number;
  totalSteps: number;
  showSteps?: boolean;
  className?: string;
}) {
  const fill = Number(((currentStep / totalSteps) * 100).toFixed(0));
  const progressBarColor = fill === 100 ? "bg-yellow" : "bg-gray-200"; // Change color when 100%
  return (
    <div className={`flex flex-col items-center w-full gap-2 ${className}`}>
      {showSteps && (
        <div>
          Step {currentStep} of {totalSteps}
        </div>
      )}
      <div className="h-2.5 bg-gray-50 w-full rounded-full border-secondary">
        {fill > 0 && (
          <div
            className={`h-full ${progressBarColor} rounded-full border-r border-gray-400`}
            style={{ width: `${fill}%` }}
          />
        )}
      </div>
    </div>
  );
}
