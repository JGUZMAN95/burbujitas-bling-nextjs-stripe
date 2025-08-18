import Image from 'next/image';
export default async function AboutUs() {
    return (<div className="text-softBrown grid md:grid-cols-[2fr_1fr] grid-row-3 mx-6 md:mx-10 gap-8 place-items-center md-place-items-end p-10">
      {/* Left: Text */}
      <div className="md:order-first order-last font-accent text-center">
         <p className='text-base'>Hi, I’m Jocelyn</p>
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
        <p className='md:text-right text-center text-md'>XOXO, Your Bestie</p>

        </div>
              {/* Image */}

          <Image src="/images/Owner.png" alt="Owner" width={200} height={0} className="rounded-lg"/>
    </div>);
}
