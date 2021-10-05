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

const getDogPic = async () => {
    try {
        const data = await readFilePro(`${__dirname}/dog.txt`);
        console.log(`Breed: ${data}`);
        const res = await superagent.get(
            `https://dog.ceo/api/breed/${data}/images/random`
        );
        console.log(res.body.message);
        await writeFilePro('dog-img.txt', res.body.message);
        console.log('Random Dog image saved!');
    } catch (err) {
        console.log(err);
    }
};

getDogPic();