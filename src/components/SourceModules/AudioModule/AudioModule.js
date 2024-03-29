// 'use strict';
import React from 'react';
import TopMaskerLayer from './TopMaskerLayer';
import AudioContent from './AudioContent';
import PlayControlPanel from './PlayControlPanel';
import AudioList from './audioList';
import RelateRecommend from './RelateRecommend';

import CommonHeader from '../../HeaderComponents/CommonHeader';
import ReturnButton from '../../HeaderComponents/ReturnButton';
import CollectButton from '../../HeaderComponents/CollectButton';
import CommentButton from '../../HeaderComponents/CommentButton';
import DownLoadButton from '../../HeaderComponents/DownLoadButton';

import Alert from '../../Modals/Alert';

import withStyles from '../../../decorators/withStyles';
import styles from './AudioModule.scss';

import LrcScroll from './LrcScroll';

const alertContent = {
  "img": "http://www.duoyue.me/wechat/1018/3021/images/top/save.png",
  "content": "此资源暂时不提供下载功能"
};

const soundList = [
  {
    "id": 1,
    "isGood": 0,
    "isFav": true,
    "fav": 3,
    "title": "李白",
    "path": "http://file.duoyue.me/upload/source/sound/20160112/2016_01_12_170605679.mp3",
    "desc": "由简单快乐发行，2013李荣浩全创作新专辑《模特》的首波主打歌《李白》，是他在音乐中旁观这个世界，以淡淡的自嘲意味去表达，对于人与人之间的关系看似亲切，实则疏离的普遍现象。也希望人们在听到《李白》这首歌的时候，能够不用在乎外界的评价眼光，用直觉和本心去生活，率性自由而不被世俗所束缚",
    "singer": "李荣浩",
    "picture": "http://file.duoyue.me/upload/source/20160112/2016_01_12_171009919.png",
    "lrc": ""
  },
  {
    "id": 2,
    "isGood": 1,
    "isFav": true,
    "fav": 1,
    "title": "直到世界尽头",
    "path": "http://file.duoyue.me/upload/source/sound/20160113/2016_01_13_110346108.mp3",
    "desc": "beyond是中国香港的摇滚乐队。1983年beyond正式成立，由黄家驹、叶世荣、邓炜谦、李荣潮四名成员组成。1988年至1993年，beyond由黄家驹、黄贯中、黄家强、叶世荣四名成员组成。1994年至2005年，beyond由黄贯中、黄家强、叶世荣三名成员组成。",
    "singer": "WANDS",
    "picture": "http://file.duoyue.me/upload/source/20160113/2016_01_13_111015934.png",
    "lrc": ""
  },
  {
    "id": 3,
    "isGood": 0,
    "isFav": false,
    "fav": 4,
    "title": "好想大声说喜欢你",
    "path": "http://file.duoyue.me/upload/source/sound/20160113/2016_01_13_110332545.mp3",
    "desc": "灌篮高手插曲，好想大声说喜欢你",
    "singer": "BAAD",
    "picture": "http://file.duoyue.me/upload/source/20160113/2016_01_13_111015934.png",
    "lrc": ""
  },
  {
    "id": 4,
    "isGood": 1,
    "isFav": false,
    "fav": 8,
    "title": "模特",
    "path": "http://file.duoyue.me/upload/source/sound/20160112/2016_01_12_170608229.mp3",
    "desc": "李荣浩以前为别人制作专辑，而《模特》是第一次为自己制作，参与了专辑中大部分歌的作词作曲，最能够表达自己。《模特》这张专辑，不但涵盖了人们在不同阶段中的角色，更是邀请到国际音乐创作团队，所有作品均由真实木质乐器录制，添加多种别致的音乐元素。可以说，《模特》不仅多元化的展示了李荣浩的个人音乐创作天分，也是李荣浩与国际音乐制作团队的合作成果",
    "singer": "李荣浩",
    "picture": "http://file.duoyue.me/upload/source/20160112/2016_01_12_171009919.png",
    "lrc": ""
  }
];

@withStyles(styles)
class AudioModule extends React.Component {
  constructor(props) {
    super(props);
    this.isPlay = false;
    this.state = {
      soundIndex: 0,  //正在播放的歌曲
      downLoadModal: false, //下载框的显示隐藏
      audioListDisplay: false, //搜索歌曲显示隐藏
      duration: 0, // 歌曲的时常
      progressValue: 0, //歌曲的进度
      isPlaying: true //是否正在播放
    };
    this.onDownLoadClick = this.onDownLoadClick.bind(this);
    this.onControllClick = this.onControllClick.bind(this);
  }

