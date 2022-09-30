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

// export const authorize = (token) => {
//   return fetch(`${BASE_URL}/users/me`, {
//     method: 'GET',
//     headers: {
//       "Content-Type": "application/json",
//       "Authorization" : `Bearer ${token}`
//   } ,
//     body: JSON.stringify({identifier, password})
//   })
//   .then((response => response.json()))
//   .then((data) => {
//     console.log(data);
//     if (data.jwt){
//       localStorage.setItem('jwt', data.jwt);
//       return data;
//     }
//   })
//   .catch(err => console.log(err))
// }; 

export const getContent = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
  .then(res => res.json())
} 