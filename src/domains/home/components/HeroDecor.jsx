import React from 'react';

const HeroDecor = () => {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      <span className="hero-bubble hero-bubble--one float-slow" />
      <span className="hero-bubble hero-bubble--two float-slower" />
      <span className="hero-bubble hero-bubble--three float-delayed" />
    </div>
  );
};

export default HeroDecor;

