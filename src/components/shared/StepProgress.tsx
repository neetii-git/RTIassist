import { cn } from "@/lib/utils";

const steps = [
  "User Input",
  "Authority Detection",
  "RTI Generation"
];

export function StepProgress({ currentStep, className }: { currentStep: number; className?: string }) {
  return (
    <div className={cn("w-full py-6", className)}>
      <div className="flex items-center justify-between relative">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-muted rounded-full z-0"></div>
        <div 
          className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-primary glowing-bar transition-all duration-500 ease-in-out z-0"
          style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
        ></div>
        
        {steps.map((step, index) => {
          const isActive = index <= currentStep;
          return (
            <div key={step} className="relative z-10 flex flex-col items-center gap-2">
              <div 
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300",
                  isActive 
                    ? "bg-primary text-white primary-glow" 
                    : "bg-card border-2 border-border text-muted-foreground"
                )}
              >
                {index + 1}
              </div>
              <span 
                className={cn(
                  "text-xs md:text-sm font-medium transition-colors hidden sm:block absolute -bottom-6 whitespace-nowrap",
                  isActive ? "text-primary" : "text-muted-foreground"
                )}
              >
                {step}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
