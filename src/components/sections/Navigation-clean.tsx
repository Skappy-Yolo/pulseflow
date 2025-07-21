import React from 'react';

const Navigation: React.FC = () => {
  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-[1400px] mx-auto px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path d="M9.86667 7C6.15886 7 3 9.7724 3 13.3731C3 15.857 4.16313 17.9482 5.70465 19.6806C7.24088 21.4069 9.22286 22.856 11.0146 24.0689L14.1061 26.1615C14.4447 26.3906 14.8887 26.3906 15.2272 26.1615L18.3187 24.0689C18.8916 23.681 19.484 23.2691 20.0751 22.8316C20.2297 22.7172 20.2789 22.5083 20.1936 22.3359L18.3765 18.6678C18.2907 18.4945 18.0548 18.4673 17.9318 18.6164L17.8348 18.7341C17.3282 19.3481 16.5738 19.7037 15.7778 19.7037H13.3333C11.8606 19.7037 10.6667 18.5098 10.6667 17.037C10.6667 15.5643 11.8606 14.3704 13.3333 14.3704H14.2693C14.4285 14.3704 14.5794 14.2992 14.6807 14.1764L16.7763 11.6363C17.3607 10.9279 18.2685 10.5701 19.1791 10.6892C20.0896 10.8082 20.8749 11.3874 21.2575 12.2223L22.3278 14.5574C22.4401 14.8024 22.7593 14.8677 22.9921 14.732C23.3884 14.5012 23.8477 14.3704 24.3333 14.3704H25.9179C26.1192 14.3704 26.2903 14.2208 26.3068 14.0201C26.3243 13.8075 26.3333 13.5918 26.3333 13.3731C26.3333 9.7724 23.1745 7 19.4667 7C17.5554 7 15.8735 7.89618 14.6667 9.05578C13.4598 7.89619 11.778 7 9.86667 7Z" fill="#005CE8"/>
              <path d="M19.7424 12.9167C19.5989 12.6036 19.3044 12.3864 18.963 12.3418C18.6215 12.2971 18.2811 12.4313 18.062 12.6969L15.3064 16.037H13.3333C12.781 16.037 12.3333 16.4848 12.3333 17.037C12.3333 17.5893 12.781 18.037 13.3333 18.037H15.7778C16.0763 18.037 16.3592 17.9037 16.5492 17.6734L18.5892 15.2007L20.9798 20.4167C21.1233 20.7297 21.4178 20.9469 21.7592 20.9916C22.1007 21.0362 22.4411 20.902 22.6603 20.6364L24.8047 18.037H28C28.5523 18.037 29 17.5893 29 17.037C29 16.4848 28.5523 16.037 28 16.037H24.3333C24.0348 16.037 23.7519 16.1704 23.562 16.4007L22.1331 18.1327L19.7424 12.9167Z" fill="#005CE8"/>
            </svg>
            <span className="ml-3 text-xl font-semibold text-gray-900">PulseFlow</span>
          </div>

          {/* Navigation Links */}
          <div className="hidden lg:flex items-center space-x-8">
            <a href="#how-it-works" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              How it works
            </a>
            <a href="#consultants" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              For Consultants
            </a>
            <a href="#executives" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              For Executives
            </a>
            <a href="#pricing" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Pricing
            </a>
            <a href="#login" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Log in
            </a>
            
            {/* Book a Demo Button */}
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
              Book a Demo
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button className="text-gray-700">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