  //自动播放
  componentDidMount() {
    let audio = this.refs.audio, _self = this;
    this.isPlay = true;
    this.setState({
      isPlaying: true
    });
    audio.play();
    audio.addEventListener("timeupdate", _self.updateProgress.bind(this), false);
    audio.addEventListener("ended", () =>  _self.onControllClick("next") , false);
  }
  //歌曲进度条控制
  updateProgress() {
    let audio = this.refs.audio,progressValue;
    if(!audio) return;
    if(!isNaN(audio.duration)) {
      progressValue = audio.currentTime/audio.duration;
      this.setState({
        duration: audio.duration,
        progressValue: progressValue
      });
    }
  }
  
  //下载功能
  onDownLoadClick() {
    this.setState({
      downLoadModal: true
    });
    this.downLoadTimer = setTimeout( ()=> {
      this.setState({
        downLoadModal: false
        })
    }, 2000 )
  }
 //切歌自动播放
  componentDidUpdate(prevProps, prevState) {
    if(prevState.soundIndex != this.state.soundIndex) {
      this.refs.audio.play();
      this.setState({
        isPlaying: true
      });
    }
  }
  //暂停，上一首，下一首播放歌曲
  onControllClick(type) {
    let audio = this.refs.audio;
    let prev = (this.state.soundIndex > 0) ? this.state.soundIndex - 1 : soundList.length - 1;
    let next = this.state.soundIndex < soundList.length - 1 ? this.state.soundIndex + 1 : 0;
    switch(type) {
      case "prev":
        this.setState({
          soundIndex: prev
        });
        break;
      case "pause":
        if(!this.state.isPlaying) {
          audio.play();
          LrcScroll.start(() => { return this.refs.audio.currentTime; });
        }else {
          audio.pause();
        }
        this.setState({
          isPlaying: !this.state.isPlaying
        });
        break;
      case "next":
        this.setState({
          soundIndex: next
        });
        break;
      default :
        return null;
    }
  }

  onCommentClick() {
    window.location.href="/source/commentpage";
  }

  componentWillUnmount() {
    let audio = this.refs.audio, _self = this;
    window.clearTimeout(this.downLoadTimer);
    audio.removeEventListener("timeupdate", _self.updateProgress.bind(this), false);
    audio.removeEventListener("ended", () =>  _self.onControllClick("next") , false);
  }
  //显示隐藏搜索列表
  onListClick() {
    this.setState({
      audioListDisplay: !this.state.audioListDisplay
    });
  }
  //搜索列表选择歌曲
  onChooseClick(index) {
    this.setState({
      soundIndex: index
    });
  }

  onProgressControll(type,progressValue) {
    let audio = this.refs.audio;
    switch(type) {
      case "start":
        this.setState({
          isPlaying: false
        });
        audio.pause();
        break;
      case "end":
        audio.currentTime = audio.duration*progressValue;
        audio.play();
        this.setState({
          isPlaying: true,
          progressValue: progressValue
        });
      default :
        return null;
    }
  }

  render() {
    let soundPageHeight = document.documentElement.clientHeight - 90 + "px";
    return (
      <div className="AudioModule">
        <CommonHeader>
          <ReturnButton />
          <CollectButton />
          <CommentButton OnCommentClick={this.onCommentClick}/>
          <DownLoadButton OnDownLoadClick={this.onDownLoadClick}/>
        </CommonHeader>

        <div className="sound-page" style={{height: soundPageHeight}}>
          <audio className="mysound" ref="audio" src={soundList[this.state.soundIndex].path}></audio>
          <AudioContent index={this.state.soundIndex} data={soundList} onListClick={this.onListClick.bind(this)} duration={this.state.duration}
              progressValue={this.state.progressValue} isPlaying={this.state.isPlaying} onProgressControll={this.onProgressControll.bind(this)}/>
          {
            this.state.audioListDisplay &&  <AudioList data={soundList} onListClick={this.onListClick.bind(this)} index={this.state.soundIndex} onChooseClick={this.onChooseClick.bind(this)} isPlaying={this.state.isPlaying}/>
          }
        </div>

        <PlayControlPanel onControllClick={this.onControllClick} isPlaying={this.state.isPlaying}/>

        {
          this.state.downLoadModal && <Alert content={alertContent}/>
        }
      </div>
    );
  }
}



export default AudioModule;


