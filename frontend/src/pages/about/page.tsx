import React from "react";
import { Navbar } from "../../components/navbar";

export default function AboutPage() {
  return (
    <React.Fragment>
      <Navbar />
      <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="lg:pr-10">
            <h5 className="mb-4 text-4xl font-extrabold leading-none">
              Seamless Hotel Booking
              <br className="hidden md:block" />& Automated{" "}
              <span className="inline-block text-deep-purple-accent-400">
                Check-In & Check-Out
              </span>
            </h5>
            <p className="mb-6 text-gray-900">
              Xipper is a SaaS-based hotel automation platform designed to
              revolutionize the check-in and check-out experience for travelers.
              Based in Maharashtra, we enable hotels to streamline their
              operations, reduce manual effort, and enhance guest satisfaction.
              Our platform allows users to book hotels effortlessly and complete
              a hassle-free web check-in using their Aadhaar details for secure
              and efficient identity verification.
              <br />
              <br />
              With Xipper, say goodbye to long queues and paperwork – experience
              the future of hotel automation today!
            </p>
            <hr className="mb-5 border-gray-300" />
          </div>
          <div>
            <img
              className="object-cover w-full h-56 rounded shadow-lg sm:h-96"
              src="https://images.pexels.com/photos/927022/pexels-photo-927022.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=3&amp;h=750&amp;w=1260"
              alt="Hotel Lobby"
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
