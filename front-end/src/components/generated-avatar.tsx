"use client";

import React from "react";
import { createAvatar } from "@dicebear/core";
import * as bigEars from "@dicebear/big-ears";
/* Remove the incorrect import:
*/
type AvatarProps = {
  seed: string;
  variant?: keyof typeof bigEars; // Optional variant handling if your collection supports it
  size?: number; // pixel size
};

export const GeneratedAvatar: React.FC<AvatarProps> = ({ seed, size = 64 }) => {
  const avatar = createAvatar(bigEars, {
    seed,
    size: size,
  });

  const svg = avatar.toString();

  return (
    <div
      className="avatar"
      style={{ width: size, height: size }}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
};
