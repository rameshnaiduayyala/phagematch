import React, { useState } from "react";
import StageStepper from "../../components/StageStepper";

export default function ClinicianDashboard() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    { label: "Patient Registration" },
    { label: "Clinical Assessment" },
    { label: "Sample Collection" },
    { label: "Preliminary Culture" },
    { label: "Submission to CCMB" },
  ];

  const [notes, setNotes] = useState(Array(steps.length).fill(""));

  const handleNoteChange = (index, value) => {
    const updatedNotes = [...notes];
    updatedNotes[index] = value;
    setNotes(updatedNotes);
  };

  return (
    <div className="max-w-6xl mx-auto py-10 px-6">
      <div className="grid md:grid-cols-2 gap-10">
        {/* Left Side: Stepper + Input */}
        <div>
          <StageStepper
            steps={steps}
            activeStep={activeStep}
            styleConfig={{
              activeBgColor: "#1d4ed8",
              completedBgColor: "#66b34f",
            }}
          />

          <div className="mt-6 bg-gray-50 border border-gray-200 rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-800">
              Step {activeStep + 1}: {steps[activeStep].label}
            </h2>

            <div className="mt-4">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Add Note:
              </label>
              <textarea
                value={notes[activeStep]}
                onChange={(e) => handleNoteChange(activeStep, e.target.value)}
                placeholder="Write your note for this step..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none min-h-[100px]"
              />
            </div>
          </div>

          {/* Navigation */}
          <div className="mt-6 flex justify-between">
            <button
              onClick={() => setActiveStep((s) => Math.max(0, s - 1))}
              disabled={activeStep === 0}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded disabled:opacity-50"
            >
              Back
            </button>
            <button
              onClick={() => setActiveStep((s) => Math.min(steps.length - 1, s + 1))}
              disabled={activeStep === steps.length - 1}
              className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>

        {/* Right Side: Notes Cards */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">🗒️ Notes Overview</h3>
          {steps.map((step, i) => (
            <div
              key={i}
              className={`p-4 rounded-xl shadow-md border ${
                i === activeStep ? "border-blue-500 bg-blue-50" : "border-gray-200 bg-white"
              }`}
            >
              <h4 className="font-semibold text-gray-800">{step.label}</h4>
              <p className="text-gray-600 mt-1">
                {notes[i] ? notes[i] : <span className="text-gray-400 italic">No note added</span>}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
