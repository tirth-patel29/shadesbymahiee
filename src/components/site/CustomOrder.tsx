import { MessageCircle, Upload } from "lucide-react";

export function CustomOrder() {
  return (
    <section id="custom" className="px-5 py-16 md:px-10 md:py-24">
      <div className="reveal relative mx-auto max-w-6xl overflow-hidden rounded-3xl gradient-warm p-8 text-primary-foreground shadow-soft md:p-14">
        <div
          className="pointer-events-none absolute -top-20 -right-20 h-72 w-72 rounded-full bg-background/15 blur-3xl"
        />
        <div
          className="pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-background/15 blur-3xl"
        />
        <div className="relative grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-primary-foreground/80">
              Custom Made
            </p>
            <h2 className="mt-3 font-serif text-3xl leading-tight md:text-5xl">
              Want something made just for you?
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-primary-foreground/90 md:text-base">
              Share your idea, name, or design — we'll create a one-of-a-kind handmade
              artwork especially for you. Names, deities, family portraits, anything.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a
                href="https://wa.me/919999999999"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-background px-6 py-3.5 text-sm font-semibold text-primary shadow-card transition-transform hover:scale-[1.03]"
              >
                <MessageCircle className="h-4 w-4" />
                Start Custom Order
              </a>
              <button className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-background/40 bg-background/10 px-6 py-3.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-background/20">
                <Upload className="h-4 w-4" />
                Upload Reference
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {[
              { n: "1", t: "Share Idea", d: "Name, design, or photo" },
              { n: "2", t: "We Sketch", d: "Approve your concept" },
              { n: "3", t: "We Paint", d: "Handmade just for you" },
              { n: "4", t: "Delivered", d: "Pan-India shipping" },
            ].map((s) => (
              <div
                key={s.n}
                className="rounded-2xl bg-background/15 p-5 backdrop-blur-sm"
              >
                <span className="font-serif text-3xl font-semibold">{s.n}</span>
                <p className="mt-2 font-medium">{s.t}</p>
                <p className="text-xs text-primary-foreground/80">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
