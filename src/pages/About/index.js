import React from 'react';
import nikImg from '../../assets/nicole.JPG'

function About() {
  return (
    <section className="my-5">
      <h1 id="about">Hey I'm Nicole!</h1>
      {/* <img src={coverImage} className="my-2" style={{ width: "100%" }} alt="cover" /> */}
      <div className="my-2">
        <img src={nikImg} width={500} height={400} />
      </div>
      <p>
        lorem
      </p>
    </section>
  );
}

export default About;
