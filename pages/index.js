import CarShow from "@/components/CarShow";
import ColorChanger from "@/components/ColorChanger";
import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretUp } from "@fortawesome/free-solid-svg-icons";

// import engineStart from "/engine-start.mp3";
// import engineRev from "/rev.wav";
// import engineIdle from "/engine-idle.mp3";

export default function Home() {
  const [isRunning, setIsRunning] = useState(false);

  const [engineStartAudioContext, setEngineStartAudioContext] = useState(null);
  const [engineStartAudioBuffer, setEngineStartAudioBuffer] = useState(null);
  const [engineIdleAudioContext, setEngineIdleAudioContext] = useState(null);
  const [engineIdleAudioBuffer, setEngineIdleAudioBuffer] = useState(null);
  const [engineRevAudioContext, setEngineRevAudioContext] = useState(null);
  const [engineRevAudioBuffer, setEngineRevAudioBuffer] = useState(null);
  const [thirdSoundPlaying, setThirdSoundPlaying] = useState(false);

  useEffect(() => {
    const loadAudio = async () => {
      const response = await fetch("/engine-start.mp3");
      const arrayBuffer = await response.arrayBuffer();
      const context = new AudioContext();
      const buffer = await context.decodeAudioData(arrayBuffer);
      setEngineStartAudioContext(context);
      setEngineStartAudioBuffer(buffer);
    };
    const loadSecondAudio = async () => {
      const response = await fetch("/engine-idle.mp3");
      const arrayBuffer = await response.arrayBuffer();
      const context = new AudioContext();
      const buffer = await context.decodeAudioData(arrayBuffer);
      setEngineIdleAudioContext(context);
      setEngineIdleAudioBuffer(buffer);
    };
    const loadThirdAudio = async () => {
      const response = await fetch("/rev.mp3");
      const arrayBuffer = await response.arrayBuffer();
      const context = new AudioContext();
      const buffer = await context.decodeAudioData(arrayBuffer);
      setEngineRevAudioContext(context);
      setEngineRevAudioBuffer(buffer);
    };
    loadThirdAudio();

    loadAudio();
    loadSecondAudio();
  }, []);

  const playSound = () => {
    const source = engineStartAudioContext.createBufferSource();
    source.buffer = engineStartAudioBuffer;
    source.connect(engineStartAudioContext.destination);
    source.start();
  };
  const playSecondSound = () => {
    const source = engineIdleAudioContext.createBufferSource();
    source.buffer = engineIdleAudioBuffer;
    source.connect(engineIdleAudioContext.destination);
    source.start();
    setTimeout(() => {
      playSecondSound();
    }, 4000);
  };
  const playThirdSound = () => {
    if (!thirdSoundPlaying) {
      setThirdSoundPlaying(true);
      const source = engineRevAudioContext.createBufferSource();
      source.buffer = engineRevAudioBuffer;
      source.connect(engineRevAudioContext.destination);
      source.start();
      setTimeout(() => {
        setThirdSoundPlaying(false);
      }, 5000);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", (event) => {
      if (event.key === "w") {
        playThirdSound();
      }
    });
  }, [engineRevAudioContext]);

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

  useEffect(() => {
    if (engineStartAudioContext) {
      setTimeout(() => {
        playSound();
        setTimeout(() => {
          playSecondSound();
        }, 1000);
      }, 2500);
    }
  }, [sceneLoaded]);

  return (
    <>
      {isRunning ? (
        <div>
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
        </div>
      ) : (
        <div className="page_block">
          <button
            className="page_block_button"
            onClick={() => {
              setIsRunning(true);
            }}
          >
            Start
          </button>
        </div>
      )}
    </>
  );
}
