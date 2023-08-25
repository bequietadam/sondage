import react from 'react';
import { motion } from 'framer-motion';


type ProgressBarProps = {
  maxProgressValue: number;
  progressValue: number;
  progressValueUnit: string;
  text: string;
}




export default function ProgressBar({
  maxProgressValue, progressValue, progressValueUnit, text
}: ProgressBarProps) {


  const transitions = {
    opacity: {
      delay: 0.3,
      easing: 'ease-in',
      duration: 0.6,
    },
    width: {
      delay: 0.5,
      duration: 1,
      easing: 'ease-in-out',
      // type: 'spring'
    },
    x: {
      duration: 0.6,
      easing: 'ease-out',
    }
  };

  const variants = {
    init: {
      opacity: 0,
      width: "8%",
      x: -40,
      transition: transitions,
    },
    anim: {
      opacity: 1,
      width: ((100 / maxProgressValue) * progressValue) + '%',
      x: 0,
      transition: transitions,
    }
  }

  return (
    <>
      <div className="progressbar">
        <motion.div
          className="progress"
          animate="anim"
          initial="init"
          style={{
            borderRadius: 40,
            boxSizing: 'border-box',
            overflow: 'hidden',
            height: '100%',
            position: 'absolute',
            // opacity: 0,
            // width: '8%',
            // x: -40,
          }}
          variants={variants}
        >
          <div className="gradient"></div>
        </motion.div>
        <p>{text + ': ' + progressValue + progressValueUnit}</p>
      </div>
      <style jsx>
        {`
          .progressbar {
            display: flex;
            justify-content: flex-start;
            position: relative;
            border: 2px dashed orchid;
            border-radius: 40px;
            width: 100%;
            // height: 40px;
            margin: 12px 0 20px;
            position:relative;
            box-sizing: border-box;
          }
          .progressbar .gradient {
            position:absolute;
            right: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(to right, orchid 0%, #DE3163 ${((100 / ((100 / maxProgressValue) * progressValue)) * (100 / ((100 / maxProgressValue) * progressValue))) * ((100 / maxProgressValue) * progressValue)}%);
            opacity: 0.33;
          }
          .progressbar p {
            position: relative;
            padding: 10px 18px 12px;
            margin: 0;
            width: 100%;
            height: 100%;
            z-index: 1;
            text-align: center;
          }
        `}
      </style>
    </>
  )
}
