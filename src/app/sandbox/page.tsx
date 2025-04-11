export default function SandboxPage() {
  return (
    <div className="flex flex-col gap-4">
      Seed Function
      <form action={async () => {
        "use server"
        console.log("")
      }}></form>
    </div>
  );
}
