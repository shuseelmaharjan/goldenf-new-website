import React from 'react';
import { GiGraduateCap } from "react-icons/gi";
import { IoMdTrophy } from "react-icons/io";
import { IoBookSharp } from "react-icons/io5";
import { TbMedal2 } from "react-icons/tb";

const LearnExcellancy = () => {
  return (
    <div className="w-full bg-[#E9F5FE] py-6">
      <div className="container mx-auto text-center mb-8 px-4">
        <h5 className="font-semibold text-gray-700" style={{fontSize:'1.1rem'}}>You Can Learn</h5>
        <h3 className="font-semibold text-gray-800" style={{fontSize:'1.25rem'}}>Start your journey to a better life with our practical learning approach</h3>
      </div>
      <div className="container mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        <div className="bg-white border border-gray-200 shadow-sm rounded-lg">
          <div className="flex items-center p-4">
            <div className="mr-4 text-gray-900" style={{ fontSize: '2.5rem' }}>
              <GiGraduateCap/>
            </div>
            <div>
              <h4 className="text-xl font-semibold" style={{color:'#f29200'}}>Excellency</h4>
              <p className="text-gray-700">Learn from the best and excel in your field.</p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 shadow-sm rounded-lg">
          <div className="flex items-center p-4">
            <div className="mr-4 text-gray-800" style={{ fontSize: '2.5rem' }}>
                <IoMdTrophy/>
            </div>
            <div>
              <h4 className="text-xl font-semibold" style={{color:'#f29200'}}>Our Achievements</h4>
              <p className="text-gray-700">Discover our success stories and achievements.</p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 shadow-sm rounded-lg">
          <div className="flex items-center p-4">
            <div className="mr-4 text-gray-800" style={{ fontSize: '2.5rem' }}>
                <IoBookSharp/>
            </div>
            <div>
              <h4 className="text-xl font-semibold" style={{color:'#f29200'}}>Academic Policies</h4>
              <p className="text-gray-700">Explore our academic policies and guidelines.</p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 shadow-sm rounded-lg">
          <div className="flex items-center p-4">
            <div className="mr-4 text-gray-800" style={{ fontSize: '2.5rem' }}>
                <TbMedal2/>
            </div>
            <div>
              <h4 className="text-xl font-semibold" style={{color:'#f29200'}}>Scholarship and Awards</h4>
              <p className="text-gray-700">Learn about our scholarship programs and awards.</p>
            </div>
          </div>
        </div>
      </div>
      </div>

      
    </div>
  );
}

export default LearnExcellancy;
