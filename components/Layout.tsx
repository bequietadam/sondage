import React, { forwardRef, useMemo } from "react";
import { motion, HTMLMotionProps } from 'framer-motion';

type PageTransitionProps = HTMLMotionProps<'div'> & {
  reverse?: boolean,
}
type PageTransitionRef = React.ForwardedRef<HTMLDivElement>

const variants = {
  init: {
    x: '100%',
    opacity: 0,
  },
  anim: {
    x: 0,
    opacity: 1,
  },
  exit: {
    x: '-60%',
    opacity: 0,
    transition: {
      duration: 0.2,
      opacity: {
        duration: 0.16,
        ease: 'linear'
      }
    }
  },
}
const transition = { duration: .32, ease: 'easeInOut', opacity: { ease: 'easeOut' } }

function Layout(props: PageTransitionProps, ref: PageTransitionRef ) {

  return (
    <>
      <motion.div
        ref={ref}
        initial={!props.reverse ? 'init' : 'exit'}
        animate="anim"
        exit="exit"
        transition={transition}
        variants={variants}
        style={{
          display: 'flex',
          flexDirection: 'column',
          flex: '1 0 auto',
          width: '100%',
        }}
      >
        {props.children}
      </motion.div>
    </>
  );
}




export default forwardRef(Layout)
