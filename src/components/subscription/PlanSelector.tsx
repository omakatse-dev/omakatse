import CardButton from "../common/CardButton";

type PlanOption = "12 months" | "6 months" | "3 months" | "1 month";

export default function PlanSelector({
  selectedPlan,
  setSelectedPlan,
}: {
  selectedPlan: PlanOption;
  setSelectedPlan: (plan: PlanOption) => void;
}) {
  return (
    <div className="flex flex-col lg:flex-row gap-4 sm:gap-8 w-full justify-center">
      <CardButton
        className="w-full sm:w-64"
        active={selectedPlan === "1 month"}
        onClick={() => setSelectedPlan("1 month")}
      >
        <div className="flex flex-col gap-8">
          <h4>1 month</h4>
          <div>
            <h1>40</h1>
            <h3 className="font-bold text-gray-400">AED/mo</h3>
          </div>
          <div className="bodyLG text-gray-800">to just try your first box</div>
        </div>
      </CardButton>
      <CardButton
        className="w-full sm:w-64"
        active={selectedPlan === "3 months"}
        onClick={() => setSelectedPlan("3 months")}
      >
        <div className="flex flex-col gap-8">
          <h4>3 months</h4>
          <div>
            <h1>35</h1>
            <h3 className="font-bold text-gray-400">AED/mo</h3>
          </div>
          <div className="bodyLG text-gray-800">save AED 20</div>
        </div>
      </CardButton>
      <CardButton
        className="w-full sm:w-64"
        active={selectedPlan === "6 months"}
        onClick={() => setSelectedPlan("6 months")}
      >
        <div className="flex flex-col gap-8">
          <h4>6 months</h4>
          <div>
            <h1>30</h1>
            <h3 className="font-bold text-gray-400">AED/mo</h3>
          </div>
          <div className="bodyLG text-gray-800">save AED 40</div>
        </div>
      </CardButton>
      <CardButton
        className="w-full sm:w-64"
        active={selectedPlan === "12 months"}
        onClick={() => setSelectedPlan("12 months")}
      >
        <div className="flex flex-col gap-8">
          <h4>12 months</h4>
          <div>
            <h1>25</h1>
            <h3 className="font-bold text-gray-400">AED/mo</h3>
          </div>
          <div className="bodyLG text-gray-800">save AED 60</div>
        </div>
      </CardButton>
    </div>
  );
}
