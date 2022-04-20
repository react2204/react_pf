import styled from 'styled-components';
import { useState, forwardRef, useImperativeHandle } from 'react';
import {motion, AnimatePresence} from 'framer-motion';

const Pop = styled.aside`
  width: 100%;
  height: 100vh;
  padding: 5vw;
  position: fixed;
  top: 0px;
  left: 0px;
  background: rgba(0, 0, 0, 0.9);
  z-index: 10;

  

  .con {
    width: 100%; height: 100%; border: 1px solid #888; position: relative;

    iframe {
      width: 100%; height: 100%; object-fit: cover;
    }

    img {
      width: 100%; height: 100%; object-fit: cover;
    }

    > span {
      font: bold 14px/1 'arial';
      color: #fff;
      cursor: pointer;
      position: absolute;
      top: -50px;
      right: 0px;
    }
  }
`

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
          <Pop>			
            <motion.div 
              className="con"
              init={{opacity: 0}}
              animate={{opacity: 1}}
              exit={{opacity: 0}}
            >
              {props.children}
            </motion.div>
          </Pop>
        </>
      )}
      </AnimatePresence>  
    )  
  }
)



export default Popup;