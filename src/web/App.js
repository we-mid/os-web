
import React, { Component } from 'react'
import { play } from './lib/audio'


export default class App extends Component {

  componentDidMount() {

    // 播放音频 自带下雨声背景音
    // play('http://7xr2eh.com1.z0.glb.clouddn.com/下雨声RainyMood.mp3')
    play('http://7xr2eh.com1.z0.glb.clouddn.com/%E4%B8%8B%E9%9B%A8%E5%A3%B0RainyMood.mp3')
  }

  render() {
    return (
      <div>
        <h1>Hello World</h1>
      </div>
    )
  }
}
