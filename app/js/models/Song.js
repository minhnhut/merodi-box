import AV from "av";
var FileAPI = require('file-api');
var File = FileAPI.File;

class Song {
    constructor(title, filepath) {
        this.title = title; // string
        this.filepath = filepath; // string
    }

    getAsset() {
        // lazy load meta
        if (!this.asset) {
            this.asset = AV.Asset.fromURL(this.filepath);
        }
        return this.asset;
    }

    getFilepath() {
        return this.filepath;
    }

    getDuration(callback) {
        asset.get('duration', function(duration) {
            if (callback) {
                callback(duration);
            }
        });
    }

    getFile() {
        if (!this.file) {
            this.file = new File(this.filepath);
        }
        return this.file;
    }
}

export default Song;