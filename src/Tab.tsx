import React, { ReactElement } from 'react'
import { TabPropsType } from './PropsType'

export class Tab extends React.PureComponent<TabPropsType> {
  handleClick = () => {
    const {
      index,
      children,
      pageSize,
      vertical,
      rate,
      setIndex,
      getTabBarRef
    } = this.props
    const len = children.length

    const tab = children[index] as ReactElement
    if (tab.props.onClick) {
      tab.props.onClick(tab, index)
    }
    setIndex(index, currentIndex => {
      if (pageSize) {
        if (len > pageSize) {
          let delta = currentIndex + 2 - pageSize
          // 保证不能偏移过头
          if (delta < 0) {
            delta = 0
          }
          if (len < delta + pageSize) {
            delta = len - pageSize
          }
          if (!vertical) {
            const tabBarRef = getTabBarRef()
            tabBarRef.style.left = `-${delta * rate}%`
            tabBarRef.style.position = 'relative'
          }
        }
      }
    })
  }

  render() {
    const { prefixCls, active, vertical, tabHeight, title, rate } = this.props
    const cls = `${prefixCls}-tab-bar-tab`
    const activeCls = active ? ` ${cls}-active` : ''

    const style: React.CSSProperties = {}
    if (vertical) {
      style.height = tabHeight
    } else {
      style.width = `${rate}%`
    }

    return (
      <div
        className={`${cls}${activeCls}`}
        style={style}
        onClick={this.handleClick}
      >
        {title}
      </div>
    )
  }
}
