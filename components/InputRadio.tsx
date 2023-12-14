import react from 'react';
import { motion } from 'framer-motion';


type InputRadioProps = {
  checked: boolean;
  name: string;
  onClick: () => void;
  text: string;
}




export default function InputRadio({
  checked, name, onClick, text
}: InputRadioProps) {


  const transitionsAnim = {
    opacity: {
      delay: 0.2,
      duration: 0.3,
      ease: 'easeIn',
    },
    width: {
      type: "spring",
      damping: 22, // will override duration
      mass: 0.6, // will override duration
      // mass: progressValue / maxProgressValue,
      // stiffness: 50, // will override duration
      restDelta: 0.001,
      restSpeed: 0.001,

      delay: 0.3,
      // duration: 1,
      // ease: 'circOut',
    },
    x: {
      duration: 0.4,
      ease: 'easeOut',
    }
  };

  const transitionsInit = {
    opacity: {
      delay: 0.18,
      duration: 0.5,
      ease: 'easeIn',
    },
    width: {
      type: "spring",
      damping: 22, // will override duration
      mass: 0.6, // will override duration
      // mass: progressValue / maxProgressValue,
      // stiffness: 50, // will override duration
      restDelta: 0.001,
      restSpeed: 0.001,

      // delay: 0.5,
      // duration: 1,
      // ease: 'circOut',
    },
    x: {
      delay: 0.6,
      duration: 0.6,
      ease: 'easeOut',
    }
  };

  const variants = {
    init: {
      opacity: 0,
      width: "8%",
      x: -40,
      transition: transitionsInit,
    },
    anim: {
      opacity: 1,
      width: '100%',
      x: 0,
      transition: transitionsAnim,
    }
  }

  return (
    <>
      <div className="radio">
        <motion.div
          className="progress"
          animate={!!checked ? 'anim' : 'init'}
          style={{
            borderRadius: 20,
            boxSizing: 'border-box',
            overflow: 'hidden',
            height: '100%',
            position: 'absolute',
          }}
          variants={variants}
        >
          <div className="gradient"></div>
        </motion.div>
        <p>{text}</p>
        <input type="radio" name={name} checked={checked} onChange={onClick} />
      </div>
      <style jsx>
        {`
          .radio {
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
          input[type="radio"] {
            position: absolute;
            width: 100%;
            height: 100%;
            top: -3px;
            left: -5px;
            -webkit-appearance: none;
            appearance: none;
            z-index: 2;
            border-radius: 40px;
            background-color: transparent;
            cursor: pointer; 
          }
          .radio .gradient {
            position:absolute;
            right: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(to right, orchid 0%, #DE3163 100%);
            opacity: 0.33;
          }
          .radio p {
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
