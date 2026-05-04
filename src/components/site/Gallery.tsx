import art1 from "@/assets/art-1.jpg";
import art2 from "@/assets/art-2.jpg";
import art3 from "@/assets/art-3.jpg";
import art4 from "@/assets/art-4.jpg";
import art5 from "@/assets/art-5.jpg";
import art6 from "@/assets/art-6.jpg";

const pieces = [
  { src: art1, title: "Bloom No. 1", medium: "Watercolor on paper", sold: false },
  { src: art2, title: "Embrace", medium: "Acrylic on canvas", sold: true },
  { src: art3, title: "Quiet Hills", medium: "Gouache on paper", sold: false },
  { src: art4, title: "Lotus Study", medium: "Watercolor on paper", sold: false },
  { src: art5, title: "Stillness", medium: "Oil on linen", sold: true },
  { src: art6, title: "Kintsugi", medium: "Mixed media", sold: false },
];

export function Gallery() {
  return (
    <section id="gallery" className="relative px-6 py-32 md:px-10 md:py-40">
      <div className="mx-auto max-w-7xl">
        <div className="reveal mb-20 text-center">
          <p className="text-[11px] uppercase tracking-[0.5em] text-muted-foreground">The Collection</p>
          <h2 className="mt-6 font-serif text-5xl text-foreground md:text-6xl">Featured Pieces</h2>
          <p className="mx-auto mt-6 max-w-lg text-sm leading-relaxed text-muted-foreground md:text-base">
            Each work is one of a kind — painted slowly, by hand, in a small sunlit studio.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {pieces.map((p, i) => (
            <figure
              key={p.title}
              className="reveal group cursor-pointer"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="relative overflow-hidden rounded-sm bg-secondary">
                <img
                  src={p.src}
                  alt={p.title}
                  loading="lazy"
                  width={800}
                  height={1024}
                  className="aspect-[4/5] w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.06]"
                />
                <div className="absolute inset-0 flex items-end justify-center bg-gradient-to-t from-foreground/30 via-transparent to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100">
                  <span className="mb-8 inline-flex items-center gap-2 rounded-full bg-background/90 px-6 py-2.5 text-[10px] uppercase tracking-[0.3em] text-foreground shadow-sm">
                    View Piece →
                  </span>
                </div>
                {p.sold && (
                  <span className="absolute left-4 top-4 rounded-full bg-background/90 px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                    Sold
                  </span>
                )}
              </div>
              <figcaption className="mt-5 flex items-baseline justify-between">
                <span className="font-serif text-lg italic text-foreground">{p.title}</span>
                <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{p.medium}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
