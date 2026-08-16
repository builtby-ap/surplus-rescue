import { forwardRef } from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', label, error, id, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label htmlFor={id} className="block text-sm font-medium text-[#526B91] mb-1">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={id}
          className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#526B91] focus:border-transparent ${
            error ? 'border-[#E87552]' : ''
          } ${className}`}
          {...props}
        />
        {error && <p className="mt-1 text-sm text-[#E87552]">{error}</p>}
      </div>
    )
  }
)

Input.displayName = 'Input'

export { Input }
