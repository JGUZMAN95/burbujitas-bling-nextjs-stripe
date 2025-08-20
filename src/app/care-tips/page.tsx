export default function CareTips() {
  return (
    <main className="min-h-full flex items-center justify-center">
      <div className="max-w-2xl mx-auto p-6 text-softBrown bg-softWhite/60 font-accent space-y-4 place-items-center">
        <h1 className="text-2xl font-bold text-center mb-4">Care Tips</h1>
        <div className="grid grid-cols-[auto,1fr] items-center gap-2">
          <img
            src="/images/care-tips/perfume.png"
            alt="Cart"
            width={100}
            height={100}
          />
          <div>
            <span className="bg-softWhite px-1 rounded inline-block">
              First off, Last on.
            </span>
            Try to keep minimal contact with excess oils, chemicals, and
            moisture.
            <span className="block mt-1">
              But if you forget, don’t sweat it (hehe).
            </span>
          </div>
        </div>
        <div className="grid grid-cols-[auto,1fr] gap-2 items-center">
          <img
            src="/images/care-tips/scrub.png"
            alt="Cart"
            width={100}
            height={100}
          />
          <p>
            <span className="bg-softWhite px-1 rounded inline-block">
              Wash your jewelry after every 5–6 wears.
            </span>
            Use a soft toothbrush, warm water, and any gentle soap that cuts
            oil, then give it a light scrub.
          </p>
        </div>
        <div className="grid grid-cols-[auto,1fr] gap-2 items-center">
          <img
            src="/images/care-tips/sleep.png"
            alt="Cart"
            width={100}
            height={100}
          />
          <p>
            Like I mentioned earlier:
            <span className="bg-softWhite px-1 rounded inline-block">
              First off, Last on.
            </span>
            I get it—sometimes we have a rough day or had too much fun (wink).
          </p>
        </div>
        <div className="grid grid-cols-[auto,1fr] gap-2 items-center">
          <img
            src="/images/care-tips/storage.png"
            alt="Cart"
            width={100}
            height={100}
          />
          <p>
            <span className="bg-softWhite px-1 rounded inline-block">
              Store your jewelry in airtight plastic pouch
            </span>
            provided at purchase.
            <span>
              Helps minimize scratches and protects from excess moisture in the
              air.
            </span>
          </p>
        </div>
      </div>
    </main>
  );
}
