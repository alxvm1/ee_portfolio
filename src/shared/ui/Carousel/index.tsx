import { cn } from "@shared/lib/utils";
import useEmblaCarousel from "embla-carousel-react";
import { type FC, useCallback, useEffect, useState } from "react";
import ChevronIcon from "@shared/assets/svg/common/chevronIcon.svg?react";

type TCarouselProps = {
  images: string[];
  className?: string;
};

export const Carousel: FC<TCarouselProps> = ({ images, className }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: images.length > 1 });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback(
    (index: number) => emblaApi?.scrollTo(index),
    [emblaApi],
  );

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  if (images.length === 0) return null;

  return (
    <div className={cn("w-full max-w-[740px]", className)} data-slot="carousel">
      <div className="overflow-hidden rounded-[4px]" ref={emblaRef}>
        <div className="flex">
          {images.map((src) => (
            <div key={src} className="min-w-0 flex-[0_0_100%]">
              <img
                src={src}
                alt=""
                className="block h-auto w-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {images.length > 1 && (
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={scrollPrev}
              aria-label="Предыдущее изображение"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-black text-foreground transition-colors duration-[300ms] hover:bg-muted"
            >
              <ChevronIcon className="h-4 w-4 text-white pr-[2.5px]" />
            </button>
            <button
              type="button"
              onClick={scrollNext}
              aria-label="Следующее изображение"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-black text-foreground transition-colors duration-[300ms] hover:bg-muted"
            >
              <ChevronIcon className="h-4 w-4 rotate-180 text-white pr-[2.5px]" />
            </button>
          </div>

          <div className="flex items-center gap-2">
            {images.map((src, index) => (
              <button
                key={src}
                type="button"
                onClick={() => scrollTo(index)}
                aria-label={`Перейти к изображению ${index + 1}`}
                data-is-active={index === selectedIndex}
                className="h-4 w-4 rounded-full border-2 border-black bg-[#EFEFEF] transition-colors data-[is-active=true]:border-black data-[is-active=true]:bg-black"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
