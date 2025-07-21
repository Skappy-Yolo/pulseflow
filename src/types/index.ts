export interface ButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  onClick?: () => void
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
}

export interface TestimonialProps {
  name: string
  company: string
  role: string
  avatar: string
  quote: string
}

export interface FeatureProps {
  title: string
  description: string
  icon?: string
  image?: string
}

export interface StatCardProps {
  value: string
  label: string
  color?: 'blue' | 'green' | 'purple' | 'orange'
}

export interface SectionProps {
  children: React.ReactNode
  className?: string
  background?: 'white' | 'gray' | 'primary'
}
