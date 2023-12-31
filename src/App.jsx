import { extend, useFrame, useThree } from "@react-three/fiber"
import { useRef } from "react"
import CustomObject from "./components/CustomObject"
import {
  Float,
  GradientTexture,
  Html,
  MeshReflectorMaterial,
  OrbitControls,
  PivotControls,
  Text,
  TransformControls,
} from "@react-three/drei"
import { button, useControls } from "leva"
import { Perf } from "r3f-perf"

export default function App() {
  const { perfVisible } = useControls("perfomance", {
    perfVisible: true,
  })
  const { position, color } = useControls("sphere", {
    position: {
      value: { x: -2, y: 0 },
      joystick: "invertY",
    },
    color: "#ff0000",
    hello: button(() => console.log("hello")),
    choice: { options: ["a", "b", "c"] },
  })

  const { scale } = useControls("box", {
    scale: {
      value: 1,
      min: 1,
      max: 5,
      step: 0.01,
    },
  })

  const { camera, gl } = useThree()
  const groupRef = useRef()
  const boxRef = useRef()
  const sphereRef = useRef()
  useFrame((state, deltaTime) => {
    // Animate objects
    // boxRef.current.rotation.y += deltaTime
    // groupRef.current.rotation.y += deltaTime
    // Animate camera
    // const angle = state.clock.elapsedTime
    // state.camera.position.x = Math.sin(angle) * 8
    // state.camera.position.z = Math.cos(angle) * 8
    // state.camera.lookAt(0, 0, 0)
  })
  return (
    <>
      {/* logic controls */}
      <OrbitControls makeDefault />
      {perfVisible && <Perf position="top-left" />}

      {/* lights */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[1, 2, 3]} intensity={1.5} />

      {/* scene */}
      <group ref={groupRef}>
        {/* <TransformControls object={boxRef} mode={"translate"} /> */}
        <PivotControls anchor={[0, 0, 0]} depthTest={false} scale={1}>
          <mesh ref={boxRef} scale={scale} position-x={2}>
            <boxGeometry />
            <meshStandardMaterial color={"mediumpurple"} />
          </mesh>
        </PivotControls>
        <PivotControls anchor={[0, 0, 0]} depthTest={false} scale={1}>
          <mesh ref={sphereRef} position={[position.x, position.y, 0]}>
            <sphereGeometry args={[1, 32, 32]} />
            <meshStandardMaterial color={color} />
            <Html
              position={[0, 1.5, 0]}
              wrapperClass="label"
              center
              distanceFactor={8}
              occlude={[boxRef, sphereRef]}
            >
              That's a sphere 👍
            </Html>
          </mesh>
        </PivotControls>
      </group>
      <mesh rotation-x={-Math.PI * 0.5} position-y={-1} scale={10}>
        <planeGeometry />
        {/* <meshStandardMaterial color={"yellowgreen"} /> */}
        <MeshReflectorMaterial
          resolution={512}
          blur={[1000, 1000]}
          mixBlur={1}
          mirror={0.7}
          color={"greenyellow"}
        />
      </mesh>

      <Float speed={3} floatIntensity={2}>
        <Text
          fontSize={2}
          color={"salmon"}
          font="./bangers-v20-latin-regular.woff"
          position={[0, 2.5, -2]}
          maxWidth={2}
          textAlign="center"
        >
          I love R3F
          {/* <meshNormalMaterial /> */}
          <meshBasicMaterial>
            <GradientTexture
              stops={[0, 1]} // As many stops as you want
              colors={["aquamarine", "hotpink"]} // Colors need to match the number of stops
              size={1024} // Size is optional, default = 1024
            />
          </meshBasicMaterial>
        </Text>
      </Float>

      {/* <CustomObject /> */}
    </>
  )
}
