let fs= require('fs');
let AdmZip = require('adm-zip');
let csv_sync_parse = require('csv-parse/lib/sync');

let zip = new AdmZip("./model/archives/data.zip");
    let zipEntries = zip.getEntries(); 
 
	//Extracts files
    let users_files_names = zipEntries.map( function(item){
	let itemName = item.name
	if( itemName.search(/^users[0-9]{1,5}.csv$/) === 0 ){
		return itemName
	}
} )


// outputs the content users_files_names
let usersDataArray= users_files_names.map( 
	function(item){
		return zip.readAsText(item)
} )

// field delimiter '||'
let users= usersDataArray.map( function(item){
	return csv_sync_parse( item, {delimiter: '||'} )
} )