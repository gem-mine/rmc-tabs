import React from 'react'
import { TabContentPropsType } from './PropsType'
import Gesture, { IGestureStatus } from 'rc-gesture'

interface State {
  cache: Array<any>
}

export class TabContent extends React.PureComponent<
  TabContentPropsType,
  State
> {
  state: State = {
    cache: []
  }

  handleSwipe = (status: IGestureStatus) => {
    const {
      vertical,
      setIndex,
      currentIndex,
      children,
      onSwipe,
      swipeable,
      direction: htmlDir
    } = this.props
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
      nextIndex = htmlDir === 'rtl' ? currentIndex - 1 : currentIndex + 1
    } else if (direction === 4) {
      dir = 'right'
      nextIndex = htmlDir === 'rtl' ? currentIndex + 1 : currentIndex - 1
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
    const { prefixCls, currentIndex, vertical, animated, preRender, children, direction: htmlDir } = this.props
    const cls = `${prefixCls}-content`
    const rtlTranslate3d = htmlDir === 'rtl' ? 100 * currentIndex : -100 * currentIndex
    const style = {
      transform: vertical
        ? `translate3d(0px, -${100 * currentIndex}%, 1px)`
        : `translate3d(${rtlTranslate3d}%, 0px, 1px)`
    }
    let wrapCls = `${cls}-wrap`
    if (animated !== false) {
      wrapCls += ` ${wrapCls}-animated`
    }

    return (
      <Gesture onSwipe={this.handleSwipe}>
        <div className={wrapCls} style={style}>
          {React.Children.map(children, (child: any, index) => {
            const active = index === currentIndex
            const activeCls = active ? 'active' : 'inactive'
            let content: any
            if (!preRender) {
              content = this.state.cache[index]
              if (!content && active) {
                content = child.props.children
                this.state.cache[index] = content
              }
            } else {
              content = child.props.children
            }
            return <div className={`${cls} ${cls}-${activeCls}`}>{content}</div>
          })}
        </div>
      </Gesture>
    )
  }
}
