import React from 'react';
import {Link} from 'react-router-dom';

import MenuContactUs from '../img/Menu-ContactUs.png';
import MenuDriverRecords from '../img/Menu-DriverRecords.png';
import MenuQA from '../img/Menu-QA.png';
import MenuReport from '../img/Menu-Report.png';
import MenuTrafficLaws from '../img/Menu-TrafficLaws.png';
import MenuUserInfo from '../img/Menu-UserInfo.png';
import MenuUserRecords from '../img/Menu-UserRecords.png';
import {PageContainer} from './PageContainer';

export function IndexPage() {
  return (
    <PageContainer isIndex title="安心上路">
      <div style={{display: 'inline-block', marginTop: '-50px'}}>
        <div className="hex-row">
          <div className="hex" style={{opacity: 0}}>
            <div className="left"></div>
            <div className="middle"></div>
            <div className="right"></div>
          </div>
          <Link className="hex even" to="/driverRecords">
            <div className="left"></div>
            <img className="function" src={MenuDriverRecords} alt="影像資料庫" />
            <div className="right"></div>
          </Link>
          <div className="hex" style={{opacity: 0}}>
            <div className="left"></div>
            <div className="middle"></div>
            <div className="right"></div>
          </div>
        </div>
        <div className="hex-row">
          <Link className="hex" to="/tips">
            <div className="left"></div>
            <img className="function" src={MenuQA} alt="檢舉撇步、Q &amp; A" />
            <div className="right"></div>
          </Link>
          <Link className="hex even" to="/report">
            <div className="left"></div>
            <img className="function" src={MenuReport} alt="我要檢舉！" />
            <div className="right"></div>
          </Link>
          <Link className="hex" to="/userRecords">
            <div className="left"></div>
            <img className="function" src={MenuUserRecords} alt="管理案件" />
            <div className="right"></div>
          </Link>
        </div>
        <div className="hex-row">
          <Link className="hex" to="/trafficLaws">
            <div className="left"></div>
            <img className="function" src={MenuTrafficLaws} alt="交通法規" />
            <div className="right"></div>
          </Link>
          <Link className="hex even" to="/contactUs">
            <div className="left"></div>
            <img className="function" src={MenuContactUs} alt="聯絡我們" />
            <div className="right"></div>
          </Link>
          <Link className="hex" to="/userInfo">
            <div className="left"></div>
            <img className="function" src={MenuUserInfo} alt="個人資料" />
            <div className="right"></div>
          </Link>
        </div>
      </div>
      <div id="space" style={{height: '60px'}}></div>
    </PageContainer>
  );
}
