// src/components/About.js
import React from 'react';
import './About.scss';
import Megpack2XL from "../../assets/images/MegapackXL.jpeg";
import Megapack2 from "../../assets/images/Megapack2.jpg";
import Megapack from "../../assets/images/Megapack.jpeg";
import Powerpack from "../../assets/images/pp.jpg";
import Transformer from "../../assets/images/Transformer.jpg";

const About = () => {
  return (
    <div class="testimonials">
    <div class="card card--bg-brown">
      <header class="card__header">
        <img src={Megpack2XL} class="card__img" alt="" />
        <div>
          <h2>Megpack2XL</h2>
        </div>
      </header>
      <p class="card__lead">
      High-capacity grid-scale energy storage solution for large-scale industrial applications.      </p>
      <p class="card__quote">
      The Megapack 2XL is a large-scale lithium-ion battery system designed for grid-scale energy storage. It offers significant energy capacity and is suitable for large industrial applications and utility-scale projects. Its size and capacity make it ideal for storing and distributing renewable energy, helping to stabilize the grid and manage peak demand.

      </p>
    </div>

    <div class="card card--bg-gray-blue">
      <header class="card__header">
        <img src={Megapack2} class="card__img" alt="" />
        <div>
          <h2>Megapack2</h2>
        </div>
      </header>
      <p class="card__lead">
      Versatile energy storage system with substantial capacity for commercial and industrial projects.      </p>
      <p class="card__quote">
      The Megapack 2 is a slightly smaller version of the Megapack 2XL, offering substantial energy storage capacity in a more compact form. It is suitable for applications where high energy density and reliability are essential, such as commercial and industrial energy storage projects. The Megapack 2 provides flexibility and scalability for integrating renewable energy sources into the grid.
      </p>
    </div>

    <div class="card">
      <header class="card__header">
        <img src={Megapack} class="card__img" alt="" />
        <div>
          <h2>Megapack</h2>
        </div>
      </header>
      <p class="card__lead">AReliable energy storage solution for diverse industrial and commercial applications.</p>
      <p class="card__quote">
      The original Megapack is a robust energy storage solution designed to deliver large-scale power capacity with efficient performance. It has been widely used in various energy storage projects, including renewable energy integration, grid stabilization, and backup power applications. The Megapack offers a balance between cost-effectiveness and reliability, making it suitable for diverse industrial and commercial energy needs.
      </p>
    </div>

    <div class="card card--bg-black-blue">
      <header class="card__header">
        <img src={Transformer} class="card__img" alt="" />
        <div>
          <h2>Transformer</h2>
        </div>
      </header>
      <p class="card__lead">
      Essential component for voltage regulation and power distribution in energy systems.
      </p>
      <p class="card__quote">
      The Transformer is a critical component in energy distribution systems, used for voltage regulation and power conversion. Unlike batteries, which store energy, Transformers facilitate the transmission and distribution of electrical power, adjusting voltage levels to meet operational requirements. They play a crucial role in optimizing energy efficiency and maintaining grid stability.
      </p>
    </div>

    <div class="card">
      <header class="card__header">
        <img src={Powerpack} class="card__img" alt="" />
        <div>
          <h2>Powerpack</h2>
        </div>
      </header>
      <p class="card__lead">
      Modular battery system enabling scalable energy storage solutions for various applications.
      </p>
      <p class="card__quote">
      The Powerpack is a modular battery system designed for scalability and flexibility in energy storage solutions. It is used in both small-scale and medium-scale applications, such as microgrids, commercial buildings, and industrial facilities. The Powerpack offers reliability and efficiency, contributing to energy cost savings and sustainability goals by integrating renewable energy sources and optimizing power usage.
      </p>
    </div>
  </div>
  );
};

export default About;
