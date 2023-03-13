export default class Api {
  constructor(baseUrl, authToken, headers ) {
    this._baseUrl = baseUrl;
    this._authTokenn = authToken;
    this._headers = headers;
  }

  _handleResponse(response) {
    return response.ok 
      ? response.json()
      : Promise.reject(`Error: ${response.status} ${response.statusText}`);
  }

  _handleResponseError(err) {
    console.log(`Error processing request ${err}`);
  }

  // GET: get App Data (cardList, userData)
  getAppInfo() {
    return Promise.all(this.getUserInfo(), this.getIntialCards())
  }

  // GET: User Info Profile
  getUserInfo = async () => {
    const response = await fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    });
    return this._handleResponse(response)
  }

  getIntialCards = async () => {
    const response = await fetch(`${this.baseUrl}/cards`, {
      headers: this._headers,
    });
    return this._handleResponse(response);
  }

  // PATCH: Edit User Info
  editUserInfo = async ({name, description}) => {
    const response = await fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name,
        description,
      }),
    });
    return this._handleResponse(response);
  }

  setUserAvatar = async ({avatar}) => {
    const response = await fetch(`${this.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar,
      }),
    });
    return this._handleResponse(response);
  }

  addCard = async ({title, link}) => {
    const response = await fetch(`${this.baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        title,
        link,
      }),
    });
    return this._handleResponse(response);
  }

  deleteCardById = async (id) => {
    const response = await fetch(`${this._baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
      body: JSON.stringify({
        id,
      }),
    });
    return this._handleResponse(response);
  };

  changeCardLikeStatus = async (cardId, like) => {
    const response = await fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: like ? "PUT" : "DELETE",
      headers: this._headers,
      body: JSON.stringify({
        like,
      }),
    });
    return this._handleResponse(response);
  };
}