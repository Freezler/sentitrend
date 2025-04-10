import { Button } from "@/components/ui/button";

async function signIn() {
  // TODO: Implement with Firebase Authentication
  alert('TODO: Implement with Firebase Authentication');
}

'use client';

export default function AuthPage() {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="mb-4 font-bold text-2xl">Authentication</h1>
      <Button onClick={signIn}>Sign In</Button>
    </div>
  );
}