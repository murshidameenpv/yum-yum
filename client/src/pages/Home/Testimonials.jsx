import React from 'react'
import { FaStar } from 'react-icons/fa';

function Testimonials() {
  return (
    <div className="section-container">
      <div className="flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="md:w-1/2">
          <img src="/home/testimonials/testimonials.png" alt="img" />
        </div>
        <div className="md:w-1/2">
          <div className="text-left md:w-4/5">
            <p className="subtitle">Testimonials</p>
            <h2 className="title">What Our Customers Say About Us</h2>
            <blockquote className="my-5 text-yellow-600 leading-[30px]">
              &quot;I had the pleasure of dining at YumYum last night , and
              I&apos;m still raving about the experience!! The attention to the
              detail in presentation and service wan impeccable&quot;
            </blockquote>
            {/* avatar */}
            <div className='flex items-center gap-4 flex-wrap'>
              <div className="avatar-group -space-x-6 rtl:space-x-reverse">
                <div className="avatar">
                  <div className="w-12">
                    <img src="/home/testimonials/testimonial1.png" />
                  </div>
                </div>
                <div className="avatar">
                  <div className="w-12">
                    <img src="/home/testimonials/testimonial2.png" />
                  </div>
                </div>
                <div className="avatar">
                  <div className="w-12">
                    <img src="/home/testimonials/testimonial3.png" />
                  </div>
                </div>
                <div className="avatar placeholder">
                  <div className="w-12 bg-neutral text-neutral-content">
                    <span>+99</span>
                  </div>
                </div>
              </div>
              <div className="space-y-5">
                <h5>Customer Feedback</h5>
                <div className="flex items-center gap-2">
                  <FaStar className="text-yellow-600" />
                  <span className="font-medium">4.9</span>
                  <span className="text-rose-900">(1.2k Reviews)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Testimonials