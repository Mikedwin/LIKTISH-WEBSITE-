import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="editorial-panel max-w-xl rounded-[2rem] p-10 text-center">
        <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-soft">
          404
        </p>
        <h1 className="headline text-4xl font-black text-brand">
          The page you are looking for is not here.
        </h1>
        <p className="prose-copy mt-5">
          Let&apos;s get you back to solar solutions, project stories, or a direct way to reach LIKTISH.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex min-h-12 items-center rounded-[1rem] bg-brand px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-white"
        >
          Return home
        </Link>
      </div>
    </div>
  );
}
