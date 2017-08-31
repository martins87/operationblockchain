var blockchain;
			
function newBlock(){
	var index = blockchain.chain.length;
	var timestamp = getTimestamp();
	var data = document.getElementById("data").value;
	var newBlock = new Block(index, timestamp, data, '');
	blockchain.addBlock(newBlock);
}
			
function createBlockchain(){
	blockchain = new Blockchain();
	addNewBlockData();
}
			
function addNewBlockData(){
	var newBlockData = '';
	var block = blockchain.getLatestBlock();
	newBlockData += "<b>Block #" + block.index + "</b><br>";
	newBlockData += "Index: " + block.index + "<br>";
	newBlockData += "Timestamp: " + block.timestamp + "<br>";
	newBlockData += "Data: "  + block.data + "<br>";
	newBlockData += "Previos hash: " + block.previousHash + "<br>";
	newBlockData += "Hash: " + block.hash + "<br><br>";
	document.getElementById("blockchain1").innerHTML += newBlockData;
}
			
function printBlockchain(){
	var blockHeight = blockchain.chain.length;
	var newBlockData = '';
	var block;
	for(i = blockHeight-1; i >= 0; i--){
		block = blockchain.chain[i];
		newBlockData += "<b>Block #" + block.index + "</b><br>";
		newBlockData += "Index: " + block.index + "<br>";
		newBlockData += "Timestamp: " + block.timestamp + "<br>";
		newBlockData += "Data: "  + block.data + "<br>";
		newBlockData += "Previos hash: " + block.previousHash + "<br>";
		newBlockData += "Hash: " + block.hash + "<br>";
		document.getElementById("blockchain1").innerHTML += newBlockData;
	}
}

function getTimestamp(){
	var timestamp = 0;
	var date = new Date();
	var month = date.getUTCMonth().toString();
	month = (month.length < 2) ? '0' + month : month;
	var day = date.getUTCDate().toString();
	day = (day.length < 2) ? '0' + day : day;
	var year = date.getUTCFullYear().toString();
	var hours = (date.getUTCHours() + 1).toString();
	hours = (hours.length < 2) ? '0' + hours : hours;
	var minutes = (date.getUTCMinutes() + 1).toString();
	minutes = (minutes.length < 2) ? '0' + minutes : minutes;
	var seconds = (date.getUTCSeconds() + 1).toString();
	seconds = (seconds.length < 2) ? '0' + seconds : seconds;
	timestamp = '' + year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;
	return timestamp;
}

class Block{
	
	constructor(index, timestamp, data, previousHash = ''){
		this.index = index + '';
		this.timestamp = timestamp;
		this.data = data + '';
		this.previousHash = previousHash;
		this.hash = this.calculateHash();
	}
	
	calculateHash(){
		return SHA256(this.index + this.timestamp + this.data + this.previousHash);
	}
	
}

class Blockchain{
	
	constructor(){
		this.chain = [this.createGenesisBlock()];
	}
	
	createGenesisBlock(){
		return new Block(0, getTimestamp(), 50, 0);
	}
	
	getLatestBlock(){
		return this.chain[this.chain.length - 1];
	}
	
	addBlock(newBlock){
		newBlock.previousHash = this.getLatestBlock().hash;
		newBlock.hash = newBlock.calculateHash();
		this.chain.push(newBlock);
	}
	
	isChainValid(){
		for(let i = 1; i < this.chain.length; i++){
			const currentBlock = this.chain[i];
			const previousBlock = this.chain[i - 1];
			if(currentBlock.hash !== currentBlock.calculateHash()){
				return false;
			}
			if(currentBlock.previousHash !== previousBlock.hash){
				return false;
			}
		}
		return true;
	}
}