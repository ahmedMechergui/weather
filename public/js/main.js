console.log('client side javascript running...');


const weatherForm = document.querySelector('form')
const locationInput = document.querySelector('input')
const paragraphOne = document.querySelector('#message-1')
const paragraphTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit',(event)=>{
    event.preventDefault();
    paragraphOne.innerHTML = 'Loading...';
    paragraphTwo.innerHTML = '';
    const location = locationInput.value;
    fetch('/weather?address='+location).then((response)=>{
        response.json().then((data)=>{
            if (data.error){
                paragraphOne.innerHTML = data.error
            }else {
                paragraphOne.innerHTML = data.location;
                paragraphTwo.innerHTML = data.forecast
            }
        })
    });

})
