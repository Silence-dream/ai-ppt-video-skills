import React, { useState, useEffect } from 'react'

function ChapterTitle({ chapter, chapterNum }) {
  const [visible, setVisible] = useState(false)
  const [displayChapter, setDisplayChapter] = useState(chapter)
  const [displayNum, setDisplayNum] = useState(chapterNum)

  useEffect(() => {
    setVisible(false)
    const timer = setTimeout(() => {
      setDisplayChapter(chapter)
      setDisplayNum(chapterNum)
      setVisible(true)
    }, 400)
    return () => clearTimeout(timer)
  }, [chapter, chapterNum])

  if (!displayChapter) return null

  return (
    <div className={`chapter-subtitle ${visible ? 'visible' : ''}`}>
      {displayNum && <span className="chapter-subtitle-num">{displayNum}</span>}
      {displayChapter}
    </div>
  )
}

export default ChapterTitle
