import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function RandomPoints() {
    const pointsRef = useRef<THREE.Points>(null);

    useFrame((state) => {
        if (pointsRef.current) {
            const t = state.clock.getElapsedTime() * 0.1;
            pointsRef.current.rotation.x = Math.sin(t * 0.3) * 0.2;
            pointsRef.current.rotation.y = Math.sin(t * 0.2) * 0.2;
        }
    });

    function randomInSphere(numPoints, radius) {
        const pointsData = new Float32Array(numPoints * 3);
        for (let i = 0; i < numPoints; i++) {
            const r = radius * Math.cbrt(Math.random());
            const theta = Math.random() * 2 * Math.PI;
            const phi = Math.acos(2 * Math.random() - 1);
            const x = r * Math.sin(phi) * Math.cos(theta);
            const y = r * Math.sin(phi) * Math.sin(theta);
            const z = r * Math.cos(phi);
            pointsData[i * 3] = x;
            pointsData[i * 3 + 1] = y;
            pointsData[i * 3 + 2] = z;
        }
        return pointsData;
    }

    const sphere1 = randomInSphere(2000, 20);

    return (
        <Points
            ref={pointsRef}
            positions={sphere1}
            stride={3}
            frustumCulled={false}
        >
            <PointMaterial
                transparent
                color="#6D28D9"
                size={0.05}
                sizeAttenuation={true}
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </Points>
    );
}

const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-900">
            <Canvas
                camera={{ position: [0, 0, 20], fov: 60, near: 1, far: 100 }}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    pointerEvents: 'none',
                }}
            >
                <ambientLight intensity={0.1} />
                <pointLight position={[10, 10, 10]} intensity={0.5} />
                <pointLight position={[-10, -10, -10]} intensity={0.2} />
                <RandomPoints />
            </Canvas>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="relative z-10 text-center px-4"
            >
                <h1 className="text-6xl font-bold mb- bg-clip-text text-transparent bg-gradient-to-r from-violet-300 to-violet-500">
                    Página em Construção
                </h1>
                <p className="text-xl text-violet-200/80 mb-8">
                    Desculpe, mas a página que você está procurando ainda está em construção, então por favor, volte mais tarde.
                </p>
                <a
                    href="/"
                    className="inline-flex items-center gap-2 bg-[#6D28D9] text-white px-8 py-4 rounded-full font-medium hover:bg-violet-800 transition-colors shadow-lg shadow-violet-500/20"
                >
                    Voltar para a página inicial
                </a>
            </motion.div>
        </div>
    );
};

export default NotFound;