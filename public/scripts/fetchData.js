let result;
fetch('http://localhost:5000/')
  .then(res => res.json())
  .then(data => result = data)
  .then(() => console.log(result[1]))