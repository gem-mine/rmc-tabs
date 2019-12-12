import React from 'react'
import { StickyContainer } from 'react-sticky'
import { TabsPropsType } from './PropsType'
import { TabPane } from './TabPane'
import { TabBar } from './TabBar'
import { TabContent } from './TabContent'
import { getIndex } from './util'

class TabsStateType {
  currentIndex: number
}

export class Tabs extends React.Component<TabsPropsType, TabsStateType> {
  static TabPane = TabPane
  state: TabsStateType

  static defaultProps = {
    prefixCls: 'rmc-tabs',
    position: 'top',
    animated: true,
    swipeable: false,
    tabHeight: 32,
    pageSize: 5,
    sticky: false
  }

  constructor(props: TabsPropsType) {
    super(props)
    const { children, current } = this.props
    this.state = {
      currentIndex: getIndex(children, current)
    }
  }

  componentWillReceiveProps(nextProps: TabsPropsType) {
    if (nextProps.current !== undefined) {
      const index = getIndex(this.props.children, nextProps.current)
      if (index !== this.state.currentIndex) {
        this.setIndex(index)
      }
    }
  }

  setIndex = (index: number, callback?: any) => {
    const { currentIndex } = this.state
    const { children } = this.props
    const max = children.length - 1
    if (index < 0) {
      index = 0
    } else if (index >= max) {
      index = max
    }
    if (currentIndex !== index) {
      this.setState(
        {
          currentIndex: index
        },
        () => {
          if (this.props.onChange) {
            this.props.onChange(children[index], children[currentIndex])
          }
          if (callback) {
            callback(index)
          }
        }
      )
    }
  }

  render() {
    const { prefixCls, position, sticky } = this.props
    const vertical = position === 'left' || position === 'right'

    const pane = [
      <TabBar
        {...this.props}
        currentIndex={this.state.currentIndex}
        setIndex={this.setIndex}
        vertical={vertical}
        key="tab-bar"
      />,
      <TabContent
        {...this.props}
        currentIndex={this.state.currentIndex}
        setIndex={this.setIndex}
        vertical={vertical}
        key="tab-content"
      />
    ]
    if (position === 'bottom' || position === 'right') {
      pane.reverse()
    }

    const tabs = (
      <div
        className={`${prefixCls} ${prefixCls}-${position}${
          vertical ? ` ${prefixCls}-vertical` : ` ${prefixCls}-horizontal`
        }`}
      >
        {pane}
      </div>
    )

    if (sticky) {
      return <StickyContainer>{tabs}</StickyContainer>
    }
    return tabs
  }
}
