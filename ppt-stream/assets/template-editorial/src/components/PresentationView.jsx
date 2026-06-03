import React, { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import ProgressBar from './ProgressBar'
import ChapterTitle from './ChapterTitle'
import SlideRenderer from './SlideRenderer'

function PresentationView({ slides }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState('forward')
  const navigate = useNavigate()

  const currentSlide = slides[currentIndex]
  const totalSlides = slides.length

  // 当前章节信息
  const currentChapter = currentSlide?.chapter || ''

  const goTo = useCallback((index, dir) => {
    if (index >= 0 && index < totalSlides) {
      setDirection(dir)
      setCurrentIndex(index)
    }
  }, [totalSlides])

  const next = useCallback(() => {
    goTo(currentIndex + 1, 'forward')
  }, [currentIndex, goTo])

  const prev = useCallback(() => {
    goTo(currentIndex - 1, 'backward')
  }, [currentIndex, goTo])

  // 键盘导航
  useEffect(() => {
    const handleKey = (e) => {
      switch (e.key) {
        case 'ArrowRight':
        case ' ':
          e.preventDefault()
          next()
          break
        case 'ArrowLeft':
          e.preventDefault()
          prev()
          break
        case 't':
        case 'T':
          navigate('/teleprompter')
          break
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [next, prev, navigate])

  // 按章节分组的幻灯片列表
  const chapterGroups = React.useMemo(() => {
    const groups = []
    let current = null
    slides.forEach((s, i) => {
      if (s.layout === 'ChapterDivider') {
        current = { title: s.title, num: s.chapterNum || '', slides: [] }
        groups.push(current)
      } else {
        if (!current) {
          current = { title: '', num: '', slides: [] }
          groups.push(current)
        }
        current.slides.push({ index: i, title: s.title || '' })
      }
    })
    return groups
  }, [slides])

  // 当前章节序号
  const currentChapterNum = React.useMemo(() => {
    for (const g of chapterGroups) {
      if (g.title === currentChapter) return g.num
    }
    return ''
  }, [chapterGroups, currentChapter])

  return (
    <div className="presentation">
      <div className={`slide ${direction === 'forward' ? 'slide-enter' : 'slide-enter-back'}`}
           key={currentIndex}>
        <SlideRenderer slide={currentSlide} />
      </div>

      <ProgressBar current={currentIndex} total={totalSlides} />
      <ChapterTitle chapter={currentChapter} chapterNum={currentChapterNum} />

      {/* 底部幻灯片导航 */}
      <nav className="slide-nav">
        {chapterGroups.map((group, gi) => (
          <div key={gi} className="slide-nav-group">
            {group.title && (
              <span className="slide-nav-chapter-label">
                {group.num && <span className="slide-nav-chapter-num">{group.num}</span>}
                {group.title}
              </span>
            )}
            <div className="slide-nav-items">
              {group.slides.map((s) => (
                <button
                  key={s.index}
                  className={`slide-nav-dot ${s.index === currentIndex ? 'active' : ''}`}
                  onClick={() => goTo(s.index, s.index > currentIndex ? 'forward' : 'backward')}
                  title={s.title || `幻灯片 ${s.index + 1}`}
                />
              ))}
            </div>
          </div>
        ))}
      </nav>

      <div className="nav-hint">
        <kbd>←</kbd> <kbd>→</kbd> 导航 &middot; <kbd>T</kbd> 提词板
      </div>
    </div>
  )
}

export default PresentationView
