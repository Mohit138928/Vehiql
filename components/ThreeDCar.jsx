"use client";
import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const ThreeDCarGLTF = ({ modelPath = "/models/sportscar/scene.gltf" }) => {
  const mountRef = useRef(null);

  useEffect(() => {
    let renderer, scene, camera, model, frameId, controls;

    // Scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f4ff);

    // Camera
    camera = new THREE.PerspectiveCamera(
      60,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 1, 6);

    // Renderer
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(
      mountRef.current.clientWidth,
      mountRef.current.clientHeight
    );
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setClearColor(0xf0f4ff, 1);
    mountRef.current.appendChild(renderer.domElement);

    // Controls
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = true;
    controls.minDistance = 0.5;
    controls.maxDistance = 10;
    controls.target.set(0, 0.5, 0);

    // Lighting
    // Stronger ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 2.5);
    scene.add(ambientLight);

    // Brighter directional light for highlights
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
    directionalLight.position.set(5, 10, 7.5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    // Add a point light for extra shine
    const pointLight = new THREE.PointLight(0xffffff, 1.2, 100);
    pointLight.position.set(0, 5, 5);
    scene.add(pointLight);

    // Load GLTF Model
    const loader = new GLTFLoader();
    loader.load(
      modelPath,
      (gltf) => {
        model = gltf.scene;
        model.traverse((child) => {
          if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
            // Make sure the material is physically based for reflections
            if (child.material && "metalness" in child.material) {
                
              child.material.metalness = 0.7;
              child.material.roughness = 0.15;
              child.material.envMapIntensity = 1.2;
            }
          }
        });
        model.scale.set(1.5, 1.5, 1.5); // Scale the model for better visibility
        model.position.set(0, 0, 0);
        scene.add(model);
      },
      undefined,
      (error) => {
        // eslint-disable-next-line no-console
        console.error("Error loading GLTF model:", error);
      }
    );

    // Animation loop
    const animate = () => {
      controls.update();
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };
    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(frameId);
      renderer.dispose();
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      controls.dispose();
    };
  }, [modelPath]);

  return (
    <div
      ref={mountRef}
      style={{
        width: "100%",
        height: "350px",
        borderRadius: "1.5rem",
        overflow: "hidden",
        background: "#f0f4ff",
      }}
    />
  );
};

export default ThreeDCarGLTF;