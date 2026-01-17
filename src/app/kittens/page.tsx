import { Suspense } from "react";
import Kittens from "@/pages/Kittens";
import { Loader2 } from "lucide-react";

function KittensLoading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
    </div>
  );
}

export default function KittensPage() {
  return (
    <Suspense fallback={<KittensLoading />}>
      <Kittens />
    </Suspense>
  );
}

