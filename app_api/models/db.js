const mongoose = require('mongoose');
const host = process.env.DB_HOST || '127.0.0.1'
const dbURI = `mongodb://${host}/travlr`;
const readLine = require('readline');

//mongoose.set('useUnifiedTopology', true);

const connect = () => {
    setTimeout(() => mongoose.connect(dbURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }), 1000);
}

mongoose.connection.on('connected', () => {
    console.log(`Mongoose connected to ${dbURI}`); 
}); 

mongoose.connection.on('error', err => {
    console.log(`Mongoose connection error: ${err}`);
    return connect();
}); 

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected'); 
}); 

if (process.platform === 'win32') {
    const rl = readLine.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    rl.on('SIGINT', () => {
        process.emit("SIGINT");
    });
}

const gracefulShutdown = (msg, exitCode) => {
    mongoose.connection.close()
        .then(() => {
            console.log(`Mongoose disconnected through ${msg}`);
            process.exit(exitCode);
        })
        .catch((err) => {
            console.error(`Mongoose disconnected through ${msg} failed`, err);
            process.exit(1);
        });
};

// For nodemon restarts
process.once('SIGUSR2', () => {
    gracefulShutdown('nodemon restart', null);
    process.kill(process.pid, 'SIGUSR2');
});

// For app termination
process.on('SIGINT', () => {
    gracefulShutdown('app termination', 0);
});

// For Heroku app termination
process.on('SIGTERM', () => {
    gracefulShutdown('Heroku app shutdown', 0);
});

connect();

require('./travlr');
require('./user')