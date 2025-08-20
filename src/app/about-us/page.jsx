import Image from "next/image";

export default function AboutUs() {
  return (
    <main className="min-h-full flex items-center justify-center">
      <div className="max-w-xl mx-auto bg-softWhite/60 p-6 text-softBrown grid md:grid-cols-[2fr_1fr] grid-rows-1 gap-8 justify-items-center items-center">
        {/* Image */}
        <div className="max-w-[150px] md:max-w-xs order-first md:order-last">
          <Image
            src="/images/body/Owner.png"
            alt="Owner"
            width={150}
            height={150}
            className="rounded-lg object-cover w-full h-auto"
            priority
          />
        </div>

        {/* Left: Text */}
        <div className="font-accent text-center flex flex-col justify-center gap-2">
          <p className="text-base">Hi, I’m Jocelyn</p>
          <p>
            The heart and hands behind Burbujitas & Bling. My brand is all about
            celebrating self-love, beauty, and my Latina roots through dainty
            handmade jewelry, self-designed stickers, and my favorite beauty
            essentials, lip oil.
          </p>
          <p>
            Every creation is made with intention and inspired by culture,
            confidence, and connection. Whether it’s a sparkling ring, a
            meaningful sticker, or a swipe of lip oil, I design each piece to
            help you feel beautiful, grounded, and unapologetically yourself.
          </p>
          <p className="mt-2">
            XOXO, <span>Your Bestie with no Tesie</span>
          </p>
        </div>
      </div>
    </main>
  );
}
