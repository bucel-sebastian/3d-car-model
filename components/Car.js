import { useFrame, useLoader } from "@react-three/fiber";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Mesh } from "three";
import * as THREE from "three";
import { Color } from "three";

export default function Car(props, ref) {
  const { carColor } = props;

  const gltf = useLoader(GLTFLoader, "models/car/toyota-gr-supra/scene.gltf");

  const [carPartBody] = useState(
    "Plane004_Toyota_Supra_2020_with_Interior_@noTTo3Ds_carpaint001_0"
  );
  const [carPartRearLights] = useState(
    "Plane056_Toyota_Supra_2020_with_Interior_@noTTo3Ds_glassRedIllumTexT_0"
  );
  const [carPartWheelFR] = useState("WheelFtR");
  const [carPartWheelFL] = useState("WheelFtL");
  const [carPartWheelBR] = useState("WheelBkR");
  const [carPartWheelBL] = useState("WheelBkL");
  const [rotationAngle, setRotationAngle] = useState(0);
  const [wheelsMovingFwd, setWheelsMovingFwd] = useState(false);
  const [wheelsRotatingLeft, setWheelsRotatingLeft] = useState(false);
  const [wheelsRotatingRight, setWheelsRotatingRight] = useState(false);
  const [wheelsRotatingAngle, setWheelsRotatingAngle] = useState(0);

  const [bodyColor, setBodyColor] = useState([0, 0, 0]);

  const [rearlightIntensity, setRearlightIntensity] = useState(0);
  const [turnOn, setTurnOn] = useState(false);
  const [carMovingFwd, setCarMovingFwd] = useState(false);

  useEffect(() => {
    setBodyColor(carColor);
  }, [carColor]);

  useFrame(({ clock }) => {
    gltf.scene.traverse((object) => {
      if (object.name === carPartWheelFR) {
        object.rotation.x = rotationAngle;
        object.rotation.y = wheelsRotatingAngle;
      }
      if (object.name === carPartWheelFL) {
        object.rotation.x = rotationAngle;
        object.rotation.y = wheelsRotatingAngle;
      }
      if (object.name === carPartWheelBR) {
        object.rotation.x = rotationAngle;
      }
      if (object.name === carPartWheelBL) {
        object.rotation.x = rotationAngle;
      }
      if (wheelsMovingFwd) {
        setRotationAngle(rotationAngle + Math.PI / 180);
        // console.log(object.rotation.y);
      }
      if (wheelsRotatingLeft) {
        if (wheelsRotatingAngle <= 0.6) {
          setWheelsRotatingAngle(wheelsRotatingAngle + Math.PI / 180);
        }
      }
      if (wheelsRotatingRight) {
        if (wheelsRotatingAngle >= -0.6) {
          setWheelsRotatingAngle(wheelsRotatingAngle - Math.PI / 180);
        }
      }

      if (object.name === carPartBody) {
        console.log("se modifica " + bodyColor);
        object.material.color.set(bodyColor);
      }
      //   setCarColor([carColor[0] + 1, 0, 0]);
      //   object.material.color.set(
      //     "#" +
      //       new Color()
      //         .setRGB(carColor[0] / 255, carColor[1] / 255, carColor[2] / 255)
      //         .getHexString()
      //   );
      // }
      // Schimbare intensitate led-uri din spate

      if (object.name === carPartRearLights && turnOn) {
        object.material.emissiveIntensity = rearlightIntensity;
        if (rearlightIntensity <= 1) {
          setRearlightIntensity(rearlightIntensity + 0.01);
        }
      }
    });
  });

  // aprindere led-uri spate cand se apasa tasta "S"
  window.addEventListener("keydown", (event) => {
    if (event.key === "s") {
      setRearlightIntensity(3);
    }
    if (event.key === "w") {
      setWheelsMovingFwd(true);
    }
    // if (event.key === "a") {
    //   setWheelsRotatingLeft(true);
    // }
    // if (event.key === "d") {
    //   setWheelsRotatingRight(true);
    // }
  });
  window.addEventListener("keyup", (event) => {
    if (event.key === "s") {
      setRearlightIntensity(1);
    }
    if (event.key === "w") {
      setWheelsMovingFwd(false);
    }
    // if (event.key === "a") {
    //   setWheelsRotatingLeft(false);
    // }
    // if (event.key === "d") {
    //   setWheelsRotatingRight(false);
    // }
  });

  useEffect(() => {
    gltf.scene.scale.set(1, 1, 1);
    gltf.scene.position.set(0, -0.02, 0);

    gltf.scene.traverse((object) => {
      // console.log(object);

      // Setare culoare initiala caroserie (#ff0000)
      if (object.name === carPartBody) {
        object.material.color.set(
          "#" + new Color().setRGB(255 / 255, 0 / 255, 0 / 255).getHexString()
        );
      }
    });

    // parcurgere fiecare obiect din modelul 3D
    gltf.scene.traverse((object) => {
      if (object instanceof Mesh) {
        object.castShadow = true;
        object.receiveShadow = true;
        object.material.envMapIntensity = 20;

        // object.material.color.set(
        //   "#" +
        //     new Color()
        //       .setRGB(carColor[0] / 255, carColor[1] / 255, carColor[2] / 255)
        //       .getHexString()
        // );

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

    // Porneste masina dupa 1,5 secunde
    setTimeout(() => {
      setTurnOn(true);
    }, 1500);
  }, [gltf]);

  return (
    <>
      <primitive object={gltf.scene} />
      {/* <input type="color" onInput={handleColorChange} /> */}
    </>
  );
}
