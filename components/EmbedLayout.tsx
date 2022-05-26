import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

interface EmbedLayoutProps {
  children: React.ReactNode;
}

const EmbedLayout = ({ children }: EmbedLayoutProps) => {
  const router = useRouter();
  const { locale, defaultLocale } = router;

  return (
    <div className="h-full">
      {/* NAV */}
      <div className="fixed top-0 z-40 flex h-14 w-full items-center justify-center bg-accent">
        <nav className="flex w-full max-w-screen-xl items-center justify-between p-3 text-white lg:py-3 lg:px-0">
          <Link href={`/${locale === defaultLocale ? "" : locale}`}>
            <div className="flex cursor-pointer items-center justify-center gap-4">
              {/* LOGO */}
              <div className="flex w-9 items-center justify-center md:w-12">
                <Image src="/static/jata_logo.png" width={128} height={96} />
              </div>
              {/* SITE NAME */}
              <h1 className="text-lg font-semibold uppercase md:text-xl">
                Kawasanku
              </h1>
            </div>
          </Link>
        </nav>
      </div>
      {/* CHART */}
      <div className="mt-14 h-full">{children}</div>
    </div>
  );
};

export default EmbedLayout;
