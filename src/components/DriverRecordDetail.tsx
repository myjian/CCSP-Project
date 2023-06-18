import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';

import {loadDecryptKey} from '../decrypt_key';
import {decrypt} from '../decryptor';
import {useError, useRecords, useStore} from '../store';
import {DecryptKeyInput} from './DecryptKeyInput';
import {PageFoot} from './PageFoot';
import {PageHead} from './PageHead';

export function DriverRecordDetail() {
  const {recordId} = useParams();
  const records = useRecords();
  const [mediaSrc, setMediaSrc] = useState('');
  const record = records.find((r) => r._id === recordId);

  const decryptKey = loadDecryptKey();
  const store = useStore();
  const error = useError();

  useEffect(() => {
    if (!recordId || !decryptKey) {
      return;
    }
    const path = `recordMedia/${recordId}`;
    fetch(path)
      .then(async (result) => {
        if (!result.ok) {
          return;
        }
        console.log(`Decrypting ${path}`);
        const decrypted = await decrypt(await result.arrayBuffer(), decryptKey);
        setMediaSrc(URL.createObjectURL(decrypted));
      })
      .catch((err) => {
        store.setError(err instanceof Error ? err.message : String(err));
      });
  }, [recordId, decryptKey]);

  if (!decryptKey || error) {
    return <DecryptKeyInput errorMessage={error} />;
  }

  if (!recordId || !record) {
    return null;
  }

  return (
    <div>
      <PageHead title="檢舉檔案" />
      <div id="body" className="container-fluid">
        <table className="table table-bordered">
          <tbody>
            <tr>
              <th>牌照號碼</th>
              <th>違規發生地點</th>
              <th>日期</th>
              <th>時間</th>
              <th>違規事實內容</th>
            </tr>
            <tr>
              <td>{record.carNum}</td>
              <td>
                {record.country}
                {record.location}
              </td>
              <td>{record.happenedDate}</td>
              <td>{record.happenedTime}</td>
              <td>{record.description}</td>
            </tr>
          </tbody>
        </table>

        <table className="table table-bordered">
          <tbody>
            <tr>
              <th style={{verticalAlign: 'middle'}}>備註</th>
            </tr>
            <tr>
              <td style={{textAlign: 'center'}}>
                {!mediaSrc ? (
                  <p style={{textAlign: 'left'}}>沒有附檔</p>
                ) : record.ext === 'image' ? (
                  <img style={{width: '100%'}} src={mediaSrc} />
                ) : record.ext === 'video' ? (
                  <video id="movie" controls width="100%">
                    <source src={mediaSrc} />
                    您的瀏覽器不支援 HTML5 影片播放標籤 &lt;video&gt; 格式。 Your browser doesn't
                    support the &lt;video&gt; tag.
                  </video>
                ) : (
                  <a className="btn btn-default" href={mediaSrc} target="_blank">
                    附件
                  </a>
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <PageFoot />
    </div>
  );
}
