export default class Api {
  constructor(baseUrl, authToken, headers ) {
    this._baseUrl = baseUrl;
    this._authTokenn = authToken;
    this._headers = headers;
  }

  _handleResponse(res) {
    return res.ok 
      ? res.json()
      : Promise.reject(`Error: ${res.status} ${res.statusText}`);
  }

  _handleResponseError(err) {
    console.log(`Error processing request ${err}`);
  }

  // GET: get App Data (cardList, userData)
}