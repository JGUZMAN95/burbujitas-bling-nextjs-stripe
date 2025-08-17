import Image from 'next/image';

export default async function AboutUs() {
  return (
<<<<<<< HEAD
    <div className="grid grid-cols-1 md:grid-cols-2 m-6 md:m-20 gap-8">
      {/* Left: Text */}
      <div className="flex flex-col justify-center">
        {/*<h1 className="font-accent text-softCoral text-lg md:text-m mb-4">
          Celebrating self-love,
          <br />beauty, and roots
          <br />Creating with culture, confidence,
          <br />and connection in every piece.
        </h1>
        */}

        <p className="font-accent text-md text-softBrown break-normal relative">
          Hi, I’m Jocelyn — the heart and hands behind Burbujitas & Bling. My brand is all about celebrating self-love, beauty, and my Latina roots through dainty handmade jewelry, self-designed stickers, and my favorite beauty essential — nourishing lip oils.
          <br></br><br></br>
          Every creation is made with intention and inspired by culture, confidence, and connection. Whether it’s a sparkling ring, a meaningful sticker, or a swipe of lip oil, I design each piece to help you feel beautiful, grounded, and unapologetically yourself.
          <br></br><br></br><br></br>
          <small className='absolute text-base bottom-0 right-10'>-XOXO, Jocelyn</small>
        </p>
      </div>

      {/* Right: Image */}
      <div className=" place-items-end">
        <div>
          <Image
            src="/images/Owner.png"
            alt="Owner"
            width={350}
            height={500}
            className="rounded-md"
          />
        </div>
      </div>
=======
    <div className="text-softBrown grid md:grid-cols-[2fr_1fr] grid-row-3 mx-6 md:mx-10 gap-8 place-items-center md-place-items-end">
      {/* Left: Text */}
      <div className="md:order-first order-last font-accent text-center">
         <p className='text-md'>Hi, I’m Jocelyn</p>
         <p>  
          the heart and hands behind Burbujitas & Bling.
          My brand is all about celebrating self-love, beauty,and my Latina
          roots through dainty handmade jewelry, self-designed stickers,
          and my favorite beauty essentials, lip oil.
          <br></br><br></br>
          Every creation is made with intention and inspired by culture,
          confidence, and connection. Whether it’s a sparkling ring, a meaningful 
          sticker, or a swipe of lip oil. I design each piece to help
          you feel beautiful, grounded, and unapologetically yourself.
          <br></br><br></br>
        </p>
        <p className='md:text-right text-center text-md'>-XOXO, Jocelyn G.</p>

        </div>
              {/* Image */}

          <Image
            src="/images/Owner.png"
            alt="Owner"
            width={200}
            height={0}
            className="rounded-lg"/>
>>>>>>> 9bc74c3 (Remove large video file from repo)
    </div>
  );
}
