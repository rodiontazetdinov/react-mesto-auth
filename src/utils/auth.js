export const BASE_URL = 'https://auth.nomoreparties.co';

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        email: email,
        password: password
    })
  })
  .then((response) => {
        console.log(response);
        return response.json();
    })

  .catch((err) => console.log(err));
}; 

export const login = (email, password) => {
    return fetch(`${BASE_URL}/signin`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email, password})
    })
    .then((response) => {
        console.log(response);
        return response.json();
    })

  .catch((err) => console.log(err));
  }; 