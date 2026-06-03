import React from 'react'

function ProgressBar({ current, total }) {
  const pct = ((current + 1) / total) * 100

  return (
    <div
      className="progress-bar"
      style={{ width: `${pct}%` }}
      role="progressbar"
      aria-valuenow={current + 1}
      aria-valuemin={1}
      aria-valuemax={total}
    />
  )
}

export default ProgressBar
