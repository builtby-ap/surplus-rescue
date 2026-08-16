import { forwardRef } from 'react'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'hover'
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className = '', variant = 'default', children, ...props }, ref) => {
    const variants = {
      default: 'bg-white border border-gray-200',
      hover: 'bg-white border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer',
    }

    return (
      <div
        ref={ref}
        className={`rounded-xl p-4 ${variants[variant]} ${className}`}
        {...props}
      >
        {children}
      </div>
    )
  }
)

Card.displayName = 'Card'

export { Card }
