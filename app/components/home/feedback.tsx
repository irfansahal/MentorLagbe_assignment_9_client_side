
import React from 'react';

const Feedback = () => {
    return (
        <>
             {/* Feedback Section */}
       <section className="bg-[#e4e8ee] px-4 py-16">
         <div className="mx-auto max-w-5xl">
           <h2 className="text-center text-3xl font-bold text-[#f89d0a] sm:text-4xl">
             What our users say
           </h2>

           <div className="mt-10 grid gap-6 sm:grid-cols-2">
             {/* Feedback 1 */}
             <div className="rounded-lg bg-white p-6 shadow-sm">
               <div className="flex items-center gap-4">
                 <img
                   src="https://i.ibb.co/7JQ4nY34/rashed.jpg"
                   alt="Rashed"
                   className="h-14 w-14 rounded-full object-cover"
                 />
                 <div>
                   <h3 className="font-semibold text-[#3d4657]">Rashed</h3>
                   <p className="text-sm text-muted-foreground">
                     Student · rashed@gmail.com
                   </p>
                 </div>
               </div>
               <p className="mt-3 text-sm font-semibold text-[#fb9506]">
                 ★★★★★
               </p>
               <p className="mt-3 text-[#3d4657]">
                 &quot;MentorLagbe made it much easier to find the right tutor for
                 my studies. I could find someone according to my subject and
                 budget. The whole process was smooth and helpful.&quot;
               </p>
             </div>

             {/* Feedback 2 */}
             <div className="rounded-lg bg-white p-6 shadow-sm">
               <div className="flex items-center gap-4">
                 <img
                   src="https://i.ibb.co/QFc0QJcT/man1.avif"
                   alt="Asif Mahmud"
                   className="h-14 w-14 rounded-full object-cover"
                 />
                 <div>
                   <h3 className="font-semibold text-[#3d4657]">Asif Mahmud</h3>
                   <p className="text-sm text-muted-foreground">
                     Tutor · asifmahmud@gmail.com
                   </p>
                 </div>
               </div>
               <p className="mt-3 text-sm font-semibold text-[#fb9506]">
                 ★★★★★
               </p>
               <p className="mt-3 text-[#3d4657]">
                 &quot;MentorLagbe is a great platform for tutors to connect with
                 students. It helps me showcase my teaching experience and find
                 tuition opportunities that match my expertise.&quot;
               </p>
             </div>
           </div>
         </div>
       </section>
        </>
    );
};

export default Feedback;