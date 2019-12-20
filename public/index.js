const signUp = document.querySelector('#sign-up');
const login = document.querySelector('#login');
const errors = document.querySelector('#errors');

signUp.addEventListener('submit', async(event)=> {
  event.preventDefault();
  const url = 'http://localhost:7890/api/v1/auth/signup';
  const data = new FormData(signUp);

  
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type':'Application/JSON'
    },
    body: JSON.stringify({ email:data.get('email'),
      password: data.get('password') }) 
  });
  const json = JSON.stringify(response);
  errors.textContent = json;
  
});

login.addEventListener('submit', async()=> {
  event.preventDefault();
  const url = 'http://localhost:7890/api/v1/auth/login';
  const data = new FormData(login);

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type':'Application/JSON'
    },
    body: JSON.stringify({ email:data.get('email'),
      password: data.get('password') }) 
  });
  const json = JSON.parse(response);
  if(json.status === 403){
    errors.textContent = json.message;
  }
 
});
