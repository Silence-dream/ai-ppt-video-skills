import React from 'react'

/**
 * 根据 slide.layout 渲染对应的幻灯片组件
 */
function SlideRenderer({ slide }) {
  if (!slide) return null

  switch (slide.layout) {
    case 'TitleSlide':
      return <TitleSlide data={slide} />
    case 'ContentBlock':
      return <ContentBlock data={slide} />
    case 'PullQuote':
      return <PullQuote data={slide} />
    case 'ImageHero':
      return <ImageHero data={slide} />
    case 'SplitView':
      return <SplitView data={slide} />
    case 'LedgerList':
      return <LedgerList data={slide} />
    case 'ChapterDivider':
      return <ChapterDivider data={slide} />
    case 'DataShowcase':
      return <DataShowcase data={slide} />
    case 'ClosingSlide':
      return <ClosingSlide data={slide} />
    default:
      return <ContentBlock data={slide} />
  }
}

/* ---- Layout Components ---- */

function TitleSlide({ data }) {
  return (
    <section className="slide slide-title">
      <div className="slide-bg" />
      <div className="slide-content">
        <h1 className="display">{data.title}</h1>
        {data.subtitle && <p className="subtitle">{data.subtitle}</p>}
      </div>
    </section>
  )
}

function ContentBlock({ data }) {
  return (
    <section className="slide slide-content-block">
      <div className="slide-content">
        <h2 className="title">{data.title}</h2>
        <div className="body">
          {data.paragraphs?.map((p, i) => <p key={i}>{p}</p>)}
        </div>
      </div>
    </section>
  )
}

function PullQuote({ data }) {
  return (
    <section className="slide slide-quote">
      <div className="slide-content">
        <blockquote className="pull-quote">{data.quote}</blockquote>
        {data.source && <cite className="quote-source">— {data.source}</cite>}
      </div>
    </section>
  )
}

function ImageHero({ data }) {
  return (
    <section className="slide slide-hero">
      <img className="hero-img" src={data.image} alt={data.title || ''} />
      <div className="hero-overlay">
        {data.title && <h2 className="title">{data.title}</h2>}
      </div>
    </section>
  )
}

function SplitView({ data }) {
  return (
    <section className="slide slide-split">
      <div className="split-text">
        <h2 className="title">{data.title}</h2>
        <div className="body">
          {data.paragraphs?.map((p, i) => <p key={i}>{p}</p>)}
        </div>
      </div>
      <div className="split-image">
        <img src={data.image} alt={data.title || ''} />
      </div>
    </section>
  )
}

function LedgerList({ data }) {
  return (
    <section className="slide slide-list">
      <div className="slide-content">
        <h2 className="title">{data.title}</h2>
        <ul className="ledger">
          {data.items?.map((item, i) => (
            <li key={i}>
              <span className="ledger-num">{String(i + 1).padStart(2, '0')}</span>
              <span className="ledger-title">{item.title}</span>
              {item.desc && <span className="ledger-desc">{item.desc}</span>}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function ChapterDivider({ data }) {
  return (
    <section className="slide slide-chapter">
      <div className="slide-bg" />
      <div className="slide-content">
        <span className="chapter-num">{data.chapterNum || ''}</span>
        <h2 className="chapter-title">{data.title}</h2>
      </div>
    </section>
  )
}

function DataShowcase({ data }) {
  return (
    <section className="slide slide-data">
      <div className="slide-content">
        <h2 className="title">{data.title}</h2>
        <div className="data-grid">
          {data.metrics?.map((m, i) => (
            <div key={i} className="data-item">
              <span className="data-num">{m.value}</span>
              <span className="data-label">{m.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ClosingSlide({ data }) {
  return (
    <section className="slide slide-closing">
      <div className="slide-content">
        <h2 className="title">{data.title}</h2>
        <ul className="closing-points">
          {data.points?.map((p, i) => <li key={i}>{p}</li>)}
        </ul>
        {data.signOff && <p className="sign-off">{data.signOff}</p>}
      </div>
    </section>
  )
}

export default SlideRenderer
