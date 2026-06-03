import React from 'react'

function SlideRenderer({ slide }) {
  if (!slide) return null

  switch (slide.layout) {
    case 'TitleSlide':
      return <TitleSlide data={slide} />
    case 'StatementSlide':
      return <StatementSlide data={slide} />
    case 'CardGrid':
      return <CardGrid data={slide} />
    case 'KPITower':
      return <KPITower data={slide} />
    case 'ComparisonSlide':
      return <ComparisonSlide data={slide} />
    case 'HBarChart':
      return <HBarChart data={slide} />
    case 'ChapterDivider':
      return <ChapterDivider data={slide} />
    case 'ImageHero':
      return <ImageHero data={slide} />
    case 'ClosingSlide':
      return <ClosingSlide data={slide} />
    default:
      return <StatementSlide data={slide} />
  }
}

function TitleSlide({ data }) {
  return (
    <section className="slide slide-title">
      <div className="accent-bar" />
      <h1 className="hero-title">{data.title}</h1>
      {data.subtitle && <p className="subtitle">{data.subtitle}</p>}
    </section>
  )
}

function StatementSlide({ data }) {
  return (
    <section className="slide slide-statement">
      <h2 className="h-statement">{data.statement || data.title}</h2>
    </section>
  )
}

function CardGrid({ data }) {
  return (
    <section className="slide slide-cards">
      <div className="slide-content">
        <h2 className="title">{data.title}</h2>
        <div className="card-grid">
          {data.cards?.map((card, i) => (
            <div key={i} className="card-fill">
              <h3>{card.title}</h3>
              <p>{card.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function KPITower({ data }) {
  return (
    <section className="slide slide-kpi">
      <div className="slide-content">
        <h2 className="title">{data.title}</h2>
        <div className="kpi-row">
          {data.kpis?.map((kpi, i) => (
            <div key={i} className="kpi-item">
              <span className="kpi-value">{kpi.value}</span>
              <span className="kpi-label">{kpi.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ComparisonSlide({ data }) {
  return (
    <section className="slide slide-compare">
      <div className="slide-content">
        <h2 className="title">{data.title}</h2>
        <div className="compare-grid">
          <div className="compare-col">
            <h3>{data.leftTitle}</h3>
            {data.leftItems?.map((item, i) => <p key={i}>{item}</p>)}
          </div>
          <div className="compare-divider" />
          <div className="compare-col">
            <h3>{data.rightTitle}</h3>
            {data.rightItems?.map((item, i) => <p key={i}>{item}</p>)}
          </div>
        </div>
      </div>
    </section>
  )
}

function HBarChart({ data }) {
  return (
    <section className="slide slide-chart">
      <div className="slide-content">
        <h2 className="title">{data.title}</h2>
        <div className="hbar-chart">
          {data.bars?.map((bar, i) => (
            <div key={i} className="hbar-row">
              <span className="hbar-label">{bar.label}</span>
              <div className="hbar-track">
                <div className="hbar-fill" style={{ width: bar.pct + '%' }} />
              </div>
              <span className="hbar-value">{bar.value}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ChapterDivider({ data }) {
  return (
    <section className="slide slide-chapter">
      <div className="chapter-accent-block" />
      <span className="chapter-num">{data.chapterNum || ''}</span>
      <h2 className="chapter-title">{data.title}</h2>
    </section>
  )
}

function ImageHero({ data }) {
  return (
    <section className="slide slide-hero">
      <div className="slide-content">
        <div className="hero-frame">
          <img src={data.image} alt={data.title || ''} />
        </div>
        {data.caption && <p className="hero-caption">{data.caption}</p>}
      </div>
    </section>
  )
}

function ClosingSlide({ data }) {
  return (
    <section className="slide slide-closing">
      <div className="slide-content">
        <h2 className="title">{data.title}</h2>
        <ol className="closing-list">
          {data.points?.map((p, i) => <li key={i}>{p}</li>)}
        </ol>
      </div>
    </section>
  )
}

export default SlideRenderer
