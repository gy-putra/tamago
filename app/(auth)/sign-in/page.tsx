import { Suspense } from "react";
import SigninPage from "./_components/SigninPage";

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SigninPage />
    </Suspense>
  );
}
