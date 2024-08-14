const { Midi } = require('@tonejs/midi');
const fs = require('node:fs');
const path = require('node:path');

// Loop all midi files
const midiFolder = 'midi';
const jsonFolder = 'json';

try {
	if (!fs.existsSync(midiFolder)) {
		fs.mkdirSync(midiFolder);
	}
} catch (err) {
	console.error(err);
}

try {
	if (!fs.existsSync(jsonFolder)) {
		fs.mkdirSync(jsonFolder);
	}
} catch (err) {
	console.error(err);
}


const files = fs.readdirSync(midiFolder).forEach(file => {
	var fileDir = path.join(midiFolder, file);
	var ext = path.parse(fileDir).ext;
	if ((ext!=".mid")&&(ext!=".midi")) {return;}
	var data = fs.readFileSync(fileDir);
	var midi = new Midi(data);
	var outputFileDir = path.join(jsonFolder, path.parse(file).name+".json")
	fs.writeFileSync(outputFileDir, JSON.stringify(midi.toJSON()));
	console.log(fileDir+" -> "+outputFileDir);
});

