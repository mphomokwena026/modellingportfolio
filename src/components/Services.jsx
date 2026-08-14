export default function Services() {
  const services = [
    {
      title: 'Editorial',
      desc: 'Fashion stories, creative portraits and styled visual concepts.',
    },
    {
      title: 'Campaigns',
      desc: 'Brand visuals, product-led shoots and digital campaign work.',
    },
    {
      title: 'Runway',
      desc: 'Fashion shows, showcases and live presentation work.',
    },
    {
      title: 'Creative Direction',
      desc: 'Concept development, styling support and digital presentation.',
    },
  ];

  return (
    <section id="services">
      <div className="section-inner">
        <p className="eyebrow reveal">Work with me</p>
        <h2 className="section-title reveal">
          Available <em>for</em>
        </h2>

        <div className="service-grid">
          {services.map((s, i) => (
            <article className="service-card reveal" key={i}>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
