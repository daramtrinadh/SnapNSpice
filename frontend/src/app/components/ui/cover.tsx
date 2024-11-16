import React, { useEffect, useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "../../lib/utils";
import { SparklesCore } from "./sparkles";

export const Cover = ({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [beamPositions, setBeamPositions] = useState<number[]>([]);

  useEffect(() => {
    const element = ref.current;
    if (element) {
      setContainerWidth(element.clientWidth);
      const height = element.clientHeight;
      const numberOfBeams = Math.floor(height / 10); // Adjust the divisor to control the spacing
      const positions = Array.from(
        { length: numberOfBeams },
        (_, i) => (i + 1) * (height / (numberOfBeams + 1))
      );
      setBeamPositions(positions);
    }
  }, []);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      ref={ref}
      className={cn(
        "relative hover:bg-neutral-900 group/cover inline-block dark:bg-neutral-900 bg-neutral-100 px-2 py-2 transition duration-200 rounded-sm",
        className
      )}
    >
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ opacity: { duration: 0.2 } }}
            className="h-full w-full overflow-hidden absolute inset-0"
          >
            {[...Array(2)].map((_, idx) => (
              <motion.div
                key={idx}
                animate={{
                  translateX: ["-50%", "0%"],
                }}
                transition={{
                  translateX: {
                    duration: 10,
                    ease: "linear",
                    repeat: Infinity,
                  },
                }}
                className="w-[200%] h-full flex"
              >
                <SparklesCore
                  background="transparent"
                  minSize={0.4}
                  maxSize={1}
                  particleDensity={500}
                  className="w-full h-full"
                  particleColor="#FFFFFF"
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      {beamPositions.map((position, index) => (
        <Beam
          key={index}
          hovered={hovered}
          duration={Math.random() * 2 + 1}
          delay={Math.random() * 2 + 1}
          width={containerWidth}
          style={{ top: `${position}px` }}
        />
      ))}
      <motion.span
        key={String(hovered)}
        animate={{
          scale: hovered ? 0.8 : 1,
        }}
        className={cn(
          "dark:text-white inline-block text-neutral-900 relative z-20 group-hover/cover:text-white transition duration-200",
          className
        )}
      >
        {children}
      </motion.span>
    </div>
  );
};