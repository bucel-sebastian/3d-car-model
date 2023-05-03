const { useFrame } = require("@react-three/fiber");
const { useRef, useState } = require("react");
const { Vector3 } = require("three");

function Circle({ color }) {
  const circle = useRef();
  const time = useRef(0);

  const [xRotSpeed] = useState(() => Math.random());
  const [yRotSpeed] = useState(() => Math.random());

  const [position, setPosition] = useState(getInitialPosition());

  const [scale] = useState(() => Math.pow(Math.random(), 2.5) * 0.5 + 0.05);

  function getInitialPosition() {
    let v = new Vector3(
      (Math.random() * 2 - 1) * 3,
      Math.random() * 2.5 + 0.3,
      (Math.random() * 2 - 1) * 15
    );
    if (v.x < 0) v.x -= 1.75;
    if (v.x > 0) v.x += 1.75;

    // setPosition(v);
    return v;
  }
  function resetPosition() {
    let v = new Vector3(
      (Math.random() * 2 - 1) * 3,
      Math.random() * 2.5 + 0.3,
      (Math.random() * 2 - 1) * 15
    );
    if (v.x < 0) v.x -= 1.75;
    if (v.x > 0) v.x += 1.75;

    // setPosition(v);
    return v;
  }

  useFrame(
    (state, delta) => {
      circle.current.position.set(position.x, position.y, position.z);
      circle.current.rotation.x += delta * xRotSpeed;
      circle.current.rotation.y += delta * yRotSpeed;
    },
    [xRotSpeed, yRotSpeed, position]
  );

  return (
    <mesh ref={circle} scale={scale} castShadow>
      <sphereGeometry args={[1, 20, 20]} />
      <meshStandardMaterial color={color} envMapIntensity={0.15} />
    </mesh>
  );
}

export function Circles() {
  const [arr] = useState(() => {
    let a = [];
    for (let i = 0; i < 100; i++) {
      a.push(0);
    }
    return a;
  });

  return (
    <>
      {arr.map((e, i) => (
        <Circle
          key={i}
          color={i % 2 == 0 ? [0.4, 0.1, 0.1] : [0.05, 0.15, 0.4]}
        />
      ))}
    </>
  );
}
