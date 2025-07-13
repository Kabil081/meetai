"use client";

import React, { useEffect, useRef, useState } from "react";
import { createAvatar } from "@dicebear/core";
import * as avataaars from "@dicebear/avataaars";
import { gsap } from "gsap";

type AvatarProps = {
  seed: string;
  variant?: keyof typeof avataaars;
  size?: number;
};

export const GeneratedAvatar: React.FC<AvatarProps> = ({ seed, size = 64 }) => {
  const avatarRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const generateAvatarVariations = () => {
    const variations = [];
    const baseOptions = {
      seed,
      size,
      backgroundColor: [],
    };
    const expressions = ['happy', 'sad', 'surprised', 'angry', 'default'];
    
    for (let i = 0; i < 5; i++) {
      const avatar = createAvatar(avataaars, {
        ...baseOptions,
        seed: `${seed}-${i}`, 
      });
      variations.push(avatar.toString());
    }
    
    return variations;
  };

  const [avatarVariations] = useState(() => generateAvatarVariations());
  const [currentVariation, setCurrentVariation] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const container = containerRef.current;
      const avatar = avatarRef.current;
      if (!container || !avatar) return;
      gsap.set(container, {
        opacity: 0,
        scale: 0.5,
        rotation: -180
      });
      const orbs = container.querySelectorAll('.floating-orb');
      orbs.forEach((orb, i) => {
        gsap.set(orb, {
          x: Math.cos(i * 60) * 40,
          y: Math.sin(i * 60) * 40,
          scale: 0
        });
        gsap.to(orb, {
          rotation: 360,
          duration: 8 + i * 2,
          repeat: -1,
          ease: "none",
          transformOrigin: `${-Math.cos(i * 60) * 40}px ${-Math.sin(i * 60) * 40}px`
        });
        
        gsap.to(orb, {
          scale: 1,
          duration: 0.5,
          delay: i * 0.1,
          ease: "back.out(1.7)"
        });
      });
      const tl = gsap.timeline({
        onComplete: () => setIsLoaded(true)
      });

      tl.to(container, {
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 1,
        ease: "elastic.out(1, 0.5)"
      })
      .to(avatar, {
        rotateY: 360,
        duration: 0.8,
        ease: "power2.inOut"
      }, "-=0.5");

      gsap.to(container, {
        y: -5,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut"
      });


      gsap.to(avatar, {
        filter: "drop-shadow(0 0 10px rgba(59, 130, 246, 0.5))",
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut"
      });

      // Hover animations
      const handleMouseEnter = () => {
        gsap.to(container, {
          scale: 1.2,
          duration: 0.3,
          ease: "back.out(1.7)"
        });
        
        gsap.to(avatar, {
          rotation: 360,
          duration: 0.6,
          ease: "power2.inOut"
        });

        // Switch avatar variation on hover
        setCurrentVariation((prev) => (prev + 1) % avatarVariations.length);
      };

      const handleMouseLeave = () => {
        gsap.to(container, {
          scale: 1,
          duration: 0.3,
          ease: "power2.out"
        });
        
        gsap.to(avatar, {
          rotation: 0,
          duration: 0.6,
          ease: "power2.out"
        });
      };

      container.addEventListener('mouseenter', handleMouseEnter);
      container.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        container.removeEventListener('mouseenter', handleMouseEnter);
        container.removeEventListener('mouseleave', handleMouseLeave);
      };
    }, containerRef);

    return () => ctx.revert();
  }, [avatarVariations]);

  useEffect(() => {
    if (!isLoaded) return;
    
    const interval = setInterval(() => {
      setCurrentVariation((prev) => (prev + 1) % avatarVariations.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isLoaded, avatarVariations.length]);

  return (
    <div
      ref={containerRef}
      className="avatar-container relative"
      style={{
        width: size,
        height: size,
        display: 'inline-block',
        position: 'relative'
      }}
    >
      {/* Floating orbs */}
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="floating-orb absolute"
          style={{
            width: 4,
            height: 4,
            background: `hsl(${i * 60 + 200}, 70%, 60%)`,
            borderRadius: '50%',
            boxShadow: `0 0 10px hsl(${i * 60 + 200}, 70%, 60%)`,
            opacity: 0.8
          }}
        />
      ))}

      {/* Main avatar */}
      <div
        ref={avatarRef}
        className="avatar-main relative z-10"
        style={{
          width: size,
          height: size,
          borderRadius: '50%',
          overflow: 'hidden',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          padding: '2px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
          position: 'relative'
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            overflow: 'hidden',
            background: 'white',
            position: 'relative'
          }}
          dangerouslySetInnerHTML={{ __html: avatarVariations[currentVariation] }}
        />
        
        {/* Animated border */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: 'conic-gradient(from 0deg, #3b82f6, #8b5cf6, #f59e0b, #ef4444, #3b82f6)',
            animation: 'spin 4s linear infinite',
            mask: 'radial-gradient(circle at center, transparent 80%, black 82%)',
            WebkitMask: 'radial-gradient(circle at center, transparent 80%, black 82%)'
          }}
        />
      </div>

      {/* Particle effects */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => {
          const duration = 2 + Math.random() * 2;
          const delay = Math.random() * 2;
          const direction = Math.random() > 0.5 ? 'alternate' : 'alternate-reverse';
          
          return (
            <div
              key={i}
              className="absolute w-1 h-1 bg-blue-400 rounded-full opacity-60"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationName: 'float',
                animationDuration: `${duration}s`,
                animationTimingFunction: 'ease-in-out',
                animationIterationCount: 'infinite',
                animationDelay: `${delay}s`,
                animationDirection: direction
              }}
            />
          );
        })}
      </div>

      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) scale(1); opacity: 0.6; }
          50% { transform: translateY(-10px) scale(1.2); opacity: 1; }
        }
        
        .avatar-container:hover .floating-orb {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};