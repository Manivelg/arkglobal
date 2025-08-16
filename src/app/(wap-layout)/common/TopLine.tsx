"use client";
import React from "react";

type topLineProps = {
  topLineSize: string;
};

export default function TopLine({ topLineSize }: topLineProps) {
  return (
    <svg
      className={topLineSize}
      viewBox="0 0 448 280"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <rect id="path-1" x="0" y="0" width="448" height="280" />
      </defs>
      <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g>
          <mask id="mask-2" fill="white">
            <use href="#path-1" />
          </mask>
          <g opacity="0.303161621" mask="url(#mask-2)" stroke="#F4A100">
            <g transform="translate(-42, -659)">
              <circle cx="469.5" cy="469.5" r="469" />
              <circle cx="639.5" cy="489.5" r="469" />
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}
