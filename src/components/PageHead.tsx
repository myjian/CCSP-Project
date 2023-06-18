import React from 'react';
import {Link} from 'react-router-dom';

import BackImg from '../img/back.png';
import LogoNoBlueSmall from '../img/LogoNoBlue-small.png';

interface Props {
  isIndex?: boolean;
  title: string;
}

export function PageHead({isIndex, title}: Props) {
  return (
    <>
      <table id="head" className="table">
        <tbody>
          <tr>
            {isIndex ? (
              <>
                <td id="back">&nbsp;</td>
                <td>
                  <h1>
                    <img className="logo" src={LogoNoBlueSmall} alt="安心上路" />
                  </h1>
                  <div className="text-info subtitle">全國通用交通違規檢舉網站</div>
                </td>
              </>
            ) : (
              <>
                <td id="back">
                  <Link to="..">
                    <img src={BackImg} alt="Back" />
                  </Link>
                </td>
                <td>
                  <h1>{title}</h1>
                </td>
              </>
            )}
            <td id="fbArea" />
          </tr>
        </tbody>
      </table>
      <hr />
    </>
  );
}
