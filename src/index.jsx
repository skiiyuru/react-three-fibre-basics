import App from "./App"
import "./style.css"
import ReactDOM from "react-dom/client"
import { Canvas } from "@react-three/fiber"
import { Cloud, Clouds, Environment, Sky } from "@react-three/drei"
import * as THREE from "three"

const root = ReactDOM.createRoot(document.querySelector("#root"))

root.render(
  <Canvas
    // dpr={[1, 2]}
    gl={
      {
        // antialias: false,
      }
    }
    camera={{
      // fov: 45,
      near: 0.1,
      far: 200,
      position: [3, 2, 6],
    }}
  >
    <Sky
      distance={450000}
      sunPosition={[0, 1, 0]}
      inclination={0}
      azimuth={0.25}
    />

    {/* <Environment preset="city" /> */}
    <App />
  </Canvas>
)
