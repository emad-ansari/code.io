import logo from '../../assets/logo.png'
import {PasswordInputField } from '../components/PasswordInputField'
import { EmailInputField } from '../components/EmailInputField'
import { Button } from '../components/Button'
import { FcGoogle } from "react-icons/fc";




export const LoginPage = () => {
    
    return (
        <main className = 'bg-[#141515]  fixed top-0 right-0 left-0 bottom-0 flex justify-center pt-32'>
            
            <div className="w-[350px] h-[400px] md:w-[450px] md:h-[500px] bg-[#00242C] rounded-lg flex flex-col items-center pt-5">
                <img 
                    src= {logo}
                    alt="logo"
                    className='w-[150px] h-[80px] object-cover'
                />
                <h1 className='text-white text-xl'>Log In to your account</h1>
                <div className = 'flex flex-col gap-5 pt-5  w-[350px]'>
                    <EmailInputField /> 
                    <PasswordInputField/>
                    <Button name = {"Log In"} classname='w-full bg-[#81E291]' /> 
                    <div className='flex flex-row gap-4 items-center justify-between'>
                        <hr className='w-40 h-[1px]  bg-gray-200 border-0 dark:bg-gray-500' />
                        <span className = 'text-white text-sm'>OR</span>
                        <hr className='w-40 h-[1px]  bg-gray-200 border-0 dark:bg-gray-500' />
                    </div>
                    <Button name = {"Log In with Google"} classname='w-full text-white bg-black'>
                        <FcGoogle   />
                    </Button>
                </div>
            </div>
        </main>
    )
}