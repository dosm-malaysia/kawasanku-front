import Image from 'next/image';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="h-full">
      <div className="flex items-center justify-center bg-header">
        <nav className="flex w-full max-w-screen-lg items-center justify-between bg-header p-3 text-white">
          <div className="flex items-center justify-center gap-4">
            <div className="flex w-10 items-center justify-center">
              <Image src="/static/jata_logo.png" width={128} height={96} />
            </div>
            <h1 className="font-semibold uppercase">Kawasanku</h1>
          </div>
          <div className="grid grid-cols-4 divide-x border">
            {['EN', 'BM', 'CN', 'TM'].map((lang, index) => (
              <button
                key={index}
                className="flex items-center justify-center py-1 px-2 text-sm hover:bg-white/30"
              >
                {lang}
              </button>
            ))}
          </div>
        </nav>
      </div>
      {children}
    </div>
  );
};

export default Layout;
