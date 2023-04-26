import { useFrame, useLoader } from "@react-three/fiber";
import { useEffect, useState } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Mesh } from "three";
import * as THREE from "three";
import { Color } from "three";

export default function Car() {
  const gltf = useLoader(GLTFLoader, "models/car/toyota-gr-supra/scene.gltf");

  const [carColor, setCarColor] = useState([0, 0, 0]);

  const [rearlightIntensity, setRearlightIntensity] = useState(0);
  const [turnOn, setTurnOn] = useState(false);
  const [carMovingFwd, setCarMovingFwd] = useState(false);

  useFrame(() => {
    if (carColor[1] === 0 && carColor[2] === 0 && carColor[0] !== 255) {
      gltf.scene.traverse((object) => {
        // if (
        //   object.name ===
        //   "Plane004_Toyota_Supra_2020_with_Interior_@noTTo3Ds_carpaint001_0"
        // ) {
        //   setCarColor([carColor[0] + 1, 0, 0]);
        //   object.material.color.set(
        //     "#" +
        //       new Color()
        //         .setRGB(carColor[0] / 255, carColor[1] / 255, carColor[2] / 255)
        //         .getHexString()
        //   );
        // }
        if (
          object.name ===
          "Plane041_Toyota_Supra_2020_with_Interior_@noTTo3Ds_lightingRed001_0"
        ) {
          object.material.opacity = 0;
          // console.log(object.material);
        }
        if (
          object.name ===
            "Plane056_Toyota_Supra_2020_with_Interior_@noTTo3Ds_glassRedIllumTexT_0" &&
          turnOn
        ) {
          object.material.emissiveIntensity = rearlightIntensity;
          // console.log(rearlightIntensity);
          if (rearlightIntensity <= 1) {
            setRearlightIntensity(rearlightIntensity + 0.01);
          }
          // console.log(object.material);
        }
      });
    }
  });

  window.addEventListener("keydown", (event) => {
    if (event.key === "s") {
      setRearlightIntensity(3);
    }
  });
  window.addEventListener("keyup", (event) => {
    if (event.key === "s") {
      setRearlightIntensity(1);
    }
  });
  useEffect(() => {
    gltf.scene.scale.set(1, 1, 1);
    gltf.scene.position.set(0, -0.02, 0);

    gltf.scene.traverse((object) => {
      console.log(object.name);
      if (
        object.name ===
        "Plane004_Toyota_Supra_2020_with_Interior_@noTTo3Ds_carpaint001_0"
      ) {
        console.error("Am gasit componenta");
        console.log(object);
        console.error("Am gasit componenta");

        setCarPartBody(object);

        console.error("am setat componenta");
        console.log(carPartBody);
        console.error("am setat componenta");
      }
      //   setCarPartBody(object);
      //   console.log(carPartBody);
      // }
    });

    gltf.scene.traverse((object) => {
      if (object instanceof Mesh) {
        object.castShadow = true;
        object.receiveShadow = true;
        object.material.envMapIntensity = 20;
        object.material.color.set(
          "#" +
            new Color()
              .setRGB(carColor[0] / 255, carColor[1] / 255, carColor[2] / 255)
              .getHexString()
        );

        if (
          object.name ===
          "Plane056_Toyota_Supra_2020_with_Interior_@noTTo3Ds_glassRedIllumTexT_0"
        ) {
        }

        if (
          object.name ===
          "Plane056_Toyota_Supra_2020_with_Interior_@noTTo3Ds_glassRedIllumTexT_0"
        ) {
          object.material.emissiveIntensity = rearlightIntensity;
        }
      }
      // console.log(object);
    });

    setTimeout(() => {
      setTurnOn(true);
    }, 1500);
  }, [gltf]);

  return <primitive object={gltf.scene} />;
}
