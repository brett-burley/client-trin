const mode = 'cors';
const credentials = 'same-origin';
const headers = {
  "Content-Type": "application/json",
};

const apiUrl = 'https://api-trin-nb7bzfogfa-uc.a.run.app';
console.log('apiUrl net', apiUrl);


async function post(route, data)
{
  try {
    const url = apiUrl + route;
    const res = await fetch(url, {
      method: "POST", 
      mode,
      credentials,
      headers,
      body: JSON.stringify(data),
    });

    return res.text();
  } catch(e) {
    console.error(e);
    return false;
  }
}

async function get(route)
{
  try {
    const url = apiUrl + route;
    const res = await fetch(url, {
      method: "GET",
      mode,
      credentials,
      headers,
    });

    return res.text();
  } catch(e) {
    console.error(e);
    return false;
  }

}


function getBaseUrl()
{
  const env = process.env.NODE_ENV;
  console.log('env', env);
  if(env === 'development')
    return localUrl;
  return apiUrl;
}


export default { apiUrl, post, get };
