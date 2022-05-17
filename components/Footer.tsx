import Image from "next/image";

const Footer = () => (
  <div className="flex items-center justify-center bg-accent">
    <div className="flex w-full max-w-screen-lg items-center justify-between py-6 px-3 text-white lg:py-8 lg:px-0">
      <div className="flex items-center justify-center gap-4">
        <div className="flex w-40 items-center justify-center">
          <Image src="/static/jata_logo.png" width={128} height={96} />
        </div>
        <div>
          <p className="font-semibold uppercase md:text-xl">
            Department of Statistics Malaysia (DOSM)
          </p>
          <p>Prime Minister's Office</p>
        </div>
      </div>
    </div>
  </div>
);

export default Footer;
