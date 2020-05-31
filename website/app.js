/* Global Variables */
const key = 'a05d9352534ed5de4f19dd4cdbc7de64';
const url = 'https://api.openweathermap.org/data/2.5/weather?units=imperial&zip='

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth()+1) + '.'+ d.getDate()+'.'+ d.getFullYear();

document.getElementById('generate').addEventListener('click', action);
const feeling = document.getElementsByClassName('myInput');

const postData = async ( url = '/add', data = {})=>{
  const response = await fetch(url, {
    method: 'POST', 
    credentials: 'same-origin', 
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)     
  });
  try {
    const newData = await response.json();
    return newData;
  } catch(error) {
    console.log("Error details: ", error);
  }
};


function action(d){
  const newCountry =  document.getElementById('zip').value;
  getCountry(url, newCountry, key)
  .then(function(data) {
    postData('/add', {temperature: data.main.temp, date: newDate, response: feeling[0].value})

    updateUI() //update UI
  })
}

const getCountry = async (url, country, key)=>{
  const res = await fetch(url + country + '&appid=' + key)
  try {
    const data = await res.json();
    return data;
  } catch(error) {
    console.log("Error details: ", error);
  }
}

const updateUI = async () => {
  const request = await fetch('/all');
  try{
    const allData = await request.json();
    document.getElementById('temp').innerHTML = "Temperature: " + allData.temp;
    document.getElementById('date').innerHTML = "Date: " + allData.date;
    document.getElementById('content').innerHTML = "Feeling: " + allData.res;
  } catch(error) {
    console.log("Error details: ", error);
  }
}