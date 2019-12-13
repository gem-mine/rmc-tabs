import React from 'react'
import { Sticky } from 'react-sticky'
import Gesture, { IGestureStatus } from 'rc-gesture'
import { TabBarPropsType } from './PropsType'
import { Tab } from './Tab'

export class TabBar extends React.PureComponent<TabBarPropsType> {
  tabBar: HTMLDivElement

  setTabBarRef = (ref: HTMLDivElement) => {
    this.tabBar = ref
  }

  getTabBarRef = () => {
    return this.tabBar
  }

  onPan = (() => {
    let offset: number = 0

    return {
      onPanStart: () => {
        offset = this.tabBar.offsetLeft
      },
      onPanMove: (status: IGestureStatus) => {
        if (!status.moveStatus) {
          return
        }
        let x = offset + status.moveStatus.x
        x = Math.max(
          Math.min(x, 0),
          this.tabBar.clientWidth - this.tabBar.scrollWidth
        )
        this.tabBar.style.left = `${x}px`
      },
      onPanEnd: () => {}
    }
  })()

  render() {
    const {
      prefixCls,
      position,
      vertical,
      pageSize,
      currentIndex,
      tabHeight,
      children,
      sticky
    } = this.props
    const cls = `${prefixCls}-tab-bar`
    let rate = 100
    let deviate = 0
    const len = children.length
    if (Array.isArray(children)) {
      rate = rate / Math.min(pageSize as number, len)
    }
    const activeStyle: React.CSSProperties = {}
    const tabbar = (
      <div className={`${cls}-wrap ${cls}-${position}`}>
        <div className={`${cls}`} ref={this.setTabBarRef}>
          <Gesture {...this.onPan}>
            <div className={`${cls}-content`}>
              {React.Children.map(children, (child: any, i: number) => {
                const { title, onClick } = child.props
                if (i === currentIndex) {
                  deviate = rate * i
                  if (vertical) {
                    activeStyle.height = tabHeight
                    activeStyle.top = i * (tabHeight as number)
                  } else {
                    activeStyle.width = `${rate}%`
                    activeStyle.left = `${deviate}%`
                  }
                }
                return (
                  <Tab
                    key={i as any}
                    index={i}
                    active={i === currentIndex}
                    title={title}
                    rate={rate}
                    onClick={onClick}
                    getTabBarRef={this.getTabBarRef}
                    {...this.props}
                  />
                )
              })}
              <div className={`${cls}-underline`} style={activeStyle}></div>
            </div>
          </Gesture>
        </div>
      </div>
    )
    if (sticky) {
      return (
        <Sticky>
          {({ style }) => {
            style.zIndex = 1
            return React.cloneElement(tabbar, { style })
          }}
        </Sticky>
      )
    }
    return tabbar
  }
}
