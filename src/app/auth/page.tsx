import { Button } from "@/components/ui/button";

async function signIn() {
  // TODO: Implement with Firebase Authentication
  alert('TODO: Implement with Firebase Authentication');
}

export default function AuthPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4">Authentication</h1>
      <Button onClick={signIn}>Sign In</Button>
    </div>
  );
}
