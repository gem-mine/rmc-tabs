import React from 'react'
import { TabContentPropsType } from './PropsType'
import Gesture, { IGestureStatus } from 'rc-gesture'

export class TabContent extends React.PureComponent<TabContentPropsType> {
  handleSwipe = (status: IGestureStatus) => {
    const { vertical, setIndex, currentIndex } = this.props
    if (vertical) {
      return
    }
    const { direction } = status
    if (direction === 2) {
      // 向左
      setIndex(currentIndex + 1)
    } else if (direction === 4) {
      // 向右
      setIndex(currentIndex - 1)
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
