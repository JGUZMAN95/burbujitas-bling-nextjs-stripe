import Button from '../../components/Button'

export default async function ContactUs() {
  return (
<<<<<<< HEAD
    <div className='flex grid-rows justify-center font-accent text-softCoral'>
       <form className='grid grid-col-2 md:m-20 gap-x-8 gap-y-5 focus:outline-none'>
            <div className='col-span-2'>
=======
    <div className='grid md:justify-center font-accent text-softCoral p-3'>
       <form className='md:grid grid-col-2 gap-x-8 gap-y-5 focus:outline-none md:m-10'>
            <div className='col-span-2 md:place-items-start place-items-center'>
>>>>>>> 9bc74c3 (Remove large video file from repo)
                <header className='text-base'>Contact Us</header>
            </div>

            <div>
                <label>Name: </label>
<<<<<<< HEAD
                <input type='text'className='bg-softWhite rounded-md shadow block min-w-0 grow py-1.5 pr-3 pl-1' name="username"></input>
                
=======
                <input type='text'
                    className='bg-softWhite w-full rounded-md shadow block grow p-2' 
                    name="username"></input>
>>>>>>> 9bc74c3 (Remove large video file from repo)
            </div>

            <div>
                <label>Email: </label>
<<<<<<< HEAD
                <input type='email' className='bg-softWhite rounded-md shadow block min-w-0 grow py-1.5 pr-3 pl-1'></input>
=======
                <input type='email' 
                className='bg-softWhite  w-full rounded-md shadow block grow p-2'></input>
>>>>>>> 9bc74c3 (Remove large video file from repo)
            
            </div>

            <div className='col-span-2 flex flex-col'>
                <label>Message: </label>
<<<<<<< HEAD
                <textarea rows={3} className='bg-softWhite w-full bg-softWhite rounded-md shadow block min-w-0 grow py-1.5 pr-3 pl-1 rounded-md shadow block'></textarea>
=======
                <textarea rows={3} className='bg-softWhite w-full rounded-md shadow block grow p-2'></textarea>
>>>>>>> 9bc74c3 (Remove large video file from repo)
            </div>

            <div className='mt-6 grid col-span-2 flex items-center '>
                <Button>Send</Button>
            </div>
        </form> 
    </div>
<<<<<<< HEAD

=======
>>>>>>> 9bc74c3 (Remove large video file from repo)
  );
}