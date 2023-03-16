export default class UserInfo {
  constructor({ nameSelector, jobSelector, avatarSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._jobElement = document.querySelector(jobSelector);
    this._avatarElement = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      about: this._jobElement.textContent,
      avatar: this._avatarElement.src,
    };
  }

  setUserInfo({ name, about }) {
    this._nameElement.textContent = name;
    this._jobElement.textContent = about;
  }

  setAvatar(avatar) {
    this._avatarElement.src = avatar;
  }
}
