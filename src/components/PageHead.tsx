import React, {useEffect} from 'react';
import {Link, useLocation} from 'react-router-dom';

import BackImg from '../img/back.png';
import LogoNoBlueSmall from '../img/LogoNoBlue-small.png';
import {ProfileMenu} from './ProfileMenu';

interface Props {
  isIndex?: boolean;
  title: string;
}

function getBackUrl() {
  const {pathname} = useLocation();
  const parts = pathname.split('/');
  if (pathname.endsWith('/')) {
    parts.pop();
  }
  parts.pop();
  return parts.length === 1 ? '/' : parts.join('/');
}

export function PageHead({isIndex, title}: Props) {
  useEffect(() => {
    document.title = title;
  }, [title]);
  const backUrl = getBackUrl();
  return (
    <table id="head" className="table">
      <tbody>
        <tr>
          <td id="back">
            {isIndex ? (
              ' '
            ) : (
              <Link to={backUrl}>
                <img src={BackImg} alt="Back" />
              </Link>
            )}
          </td>
          <td>
            {isIndex ? (
              <>
                <h1>
                  <img className="logo" src={LogoNoBlueSmall} alt="安心上路" />
                </h1>
                <div className="text-info subtitle">全國通用交通違規檢舉網站</div>
              </>
            ) : (
              <h1>{title}</h1>
            )}
          </td>
          <td id="fbArea">
            <ProfileMenu />
          </td>
        </tr>
      </tbody>
    </table>
  );
}
