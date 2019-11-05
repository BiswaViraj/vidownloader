#!/usr/bin/env node

const program = require("commander");
const download = require("./index");

program.version("1.0.0").description("Download Youtube Videos");

program
    .command("download <title> <quality> <url>")
    .alias("d")
    .description("Download Youtube Video")
    .action((title, quality, url) => {
        console.log(`Downloading ${title}`);
        download(title, quality, url);
    });

program.parse(process.argv);
