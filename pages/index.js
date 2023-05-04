import CarShow from "@/components/CarShow";
import ColorChanger from "@/components/ColorChanger";
import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretUp } from "@fortawesome/free-solid-svg-icons";

export default function Home() {
  const [sceneLoaded, setSceneLoaded] = useState(false);
  const [loadingTextDots, setLoadingTextDots] = useState(".");

  const [carColor, setCarColor] = useState([255, 0, 0]);

  const [settingsMenuOpen, setSettingsMenuOpen] = useState(false);

  const changeBodyColor = (color) => {
    setCarColor(color);
  };

  const handleMenuToggleButton = () => {
    setSettingsMenuOpen(!settingsMenuOpen);
  };

  const sceneIsLoaded = () => {
    setSceneLoaded(true);
  };
  useEffect(() => {
    setTimeout(() => {
      if (loadingTextDots === "...") {
        setLoadingTextDots(".");
      } else {
        setLoadingTextDots(loadingTextDots + ".");
      }
    }, 500);
  }, [loadingTextDots]);

  return (
    <>
      <h1 className="powerd_by_text">Realizat de Bucel Ion-Sebastian</h1>
      <div
        className={
          sceneLoaded ? "loading_screen scene_is_loaded" : "loading_screen"
        }
      >
        <h2 className="loading_text">Se încarcă{loadingTextDots}</h2>
      </div>
      <Suspense fallback={null}>
        <div
          id="show_settings"
          style={{ top: settingsMenuOpen ? "auto" : "100%" }}
        >
          <button id="show_settings_toggle_button">
            <FontAwesomeIcon
              icon={faCaretUp}
              rotation={settingsMenuOpen ? 180 : 0}
              onClick={handleMenuToggleButton}
            />
          </button>
          <div>
            <ColorChanger onColorChange={changeBodyColor}></ColorChanger>
          </div>
        </div>
        <Canvas shadows onCreated={sceneIsLoaded}>
          <CarShow carColor={carColor}></CarShow>
        </Canvas>
      </Suspense>
    </>
  );
}
