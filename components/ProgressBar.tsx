import react from 'react';


type ProgressBarProps = {
  maxProgressValue: number;
  progressValue: number;
  progressValueUnit: string;
  text: string;
}


export default function ProgressBar({
  maxProgressValue, progressValue, progressValueUnit, text
}: ProgressBarProps) {



  return (
    <>
      <div className="progressbar">
        <div className="progressbar__progress">
          <div className="progressbar__gradient"></div>
        </div>
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
            margin-bottom: 20px;
            position:relative;
          }
          .progressbar__progress {
            width: ${(100 / maxProgressValue) * progressValue}%;
            overflow: hidden;
            height: 100%;
            border-radius: 40px;
            position:absolute;
            box-sizing: border-box;
          }
          .progressbar__gradient {
            position:absolute;
            right: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(to right, orchid 0%, #DE3163 ${((100 / ((100 / maxProgressValue) * progressValue)) * (100 / ((100 / maxProgressValue) * progressValue))) * ((100 / maxProgressValue) * progressValue)}%);
          }
          .progressbar p {
            position: relative;
            padding: 10px 18px;
            margin: 0;
            width: 100%;
            height: 100%;
            z-index: 1;
          }
        `}
      </style>
    </>
  )
}
