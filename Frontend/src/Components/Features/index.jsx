import React from "react";
import "./_features.scss";
import featuresData from "../../Data/features.json"; 

function Features() {
  return (
    <section className="features">
      <h2 className="sr-only">Features</h2>
      {featuresData.map((feature) => (
        <div key={feature.id} className="feature-item">
          <img src={feature.img} alt={`${feature.title} Icon`} className="feature-icon" />
          <h3 className="feature-item-title">{feature.title}</h3>
          <p>{feature.text}</p>
        </div>
      ))}
    </section>
  );
}

export default Features;