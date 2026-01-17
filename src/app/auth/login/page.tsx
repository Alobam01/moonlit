import { Suspense } from "react";
import AdminLogin from "@/pages/admin/AdminLogin";
import { Loader2 } from "lucide-react";

function LoginLoading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={<LoginLoading />}>
      <AdminLogin />
    </Suspense>
  );
}

