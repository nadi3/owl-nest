import { Box } from '@mui/material';

export const HandDrawnTombstone = () => {
  return (
    <Box sx={{ width: 120, height: 140, position: 'relative' }}>
      <svg viewBox="0 0 60 70" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="30" cy="62" rx="22" ry="4" fill="rgba(0,0,0,0.15)" />

        <g transform="rotate(-5 30 60)">
          <path
            d="M 12 60 L 10 18 Q 10 5 30 5 Q 50 5 48 18 L 46 60"
            stroke="black"
            strokeWidth="2"
            strokeLinecap="round"
            fill="#E5E7EB"
          />

          <g stroke="black" strokeWidth="0.6" strokeLinecap="round" opacity="0.6">
            <path d="M 15 10 L 18 15 L 14 18 L 16 22 M 18 15 L 22 14" />
            <path d="M 45 20 L 40 25 L 42 30 L 38 35 M 40 25 L 35 24" />
            <path d="M 13 45 L 17 48 L 15 52 M 45 42 L 42 45 L 44 50 L 40 52" />
            <path d="M 28 8 L 30 12 L 27 15" />
            <path d="M 35 55 L 38 58" />
          </g>

          <text
            x="29"
            y="33"
            textAnchor="middle"
            fill="black"
            style={{
              fontSize: '8px',
              fontWeight: 900,
              fontFamily: 'monospace',
              letterSpacing: '1px',
            }}
          >
            RIP
          </text>

          <path
            d="M 12 60 Q 18 45 10 35 M 46 60 Q 38 50 48 40"
            stroke="#166534"
            strokeWidth="1.2"
            fill="none"
          />

          <g transform="translate(13, 50) scale(0.8)">
            <circle cx="0" cy="0" r="1.5" fill="black" />
            <ellipse
              cx="0"
              cy="-2.5"
              rx="1.5"
              ry="2"
              fill="#F87171"
              stroke="black"
              strokeWidth="0.3"
            />
            <ellipse
              cx="2.5"
              cy="0"
              rx="2"
              ry="1.5"
              fill="#F87171"
              stroke="black"
              strokeWidth="0.3"
            />
            <ellipse
              cx="0"
              cy="2.5"
              rx="1.5"
              ry="2"
              fill="#F87171"
              stroke="black"
              strokeWidth="0.3"
            />
            <ellipse
              cx="-2.5"
              cy="0"
              rx="2"
              ry="1.5"
              fill="#F87171"
              stroke="black"
              strokeWidth="0.3"
            />
          </g>

          <g transform="translate(10, 56) scale(0.6)">
            <circle cx="0" cy="0" r="1.5" fill="black" />
            <circle cx="0" cy="-2.5" r="2" fill="#FBBF24" stroke="black" strokeWidth="0.4" />
            <circle cx="2.5" cy="0" r="2" fill="#FBBF24" stroke="black" strokeWidth="0.4" />
            <circle cx="0" cy="2.5" r="2" fill="#FBBF24" stroke="black" strokeWidth="0.4" />
            <circle cx="-2.5" cy="0" r="2" fill="#FBBF24" stroke="black" strokeWidth="0.4" />
          </g>

          <g transform="translate(43, 52) scale(0.7)">
            <circle cx="0" cy="0" r="1.5" fill="black" />
            <ellipse
              cx="0"
              cy="-2.5"
              rx="1.5"
              ry="2"
              fill="#C084FC"
              stroke="black"
              strokeWidth="0.3"
            />
            <ellipse
              cx="2.5"
              cy="0"
              rx="2"
              ry="1.5"
              fill="#C084FC"
              stroke="black"
              strokeWidth="0.3"
            />
            <ellipse
              cx="0"
              cy="2.5"
              rx="1.5"
              ry="2"
              fill="#C084FC"
              stroke="black"
              strokeWidth="0.3"
            />
            <ellipse
              cx="-2.5"
              cy="0"
              rx="2"
              ry="1.5"
              fill="#C084FC"
              stroke="black"
              strokeWidth="0.3"
            />
          </g>

          <g transform="translate(46, 57) scale(0.6)">
            <circle cx="0" cy="0" r="1.5" fill="black" />
            <circle cx="0" cy="-2.5" r="2" fill="#60A5FA" stroke="black" strokeWidth="0.4" />
            <circle cx="2.5" cy="0" r="2" fill="#60A5FA" stroke="black" strokeWidth="0.4" />
            <circle cx="0" cy="2.5" r="2" fill="#60A5FA" stroke="black" strokeWidth="0.4" />
            <circle cx="-2.5" cy="0" r="2" fill="#60A5FA" stroke="black" strokeWidth="0.4" />
          </g>
        </g>

        <path d="M 5 62 Q 30 60 55 62" stroke="black" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    </Box>
  );
};
