import CarShow from "@/components/CarShow";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";

export default function Home() {
  return (
    <>
      <Suspense fallback={null}>
        <Canvas shadows>
          <CarShow></CarShow>
        </Canvas>
      </Suspense>
    </>
  );
}
