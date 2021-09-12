const redis = require('redis');
const client = redis.createClient({
    host: 'redis-server',
    port: 6379
});

const util = require('util');
client.get = util.promisify(client.get); //not the best practice here

client.on('connect', function() {
    console.log('Connected to Redis!');
});

function packageNameToRedisKey(packageName){
    return `${packageName}-packageData`
}


const getPackageData = async packageName => {
    try {
        const data = await client.get(packageNameToRedisKey(packageName));
        return data? JSON.parse(data): data;

    }catch (err) {
             console.error(err)
    }
};

const setPackageData = (packageName, packageData) => {
    //redis key expires every 24hr - for updating version here && not keeping redundant data
    client.setex(packageNameToRedisKey(packageName), 86400, JSON.stringify(packageData));
};

module.exports ={
    setPackageData,
    getPackageData

};
