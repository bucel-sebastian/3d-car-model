import { useLoader } from "@react-three/fiber";
import { useEffect, useState } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Mesh } from "three";
import * as THREE from "three";

export default function Car() {
  const gltf = useLoader(GLTFLoader, "models/car/toyota-gr-supra/scene.gltf");

  const [carColor, setCarColor] = useState("#000000");

  useEffect(() => {
    gltf.scene.scale.set(1, 1, 1);
    gltf.scene.position.set(0, -0.02, 0);
    gltf.scene.traverse((object) => {
      if (object instanceof Mesh) {
        object.castShadow = true;
        object.receiveShadow = true;
        object.material.envMapIntensity = 20;
        object.material.color.set(carColor);
      }
    });

    setTimeout(() => {
      setCarColor("#ff0000");
      console.log("culoare schimbata");
    }, 1500);
  }, [gltf]);

  return <primitive object={gltf.scene} />;
}
