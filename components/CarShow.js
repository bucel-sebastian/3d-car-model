import {
  OrbitControls,
  PerspectiveCamera,
  PositionalAudio,
} from "@react-three/drei";
import Ground from "./Ground";
import Car from "./Car";
import Rings from "./Rings";
import ColorChanger from "./ColorChanger";
import { useEffect, useRef, useState } from "react";
import { Boxes } from "./Boxes";
import { Circles } from "./Circles";
import { useFrame, useThree, useLoader } from "@react-three/fiber";
import { Vector3 } from "three";
import { Audio } from "@react-three/drei";
import { AudioLoader } from "three";
import * as THREE from "three";
import Sound from "./Sound";

export default function CarShow(props) {
  // const [soundTrigger1, setSoundTrigger1] = useState(false);
  // const [soundTrigger2, setSoundTrigger2] = useState(false);
  // const [soundTrigger3, setSoundTrigger3] = useState(false);

  const cameraRef = useRef();
  const { setDefaultCamera } = useThree();

  const { carColor } = props;

  // const audioIdle = useLoader(AudioLoader, "engine-idle.mp3");
  // const audioStart = useLoader(AudioLoader, "/engine-start.mp3");
  // const audioRev = useLoader(AudioLoader, "rev.wav");

  // const startEngineAudio = useRef();

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

  // useEffect(() => {
  //   setTimeout(() => {
  //     setSoundTrigger2(true);
  //   }, 1300);
  // }, [soundTrigger1]);

  useEffect(() => {
    setTimeout(() => {
      moveCamera.current = true;
      // startEngineAudio.current.play();
      // setSoundTrigger1(true);
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

      {/* <Sound
        url="/engine-start.mp3"
        position={new THREE.Vector3(0, 0, 0)}
        startTrigger={soundTrigger1}
      />

      <Sound
        url="/engine-idle.mp3"
        position={new THREE.Vector3(0, 0, 0)}
        startTrigger={soundTrigger2}
        loop
      />

      <Sound
        url="/rev.wav"
        position={new THREE.Vector3(0, 0, 0)}
        startTrigger={soundTrigger3}
        stopTrigger={!soundTrigger3}
      /> */}

      <Boxes />
      <Circles />
      <Car carColor={carColor} />
      <Rings />
      <Ground />
    </>
  );
}
