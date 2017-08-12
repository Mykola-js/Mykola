let fs= require('fs');
let AdmZip = require('adm-zip');

var zip = new AdmZip("./model/archives/data.zip");
    var zipEntries = zip.getEntries(); 
 
    