import Heading from "@/app/(marketing)/_components/heading";
import Heroes from "./_components/heroes";
import Footer from "./_components/footer";
export default function MarketingPage() {
  return (
    <div className="min-h-full flex flex-col z-30">
      <div className="flex flex-col items-center justify-center  md:justify-evenly text-center flex-1 px-6 pb-2 ">
        <Heading />
        <Heroes />
      </div>
      <Footer />

    </div>
  );
}
