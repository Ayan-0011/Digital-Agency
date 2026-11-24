export default function PageIntro({ eyebrow, title, italic, description, number = '01 — 04' }) {
  return (
    <section className="page-intro">
      <div className="page-intro-top"><span className="eyebrow">{eyebrow}</span><span>{number}</span></div>
      <h1>
        <span className="pi-line"><span>{title}</span></span>
        <span className="pi-line"><em>{italic}</em></span>
      </h1>
      {description && <p>{description}</p>}
    </section>
  );
}
