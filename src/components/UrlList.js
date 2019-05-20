import React from 'react';

const UrlList = (props) => {
  const { list } = props;

  return (
    <table>
      <tr><th>Short Url</th><th>Long Url</th><th>Visits</th></tr>
      {
        list.map(v =>
          <tr><td><a href={v.longUrl} target="_blank" onClick={() => props.setRedirect(v.id)}>{v.shortUrl}</a></td><td>{v.longUrl}</td><td><button onClick={() => props.seeDetails(v.id)}>{v.visits.length}</button></td></tr>
        )
      }
    </table> 
  );
};

export default UrlList;
