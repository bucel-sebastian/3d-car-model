import CarShow from "@/components/CarShow";
import ColorChanger from "@/components/ColorChanger";
import { Canvas } from "@react-three/fiber";
import { Suspense, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretUp } from "@fortawesome/free-solid-svg-icons";

export default function Home() {
  const [carColor, setCarColor] = useState([255, 0, 0]);

  const [settingsMenuOpen, setSettingsMenuOpen] = useState(false);

  const changeBodyColor = (color) => {
    setCarColor(color);
  };

  const handleMenuToggleButton = () => {
    setSettingsMenuOpen(!settingsMenuOpen);
  };

  return (
    <>
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
        <Canvas shadows>
          <CarShow carColor={carColor}></CarShow>
        </Canvas>
      </Suspense>
    </>
  );
}
