import Button from '../../components/Button'

export default async function ContactUs() {
  return (
    <div className='flex grid-rows justify-center font-accent text-softCoral'>
       <form className='grid grid-col-2 md:m-20 gap-x-8 gap-y-5 focus:outline-none'>
            <div className='col-span-2'>
                <header className='text-base'>Contact Us</header>
            </div>

            <div>
                <label>Name: </label>
                <input type='text'className='bg-softWhite rounded-md shadow block min-w-0 grow py-1.5 pr-3 pl-1' name="username"></input>
                
            </div>

            <div>
                <label>Email: </label>
                <input type='email' className='bg-softWhite rounded-md shadow block min-w-0 grow py-1.5 pr-3 pl-1'></input>
            
            </div>

            <div className='col-span-2 flex flex-col'>
                <label>Message: </label>
                <textarea rows={3} className='bg-softWhite w-full bg-softWhite rounded-md shadow block min-w-0 grow py-1.5 pr-3 pl-1 rounded-md shadow block'></textarea>
            </div>

            <div className='mt-6 grid col-span-2 flex items-center '>
                <Button>Send</Button>
            </div>
        </form> 
    </div>

  );
}