import { extend, useFrame, useThree } from "@react-three/fiber"
import { useRef } from "react"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"
import CustomObject from "./components/CustomObject"

extend({ OrbitControls })

export default function App() {
  const { camera, gl } = useThree()
  const groupRef = useRef()
  const boxRef = useRef()
  useFrame((state, deltaTime) => {
    // Animate objects
    boxRef.current.rotation.y += deltaTime
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
      <orbitControls args={[camera, gl.domElement]} />

      {/* lights */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[1, 2, 3]} intensity={1.5} />

      {/* scene */}
      <group ref={groupRef}>
        <mesh
          ref={boxRef}
          scale={1.5}
          position-x={2}
          rotation-y={Math.PI * 0.5}
        >
          <boxGeometry />
          <meshStandardMaterial color={"mediumpurple"} />
        </mesh>
        <mesh position={[-2, 0, 0]}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial color={"skyblue"} />
        </mesh>
      </group>
      <mesh rotation-x={-Math.PI * 0.5} position-y={-1} scale={10}>
        <planeGeometry />
        <meshStandardMaterial color={"yellowgreen"} />
      </mesh>

      <CustomObject />
    </>
  )
}
