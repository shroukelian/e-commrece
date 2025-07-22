import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-main-light mt-12 py-6 border-t border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-gray-600">
              © {new Date().getFullYear()} FreshCart. All Rights Reserved.
            </p>
          </div>

          <div>
            <ul className="flex items-center space-x-4">
              <li>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-slate-900 hover:text-green-600 transition-colors">
                  <i className='fab fa-facebook-f fa-md'></i>
                </a>
              </li>
              <li>
                <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="text-slate-900 hover:text-green-600 transition-colors">
                  <i className='fab fa-tiktok fa-md'></i>
                </a>
              </li>
              <li>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-slate-900 hover:text-green-600 transition-colors">
                  <i className='fab fa-youtube fa-md'></i>
                </a>
              </li>
              <li>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-slate-900 hover:text-green-600 transition-colors">
                  <i className='fab fa-instagram fa-md'></i>
                </a>
              </li>
              <li>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-slate-900 hover:text-green-600 transition-colors">
                  <i className='fab fa-twitter fa-md'></i>
                </a>
              </li>
            </ul>
          </div>

        </div>
      </div>
    </footer>
  );
}