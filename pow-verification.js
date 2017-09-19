var data;

function mine(){

	var zeros = document.getElementById("num-of-zeros").value;
	switch(zeros){
		case '1':
		case '2':
		case '3':
		case '4':
			break;
		default:
			setErrorText();
			return;
	}
	
	var numOfZeros = parseInt( zeros );

	data = document.getElementById("data").value;
	var digest = SHA256(data);
	var i = 0;
	
	while(!nonceFound(digest, numOfZeros)){
		i++;
		digest = SHA256(data + i);
	}
	
	setData(i, digest);
}

function nonceFound(digest, numOfZeros){
	var zeros = '';
	for(let i = 0; i < numOfZeros; i++){
		zeros += '0';
	}
	if(digest.slice(0, numOfZeros) == zeros){
		return true;
	} else {
		return false;
	}
}

function setData(i, digest){
	var p = document.getElementById("digest");
	p.innerHTML += 'Number of iterations: ' + (i+1) + '<br>';
	if(i == 0){
		p.innerHTML += 'Nonce: \"\"<br>';
	} else {
		p.innerHTML += 'Nonce: ' + i + '<br>';
	}
	p.innerHTML += 'Hash: ' + digest + '<br><br>';
	
}

function setErrorText(){
	var p = document.getElementById("digest");
	p.innerHTML += 'The input must be 1, 2, 3 or 4. Please try again.<br><br>';
}
