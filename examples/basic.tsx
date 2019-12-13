import '@gem-mine/rmc-tabs/assets/index.less'
import React from 'react'
import ReactDOM from 'react-dom'
import Tabs from '../src'
const TabPane = Tabs.TabPane

class BasicDemo extends React.Component<{}, any> {
  constructor(props: any) {
    super(props)

    this.state = {
      current: 1
    }
  }

  setCurrent = () => {
    let current = this.state.current + 1
    if (current > 2) {
      current = 0
    }
    this.setState({
      current
    })
  }

  render() {
    return (
      <div>
        <div>
          <h2>基本使用</h2>
          <div>
            <Tabs
              onChange={(now, prev) => {
                console.log('change', now, prev)
              }}
            >
              <TabPane
                title="first"
                onClick={tab => {
                  console.log('1111', tab)
                }}
              >
                first tab content
              </TabPane>
              <TabPane key="xx" title="second">
                second tab content
              </TabPane>
              <TabPane title="third">third tab content</TabPane>
            </Tabs>
          </div>
        </div>

        <div>
          <h2>纵向</h2>
          <div style={{ height: 150 }}>
            <Tabs position="left">
              <TabPane title="first">first tab content</TabPane>
              <TabPane title="second">second tab content</TabPane>
              <TabPane title="third">third tab content</TabPane>
            </Tabs>
          </div>
        </div>

        <div>
          <h2>没有动画</h2>
          <div>
            <Tabs animated={false}>
              <TabPane title="first">first tab content</TabPane>
              <TabPane title="second">second tab content</TabPane>
              <TabPane title="third">third tab content</TabPane>
            </Tabs>
          </div>
        </div>

        <div>
          <h2>外部切换 tab</h2>
          <button onClick={this.setCurrent}>切换 tab</button>
          <Tabs current={this.state.current}>
            <TabPane title="first">first tab content</TabPane>
            <TabPane title="second">second tab content</TabPane>
            <TabPane title="third">third tab content</TabPane>
          </Tabs>
        </div>

        <div>
          <h2>横向 tab 很多</h2>
          <Tabs pageSize={4}>
            <TabPane title="first">first tab content</TabPane>
            <TabPane title="second">second tab content</TabPane>
            <TabPane title="third">third tab content</TabPane>
            <TabPane title="forth">forth tab content</TabPane>
            <TabPane title="fifth">fifth tab content</TabPane>
            <TabPane title="sixth">sixth tab content</TabPane>
            <TabPane title="seventh">seventh tab content</TabPane>
            <TabPane title="eighth">eigth tab content</TabPane>
            <TabPane title="nineth">nineth tab content</TabPane>
            <TabPane title="tenth">tenth tab content</TabPane>
          </Tabs>
        </div>

        <div>
          <h2>sticky</h2>
          <Tabs sticky>
            <TabPane title="first">
              <div>
                <p>内容很长1</p>
                <p>内容很长2</p>
                <p>内容很长3</p>
                <p>内容很长4</p>
                <p>内容很长5</p>
                <p>内容很长6</p>
                <p>内容很长7</p>
                <p>内容很长8</p>
                <p>内容很长9</p>
                <p>内容很长10</p>
                <p>内容很长11</p>
                <p>内容很长12</p>
                <p>内容很长13</p>
                <p>内容很长14</p>
                <p>内容很长15</p>
                <p>内容很长16</p>
                <p>内容很长17</p>
                <p>内容很长18</p>
                <p>内容很长19</p>
                <p>内容很长20</p>
                <p>内容很长21</p>
                <p>内容很长22</p>
                <p>内容很长23</p>
              </div>
            </TabPane>
            <TabPane title="second">
              <div style={{ height: 500 }}>second</div>
            </TabPane>
            <TabPane title="third">
              <div style={{ height: 500 }}>third</div>
            </TabPane>
          </Tabs>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<BasicDemo />, document.getElementById('__react-content'))
