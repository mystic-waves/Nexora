type Props = {
  className?: string
  size?: number
}

export default function LogoIcon({ className = '', size = 32 }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Nexora logo"
      className={className}
    >
      

      {/* Book shape */}
      <g stroke="#8B5CF6" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round">
        {/* Spine */}
        <path d="M32 14v36" />
        {/* Left cover */}
        <path d="M32 18c-6-6-14-6-20-2v28c6-4 14-4 20 2" />
        {/* Right cover */}
        <path d="M32 18c6-6 14-6 20-2v28c-6-4-14-4-20 2" />
        {/* Top notch */}
        <path d="M24 16c5 0 8 2 8 2s3-2 8-2" />
      </g>
    </svg>
  )
}
