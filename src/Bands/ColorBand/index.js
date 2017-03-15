import React from 'react'
import styles from './index.sass'

const CLASSNAME = {
  color: styles['color-band'],
  opacity: styles['opacity-band']
}

export default class ColorBand extends React.Component {
  componentDidMount () {
    /*
      TODO rect的计算放到DidMount会导致页面滚动后, clientRect变化了,
      但使用的还是原数值, 但考虑到墨刀没有滚动, 放在这里能省去不少重复的计算
    */
    const band = this.refs.band.getBoundingClientRect()
    this.left = band.left
    this.width = band.width//btn.width / 2
  }
  handleDown = (e) => {
    this.mouseDown = true
    this.updatePosition(e.nativeEvent)
    document.addEventListener('mousemove', this.updatePosition)
    document.addEventListener('mouseup', this.detachEvent)
  }
  updatePosition = (e) => {
    if (!this.mouseDown) return
    const percent = (e.clientX - this.left) / this.width * 100 >> 0
    if (percent < 0 || percent > 100) return
    this.props.handleChange(percent + '%')
  }
  detachEvent = (e) => {
    this.mouseDown = false
    document.removeEventListener('mousemove', this.updatePosition)
    document.removeEventListener('mouseup', this.detachEvent)
  }
  render () {
    const { type, left, color } = this.props
    const gradient = `linear-gradient(to right, transparent 0%, ${color} 100%)`
    return (
      <div
        ref="band"
        onMouseDown={this.handleDown}
        className={`${styles['band']} ${CLASSNAME[type]}`}>
        {type === 'opacity' && <div className={styles['opacity-bg']} style={{ backgroundImage: gradient }}></div>}
        <span className={styles['btn']} style={{ left }}></span>
      </div>
    )
  }
}
