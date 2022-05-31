import { useTranslation } from "next-i18next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import { LANG } from "../lib/constants";

const Header = () => {
  const router = useRouter();
  const { i18n } = useTranslation();
  const { pathname, asPath, query, locale, defaultLocale } = router;

  return (
    <div className="fixed top-0 z-40 flex h-14 w-full items-center justify-center bg-accent">
      <nav className="flex w-full max-w-screen-xl items-center justify-between p-3 text-white">
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
        {/* LANGUAGE PICKER */}
        <div className="grid grid-cols-4 divide-x divide-white overflow-hidden rounded-lg border border-white">
          {LANG.map((lang, index) => (
            <button
              key={index}
              onClick={() =>
                router.push({ pathname, query }, asPath, {
                  locale: lang.locale,
                })
              }
              className={`"
                flex items-center justify-center py-1 px-2 text-sm
                ${i18n.language === lang.locale ? "bg-white text-accent" : ""}
              `}
            >
              {lang.display}
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default Header;
