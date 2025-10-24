import React from "react";
import { Stepper, Step } from "react-form-stepper";

const StageStepper = ({
  steps = [],
  activeStep = 0,
  connectorStateColors = true,
  hideConnectors = false,
  nonLinear = false,
  styleConfig = {},
  connectorStyleConfig = {},
  stepClassName = "",
  className = "",
}) => {
  return (
    <Stepper
      steps={steps}
      activeStep={activeStep}
      connectorStateColors={connectorStateColors}
      hideConnectors={hideConnectors}
      nonLinear={nonLinear}
      stepClassName={stepClassName}
      className={className}
      styleConfig={{
        activeBgColor: "#000",        // Customize your colors here
        completedBgColor: "#555",
        inactiveBgColor: "#e0e0e0",
        activeTextColor: "#fff",
        completedTextColor: "#fff",
        inactiveTextColor: "#aaa",
        size: "2.2em",
        circleFontSize: "0.9rem",
        labelFontSize: "0.85rem",
        borderRadius: "50%",
        fontWeight: 500,
        ...styleConfig,
      }}
      connectorStyleConfig={{
        activeColor: "#000",
        completedColor: "#555",
        disabledColor: "#ccc",
        size: 2,
        style: "solid",
        ...connectorStyleConfig,
      }}
    />
  );
};

export default StageStepper;
