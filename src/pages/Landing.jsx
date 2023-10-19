import { Header, NeedBox } from "../components";

function Landing() {
  return (
    <div>
      <Header />
      <div className="container mx-auto">
        <NeedBox />
        <div className="mt-32 mb-16">
          <h3 className="font-semibold text-2xl mb-2">
            Takip Edilebilir Bağış
          </h3>
          <div className="bg-red w-full p-8 rounded-3xl flex flex-wrap justify-center items-center md:gap-4">
            <h1 className="font-bold text-7xl text-white mt-16 cursor-pointer md:my-16 text-center">
              BAĞIŞ YAP
            </h1>
            <a
              href="https://etherscan.io/address/0x64A994CC850a56e87331d880A23A69b16dbFC8ea"
              target="_blank"
              rel="noreferrer"
              className="font-thin text-7xl text-white mb-16 cursor-pointer md:my-16 text-center"
            >
              BAĞIŞINI TAKİP ET
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;
