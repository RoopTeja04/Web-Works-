import React from 'react'
import Sub_Services from '../sub_components/sub_services'
import Footer from '../sub_components/Footer'

const Home = ({ BannerImage }) => {
    return (
        <>
            <div className="relative w-full h-[90vh]">
                <img
                    src="https://www.newgenapps.com/hubfs/Imported_Blog_Media/Website-Design-Background-Feb-09-2022-03-13-55-73-AM.png"
                    alt="Hero"
                    className="w-full h-full object-cover"
                />

                <div className="absolute inset-0 flex flex-col items-center justify-center text-center pt-10 text-white bg-black/40">
                    <h1 className="text-5xl font-extrabold drop-shadow-lg">
                        Welcome to <span className="text-yellow-400">Web Works</span>
                    </h1>
                    <div className="flex items-center gap-4 mt-6">
                        <span className="h-[2px] w-16 bg-yellow-400"></span>
                        <p className="text-lg max-w-2xl">
                            We craft modern, responsive, and beautiful websites to grow your business online.
                        </p>
                        <span className="h-[2px] w-16 bg-yellow-400"></span>
                    </div>
                </div>
            </div>

            <Sub_Services />
            <Footer />
        </>
    )
}

export default Home