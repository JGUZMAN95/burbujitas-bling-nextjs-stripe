"use client";

import Button from "@/components/Buttons/StaticButton";

export default function ContactUs() {
  return (
    <div className="min-h-full flex justify-center font-accent text-softCoral place-items-center">
      <form className="w-full max-w-sm bg-softWhite/50 shadow-md p-6 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
        {/* Header */}
        <div className="col-span-1 md:col-span-2 justify-center md:justify-start">
          <header className="text-lg font-bold">Contact Us</header>
        </div>

        {/* Name */}
        <div>
          <label className="block mb-1 font-semibold">Name:</label>
          <input
            type="text"
            name="username"
            className="bg-softWhite w-full  shadow p-2 focus:outline-none focus:ring-2 focus:ring-softCoral"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block mb-1 font-semibold">Email:</label>
          <input
            type="email"
            className="bg-softWhite w-full shadow p-2 focus:outline-none focus:ring-2 focus:ring-softCoral"
          />
        </div>

        {/* Message */}
        <div className="col-span-1 md:col-span-2">
          <label className="block mb-1 font-semibold">Message:</label>
          <textarea
            rows={4}
            className="bg-softWhite w-full shadow p-2 focus:outline-none focus:ring-2 focus:ring-softCoral"
          />
        </div>

        {/* Submit Button */}
        <div className="col-span-1 md:col-span-2 mt-4">
          <Button className="w-full">Send</Button>
        </div>
      </form>
    </div>
  );
}
