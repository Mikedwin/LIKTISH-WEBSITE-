import { stats } from "@/lib/site-data";

export function StatsBar() {
  return (
    <section className="-mt-10 px-4 pb-8">
      <div className="container-shell">
        <div className="editorial-panel relative overflow-hidden rounded-[2rem] px-6 py-7 md:px-8 md:py-8">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-soft">
                Field figures
              </p>
              <h2 className="headline mt-4 max-w-md text-3xl font-black text-brand md:text-4xl">
                Numbers that support the trust story, not decorate it.
              </h2>
            </div>
            <div className="grid gap-4 md:grid-cols-4">
              {stats.map((item, index) => (
                <div
                  key={item.label}
                  className={
                    index === 1
                      ? "rounded-[1.35rem] bg-brand px-5 py-6 text-white"
                      : "rounded-[1.35rem] bg-white/78 px-5 py-6"
                  }
                >
                  <p
                    className={`headline text-3xl font-black md:text-[2.35rem] ${
                      index === 1 ? "text-white" : "text-brand"
                    }`}
                  >
                    {item.value}
                  </p>
                  <p
                    className={`mt-3 text-[11px] font-semibold uppercase tracking-[0.2em] ${
                      index === 1 ? "text-white/68" : "text-muted"
                    }`}
                  >
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
