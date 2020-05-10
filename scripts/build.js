const spawn = require('cross-spawn');

spawn('sh', ['retrieve_data.sh'], {stdio: 'inherit'});