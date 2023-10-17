import App from "./App"
import "./style.css"
import ReactDOM from "react-dom/client"
import { Canvas } from "@react-three/fiber"

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
    <App />
  </Canvas>
)
