import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';

import {getDownloadUrl, query} from '../firebase';
import {DriverRecord} from '../record';
import {ErrorPage} from './ErrorPage';
import {PageContainer} from './PageContainer';

export function DriverRecordDetail() {
  const {recordId} = useParams();
  const [loadingRecord, setLoadingRecord] = useState<string | null>(null);
  const [record, setRecord] = useState<DriverRecord | null>(null);
  const [loadingMedia, setLoadingMedia] = useState<string | null>(null);
  const [mediaSrc, setMediaSrc] = useState('');
  const [error, setError] = useState<string>();

  useEffect(() => {
    if (!recordId || loadingRecord === recordId) {
      return;
    }
    setLoadingRecord(recordId);
    query(`/driverRecords/${recordId}`)
      .then((snapshot) => {
        if (snapshot.exists()) {
          setRecord(snapshot.val() as DriverRecord);
        } else {
          console.log('No data available');
        }
      })
      .catch((err) => {
        console.error(err);
        setError(err instanceof Error ? err.message : String(err));
      });
  }, [loadingRecord, recordId]);

  useEffect(() => {
    if (!recordId || loadingMedia === recordId) {
      return;
    }
    setLoadingMedia(recordId);
    const path = `public/${recordId}`;
    getDownloadUrl(path)
      .then((url) => {
        setMediaSrc(url);
      })
      .catch((err) => {
        console.error(err);
        setError(err instanceof Error ? err.message : String(err));
      });
  }, [loadingMedia, recordId]);

  if (error) {
    return <ErrorPage errorMessage={error} />;
  }

  return (
    <PageContainer title="檢舉檔案">
      {record ? (
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
      ) : (
        <p>Loading...</p>
      )}
      {record && mediaSrc ? (
        <table className="table table-bordered">
          <tbody>
            <tr>
              <th style={{verticalAlign: 'middle'}}>影像附件</th>
            </tr>
            <tr>
              <td style={{textAlign: 'center'}} key={mediaSrc}>
                {!mediaSrc ? (
                  <p style={{textAlign: 'left'}}>沒有附件</p>
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
      ) : null}
    </PageContainer>
  );
}
