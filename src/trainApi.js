import { baseURL, primary_key } from "utils/constant";

function ApiHelper(url = "", data = {}, method = "GET") {
  let fetch_url = baseURL + url + "?contentType=json";
  // for (const [key, value] of Object.entries(data)) {
  //   if(value) {
  //     fetch_url = fetch_url + `&${key}=${value.toString()}`
  //   }
  // }
  return fetch(fetch_url, {
    method: method,
    headers: {
      api_key: primary_key,
    },
  })
    .then((res) => res.json())
    .then((result) => {
      return result;
    });
}

export { ApiHelper };
