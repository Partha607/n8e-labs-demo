import * as React from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const themeColors: Record<string, string> = {
  ares: "#ff3333",
  tron: "#00d4ff",
  clu: "#ff6600",
  athena: "#ffd700",
  aphrodite: "#ff1493",
  poseidon: "#0066ff",
};

const ringGeometry = new THREE.TorusGeometry(3, 0.02, 6, 32);
const speedLineGeometry = new THREE.BoxGeometry(0.02, 0.02, 1);

function useThemeColor() {
  const [color, setColor] = React.useState(themeColors.tron);

  React.useEffect(() => {
    const getThemeColor = () => {
      const theme = document.documentElement.getAttribute("data-theme") ?? "tron";
      return themeColors[theme] ?? themeColors.tron;
    };

    setColor(getThemeColor());

    const observer = new MutationObserver(() => setColor(getThemeColor()));
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => observer.disconnect();
  }, []);

  return color;
}

function TunnelRings({ color, count = 15 }: { color: string; count?: number }) {
  const meshRef = React.useRef<THREE.InstancedMesh>(null);
  const materialRef = React.useRef<THREE.MeshBasicMaterial>(null);

  const ringData = React.useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        z: -2 - i * 2,
        speed: 0.08 + Math.random() * 0.04,
        radius: 3 + Math.random() * 0.5,
        rotation: 0,
      })),
    [count]
  );

  React.useEffect(() => {
    if (!meshRef.current) return;
    const matrix = new THREE.Matrix4();
    const scale = new THREE.Vector3();

    ringData.forEach((ring, i) => {
      scale.set(ring.radius / 3, ring.radius / 3, 1);
      matrix.makeScale(scale.x, scale.y, scale.z);
      matrix.setPosition(0, 0, ring.z);
      meshRef.current!.setMatrixAt(i, matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  }, [ringData]);

  useFrame(() => {
    if (!meshRef.current) return;
    const matrix = new THREE.Matrix4();
    const position = new THREE.Vector3();
    const quaternion = new THREE.Quaternion();
    const scale = new THREE.Vector3();

    ringData.forEach((ring, i) => {
      ring.z += ring.speed;
      if (ring.z > 5) ring.z = -30;
      ring.rotation += 0.001;

      position.set(0, 0, ring.z);
      quaternion.setFromEuler(new THREE.Euler(0, 0, ring.rotation));
      scale.set(ring.radius / 3, ring.radius / 3, 1);
      matrix.compose(position, quaternion, scale);
      meshRef.current!.setMatrixAt(i, matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;

    if (materialRef.current) {
      const avgDist = ringData.reduce((sum, r) => sum + Math.abs(r.z), 0) / count;
      materialRef.current.opacity = Math.max(0.2, 0.6 - avgDist / 60);
      materialRef.current.color.set(color);
    }
  });

  return (
    <instancedMesh ref={meshRef} args={[ringGeometry, undefined, count]}>
      <meshBasicMaterial ref={materialRef} color={color} transparent opacity={0.5} />
    </instancedMesh>
  );
}

function TunnelWalls({ color }: { color: string }) {
  const materialRef = React.useRef<THREE.ShaderMaterial>(null);

  const uniforms = React.useMemo(
    () => ({
      uTime: { value: 0 },
      uColor: { value: new THREE.Color(color) },
    }),
    []
  );

  useFrame((state) => {
    if (!materialRef.current) return;
    materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    materialRef.current.uniforms.uColor.value.set(color);
  });

  return (
    <mesh position={[0, 0, -15]}>
      <cylinderGeometry args={[4, 4, 40, 24, 12, true]} />
      <shaderMaterial
        ref={materialRef}
        uniforms={uniforms}
        vertexShader={`
          varying vec2 vUv;
          varying vec3 vPosition;
          void main() {
            vUv = uv;
            vPosition = position;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          uniform float uTime;
          uniform vec3 uColor;
          varying vec2 vUv;
          varying vec3 vPosition;
          void main() {
            vec2 grid = abs(fract(vec2(vUv.x * 20.0, vUv.y * 5.0 - uTime * 0.5) - 0.5) - 0.5);
            float line = min(grid.x, grid.y);
            line = 1.0 - smoothstep(0.0, 0.05, line);
            float fade = smoothstep(0.0, 0.3, vUv.y) * (1.0 - smoothstep(0.7, 1.0, vUv.y));
            float alpha = line * fade * 0.35;
            gl_FragColor = vec4(uColor, alpha);
          }
        `}
        transparent
        side={THREE.BackSide}
        depthWrite={false}
      />
    </mesh>
  );
}

function SpeedLines({ color, count = 50 }: { color: string; count?: number }) {
  const meshRef = React.useRef<THREE.InstancedMesh>(null);

  const linesData = React.useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        angle: (i / count) * Math.PI * 2,
        radius: 2 + Math.random() * 2,
        z: Math.random() * -30,
        length: 0.5 + Math.random() * 1.5,
        speed: 0.1 + Math.random() * 0.2,
      })),
    [count]
  );

  useFrame(() => {
    if (!meshRef.current) return;
    const matrix = new THREE.Matrix4();
    const position = new THREE.Vector3();
    const scale = new THREE.Vector3();
    const quaternion = new THREE.Quaternion();

    linesData.forEach((line, i) => {
      line.z += line.speed;
      if (line.z > 5) line.z = -30;
      position.set(Math.cos(line.angle) * line.radius, Math.sin(line.angle) * line.radius, line.z);
      scale.set(1, 1, line.length);
      matrix.compose(position, quaternion, scale);
      meshRef.current!.setMatrixAt(i, matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[speedLineGeometry, undefined, count]}>
      <meshBasicMaterial color={color} transparent opacity={0.55} />
    </instancedMesh>
  );
}

export function Tunnel({
  className,
  ringCount = 15,
  enableSpeedLines = true,
}: {
  className?: string;
  ringCount?: number;
  enableSpeedLines?: boolean;
}) {
  const color = useThemeColor();

  return (
    <div className={className}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        dpr={[1, 2]}
        style={{ background: "transparent", pointerEvents: "none" }}
      >
        <fog attach="fog" args={["#000", 5, 35]} />
        <TunnelWalls color={color} />
        <TunnelRings color={color} count={ringCount} />
        {enableSpeedLines && <SpeedLines color={color} count={50} />}
        <ambientLight intensity={0.1} />
      </Canvas>
    </div>
  );
}

