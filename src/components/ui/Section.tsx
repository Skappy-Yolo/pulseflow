import React from 'react'
import { cn } from '../../lib/utils'
import type { SectionProps } from '../../types'

const Section: React.FC<SectionProps> = ({
  children,
  className,
  background = 'white'
}) => {
  const backgroundStyles = {
    white: 'bg-white',
    gray: 'bg-gray-50',
    primary: 'bg-primary-50'
  }
  
  return (
    <section className={cn(
      'py-16 md:py-20 lg:py-24',
      backgroundStyles[background],
      className
    )}>
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
        {children}
      </div>
    </section>
  )
}

const SectionHeader: React.FC<{
  title: string
  subtitle?: string
  centered?: boolean
  className?: string
}> = ({
  title,
  subtitle,
  centered = true,
  className
}) => {
  return (
    <div className={cn(
      'mb-12 md:mb-16',
      centered && 'text-center',
      className
    )}>
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  )
}

export { Section, SectionHeader }
