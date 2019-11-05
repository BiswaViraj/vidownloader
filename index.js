const readline = require("readline");
const path = require("path");
const fs = require("fs");
const homedir = require("os").homedir();
const ytdl = require("ytdl-core");

const download = (title, quality, url) => {
    let folder = "Downloads/video";
    const output = path.resolve(homedir, `./${folder}/${title}.mp4`);
    let dir = `${homedir}/${folder}`;
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(path.join(homedir, folder));
    }
    const video = ytdl(url, {
        filter: format => format.resolution === quality
    });
    video.pipe(fs.createWriteStream(output));
    let starttime;
    video.once("response", () => {
        starttime = Date.now();
    });
    video.on("progress", (chunkLength, downloaded, total) => {
        const percent = downloaded / total;
        const downloadedMinutes = (Date.now() - starttime) / 1000 / 60;
        readline.cursorTo(process.stdout, 0);
        process.stdout.write(`${(percent * 100).toFixed(2)}% downloaded `);
        process.stdout.write(
            `(${(downloaded / 1024 / 1024).toFixed(2)}MB of ${(
                total /
                1024 /
                1024
            ).toFixed(2)}MB)\n`
        );
        process.stdout.write(
            `estimated download time left: ${(
                downloadedMinutes / percent -
                downloadedMinutes
            ).toFixed(2)}minutes `
        );
        readline.moveCursor(process.stdout, 0, -1);
    });

    video.on("end", () => {
        process.stdout.write("\n\n");
    });
};

module.exports = download;
