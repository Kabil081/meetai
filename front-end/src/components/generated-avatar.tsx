import React, { useState, useEffect } from "react";
import { createAvatar } from "@dicebear/core";
import * as avataaars from "@dicebear/avataaars";

type AvatarProps = {
  seed: string;
  size?: number;
};

export const GeneratedAvatar: React.FC<AvatarProps> = ({ seed, size = 64 }) => {
  const [avatarSvg, setAvatarSvg] = useState<string>("");

  useEffect(() => {
    const avatar = createAvatar(avataaars, {
      seed,
      size,
      backgroundColor: ["b6e3f4", "c0aede", "d1d4f9", "ffd5dc", "ffdfbf"],
    });
    
    setAvatarSvg(avatar.toString());
  }, [seed, size]);

  return (
    <div
      className="inline-block rounded-full overflow-hidden bg-gradient-to-br from-blue-400 to-purple-500 p-0.5"
      style={{
        width: size,
        height: size,
      }}
    >
      <div
        className="w-full h-full rounded-full overflow-hidden bg-white"
        dangerouslySetInnerHTML={{ __html: avatarSvg }}
      />
    </div>
  );
};

// Demo component
export default function AvatarDemo() {
  const [seed, setSeed] = useState("example-user");
  const [size, setSize] = useState(64);

  return (
    <div className="p-8 max-w-md mx-auto bg-gray-50 rounded-lg">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Simple Avatar Icon</h2>
        <GeneratedAvatar seed={seed} size={size} />
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Seed (changes avatar appearance):
          </label>
          <input
            type="text"
            value={seed}
            onChange={(e) => setSeed(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter seed text..."
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Size: {size}px
          </label>
          <input
            type="range"
            min="32"
            max="128"
            value={size}
            onChange={(e) => setSize(parseInt(e.target.value))}
            className="w-full"
          />
        </div>
        
        <div className="flex gap-2 flex-wrap">
          {["alice", "bob", "charlie", "diana", "eve"].map((name) => (
            <button
              key={name}
              onClick={() => setSeed(name)}
              className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors capitalize"
            >
              {name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}