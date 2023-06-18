import React from 'react';
import {Link} from 'react-router-dom';

import {formatTimestamp} from '../datetime';
import {loadDecryptKey} from '../decrypt_key';
import {useError, useRecords} from '../store';
import {DecryptKeyInput} from './DecryptKeyInput';
import {PageFoot} from './PageFoot';
import {PageHead} from './PageHead';

export function DriverRecordList() {
  const decryptKey = loadDecryptKey();
  const records = useRecords();
  const error = useError();

  if (!decryptKey || error) {
    return <DecryptKeyInput errorMessage={error} />;
  }

  return (
    <>
      <PageHead title="檢舉資料庫" />
      {records.length ? (
        <table className="table table-striped">
          <tbody>
            {records.map((rec, i, arr) => (
              <React.Fragment key={i}>
                <tr>
                  <th>
                    <Link to={`/driverRecords/${rec._id}`}>第 {arr.length - i} 筆</Link>
                    &nbsp;({rec.ext})
                    <br />
                    檢舉時間：{formatTimestamp(rec.created)}
                  </th>
                </tr>
                <tr>
                  <td>
                    <Link className="btn btn-default" to={`/driverRecords/${rec._id}`}>
                      詳細資料
                    </Link>
                    <br />
                    縣市：{rec.country}
                    <br />
                    地點：{rec.location}
                    <br />
                    車牌：{rec.carNum}
                    <br />
                    事發時間：{rec.happenedDate}&nbsp;{rec.happenedTime}
                    <br />
                    <blockquote>簡述：{rec.description}</blockquote>
                  </td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      ) : null}
      <PageFoot />
    </>
  );
}
