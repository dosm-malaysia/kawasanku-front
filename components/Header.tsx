import { useTranslation } from "next-i18next";
import Image from "next/image";
import { useRouter } from "next/router";

import { LANG } from "../lib/constants";

const Header = () => {
  const router = useRouter();
  const { i18n } = useTranslation();
  const { pathname, asPath, query } = router;

  return (
    <div className="fixed top-0 z-20 flex h-14 w-full items-center justify-center bg-accent">
      <nav className="flex w-full max-w-screen-lg items-center justify-between p-3 text-white lg:py-3 lg:px-0">
        <div className="flex items-center justify-center gap-4">
          {/* LOGO */}
          <div className="flex w-12 items-center justify-center">
            <Image src="/static/jata_logo.png" width={128} height={96} />
          </div>
          {/* SITE NAME */}
          <h1 className="text-xl font-semibold uppercase">Kawasanku</h1>
        </div>
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
