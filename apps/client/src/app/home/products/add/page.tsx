import { Clock } from "lucide-react";

export default function ComingSoon() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-8">
      <Clock className="h-12 w-12 text-muted-foreground mb-4" />
      <h1 className="text-2xl font-semibold mb-2">Commerce Coming Soon 🚀</h1>
      <p className="text-muted-foreground max-w-md mb-6">
        We’re building tools to help you manage and sell your products
        seamlessly on Xtopay. Stay tuned!
      </p>
      
    </div>
  );
}
