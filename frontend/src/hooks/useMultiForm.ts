import { ReactElement, useState } from "react";

export const useMultiForm = (steps: ReactElement[]) => {
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => {
    setCurrentStep((currStep) => {
      if (currStep >= steps.length - 1) return currStep;
      return currStep + 1;
    });
  };

  const prevStep = () => {
    setCurrentStep((prevStep) => {
      if (prevStep <= 0) return prevStep;
      return prevStep - 1;
    });
  };
  const goToStep = (step: number) => {
    setCurrentStep(step);
  };
  return {
    currentStep,
    nextStep,
    prevStep,
    goToStep,
    isFirstStep: currentStep === 0,
    isLastStep: currentStep === steps.length - 1,
  };
};
