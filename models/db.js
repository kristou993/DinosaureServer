const mongoose = require('mongoose');
const chalk = require('chalk');
const ora = require('ora');

const spinner = ora('Trying to connect to the database ..').start();


mongoose.connect('mongodb://localhost/' + 'examen', (err, res) => {
    if(err) return console.log('Database connection error: ' + err);
    spinner.stop();
    console.log(chalk.bgGreen.black('  DONE  '), chalk.green('Connection with database has been established!'));
});

module.exports = mongoose.connection;