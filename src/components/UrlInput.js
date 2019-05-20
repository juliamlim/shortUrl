import React, { useState } from 'react';

const UrlInput = (props) => {
  const [url, setUrl] = useState(''); 
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const inputChange = (event) => {
    setSuccess('');
    setUrl(event.target.value);
  };

  const generateShortUrl = (event) => {
    event.preventDefault();

    let longUrl;
    
    try {
      longUrl = validateUrl(url);
      setError('');
    } catch (err) {
      return setError(err);
    }

    const id = Math.random().toString(36).substring(3,9);
    
    props.updateList({
      id,
      shortUrl: `${props.host}go/${id}`,
      longUrl: longUrl,
      visits: []
    });

    setUrl('');
    setSuccess('Your url has been created!');
  };

  const validateUrl = (url = '') => {
    if(!url)
      throw 'Please enter a valid url';
    else if (/\s/g.test(url)) 
      throw 'Looks like there\'s spaces in that url';
    else if (url.indexOf('.') <= 0)
      throw 'That url doesn\'t look right';
    else if (!/http[s]?:\/\/.+/.test(url))
      throw 'Please begin your url with http:// or https://';

    return url;
  }

  return (
    <form onSubmit={generateShortUrl}>
      <input className={error ? 'error' : ''} value={url} placeholder='http(s)://...' onChange={inputChange}/><button type="submit">Generate</button>
      <p className={error ? 'error' : ''}>{error} {success}</p>
    </form>
  );
};

export default UrlInput;
