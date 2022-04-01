const fetch = require("node-fetch");
const readlineSync = require("readline-sync");
const chalk = require("chalk");

(async () => {

    const getData = (username) => new Promise((resolve,reject) => {
        fetch("https://api.github.com/users/" + username, {
          method: "GET",
        })
          .then((res) => res.json())
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
    });


    (async () => {
        const username = readlineSync.question('[!] Username : ')
        const data = await getData(username)
        const message = data['message'];
        const usernamegithub = data['login']
        console.log('\n')
        if (usernamegithub) {
        console.log(chalk.green('[')+chalk.white('|')+chalk.green(']'), chalk.white(`Information Detail : https://github.com/users/${username}`))
        console.log(chalk.green('[')+chalk.white('|')+chalk.green(']'), chalk.white(`Username           : ${data['login']}`))
        console.log(chalk.green('[')+chalk.white('|')+chalk.green(']'), chalk.white(`Following          : ${data['following']}`))
        console.log(chalk.green('[')+chalk.white('|')+chalk.green(']'), chalk.white(`Followers          : ${data['followers']}`))
        } else if (message) {
        console.log(chalk.green('[')+chalk.white('|')+chalk.green(']'), chalk.white(`Users Not Found`))

        }
    })();
})();
