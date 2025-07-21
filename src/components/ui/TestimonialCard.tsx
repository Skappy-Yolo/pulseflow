import React from 'react'
import type { TestimonialProps } from '../../types'

const TestimonialCard: React.FC<TestimonialProps> = ({
  name,
  company,
  role,
  avatar,
  quote
}) => {
  return (
    <div className="bg-gray-50 rounded-2xl p-6 md:p-8">
      <div className="flex items-center gap-4 mb-6">
        <img 
          src={avatar} 
          alt={name}
          className="w-12 h-12 md:w-16 md:h-16 rounded-full object-cover"
        />
        <div>
          <h4 className="font-semibold text-gray-900 text-lg">{name}</h4>
          <p className="text-gray-600 text-sm">{company}</p>
          <p className="text-gray-500 text-xs">{role}</p>
        </div>
      </div>
      <p className="text-gray-700 leading-relaxed">
        "{quote}"
      </p>
    </div>
  )
}

export { TestimonialCard }
