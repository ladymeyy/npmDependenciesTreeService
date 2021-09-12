const { getPackageDataFromNpmReg } = require('../connectors/npmRegistryAPI');
const redisAPI = require('../connectors/redisAPI');

const getPackageDataByName = async packageName =>{
    try {
        const packageDataRedis = await redisAPI.getPackageData(packageName);
        if(packageDataRedis){
            return packageDataRedis;
        }else{
            const packageData = await getPackageDataFromNpmReg(packageName);
            redisAPI.setPackageData(packageName, packageData);
            return packageData;
        }
    } catch (err) {
        console.log(err)
    }
};

const getDepsRec = async dependenciesPackages => {
    const result = [];
    try {
        for (const packageName of Object.keys(dependenciesPackages)) {
            const npmPackageData = await getPackageDataByName(packageName);
            const version = dependenciesPackages[packageName].replace(/^\D*/,''); // todo semver
            const dependencies = npmPackageData.versions[version].dependencies ?
               await getDepsRec(npmPackageData.versions[version].dependencies) : undefined;
            result.push({packageName, version, dependencies})
        }
        return await Promise.all(result);
    } catch (err) {
        console.log(err)
    }
};

const getNpmPackageDeps = async(packageName, version)=>{
    try {
        return await getDepsRec({[packageName]:version})

    } catch(err) {
        console.log(err)
    }
};

module.exports = {
    getNpmPackageDeps
};
