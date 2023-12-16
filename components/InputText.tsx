import react from 'react';
import { motion } from 'framer-motion';
import css from 'styled-jsx/css';


type InputTextProps = {
  disabled?: boolean;
  name?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  value: string;
}


const { className, styles } = css.resolve`
  div {
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
    overflow: hidden;
  }
  div input[type="text"] {
    /* browser default style reset */
    border:none;
    background-image:none;
    background-color:transparent;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    box-shadow: none;


    position: relative;
    padding: 10px 18px 12px;
    margin: 0;
    width: 100%;
    height: 100%;
    text-align: center;
    border-radius: 40px;
  }
`



export default function InputText({
  disabled = false,
  onChange,
  placeholder,
  value
}: InputTextProps) {


  return (
    <>
      <div
        className="input-text"
      >
        <input type="text" onChange={onChange} placeholder={placeholder} value={value} disabled={disabled} />
      </div>
      <style jsx>
      {`
        div.input-text {
          display: flex;
          justify-content: flex-start;
          position: relative;
          border: 2px dashed var(--primary);
          border-radius: 40px;
          width: 100%;
          // height: 40px;
          margin: 12px 0 20px;
          position:relative;
          box-sizing: border-box;
          overflow: hidden;
        }
        div.input-text input[type="text"] {
          /* browser default style reset */
          border:none;
          background-image:none;
          background-color:transparent;
          -webkit-box-shadow: none;
          -moz-box-shadow: none;
          box-shadow: none;
        
        
          position: relative;
          padding: 10px 18px 12px;
          margin: 0;
          width: 100%;
          height: 100%;
          text-align: center;
          border-radius: 40px;
        }

        .answers .answer div.input-text {
          margin: 0;
        }
      `}</style>
    </>
  )
}
