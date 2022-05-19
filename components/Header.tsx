import Image from "next/image";
import router, { useRouter } from "next/router";

import { LANG } from "../lib/constants";

const Header = () => {
  const router = useRouter();
  const { pathname, asPath, query } = router;

  return (
    <div className="sticky top-0 z-20 flex items-center justify-center bg-accent">
      <nav className="flex w-full max-w-screen-lg items-center justify-between p-3 text-white lg:py-3 lg:px-0">
        <div className="flex items-center justify-center gap-4">
          {/* LOGO */}
          <div className="flex w-10 items-center justify-center">
            <Image src="/static/jata_logo.png" width={128} height={96} />
          </div>
          {/* SITE NAME */}
          <h1 className="font-semibold uppercase">Kawasanku</h1>
        </div>
        {/* LANGUAGE PICKER */}
        <div className="grid grid-cols-4 divide-x border">
          {LANG.map((lang, index) => (
            <button
              key={index}
              onClick={() =>
                router.push({ pathname, query }, asPath, {
                  locale: lang.locale,
                })
              }
              className="flex items-center justify-center py-1 px-2 text-sm hover:bg-white/30"
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
