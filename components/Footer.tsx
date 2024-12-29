import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto text-center">
        <p className="text-lg font-semibold">Booking.com</p>
        <p className="text-sm mt-2">Your one-stop solution for booking shows and events</p>

        {/* Customer Service Section */}
        <div className="mt-4">
          <p className="text-md">For Customer Service, call us at:</p>
          <p className="text-lg font-semibold">+1 (800) 123-4567</p>
        </div>

        {/* Social Media Links Section (Optional) */}
        <div className="mt-4">
          <a href="https://facebook.com" className="text-blue-500 mx-2">Facebook</a>
          <a href="https://twitter.com" className="text-blue-400 mx-2">Twitter</a>
          <a href="https://instagram.com" className="text-pink-500 mx-2">Instagram</a>
        </div>

        <div className="mt-6 text-sm">
          <p>© 2024 Booking.com - All rights reserved</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
