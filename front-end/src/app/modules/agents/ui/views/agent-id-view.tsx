"use client";

import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { useTRPC } from "@/trpc/client"
import { useSuspenseQuery } from "@tanstack/react-query";
import { AgentIdViewHeader } from "./agent-id-view-header"
import { GeneratedAvatar } from "@/components/generated-avatar"
import { Badge } from "@/components/ui/badge";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface Props {
  agentId: string,
}

export const AgentIdView = ({ agentId }: Props) => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(
    trpc.agents.getOne.queryOptions({ id: agentId })
  );

  const agent = data[0];
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const avatarRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const badgeRef = useRef<HTMLParagraphElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set([cardRef.current, avatarRef.current, titleRef.current, badgeRef.current], {
        opacity: 0,
        y: 50
      });

      const particles = particlesRef.current?.children;
      if (particles) {
        Array.from(particles).forEach((particle, i) => {
          gsap.set(particle, {
            x: Math.random() * 400,
            y: Math.random() * 300,
            scale: Math.random() * 0.5 + 0.3,
            opacity: 0.1
          });
          
          gsap.to(particle, {
            x: Math.random() * 400,
            y: Math.random() * 300,
            duration: Math.random() * 8 + 4,
            repeat: -1,
            yoyo: true,
            ease: "none"
          });
        });
      }

      // Main animation sequence
      const tl = gsap.timeline();
      
      tl.to(cardRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "back.out(1.7)"
      })
      .to(avatarRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "elastic.out(1, 0.5)"
      }, "-=0.4")
      .to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out"
      }, "-=0.3")
      .to(badgeRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: "power2.out"
      }, "-=0.2");

      // Hover animations
      const card = cardRef.current;
      if (card) {
        const handleMouseEnter = () => {
          gsap.to(card, {
            scale: 1.05,
            rotateY: 5,
            rotateX: 2,
            duration: 0.3,
            ease: "power2.out"
          });
          gsap.to(avatarRef.current, {
            scale: 1.1,
            rotation: 360,
            duration: 0.5,
            ease: "back.out(1.7)"
          });
        };

        const handleMouseLeave = () => {
          gsap.to(card, {
            scale: 1,
            rotateY: 0,
            rotateX: 0,
            duration: 0.3,
            ease: "power2.out"
          });
          gsap.to(avatarRef.current, {
            scale: 1,
            rotation: 0,
            duration: 0.5,
            ease: "power2.out"
          });
        };

        card.addEventListener('mouseenter', handleMouseEnter);
        card.addEventListener('mouseleave', handleMouseLeave);

        return () => {
          card.removeEventListener('mouseenter', handleMouseEnter);
          card.removeEventListener('mouseleave', handleMouseLeave);
        };
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="flex-1 py-6 px-4 md:px-12 flex flex-col gap-y-8 relative overflow-hidden">
      {/* Floating particles background */}
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-20"
          />
        ))}
      </div>

      <AgentIdViewHeader
        agentId={agentId}
        agentName={agent?.name}
        onEdit={() => {}}
        onRemove={() => {}}
      />

      <div 
        ref={cardRef}
        className="relative bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800 rounded-3xl p-8 shadow-2xl flex flex-col md:flex-row items-center gap-8 overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #1e1b4b 0%, #3730a3 25%, #1e293b 50%, #0f172a 100%)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.1)'
        }}
      >
        {/* Animated background elements */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 animate-pulse"></div>
        <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-cyan-400/20 to-blue-600/20 rounded-full blur-xl"></div>
        <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-br from-purple-400/20 to-pink-600/20 rounded-full blur-xl"></div>

        {/* Avatar Section */}
        <div ref={avatarRef} className="flex-shrink-0 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full blur-lg opacity-30 animate-pulse"></div>
          <div className="relative p-2 bg-gradient-to-r from-slate-800 to-slate-700 rounded-full">
            <GeneratedAvatar seed={agent?.name ?? agentId} size={96} />
          </div>
        </div>

        {/* Content Section */}
        <div className="flex flex-col gap-y-4 text-center md:text-left relative z-10">
          <h1 
            ref={titleRef}
            className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-white via-cyan-100 to-blue-200 bg-clip-text text-transparent"
          >
            {agent?.name ?? "Unnamed Agent"}
          </h1>
          
          <p ref={badgeRef} className="text-sm text-slate-300 flex items-center gap-2 justify-center md:justify-start">
            <span className="text-slate-400">Agent ID:</span>
            <Badge 
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white border-none shadow-lg"
            >
              {agentId}
            </Badge>
          </p>

          {/* Status indicator */}
          <div className="flex items-center gap-2 justify-center md:justify-start">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
            <span className="text-sm text-slate-300">Active</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export const AgentIdViewLoading = () => (
  <LoadingState title="Loading Agent" />
);

export const AgentIdViewError = () => (
  <ErrorState title="Error Loading AgentPage" />
);