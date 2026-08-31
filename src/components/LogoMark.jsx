// Hand-built SVG recreation of the circular "Plan / Manage / Deliver / Succeed"
// badge mark, standing in for the supplied logo artwork. Pure vector so it
// stays crisp from a 24px navbar icon up to a full-page hero.
export default function LogoMark({ size = 48, className = "", title = "Ex-Ford PMO Meet Up logo" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 240 240"
      className={className}
      role="img"
      aria-label={title}
    >
      <defs>
        <linearGradient id="ring-top" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#2563EB" />
          <stop offset="1" stopColor="#16A34A" />
        </linearGradient>
        <linearGradient id="ring-right" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#16A34A" />
          <stop offset="1" stopColor="#EA580C" />
        </linearGradient>
        <linearGradient id="ring-bottom" x1="1" y1="0" x2="0" y2="0">
          <stop offset="0" stopColor="#EA580C" />
          <stop offset="1" stopColor="#7C3AED" />
        </linearGradient>
        <linearGradient id="ring-left" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#7C3AED" />
          <stop offset="1" stopColor="#2563EB" />
        </linearGradient>
        <radialGradient id="badge-shine" cx="0.3" cy="0.3" r="0.8">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.35" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* connecting ring */}
      <path d="M52.8 52.8 A 95 95 0 0 1 187.2 52.8" fill="none" stroke="url(#ring-top)" strokeWidth="7" strokeLinecap="round" />
      <path d="M187.2 52.8 A 95 95 0 0 1 187.2 187.2" fill="none" stroke="url(#ring-right)" strokeWidth="7" strokeLinecap="round" />
      <path d="M187.2 187.2 A 95 95 0 0 1 52.8 187.2" fill="none" stroke="url(#ring-bottom)" strokeWidth="7" strokeLinecap="round" />
      <path d="M52.8 187.2 A 95 95 0 0 1 52.8 52.8" fill="none" stroke="url(#ring-left)" strokeWidth="7" strokeLinecap="round" />

      {/* monitor */}
      <rect x="72" y="88" width="96" height="66" rx="7" fill="#0B1220" />
      <rect x="80" y="96" width="80" height="50" rx="3" fill="#F7F8FA" />
      <rect x="86" y="103" width="46" height="6" rx="3" fill="#CBD5E1" />
      <rect x="86" y="114" width="30" height="6" rx="3" fill="#2563EB" />
      <rect x="90" y="123" width="34" height="6" rx="3" fill="#16A34A" />
      <rect x="96" y="132" width="26" height="6" rx="3" fill="#7C3AED" />
      <rect x="86" y="141" width="18" height="5" rx="2.5" fill="#EA580C" />
      <rect x="110" y="154" width="20" height="6" fill="#0B1220" />
      <path d="M96 160 h48 l-6 10 h-36 z" fill="#0B1220" />

      {/* gear */}
      <g transform="translate(158 146)">
        {Array.from({ length: 8 }).map((_, i) => (
          <rect
            key={i}
            x="-4"
            y="-24"
            width="8"
            height="12"
            rx="2"
            fill="#2563EB"
            transform={`rotate(${i * 45})`}
          />
        ))}
        <circle r="17" fill="#2563EB" />
        <circle r="7" fill="#F7F8FA" />
      </g>

      {/* badges */}
      {/* Plan — clipboard */}
      <g transform="translate(53 53)">
        <circle r="34" fill="#2563EB" />
        <circle r="34" fill="url(#badge-shine)" />
        <rect x="-11" y="-14" width="22" height="27" rx="3" fill="#fff" />
        <rect x="-5" y="-17" width="10" height="6" rx="2" fill="#fff" />
        <line x1="-6" y1="-4" x2="6" y2="-4" stroke="#2563EB" strokeWidth="2.4" strokeLinecap="round" />
        <line x1="-6" y1="2" x2="6" y2="2" stroke="#2563EB" strokeWidth="2.4" strokeLinecap="round" />
        <line x1="-6" y1="8" x2="2" y2="8" stroke="#2563EB" strokeWidth="2.4" strokeLinecap="round" />
      </g>

      {/* Manage — people */}
      <g transform="translate(187 53)">
        <circle r="34" fill="#16A34A" />
        <circle r="34" fill="url(#badge-shine)" />
        <circle cx="-8" cy="-8" r="6.5" fill="#fff" />
        <path d="M-19 14 a11 11 0 0 1 22 0 z" fill="#fff" />
        <circle cx="9" cy="-4" r="5.5" fill="#fff" opacity="0.85" />
        <path d="M-1 14 a10 10 0 0 1 20 0 z" fill="#fff" opacity="0.85" />
      </g>

      {/* Deliver — growth chart */}
      <g transform="translate(187 187)">
        <circle r="34" fill="#EA580C" />
        <circle r="34" fill="url(#badge-shine)" />
        <rect x="-16" y="4" width="7" height="12" fill="#fff" />
        <rect x="-5" y="-4" width="7" height="20" fill="#fff" />
        <rect x="6" y="-12" width="7" height="28" fill="#fff" />
        <path d="M-16 -10 L2 -18 L14 -10" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M6 -18 L14 -18 L14 -10" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </g>

      {/* Succeed — target */}
      <g transform="translate(53 187)">
        <circle r="34" fill="#7C3AED" />
        <circle r="34" fill="url(#badge-shine)" />
        <circle r="16" fill="none" stroke="#fff" strokeWidth="3" />
        <circle r="9" fill="none" stroke="#fff" strokeWidth="3" />
        <circle r="3" fill="#fff" />
      </g>
    </svg>
  );
}
