import React, { useState } from "react";
import StageStepper from "../../components/StageStepper";

export default function ClinicianDashboard() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    { label: "User Details" },
    { label: "Verification" },
    { label: "Confirmation" },
  ];

  return (
    <div className="max-w-xl mx-auto py-10">
      <StageStepper
        steps={steps}
        activeStep={activeStep}
        styleConfig={{
          activeBgColor: "#1d4ed8", 
          completedBgColor: "#66b34fff",
        }}
      />

      <div className="mt-10">
        {activeStep === 0 && <div>Step 1: Enter your details</div>}
        {activeStep === 1 && <div>Step 2: Verify your info</div>}
        {activeStep === 2 && <div>Step 3: Done!</div>}
      </div>

      <div className="mt-6 flex gap-4">
        <button
          onClick={() => setActiveStep((s) => Math.max(0, s - 1))}
          className="px-4 py-2 bg-gray-200 rounded"
        >
          Back
        </button>
        <button
          onClick={() => setActiveStep((s) => Math.min(steps.length - 1, s + 1))}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
}
