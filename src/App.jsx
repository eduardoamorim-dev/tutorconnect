import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll } from "framer-motion";
import Lenis from "@studio-freight/lenis";
import {
  CheckCircleIcon,
  LightbulbIcon,
  ClockIcon,
  UsersIcon,
  ArrowRightIcon,
} from "lucide-react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

function randomInSphere(numPoints, radius) {
  const points = new Float32Array(numPoints * 3);
  for (let i = 0; i < numPoints; i++) {
    const r = radius * Math.cbrt(Math.random());
    const theta = Math.random() * 2 * Math.PI;
    const phi = Math.acos(2 * Math.random() - 1);
    const x = r * Math.sin(phi) * Math.cos(theta);
    const y = r * Math.sin(phi) * Math.sin(theta);
    const z = r * Math.cos(phi);
    points[i * 3] = x;
    points[i * 3 + 1] = y;
    points[i * 3 + 2] = z;
  }
  return points;
}

function LightPoints() {
  const points = useRef();
  const sphere1 = randomInSphere(2000, 20);

  useFrame((state) => {
    const t = state.clock.getElapsedTime() * 0.1;
    points.current.rotation.x = Math.sin(t * 0.3) * 0.2;
    points.current.rotation.y = Math.sin(t * 0.2) * 0.2;
  });

  return (
    <Points ref={points} positions={sphere1} stride={3} frustumCulled={false}>
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

function AnimatedBackground() {
  return (
    <Canvas
      camera={{ position: [0, 0, 20], fov: 60, near: 1, far: 100 }}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
    >
      <ambientLight intensity={0.1} />
      <pointLight position={[10, 10, 10]} intensity={0.5} />
      <pointLight position={[-10, -10, -10]} intensity={0.2} />
      <LightPoints />
    </Canvas>
  );
}

const StatsCounter = ({ end, duration = 2000, label }) => {
  const [count, setCount] = useState(0);
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
    <div ref={counterRef} className="text-center">
      <div className="text-4xl font-bold text-violet-300 mb-2">{count}%</div>
      <div className="text-violet-100">{label}</div>
    </div>
  );
};

function Home() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      smoothWheel: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div ref={containerRef} className="flex flex-col min-h-screen bg-gray-900">
      <motion.div className="flex-1" initial="hidden" animate="visible">
        {/* Hero Section */}
        <section className="relative h-screen flex flex-col justify-center items-center overflow-hidden">
          <AnimatedBackground />
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-violet-900/30 to-gray-900 z-0" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(109,40,217,0.1)_0%,transparent_65%)]" />
          <div className="relative z-10 text-center px-4">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-violet-300 to-violet-500"
            >
              Transforme seu aprendizado com nosso Sistema de Tutoria
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl mb-8 text-violet-100 max-w-2xl mx-auto"
            >
              Conecte-se com tutores especializados e aproveite a conveniência
              de aulas personalizadas.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex gap-4 justify-center"
            >
              <a
                href="/tutor/lista"
                className="bg-[#6D28D9] text-white px-8 py-4 rounded-full font-medium hover:bg-violet-800 transition-colors flex items-center gap-2 shadow-lg shadow-violet-500/20"
              >
                Encontrar Tutor
                <ArrowRightIcon size={20} />
              </a>
            </motion.div>
          </div>
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
            <ArrowRightIcon size={24} className="rotate-90 text-violet-400" />
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4 bg-gradient-to-b from-gray-900 to-violet-900/20">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold mb-4 text-violet-100">
                Principais Benefícios
              </h2>
              <p className="text-xl text-violet-200/80 max-w-2xl mx-auto">
                Nossa plataforma oferece uma experiência completa de aprendizado
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: (
                    <CheckCircleIcon className="text-green-400" size={40} />
                  ),
                  title: "Processo Estruturado",
                  description: "Fluxo claro desde o cadastro até a avaliação",
                },
                {
                  icon: <UsersIcon className="text-violet-400" size={40} />,
                  title: "Ampla Rede",
                  description: "Acesso a tutores qualificados e experientes",
                },
                {
                  icon: <LightbulbIcon className="text-yellow-400" size={40} />,
                  title: "Tutores Selecionados",
                  description: "Profissionais avaliados e certificados",
                },
                {
                  icon: <ClockIcon className="text-blue-400" size={40} />,
                  title: "Flexibilidade",
                  description: "Aulas presenciais ou virtuais",
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-violet-500/10"
                >
                  <div className="mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-2 text-violet-100">
                    {feature.title}
                  </h3>
                  <p className="text-violet-200/70">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 px-4 bg-[#6D28D9] relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.15)_0%,transparent_60%)]" />
          <div className="max-w-6xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold mb-4 text-white">
                Números que Impressionam
              </h2>
              <p className="text-xl text-violet-200">
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
                  className="bg-violet-800/30 backdrop-blur-sm p-6 rounded-2xl border border-violet-500/20"
                >
                  <StatsCounter end={stat.value} label={stat.label} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-gradient-to-b from-violet-900/20 to-gray-900 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(109,40,217,0.1)_0%,transparent_60%)]" />
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl font-bold mb-6 text-violet-100">
                Comece sua jornada de aprendizado hoje
              </h2>
              <p className="text-xl text-violet-200/80 mb-8">
                Junte-se a milhares de estudantes que já transformaram sua
                experiência acadêmica
              </p>
              <a
                href="/sign-up"
                className="inline-flex items-center gap-2 bg-[#6D28D9] text-white px-8 py-4 rounded-full font-medium hover:bg-violet-800 transition-colors shadow-lg shadow-violet-500/20"
              >
                Começar agora
                <ArrowRightIcon size={20} />
              </a>
            </motion.div>
          </div>
        </section>
      </motion.div>
    </div>
  );
}

export default Home;
