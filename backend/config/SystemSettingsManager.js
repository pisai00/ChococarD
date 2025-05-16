// managers/SystemSettingsManager.js

const config = require('../config/systemSettings.json');

class SystemSettingsManager {
    getGameVersion() {
        return config.gameVersion;
    }

    
}

const systemSettingsManager = new SystemSettingsManager();
module.exports = systemSettingsManager;