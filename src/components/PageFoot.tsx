import React from 'react';

import CopyLeft from '../img/Copyleft.svg';
import Logo from '../img/Logo.jpg';

export function PageFoot() {
  return (
    <footer>
      <a href="/">
        <img src={Logo} className="logo img-rounded" alt="安心上路" />
      </a>
      <div style={{marginLeft: '6px'}}>
        <a target="_blank" href="http://zh.m.wikipedia.org/wiki/Copyleft">
          <img src={CopyLeft} className="copyleft" alt="" />
        </a>
        CCSP 2014
        <br />
        Citizens on The Road.
      </div>
    </footer>
  );
}
