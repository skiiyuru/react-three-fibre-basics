import { useEffect, useMemo, useRef } from "react"
import * as THREE from "three"

export default function CustomObject() {
  const geometryRef = useRef()
  const verticesCount = 10 * 3

  const vertices = useMemo(() => {
    return new Float32Array(verticesCount * 3).map(
      () => (Math.random() - 0.5) * 3
    )
  }, [])

  useEffect(() => {
    geometryRef.current.computeVertexNormals()
  }, [])

  return (
    <mesh>
      <bufferGeometry ref={geometryRef}>
        <bufferAttribute
          attach={"attributes-position"}
          count={verticesCount}
          array={vertices}
          itemSize={3}
        />
      </bufferGeometry>
      <meshStandardMaterial color={"salmon"} side={THREE.DoubleSide} />
    </mesh>
  )
}
