
import React from 'react';
import Image from "next/image";
import Link from "next/link";
import bacgroundImage from "../../assets/artistic-blurry-colorful-wallpaper-background.jpg"
import heroImage from "../../assets/Student and Tutor Learning Together.png"

const HeroSection = () => {
    return (
        <div className='w-full bg-amber-100 bg-cover bg-center bg-no-repeat' style={{ backgroundImage: `url(${bacgroundImage.src})` }}>
            <div className="mx-auto flex max-w-7xl flex-col items-center gap-10 px-4 py-14 md:flex-row md:justify-between md:py-20">

                {/* Left part: heading + button */}
                <div className="flex flex-col items-center gap-6 text-center md:w-1/2 md:items-start md:text-left">
                    <h1 className="max-w-xl text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">
                        Find Your Ideal Tutor or Mentorship Batch Today
                    </h1>
                    <p>
                        Discover experienced tutors and mentorship programs to build your skills, achieve your goals, and unlock your potential.
                    </p>
                    <Link
                        href="/browse-tuitions"
                        className="rounded-md border-2 border-white bg-[#fb9d06] px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-amber-500"
                    >
                        Browse Tuitions
                    </Link>
                </div>

                {/* Right part: image */}
                <div className="w-full md:w-1/2">
                    <Image
                        src={heroImage}
                        alt="Student and tutor learning together"
                        className="h-auto w-full rounded-2xl shadow-xl"
                    />
                </div>

            </div>
        </div>
    );
};

export default HeroSection;
