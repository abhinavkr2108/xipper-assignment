import { Link } from "react-router";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

export const LandingPage = () => {
  return (
    <div className="bg-[url('/bg.svg')] bg-repeat">
      <div className="flex flex-col justify-between max-w-xl px-4 mx-auto lg:pt-16 lg:flex-row md:px-8 lg:max-w-screen-xl">
        <div className="pt-16 mb-16 lg:mb-0 lg:pt-32 lg:max-w-lg lg:pr-5">
          <div className="max-w-xl mb-6">
            <div className="text-center md:text-left">
              <Badge>Introducing</Badge>
            </div>
            <h2 className="max-w-lg my-6 font-sans text-3xl text-center md:text-left font-bold tracking-tight text-gray-900 sm:text-4xl sm:leading-none">
              Xipper- Your Ultimate
              <br className="hidden md:block" />
              Online Booking Platform
            </h2>
            <p className="text-base text-gray-700 text-center md:text-left md:text-lg">
              Discover the perfect stay for your next trip with Xipper, a
              seamless and hassle-free hotel booking platform.
            </p>
          </div>
          <div className="flex justify-center md:justify-start items-center gap-2 md:gap-6">
            <Link to={"/browse"}>
              <Button>Get started</Button>
            </Link>
            <Link to={"/about"}>
              <Button variant="outline">Learn more</Button>
            </Link>
          </div>
        </div>
        <div>
          <img
            src="https://kitwind.io/assets/kometa/two-thirds-phone.png"
            className="object-cover object-top w-full h-64 mx-auto lg:h-auto xl:mr-24 md:max-w-sm"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};
