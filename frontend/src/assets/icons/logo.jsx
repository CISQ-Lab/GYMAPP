export default function Logo() {
    return (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="40" height="40">
        <defs>
            <linearGradient id="dumbGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3B82F6" />
                <stop offset="100%" stopColor="#8B5CF6" />
            </linearGradient>
        </defs>

        <g transform="translate(50, 50) rotate(-45)">
            <rect x="-32" y="-5" width="64" height="10" rx="3" fill="#64748B" />
            <rect x="-18" y="-7" width="4" height="14" rx="1" fill="#94A3B8" />
            <rect x="14" y="-7" width="4" height="14" rx="1" fill="#94A3B8" />
            <rect x="-28" y="-18" width="7" height="36" rx="2" fill="url(#dumbGradient)" />
            <path d="M -28 -28 L -38 -16 L -38 16 L -28 28 Z" fill="url(#dumbGradient)" />
            <rect x="21" y="-18" width="7" height="36" rx="2" fill="url(#dumbGradient)" />
            <path d="M 28 -28 L 38 -16 L 38 16 L 28 28 Z" fill="url(#dumbGradient)" />
            <path d="M -36 -12 L -30 -22 L -30 22 L -36 12 Z" fill="#FFFFFF" opacity="0.25" />
            <path d="M 30 -22 L 36 -12 L 36 12 L 30 22 Z" fill="#FFFFFF" opacity="0.15" />
        </g>
    </svg>);
}