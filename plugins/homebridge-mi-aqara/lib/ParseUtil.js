const GatewayParser = require('./../parser/GatewayParser');
const ButtonParser = require('./../parser/ButtonParser');

class ParseUtil {
    constructor(platform) {
        this.platform = platform;
        this.parsers = {
            'gateway': new GatewayParser(platform), // 网关
            'switch': new ButtonParser(platform) // 按钮
        }
    }

    getByModel(model) {
        return (model in this.parsers) ? this.parsers[model]: null;
    }

    getCreateAccessories(jsonObj) {
        var result = [];

        var model = jsonObj['model'];
        var parser = this.getByModel(model);
        if(parser) {
            result = parser.getCreateAccessories(jsonObj);
        }

        return result;
    }

    parserAccessories(jsonObj) {
        var result = [];

        var model = jsonObj['model'];
        var parser = this.getByModel(model);
        if(parser) {
            result = parser.parserAccessories(jsonObj);
        }

        return result;
    }

    getAccessoriesUUID(sid, deviceModel) {
        var result = [];

        var parser = this.getByModel(deviceModel);
        if(parser) {
            result = parser.getAccessoriesUUID(sid);
        }

        return result;
    }
}

module.exports = ParseUtil;