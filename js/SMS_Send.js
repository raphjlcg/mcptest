const options = {
	method: 'POST',
	headers: {
		'X-RapidAPI-Key': 'dfef434f27msh09bc0bbda29bdf7p17f67cjsnffa571e65b10',
		'X-RapidAPI-Host': 'telesign-telesign-send-sms-verification-code-v1.p.rapidapi.com'
	}
};

fetch('https://telesign-telesign-send-sms-verification-code-v1.p.rapidapi.com/sms-verification-code?phoneNumber=09612382654&verifyCode=50699', options)
	.then(response => response.json())
	.then(response => console.log(response))
	.catch(err => console.error(err));
