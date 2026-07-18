import Image from "next/image";
import type { Presenter } from "@/types/presenter";

interface ScreenshotGalleryProps {
  presenter: Presenter;
}

export default function ScreenshotGallery({ presenter }: ScreenshotGalleryProps) {
  const { screenshots, name } = presenter.project;

  return (
    <section className="px-6 sm:px-10 lg:px-14 py-10" aria-label="Product screenshots">
      <div className="kicker mb-6">Screenshots</div>

      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-5 items-start">
        {/* Desktop screenshot */}
        <div className="card p-2 overflow-hidden">
          <div className="relative aspect-video rounded-[calc(var(--radius-lg)-8px)] overflow-hidden bg-cream">
            <Image
              src={screenshots.desktop}
              alt={`${name} desktop view`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 66vw"
              priority
            />
          </div>
          <div className="text-center py-2">
            <span className="text-label text-ink-muted">Desktop</span>
          </div>
        </div>

        {/* Mobile screenshot */}
        <div className="card p-2 overflow-hidden">
          <div className="relative aspect-[9/19.5] max-h-[500px] rounded-[calc(var(--radius-lg)-8px)] overflow-hidden bg-cream mx-auto w-full max-w-[250px] md:max-w-none">
            <Image
              src={screenshots.mobile}
              alt={`${name} mobile view`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
          </div>
          <div className="text-center py-2">
            <span className="text-label text-ink-muted">Mobile</span>
          </div>
        </div>
      </div>
    </section>
  );
}
