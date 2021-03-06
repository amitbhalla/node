const fs = require('fs');
const superagent = require('superagent');

const readFilePro = (file) => {
    return new Promise((resolve, reject) => {
        fs.readFile(file, (err, data) => {
            if (err) {
                reject('Error accessing the file!');
            } else {
                resolve(data);
            }
        });
    });
};

const writeFilePro = (file, data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(file, data, (err, data) => {
            if (err) {
                reject('Error accessing the file!');
            } else {
                resolve(data);
            }
        });
    });
};

readFilePro(`${__dirname}/dog.txt`)
    .then((data) => {
        console.log(`Breed: ${data}`);
        return superagent.get(
            `https://dog.ceo/api/breed/${data}/images/random`
        );
    })
    .then((res) => {
        return writeFilePro('dog-img.txt', res.body.message);
    })
    .then(() => {
        console.log('Random Dog image saved!');
    })
    .catch((err) => {
        console.log(err.message);
    });
