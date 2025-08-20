import React from 'react'
import Logo from '../images/webworks_logo-01.png';
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

const Footer = () => {
    return (
        <>
            <div className='bg-gray-200 w-full h-84 flex flex-col justify-center-safe'>
                <div className='flex items-center pb-4 space-x-46'>
                    <div className='ml-24 space-y-4 flex flex-col '>
                        <img src={Logo} alt=''
                            className='h-15.5 w-52 ml-4'
                        />
                        <div className='w-72'>
                            <span className='text-md font-semibold tracking-wide text-center'>
                                With this new beginning, we've experienced more connection, more progress, and more peace of mind.
                            </span>
                        </div>
                    </div>

                    <div className='flex flex-col justify-center space-y-4'>
                        <span className='text-xl tracking-wider font-semibold'>Overview</span>
                        <div className='flex flex-col space-y-1.5'>
                            <span className='font-semibold text-gray-600 text-md tracking-wide'>Terms</span>
                            <span className='font-semibold text-gray-600 text-md tracking-wide'>Privacy Policy</span>
                            <span className='font-semibold text-gray-600 text-md tracking-wide'>Cookies</span>
                            <span className='font-semibold text-gray-600 text-md tracking-wide'>Integrations</span>
                        </div>
                    </div>

                    <div className='flex flex-col justify-center space-y-4'>
                        <span className='text-xl tracking-wider font-semibold text-center'>Customer</span>
                        <div className='flex flex-col space-y-1.5'>
                            <span className='font-semibold text-gray-600 text-md tracking-wide'>Product</span>
                            <span className='font-semibold text-gray-600 text-md tracking-wide'>Pricing</span>
                            <span className='font-semibold text-gray-600 text-md tracking-wide'>Integrations</span>
                            <span className='font-semibold text-gray-600 text-md tracking-wide'>Support</span>
                        </div>
                    </div>

                    <div className='flex flex-col justify-center space-y-4'>
                        <span className='text-xl tracking-wider font-semibold text-center'>Follow Us</span>
                        <div className="flex gap-2">
                            <a href="#" aria-label="Facebook" className="p-2 rounded-full hover:bg-gray-100">
                                <Facebook className="w-6 h-6 text-blue-600" />
                            </a>
                            <a href="#" aria-label="Instagram" className="p-2 rounded-full hover:bg-gray-100">
                                <Instagram className="w-6 h-6 text-pink-500" />
                            </a>
                            <a href="#" aria-label="LinkedIn" className="p-2 rounded-full hover:bg-gray-100">
                                <Linkedin className="w-6 h-6 text-blue-700" />
                            </a>
                            <a href="#" aria-label="Twitter" className="p-2 rounded-full hover:bg-gray-100">
                                <Twitter className="w-6 h-6 text-sky-500" />
                            </a>
                        </div>
                    </div>
                </div>
                <footer className="w-full mt-4">
                    <div className="mx-auto max-w-7xl">
                        <p className="text-center text-sm dark:text-gray-800 mt-10">
                            © 2023 Webworks Solution. All Rights Reserved.
                        </p>
                    </div>
                </footer>

            </div>
        </>
    )
}

export default Footer