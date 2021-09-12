const axios = require('axios');
const npmRegUrl = `https://registry.npmjs.org/`;

async function sendRequest(options){
    try {
        const response = await axios(options);
        return response.data;

    } catch (err) {
        console.log(err)
    }
}

const getPackageDataFromNpmReg = async packageName => {
    return sendRequest({
        method: 'GET',
        url: `${npmRegUrl}${packageName}`
    });
};

module.exports = {
    getPackageDataFromNpmReg
};
