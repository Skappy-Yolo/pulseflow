import React from 'react'
import { cn } from '../../lib/utils'
import type { StatCardProps } from '../../types'

const StatCard: React.FC<StatCardProps> = ({
  value,
  label,
  color = 'blue'
}) => {
  const colorStyles = {
    blue: 'bg-blue-50 border-blue-100 text-blue-600',
    green: 'bg-green-50 border-green-100 text-green-600',
    purple: 'bg-purple-50 border-purple-100 text-purple-600',
    orange: 'bg-orange-50 border-orange-100 text-orange-600'
  }
  
  return (
    <div className={cn(
      'rounded-xl p-6 text-center border',
      colorStyles[color]
    )}>
      <div className="text-2xl md:text-3xl font-bold mb-2">
        {value}
      </div>
      <div className="text-sm text-gray-600">
        {label}
      </div>
    </div>
  )
}

export { StatCard }
