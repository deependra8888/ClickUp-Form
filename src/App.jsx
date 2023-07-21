import { useEffect,  useState } from "react";
import { ClickUpIcon } from "./assets/ClickUpIcon";
let length = [0,1,2,3,4,5,6,7,8,9];
function App() {
  const [step, setStep] = useState(0);
  

  useEffect(() => {
    let currBox = document.getElementById(`box_${step}`)
    console.log(currBox);
    currBox.scrollIntoView({behavior: 'smooth', block: 'start'});
    
  },[step])

  const checkVisiblity = () => {
    let currBox = document.getElementById(`box_${step}`)
    const elementIsVisibleInViewport = (el, partiallyVisible = false) => {
      const { top, left, bottom, right } = el.getBoundingClientRect();
      const { innerHeight, innerWidth } = window;
      return partiallyVisible
        ? ((top > 0 && top < innerHeight) ||
            (bottom > 0 && bottom < innerHeight)) &&
            ((left > 0 && left < innerWidth) || (right > 0 && right < innerWidth))
        : top >= 0 && left >= 0 && bottom <= innerHeight && right <= innerWidth;
    };
    let isVisible =  elementIsVisibleInViewport(currBox, false)
    if(!isVisible){
      currBox.scrollIntoView({behavior: 'smooth', block: 'nearest'})
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', checkVisiblity);

    return () => {
      window.removeEventListener('scroll', checkVisiblity);
    }
  }, [step])
  return (
    <div className="App">
      {
        length.map(num => {
          return <Box key={num} step={step} setStep={setStep} opacity={num === step} num={num} />
        })
      }
    </div>
  );
}

export default App;

function Box({opacity, step, setStep, num}) {


  const handleStep = () => {
    setStep(step + 1);
  }
 

  return (
    <div id={'box_' + num}  className={opacity ? 'active' : 'box'}>
      <div className="title">
        <ClickUpIcon />
        <h3>Name your Workspace:</h3>
      </div>
      <div className="details">
        <input disabled = {!opacity} className="workspace" type="text" />
        <label htmlFor="name">
          You can also use the name of your company or organization
        </label>
        <button  disabled={!opacity} onClick={handleStep}>Next</button>
      </div>
    </div>
  );
}
