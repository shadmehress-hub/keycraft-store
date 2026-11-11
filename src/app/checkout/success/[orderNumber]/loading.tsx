export default function OrderSuccessLoading() {
  return (
    <main className="mx-auto w-full max-w-4xl px-4 pt-10 pb-20 sm:px-6 lg:px-8 animate-pulse">
      <div className="flex flex-col items-center text-center">
        <div className="size-20 rounded-3xl bg-zinc-800" />
        <div className="mt-6 h-6 w-36 rounded-full bg-zinc-800" />
        <div className="mt-3 h-8 w-64 rounded-lg bg-zinc-800" />
        <div className="mt-2 h-4 w-96 rounded bg-zinc-800" />
        <div className="mt-4 h-10 w-48 rounded-xl bg-zinc-800" />
      </div>
      <div className="mt-10 h-72 rounded-2xl border border-zinc-800 bg-zinc-900/40" />
    </main>
  );
}
