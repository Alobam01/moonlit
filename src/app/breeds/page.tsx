import { Suspense } from "react";
import Breeds from "@/pages/Breeds";
import { Loader2 } from "lucide-react";

function BreedsLoading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
    </div>
  );
}

export default function BreedsPage() {
  return (
    <Suspense fallback={<BreedsLoading />}>
      <Breeds />
    </Suspense>
  );
}

