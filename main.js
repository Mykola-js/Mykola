let fs= require('fs');
let AdmZip = require('adm-zip');

let zip = new AdmZip("./model/archives/data.zip");
    let zipEntries = zip.getEntries(); 
 
	//Extracts files
    let users_files_names = zipEntries.map( function(item){
	let itemName = item.name
	if( itemName.search(/^users[0-9]{1,5}.csv$/) === 0 ){
		return itemName
	}
} )


