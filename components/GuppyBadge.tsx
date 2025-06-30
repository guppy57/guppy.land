import Image from 'next/image';
import { motion } from 'framer-motion';

const GuppyBadge = () => {
  return (
    <div>
      <div className="fixed bottom-2 right-2 sm:bottom-5 sm:right-5 z-[9999] dflow-hvr-shrink">
        <a href="https://guppy.land" className="dflow-badge-link" rel="noopener">
          <Image
            src="/GUPPY-icon.png"
            alt="Guppy Logo"
            width={28}
            height={28}
            className="w-[22px] h-[22px] sm:w-[28px] sm:h-[28px] mr-1"
          />
          <svg
            className="w-[100px] sm:w-[112px] h-auto pr-0.5 -mt-0.5"
            viewBox="0 0 233 45"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
          >
            <title>Built by Guppy</title>
            <g
              id="Page-1"
              stroke="none"
              strokeWidth="1"
              fill="none"
              fillRule="evenodd"
              fontFamily="Satoshi-Bold, Satoshi"
              fontSize="36"
              fontWeight="bold"
              letterSpacing="-1.1"
            >
              <text id="Built-by-Guppy" fill="#333333">
                <tspan x="0" y="36">
                  Built by Guppy
                </tspan>
              </text>
            </g>
          </svg>
        </a>
      </div>

      <style jsx>{`
        .dflow-badge-link {
          box-shadow: 9px 9px 12px rgb(0 0 0 / 0.2);
          display: flex;
          align-items: center;
          padding: 6px 8px;
          background-color: rgb(255 255 255);
          border: 1px solid #90909056;
          border-radius: 8px;
          text-decoration: none;
        }

        .dflow-hvr-shrink {
          display: inline-block;
          vertical-align: middle;
          -webkit-transform: perspective(1px) translateZ(0);
          transform: perspective(1px) translateZ(0);
          box-shadow: 0 0 1px rgba(0, 0, 0, 0);
          -webkit-transition-duration: 0.3s;
          transition-duration: 0.3s;
          -webkit-transition-property: transform;
          transition-property: transform;
        }

        .dflow-hvr-shrink:hover,
        .dflow-hvr-shrink:focus,
        .dflow-hvr-shrink:active {
          -webkit-transform: scale(0.9);
          transform: scale(0.9);
        }
      `}</style>
    </div>
  );
};

export default GuppyBadge; 