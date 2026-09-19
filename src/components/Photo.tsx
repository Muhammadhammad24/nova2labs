import type { Photo as PhotoData } from "@/lib/images";
import { Artwork } from "@/components/Artwork";

type Props = {
  photo: PhotoData;
  /** Intrinsic aspect ratio of the crop we request. */
  ratio?: "21/9" | "16/9" | "4/3" | "3/2" | "1/1";
  /** Layout width hint for the browser's srcset choice. */
  sizes?: string;
  /** Above-the-fold images load eagerly; everything else waits. */
  eager?: boolean;
  /**
   * How much veil sits on top of the photo:
   *  - "none"  bare photograph
   *  - "soft"  a light brand wash; use when nothing overlaps the image
   *  - "text"  darkens the lower half so overlaid copy stays readable
   *  - "side"  darkens the left edge for a headline beside the subject
   */
  tint?: "none" | "soft" | "text" | "side";
  className?: string;
  /** Rendered over the photo — captions, badges, headings. */
  children?: React.ReactNode;
};

const RATIOS: Record<NonNullable<Props["ratio"]>, [number, number]> = {
  "21/9": [21, 9],
  "16/9": [16, 9],
  "4/3": [4, 3],
  "3/2": [3, 2],
  "1/1": [1, 1],
};

/**
 * A framed visual slot.
 *
 * Renders generated on-brand artwork inside a reserved aspect-ratio box, with
 * optional legibility ramps when copy sits on top of it.
 */
export function Photo({
  photo,
  ratio = "16/9",
  sizes = "100vw",
  eager = false,
  tint = "soft",
  className = "",
  children,
}: Props) {
  const [rw, rh] = RATIOS[ratio];

  return (
    <figure
      className={`relative overflow-hidden bg-secondary ${className}`}
      // A definite width stops a max-height cap from shrinking the box sideways
      // (aspect-ratio would otherwise derive width from the clamped height).
      style={{
        aspectRatio: `${rw} / ${rh}`,
        width: /(^|\s)w-/.test(className) ? undefined : "100%",
      }}
    >
      <Artwork motif={photo.motif} seed={photo.seed} label={photo.alt} />

      {tint !== "none" && (
        <>
          {/* Legibility ramp, bottom only. */}
          <span
            aria-hidden
            className={
              tint === "text"
                ? "absolute inset-0 bg-gradient-to-t from-background via-background/45 to-transparent"
                : tint === "side"
                  ? "absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent md:via-background/35"
                  : "absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-background/75 to-transparent"
            }
          />
        </>
      )}

      {children && <div className="relative h-full w-full">{children}</div>}
    </figure>
  );
}
