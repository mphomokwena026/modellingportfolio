export default function About() {
  const measurements = [
    { val: "5'6\"", label: 'Height' },
    { val: '33"', label: 'Bust' },
    { val: '27"', label: 'Waist' },
    { val: '34"', label: 'Hips' },
    { val: '40EU/70UK', label: 'Shoe' },
    { val: 'JHB', label: 'Based' },
  ];

  return (
    <section id="about">
      <div className="about-image-card reveal">
        <img
          src="https://i.imgur.com/3DXYTED.jpeg"
          alt="Mpho Mokwena editorial portrait"
        />
      </div>

      <div className="about-text-col">
        <p className="eyebrow reveal">About Mpho</p>

        <h2 className="about-heading reveal">
          Where <em>fashion</em> meets digital power
        </h2>

        <p className="about-body reveal">
          Mpho Mokwena is a Johannesburg-based model and creative professional
          who brings together editorial expression, confident movement and a
          thoughtful understanding of digital culture.
          <br />
          <br />
          Her portfolio reflects presence, softness, structure and ambition. A
          visual identity built for campaigns, editorials, runway work and
          creative collaborations.
        </p>

        <div className="measurements-grid reveal" aria-label="Model measurements">
          {measurements.map((m, i) => (
            <div className="measure-item" key={i}>
              <span className="measure-val">{m.val}</span>
              <span className="measure-label">{m.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
