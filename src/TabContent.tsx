import React from 'react'
import { TabContentPropsType } from './PropsType'
import Gesture, { IGestureStatus } from 'rc-gesture'

export class TabContent extends React.PureComponent<TabContentPropsType> {
  handleSwipe = (status: IGestureStatus) => {
    const { vertical, setIndex, currentIndex, children, onSwipe, swipeable } = this.props
    if (vertical) {
      return
    }
    if (!swipeable) {
      return
    }
    const { direction } = status
    const event = status.srcEvent
    let dir: string = ''
    let nextIndex: number = 0
    if (direction === 2) {
      dir = 'left'
      nextIndex = currentIndex + 1
    } else if (direction === 4) {
      dir = 'right'
      nextIndex = currentIndex - 1
    }
    if (dir) {
      const edge = nextIndex < 0 || nextIndex >= children.length

      const defaultAction = function() {
        if (!edge) {
          // 非边缘进行本身 tab 切换，并阻止事件冒泡
          setIndex(nextIndex)
          status.srcEvent.stopPropagation()
        }
      }
      if (onSwipe) {
        onSwipe(event, {
          direction: dir,
          edge,
          currentIndex,
          nextIndex,
          defaultAction
        })
      } else {
        defaultAction()
      }
    }
  }

  render() {
    const { prefixCls, currentIndex, vertical, animated, children } = this.props
    const cls = `${prefixCls}-content`
    const style = {
      transform: vertical
        ? `translate3d(0px, -${100 * currentIndex}%, 1px)`
        : `translate3d(-${100 * currentIndex}%, 0px, 1px)`
    }
    let wrapCls = `${cls}-wrap`
    if (animated !== false) {
      wrapCls += ` ${wrapCls}-animated`
    }

    return (
      <Gesture onSwipe={this.handleSwipe}>
        <div className={wrapCls} style={style}>
          {React.Children.map(children, (child: any, index) => {
            const activeCls = index === currentIndex ? 'active' : 'inactive'
            return (
              <div className={`${cls} ${cls}-${activeCls}`}>
                {child.props.children}
              </div>
            )
          })}
        </div>
      </Gesture>
    )
  }
}
