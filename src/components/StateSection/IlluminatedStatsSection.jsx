import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

const MovingLights = () => {
    const { viewport } = useThree();
    const group = useRef();
    const light1 = useRef();
    const light2 = useRef();

    useFrame(({ clock }) => {
        const t = clock.getElapsedTime();

        light1.current.position.x = Math.sin(t * 0.5) * viewport.width * 0.4;
        light1.current.position.y = Math.cos(t * 0.5) * viewport.height * 0.4;

        light2.current.position.x =
            Math.sin(t * 0.5 + Math.PI) * viewport.width * 0.4;
        light2.current.position.y =
            Math.cos(t * 0.5 + Math.PI) * viewport.height * 0.4;
    });

    return (
        <group ref={group}>
            <pointLight
                ref={light1}
                color="#a855f7"
                intensity={1.5}
                distance={15}
            />
            <pointLight
                ref={light2}
                color="#6d28d9"
                intensity={1.5}
                distance={15}
            />
            <mesh>
                <planeGeometry
                    args={[viewport.width * 2, viewport.height * 2]}
                />
                <meshBasicMaterial color="#190f2a" />
            </mesh>
        </group>
    );
};

const StatsCounter = ({ end, duration = 2000, label }) => {
    const [count, setCount] = React.useState(0);
    const counterRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    let start = 0;
                    const step = end / (duration / 16);
                    const timer = setInterval(() => {
                        start += step;
                        if (start > end) {
                            setCount(end);
                            clearInterval(timer);
                        } else {
                            setCount(Math.floor(start));
                        }
                    }, 16);
                }
            },
            { threshold: 0.5 }
        );

        if (counterRef.current) {
            observer.observe(counterRef.current);
        }

        return () => observer.disconnect();
    }, [end, duration]);

    return (
        <div ref={counterRef} className="text-center relative group">
            <div className="absolute inset-0 bg-violet-600/20 rounded-2xl blur-xl group-hover:bg-violet-500/30 transition-colors duration-300" />
            <div className="relative">
                <div className="text-5xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-300">
                    {count}%
                </div>
                <div className="text-violet-100 text-lg font-medium">
                    {label}
                </div>
            </div>
        </div>
    );
};

const IlluminatedStatsSection = () => {
    return (
        <section className="py-32 relative overflow-hidden bg-gray-300">
            <div className="absolute inset-0" style={{ height: "100%" }}>
                <Canvas
                    camera={{ position: [0, 0, 5], fov: 75 }}
                    style={{ background: "#0f172a" }}
                >
                    <MovingLights />
                    <ambientLight intensity={0.1} />
                </Canvas>
            </div>

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.15)_0%,transparent_60%)]" />

            <div className="max-w-6xl mx-auto px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-violet-200 to-violet-400">
                        Números que Impressionam
                    </h2>
                    <p className="text-xl text-violet-200/80">
                        Resultados que comprovam nossa excelência
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {[
                        { value: 95, label: "Satisfação dos alunos" },
                        { value: 98, label: "Tutores certificados" },
                        { value: 87, label: "Melhoria nas notas" },
                        { value: 92, label: "Recomendação" },
                    ].map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: index * 0.2 }}
                            className="bg-gray-900/50 backdrop-blur-md p-8 rounded-2xl border border-violet-500/20 hover:border-violet-500/40 transition-colors duration-300 relative overflow-hidden group"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-violet-900/30 to-violet-800/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <StatsCounter end={stat.value} label={stat.label} />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default IlluminatedStatsSection;
