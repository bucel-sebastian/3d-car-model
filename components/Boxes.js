const { useFrame } = require("@react-three/fiber");
const { useRef, useState } = require("react");
const { Vector3 } = require("three");

function Box({ color }) {
  const box = useRef();

  const [xRotSpeed] = useState(() => Math.random());
  const [yRotSpeed] = useState(() => Math.random());

  const [position, setPosition] = useState(resetPosition());

  const [scale] = useState(() => Math.pow(Math.random(), 2.0) * 0.5 + 0.05);

  function resetPosition() {
    let v = new Vector3(
      (Math.random() * 2 - 1) * 3,
      Math.random() * 2.5 + 0.1,
      (Math.random() * 2 - 1) * 15
    );
    if (v.x < 0) v.x -= 1.75;
    if (v.x > 0) v.x += 1.75;

    // setPosition(v);
    return v;
  }

  useFrame(
    (state, delta) => {
      box.current.position.set(position.x, position.y, position.z);
      box.current.rotation.x += delta * xRotSpeed;
      box.current.rotation.y += delta * yRotSpeed;
    },
    [xRotSpeed, yRotSpeed, position]
  );

  return (
    <mesh ref={box} scale={scale} castShadow>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={color} envMapIntensity={0.15} />
    </mesh>
  );
}

export function Boxes() {
  const [arr] = useState(() => {
    let a = [];
    for (let i = 0; i < 50; i++) {
      a.push(0);
    }
    return a;
  });

  return (
    <>
      {arr.map((e, i) => (
        <Box key={i} color={i % 2 == 0 ? [0.4, 0.1, 0.1] : [0.05, 0.15, 0.4]} />
      ))}
    </>
  );
}
