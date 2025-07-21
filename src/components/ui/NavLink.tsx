import React from 'react'

interface NavLinkProps {
  href: string
  children: React.ReactNode
  className?: string
}

const NavLink: React.FC<NavLinkProps> = ({ 
  href, 
  children, 
  className = "" 
}) => {
  return (
    <a 
      href={href}
      className={`text-gray-700 hover:text-blue-600 font-medium text-[16px] px-4 py-2 transition-colors ${className}`}
    >
      {children}
    </a>
  )
}

export { NavLink }
