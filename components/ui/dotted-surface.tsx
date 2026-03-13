'use client';

import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

type DottedSurfaceProps = Omit<React.ComponentProps<'div'>, 'ref'>;

export function DottedSurface({ className, ...props }: DottedSurfaceProps) {
  const { resolvedTheme } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    animationId: number;
  } | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || 420;

    const SEPARATION = 34;
    const AMOUNTX = Math.max(48, Math.ceil(width / 28));
    const AMOUNTY = Math.max(28, Math.ceil(height / 12));

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(
      resolvedTheme === 'dark' ? 0x08122e : 0x09153b,
      500,
      2400,
    );

    const camera = new THREE.PerspectiveCamera(52, width / height, 1, 10000);
    camera.position.set(0, 80, 420);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);

    container.appendChild(renderer.domElement);

    const geometry = new THREE.BufferGeometry();
    const positions: number[] = [];
    const colors: number[] = [];

    const isDark = resolvedTheme === 'dark';

    for (let ix = 0; ix < AMOUNTX; ix++) {
      for (let iy = 0; iy < AMOUNTY; iy++) {
        const x = ix * SEPARATION - (AMOUNTX * SEPARATION) / 2;
        const y = 0;
        const z = iy * SEPARATION - (AMOUNTY * SEPARATION) / 2;

        positions.push(x, y, z);
        if (isDark) {
          colors.push(188 / 255, 204 / 255, 120 / 255);
        } else {
          colors.push(132 / 255, 147 / 255, 74 / 255);
        }
      }
    }

    geometry.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(positions, 3),
    );
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 4.5,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      sizeAttenuation: true,
    });

    const points = new THREE.Points(geometry, material);
    points.rotation.x = -1.12;
    points.position.y = -110;
    points.position.z = 80;
    scene.add(points);

    let count = 0;
    let animationId = 0;

    const animate = () => {
      animationId = requestAnimationFrame(animate);

      const positionAttribute = geometry.attributes.position;
      const pointPositions = positionAttribute.array as Float32Array;

      let i = 0;
      for (let ix = 0; ix < AMOUNTX; ix++) {
        for (let iy = 0; iy < AMOUNTY; iy++) {
          const index = i * 3;
          pointPositions[index + 1] =
            Math.sin((ix + count) * 0.22) * 18 +
            Math.sin((iy + count) * 0.32) * 18;
          i++;
        }
      }

      positionAttribute.needsUpdate = true;
      renderer.render(scene, camera);
      count += 0.035;
    };

    const handleResize = () => {
      if (!containerRef.current) {
        return;
      }

      const nextWidth = containerRef.current.clientWidth || window.innerWidth;
      const nextHeight = containerRef.current.clientHeight || 420;
      camera.aspect = nextWidth / nextHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(nextWidth, nextHeight);
    };

    window.addEventListener('resize', handleResize);
    animate();

    sceneRef.current = {
      scene,
      camera,
      renderer,
      animationId,
    };

    return () => {
      window.removeEventListener('resize', handleResize);

      if (sceneRef.current) {
        cancelAnimationFrame(sceneRef.current.animationId);
      }

      geometry.dispose();
      material.dispose();
      renderer.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [resolvedTheme]);

  return (
    <div
      ref={containerRef}
      className={cn('pointer-events-none absolute inset-0 z-0 overflow-hidden', className)}
      {...props}
    />
  );
}
