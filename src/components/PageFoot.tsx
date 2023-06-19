import React from 'react';
import {Link} from 'react-router-dom';

import CopyLeft from '../img/Copyleft.svg';
import Logo from '../img/Logo.jpg';

export function PageFoot() {
  return (
    <footer>
      <Link to="/">
        <img src={Logo} className="logo img-rounded" alt="安心上路" />
      </Link>
      <div style={{marginLeft: '10px'}}>
        <a target="_blank" href="http://zh.m.wikipedia.org/wiki/Copyleft">
          <img src={CopyLeft} className="copyleft" alt="" />
        </a>
        &nbsp; CCSP 2014
        <br />
        Citizens on The Road.
      </div>
    </footer>
  );
}
