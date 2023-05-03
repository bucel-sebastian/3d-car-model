import { useRef, useState } from "react";
import React from "react";

export default function ColorChanger(props) {
  const { onColorChange } = props;

  const [carColorValue, setCarColorValue] = useState("#ff0000");

  const handleColorChange = (event) => {
    const color = event.target.value;
    onColorChange(color);
    setCarColorValue(color);
  };
  return (
    <input
      type="color"
      className="input_color"
      value={carColorValue}
      onInput={handleColorChange}
    />
  );
}

// // Componenta copil
// import { forwardRef, useImperativeHandle, useState } from "react";

// const ChildComponent = forwardRef((props, ref) => {
//   const [count, setCount] = useState(0);

//   useImperativeHandle(ref, () => ({
//     incrementCount() {
//       setCount(count + 1);
//     },
//   }));

//   return (
//     <div>
//       <h2>Count: {count}</h2>
//     </div>
//   );
// });

// // Componenta părinte
// import { useRef } from "react";
// import { Head } from "next/head";

// export default function ParentComponent() {
//   const childRef = useRef();

//   const handleButtonClick = () => {
//     childRef.current.incrementCount();
//   };

//   return (
//     <div>
//       <Head>
//         <title>
//           Modificare starea unei componente dintr-o altă componentă în Next.js
//         </title>
//       </Head>
//       <button onClick={handleButtonClick}>Increment count</button>
//       <ChildComponent ref={childRef} />
//     </div>
//   );
// }
