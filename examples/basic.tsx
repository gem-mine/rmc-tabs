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

  render() {
    return (
      <div>
        <div>
          <h2>基本使用</h2>
          <div>
            <Tabs
              defaultActiveKey={'xx'}
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
          <h2>bottom</h2>
          <div>
            <Tabs position="bottom">
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
          <h2>非受控，外部切换 tab</h2>
          <button
            onClick={() => {
              this.tabs.gotoTab(2)
            }}
          >
            切换到第 3 个 tab
          </button>
          <Tabs ref={ref => (this.tabs = ref)}>
            <TabPane title="first">first tab content</TabPane>
            <TabPane title="second">second tab content</TabPane>
            <TabPane title="third">third tab content</TabPane>
          </Tabs>
        </div>

        <div>
          <h2>受控，外部切换 tab</h2>
          <button
            onClick={() => {
              this.setState({ current: 0 })
            }}
          >
            切换到第 1 个 tab
          </button>
          <button
            onClick={() => {
              this.setState({ current: 2 })
            }}
          >
            切换到第 3 个 tab
          </button>
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

        <div>
          <h2>
            嵌套 tabs，子级 tabs swipe 到 第一个/最后 可以切换上级 tabs
          </h2>
          <div>
            <Tabs>
              <TabPane title="外层1">
                <Tabs>
                  <TabPane title="内层1-1">
                    <p> 春眠不觉晓</p>
                    <p> 处处闻啼鸟</p>
                    <p> 夜来风雨声</p>
                    <p> 花落知多少</p>
                  </TabPane>
                  <TabPane title="内层1-2">
                    <p> 锄禾日当午</p>
                    <p> 汗滴禾下土</p>
                    <p> 谁知盘中餐</p>
                    <p> 粒粒皆辛苦</p>
                  </TabPane>
                  <TabPane title="内层1-3">
                    <p> 山中相送罢</p>
                    <p> 日暮掩柴扉</p>
                    <p> 春草明年绿</p>
                    <p> 王孙归不归</p>
                  </TabPane>
                  <TabPane title="内层1-4">
                    <p> 千山鸟飞绝</p>
                    <p> 万径人踪灭</p>
                    <p> 孤舟蓑笠翁</p>
                    <p> 独钓寒江雪</p>
                  </TabPane>
                </Tabs>
              </TabPane>
              <TabPane title="外层2">
                <Tabs>
                  <TabPane title="内层2-1">
                    <p> 独在异乡为异客</p>
                    <p> 每逢佳节倍思亲</p>
                    <p> 遥知兄弟登高处</p>
                    <p> 遍插茱萸少一人</p>
                  </TabPane>
                  <TabPane title="内层2-2">
                    <Tabs>
                      <TabPane title="内层2-2-1">
                        <p> 变态的三层嵌套 - 1</p>
                        <p> 变态的三层嵌套 - 1</p>
                        <p> 变态的三层嵌套 - 1</p>
                        <p> 变态的三层嵌套 - 1</p>
                        <p> 变态的三层嵌套 - 1</p>
                        <p> 变态的三层嵌套 - 1</p>
                      </TabPane>
                      <TabPane title="内层2-2-2">
                        <p> 变态的三层嵌套 - 2</p>
                        <p> 变态的三层嵌套 - 2</p>
                        <p> 变态的三层嵌套 - 2</p>
                        <p> 变态的三层嵌套 - 2</p>
                        <p> 变态的三层嵌套 - 2</p>
                        <p> 变态的三层嵌套 - 2</p>
                      </TabPane>
                      <TabPane title="内层2-2-3">
                        <p> 变态的三层嵌套 - 3</p>
                        <p> 变态的三层嵌套 - 3</p>
                        <p> 变态的三层嵌套 - 3</p>
                        <p> 变态的三层嵌套 - 3</p>
                        <p> 变态的三层嵌套 - 3</p>
                        <p> 变态的三层嵌套 - 3</p>
                      </TabPane>
                    </Tabs>
                  </TabPane>
                </Tabs>
              </TabPane>
              <TabPane title="外层3">
                <p> 远上寒山石径斜</p>
                <p> 白云生处有人家</p>
                <p> 停车坐爱枫林晚</p>
                <p> 霜叶红于二月花</p>
              </TabPane>
            </Tabs>
          </div>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<BasicDemo />, document.getElementById('__react-content'))
