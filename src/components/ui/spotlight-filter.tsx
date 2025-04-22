
import React from 'react';

const SpotlightFilter = () => {
  return (
    <svg className="sr-only">
      <filter id="spotlight">
        <feGaussianBlur in="SourceAlpha" stdDeviation="3" result="blur" />
        <feSpecularLighting
          result="lighting"
          in="blur"
          surfaceScale="5"
          specularConstant="0.5"
          specularExponent="120"
          lightingColor="hsl(var(--primary))"
        >
          <fePointLight x="50" y="50" z="300" />
        </feSpecularLighting>
        <feComposite in="lighting" in2="SourceAlpha" operator="in" result="composite" />
        <feComposite
          in="composite"
          in2="SourceAlpha"
          operator="arithmetic"
          k1="0"
          k2="1"
          k3="1"
          k4="0"
          result="litPaint"
        />
      </filter>
      
      <filter id="ambience">
        <feGaussianBlur in="SourceAlpha" stdDeviation="3" result="blur" />
        <feSpecularLighting
          result="lighting"
          in="blur"
          surfaceScale="5"
          specularConstant="0.5"
          specularExponent="120"
          lightingColor="hsl(var(--primary))"
        >
          <fePointLight x="120" y="-154" z="160" />
        </feSpecularLighting>
        <feComposite in="lighting" in2="SourceAlpha" operator="in" result="composite" />
        <feComposite
          in="composite"
          in2="SourceAlpha"
          operator="arithmetic"
          k1="0"
          k2="1"
          k3="1"
          k4="0"
          result="litPaint"
        />
      </filter>
    </svg>
  );
};

export default SpotlightFilter;
