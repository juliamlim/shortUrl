import React from 'react';

const UrlDetails = (props) => {
  const { details = {} } = props;
  return (
    <table>
      <h2>Details for { details.shortUrl } ({details.longUrl})</h2>
      <tr><th>Date</th><th>IP</th></tr>
      {
        details.visits.length ?
          details.visits.map(v => 
            <tr><td>{v.date}</td><td>{v.ip}</td></tr>
          )
        : <tr><td colSpan="2">No one has used this link yet!</td></tr>
      }
    </table> 
  );
};

export default UrlDetails;
