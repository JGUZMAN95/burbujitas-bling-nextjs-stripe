import Button from '../../components/StaticButton'

export default async function ContactUs() {
  return (

    <div className='grid md:justify-center font-accent text-softCoral p-3'>
       <form className='md:grid grid-col-2 gap-x-8 gap-y-5 focus:outline-none md:m-10'>
            <div className='col-span-2 md:place-items-start place-items-center'>
                <header className='text-base'>Contact Us</header>
            </div>

            <div>
                <label>Name: </label>

                <input type='text'
                    className='bg-softWhite w-full rounded-md shadow block grow p-2' 
                    name="username"></input>
            </div>

            <div>
                <label>Email: </label>

                <input type='email' 
                className='bg-softWhite  w-full rounded-md shadow block grow p-2'></input>
            
            </div>

            <div className='col-span-2 flex flex-col'>
                <label>Message: </label>

                <textarea rows={3} className='bg-softWhite w-full rounded-md shadow block grow p-2'></textarea>
            </div>

            <div className='mt-6 grid col-span-2 flex items-center '>
                <Button>Send</Button>
            </div>
        </form> 
    </div>
  );
}