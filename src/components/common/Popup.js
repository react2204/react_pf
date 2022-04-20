import styled from 'styled-components';
import { useState, forwardRef, useImperativeHandle } from 'react';
import {motion, AnimatePresence} from 'framer-motion';


const Popup = forwardRef(
  (props, ref) => {
    const [open, setOpen] = useState(false);

    useImperativeHandle(ref, ()=>{
      return {
        open: ()=> setOpen(true),
        close: ()=> setOpen(false)
      }
    })

    return (
      <AnimatePresence>
      {open && (
        <>
          <motion.aside
            className='popup'
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
          >			
            <div className="con">
              {props.children}
            </div>
          </motion.aside>
        </>
      )}
      </AnimatePresence>  
    )  
  }
)



export default Popup;