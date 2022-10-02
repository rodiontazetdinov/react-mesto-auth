class Api {
    constructor(options) {
       this._baseUrl = options.baseUrl;
       this._token = options.headers.authorization;
       this._headers = options.headers;
    }

    _request(url, options) {
        return fetch(url, options).then(this._checkResponse)
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
    }

    getInitialCards() {
       return this._request(`${this._baseUrl}/cards`, {
            headers: this._headers
        }) 
    }

    getProfile() {
       return this._request(`${this._baseUrl}/users/me`, {
            headers: this._headers
        }); 
    }

    patchUserInfo({ name, about }) {
        return this._request(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                about: about
            })
            }
        );
    }

    postNewCard({ name, link }) {
        return this._request(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                link: link
            })
            }
        ); 
    }

    removeMyCard(id) {
        return this._request(`${this._baseUrl}/cards/${id}`, {
            method: 'DELETE',
            headers: this._headers,
            }) 
    }

    increaseLike(id, likes) {
        return this._request(`${this._baseUrl}/cards/${id}/likes`, {
            method: 'PUT',
            headers: this._headers,
            body: JSON.stringify({
                likes: likes,

            })
            });
    }

    decreaseLike(id) {
        return this._request(`${this._baseUrl}/cards/${id}/likes`, {
            method: 'DELETE',
            headers: this._headers,
            });
    }
    

    setAvatar({ avatar }) {
        return this._request(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: avatar
            })
            }
        ); 
    }
}

export const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-44',
    headers: {
    authorization: '31ceb449-7f5f-494e-b20d-eecaa293257f',
    'Content-Type': 'application/json'
  }
});