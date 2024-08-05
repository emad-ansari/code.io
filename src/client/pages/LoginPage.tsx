import logo from '../../assets/siginLogo.svg'
import {PasswordInputField } from '../components/PasswordInputField'
import { EmailInputField } from '../components/EmailInputField'
import { Button } from '../components/Button'
import { FcGoogle } from "react-icons/fc";




export const LoginPage = () => {
    
    return (
        <main className = 'bg-[#030303]  fixed top-0 right-0 left-0 bottom-0 flex justify-center pt-32'>
            
            <div className="w-[350px] h-[400px] md:w-[450px] md:h-[500px]  bg-[#0D1621] rounded-lg flex flex-col items-center ">
                <img 
                    src= {logo}
                    className='w-[110px] h-[110px] '
                />
                <h1 className= "text-white text-xl  [font-family:'Inria_Sans-Bold',Helvetica] tracking-[2px] leading-[normal] font-bold">Log In to your account</h1>
                <div className = 'flex flex-col gap-5 pt-5  w-[350px]'>
                    <EmailInputField /> 
                    <PasswordInputField/>
                    <Button  classname='w-full bg-cyan text-sm font-medium hover:bg-[#a5f3fc] rounded-md' >Log In</Button> 
                    <div className='flex flex-row gap-4 items-center justify-between'>
                        <hr className='w-40 h-[1px]  bg-gray-200 border-0 dark:bg-gray-500' />
                        <span className = 'text-white text-sm'>OR</span>
                        <hr className='w-40 h-[1px]  bg-gray-200 border-0 dark:bg-gray-500' />
                    </div>
                    <Button classname='w-full text-white bg-black items-center relative rounded-md'>
                        <FcGoogle style={{position: 'absolute',  top: '25%', left: '22%' , fontSize: "22px" }} />        
                        <span className='text-sm font-medium'>Log In with google</span>
                    </Button>
                    <div className = 'flex flex-row justify-between items-center'>
                        <span className='text-red-400 text-sm cursor-pointer'>Forgot password</span>
                        <span className = 'text-white text-sm'>
                            Don't have an account? <a className = 'text-white font-semibold italic cursor-pointer hover:text-red-400'>Sign up</a>
                        </span>
                        
                    </div>
                </div>
            </div>
        </main>
    )
}