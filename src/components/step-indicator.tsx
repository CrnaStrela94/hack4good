interface StepIndicatorProps {
  currentStep: number
  totalSteps: number
}

export default function StepIndicator({ currentStep, totalSteps }: StepIndicatorProps) {
  return (
    <div className="flex justify-center">
      <div className="text-sm font-medium">
        Step {currentStep} of {totalSteps}
      </div>
    </div>
  )
}
