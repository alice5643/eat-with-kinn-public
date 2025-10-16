import React from 'react'

const HoneyCTAButton = ({
  as: Component = 'button',
  className = '',
  children,
  ...rest
}) => {
  return (
    <Component
      className={[
        'inline-flex flex-col items-center justify-center rounded-full text-center',
        'px-8 py-5 sm:px-12 sm:py-6',
        'bg-brand-honey/80 text-brand-forest shadow-[0_18px_35px_rgba(242,183,80,0.28)] border border-white/50 backdrop-blur-lg',
        'transition duration-300 hover:bg-brand-honey focus:outline-none focus:ring-4 focus:ring-brand-slate/20',
        className,
      ].join(' ')}
      {...rest}
    >
      {children}
    </Component>
  )
}

export default HoneyCTAButton
