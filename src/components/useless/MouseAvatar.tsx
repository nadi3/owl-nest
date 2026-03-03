import { motion } from 'framer-motion';

export const MouseAvatar = ({ isRunning }: { isRunning: boolean }) => {
  return (
    <motion.svg
      width="60"
      height="40"
      viewBox="0 0 60 40"
      animate={{ rotate: isRunning ? [0, -5, 5, 0] : 0 }}
      transition={{ repeat: Infinity, duration: 0.2 }}
    >
      {/* Body */}
      <ellipse cx="30" cy="25" rx="20" ry="12" fill="#B0BEC5" />

      {/* Ears */}
      <circle cx="15" cy="15" r="7" fill="#B0BEC5" />
      <circle cx="15" cy="15" r="4" fill="#FFA726" opacity="0.4" />

      {/* Eye */}
      <circle cx="40" cy="22" r="2" fill="black" />

      {/* Animated tail */}
      <motion.path
        d="M 10 25 Q 0 20 5 10"
        stroke="#B0BEC5"
        strokeWidth="2"
        fill="none"
        animate={{
          d: isRunning ? ['M 10 25 Q 0 30 5 35', 'M 10 25 Q 0 20 5 10'] : 'M 10 25 Q 0 20 5 10',
        }}
        transition={{ repeat: Infinity, duration: 0.3, repeatType: 'reverse' }}
      />

      {/* Running legs */}
      {isRunning && (
        <>
          <motion.line
            x1="25"
            y1="35"
            x2="20"
            y2="38"
            stroke="#90A4AE"
            strokeWidth="2"
            animate={{ y2: [38, 35, 38] }}
            transition={{ repeat: Infinity, duration: 0.1 }}
          />
          <motion.line
            x1="35"
            y1="35"
            x2="40"
            y2="38"
            stroke="#90A4AE"
            strokeWidth="2"
            animate={{ y2: [35, 38, 35] }}
            transition={{ repeat: Infinity, duration: 0.1 }}
          />
        </>
      )}
    </motion.svg>
  );
};
