// System imports
import { Canvas } from '@react-three/fiber'
import React, { Suspense } from 'react'
import { Html, OrbitControls, useProgress } from '@react-three/drei'
import type { LenisRef } from 'lenis/react'
import ReactLenis from 'lenis/react'

// Component Import
import { ModelViewer } from './components/ModelViewer'

// Style Imports
import './global.css'


const Loader = () => {
  const { progress } = useProgress();
  return (
    <div className="relative h-screen w-screen flex items-center justify-center bg-[#FAF9F6] overflow-hidden">
      <span className="absolute bottom-[100px] right-[50px] text-black text-[12.5rem] leading-0 font-semibold heading">{Math.floor(progress)}%</span>
    </div>
  );
}

const ModelLoader = () => {
  return (
    <Html>
      <span className=" text-base font-mono w-fit h-fit">Loading Model...</span>
    </Html>
  );
}


const App = () => {
  const lenisRef = React.useRef<LenisRef | null>(null);
  const { progress } = useProgress();
  const [isLoaded, setIsLoaded] = React.useState(false);

  React.useEffect(() => {
    function update(time: number) {
      lenisRef.current?.lenis?.raf(time);
      requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }, []);

  React.useEffect(() => {
    if (progress === 100 && !isLoaded) {
      const timeout = setTimeout(() => {
        setIsLoaded(true);
      }, 500);

      return () => clearTimeout(timeout);
    }
  }, [progress, isLoaded]);

  return (
    <>
      {!isLoaded
        ?
        <Loader />
        :
        (
          <ReactLenis root ref={lenisRef}>
            <main className="h-fit w-screen flex flex-col justify-center items-center bg-[#FAF9F6]">
              {/* Navbar */}
              <div className="h-[80px] w-screen flex justify-center items-center bg-transparent">
                <ul className="flex flex-row justify-around items-center">
                  <li className="logo text-4xl max-lg:text-3xl max-md:text-2xl">SpaceNet</li>
                </ul>
              </div>

              {/* Header */}
              <div className="absolute top-[80px] left-0 h-fit w-screen flex flex-col items-center justify-center py-16 bg-transparent wrap-normal z-20">
                <h1 className="lg:text-[10rem] lg:leading-32 max-md:text-5xl max-lg:text-8xl heading text-center">
                  Your Sleep Mate
                </h1>
              </div>

              {/* Model */}
              <div className="h-screen w-screen z-10">
                <Canvas className="h-full w-full bg-transparent">
                  <ambientLight intensity={0.5} />
                  <directionalLight intensity={2.75} color="#FFE5BD" position={[3, 5, 5]} />
                  <directionalLight intensity={2.75} color="#D3C1E5" position={[-3, 5, 5]} />
                  <Suspense fallback={<ModelLoader />}>
                    <ModelViewer />
                  </Suspense>
                  <OrbitControls />
                </Canvas>
              </div>
            </main>
          </ReactLenis>
        )}
    </>
  );
};

export default App