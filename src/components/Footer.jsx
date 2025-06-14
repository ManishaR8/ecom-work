'use client'
import React from 'react'
import Link from 'next/link'
import { FacebookIcon, Twitter, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#001D35] text-white py-8">
      <div className="w-full px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

        <div className="space-y-4 text-center">
            <h3 className="text-xl font-bold">Filters</h3>
            <p className="text-gray-200">
             All
            </p>
            <p className="text-gray-200">
             shop
            </p>
      <div className="pt-8 text-center text-gray-200">
          <p>&copy; {new Date().getFullYear()} American</p>
        </div>
          </div>
       
          <div className="space-y-4 text-center">
            <h3 className="text-xl font-bold">About Us</h3>
            <p className="text-gray-200">
             About Us
            </p>
            <p className="text-gray-200">
             Contact Us
            </p>
          </div>

          <div className="space-y-4 text-center">
            <h3 className="text-xl font-bold">Follow Us</h3>
            <div className="flex justify-center space-x-6">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-200 hover:text-white transition-colors"
              >
                <FacebookIcon className='cursor-pointer size-6' />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-200 hover:text-white transition-colors"
              >
                <Twitter className='cursor-pointer size-6' />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-200 hover:text-white transition-colors"
              >
                <Instagram className='cursor-pointer size-6' />
              </a>
            </div>
          </div>

          
        </div>

      </div>
    </footer>
  )
}

export default Footer
