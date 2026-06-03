import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import './Teleprompter.css'

function Teleprompter({ slides }) {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const isStage = searchParams.get('mode') === 'stage'

  const [autoScroll, setAutoScroll] = useState(false)
  const [speed, setSpeed] = useState(2)
  const [darkMode, setDarkMode] = useState(false)
  const containerRef = useRef(null)
  const scrollTimerRef = useRef(null)

  const chapters = React.useMemo(() => {
    const result = []
    let currentChapter = null
    slides.forEach(slide => {
      if (slide.layout === 'ChapterDivider') {
        currentChapter = { title: slide.title, slides: [] }
        result.push(currentChapter)
      } else if (currentChapter) {
        currentChapter.slides.push(slide)
      }
    })
    return result
  }, [slides])

  useEffect(() => {
    if (!autoScroll || !containerRef.current) {
      if (scrollTimerRef.current) clearInterval(scrollTimerRef.current)
      return
    }
    const interval = 1000 / (speed * 2)
    scrollTimerRef.current = setInterval(() => {
      if (containerRef.current) {
        containerRef.current.scrollBy({ top: 1, behavior: 'auto' })
      }
    }, interval)
    return () => {
      if (scrollTimerRef.current) clearInterval(scrollTimerRef.current)
    }
  }, [autoScroll, speed])

  useEffect(() => {
    const handleKey = (e) => {
      switch (e.key) {
        case ' ':
          e.preventDefault()
          setAutoScroll(prev => !prev)
          break
        case 'ArrowUp':
          e.preventDefault()
          setSpeed(s => Math.min(s + 1, 5))
          break
        case 'ArrowDown':
          e.preventDefault()
          setSpeed(s => Math.max(s - 1, 1))
          break
        case 't':
        case 'T':
          navigate('/')
          break
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [navigate])

  const scrollToChapter = useCallback((id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }, [])

  return (
    <div className={`teleprompter ${darkMode ? 'dark' : ''} ${isStage ? 'stage' : ''}`}>
      <nav className="teleprompter-nav">
        {chapters.map((ch, i) => (
          <a key={i} href={`#chapter-${i}`}
             onClick={(e) => { e.preventDefault(); scrollToChapter(`chapter-${i}`) }}>
            {ch.title}
          </a>
        ))}
      </nav>

      <div className="teleprompter-body" ref={containerRef}>
        {chapters.map((chapter, ci) => (
          <div key={ci} id={`chapter-${ci}`}>
            <h1>{chapter.title}</h1>
            {chapter.slides.map((slide, si) => (
              <div key={si}>
                <h2>{slide.title}</h2>
                {slide.script?.map((line, li) => (
                  <p key={li} className={line.startsWith('[') ? 'cue' : ''}>{line}</p>
                ))}
                {!slide.script && slide.paragraphs?.map((p, pi) => (
                  <p key={pi}>{p}</p>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="autoscroll-bar">
        <button onClick={() => navigate('/')} title="返回演示模式">✕</button>
        <button onClick={() => setAutoScroll(!autoScroll)}>
          {autoScroll ? '⏸ 暂停' : '▶ 滚动'}
        </button>
        <span className="speed-label">速度: {speed}</span>
        <input type="range" min="1" max="5" value={speed}
               onChange={(e) => setSpeed(Number(e.target.value))} />
        <button onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? '☀️' : '🌙'}
        </button>
      </div>
    </div>
  )
}

export default Teleprompter
