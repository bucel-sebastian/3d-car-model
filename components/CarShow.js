import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import Ground from "./Ground";
import Car from "./Car";
import Rings from "./Rings";
import ColorChanger from "./ColorChanger";
import { useEffect, useRef, useState } from "react";
import { Boxes } from "./Boxes";
import { Circles } from "./Circles";
import { useFrame, useThree } from "@react-three/fiber";
import { Vector3 } from "three";

export default function CarShow(props) {
  const cameraRef = useRef();
  const { setDefaultCamera } = useThree();

  const { carColor } = props;

  let moveCamera = useRef(false);
  let moveX = useRef(false),
    moveY = useRef(false),
    moveZ = useRef(false);
  let cameraStop = useRef(false);

  useFrame(() => {
    if (moveCamera.current === true && !cameraStop.current) {
      console.log(moveCamera.current);
      if (cameraRef.current.position.x < 2) {
        cameraRef.current.position.x = cameraRef.current.position.x + 0.01;
      }
      if (cameraRef.current.position.x >= 2) {
        moveX.current = true;
      }
      if (cameraRef.current.position.y >= 2) {
        moveY.current = true;
      }

      if (cameraRef.current.position.y < 2) {
        cameraRef.current.position.y = cameraRef.current.position.y + 0.02;
      }
      if (cameraRef.current.position.z >= 5) {
        moveZ.current = true;
      }

      if (cameraRef.current.position.z < 5) {
        cameraRef.current.position.z = cameraRef.current.position.z + 0.03;
      }

      if (moveX.current && moveY.current && moveZ.current) {
        moveCamera.current = false;
        cameraStop.current = true;
      }
    }
  });

  useEffect(() => {
    setTimeout(() => {
      moveCamera.current = true;
    }, 2500);
  });

  return (
    <>
      <OrbitControls target={[0, 0.35, 0]} maxPolarAngle={1.45} />
      <PerspectiveCamera
        makeDefault
        fov={50}
        ref={cameraRef}
        position={[0, -2, -5]}
      />

      {/* let color = new Color(0,0,0); */}
      <color args={[0.001, 0.001, 0.001]} attach="background" />

      <spotLight
        color={[1, 0.25, 0.7]}
        intensity={1.5}
        angle={0.6}
        penumbra={0.5}
        position={[5, 5, 0]}
        castShadow
        shadow-bias={-0.0001}
      />
      <spotLight
        color={[0.14, 0.5, 1]}
        intensity={2}
        angle={0.6}
        penumbra={0.5}
        position={[-5, 5, 0]}
        castShadow
        shadow-bias={-0.0001}
      />
      {/* <mesh translateZ={-1}>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial color={"purple"} />
      </mesh> */}
      {/* <ColorChanger></ColorChanger> */}
      <Boxes />
      <Circles />
      <Car carColor={carColor} />
      <Rings />
      <Ground />
    </>
  );
}
