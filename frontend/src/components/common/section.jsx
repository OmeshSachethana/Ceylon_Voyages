import { twMerge } from 'tailwind-merge'

const Section = ({ children, ...props }) => {
  return (
    <div {...props} className={twMerge('h-[92vh] w-screen', props.className)}>
      {children}
    </div>
  )
}

export default Section
