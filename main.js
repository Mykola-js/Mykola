let fs= require('fs');
let AdmZip = require('adm-zip');
let csv_sync_parse = require('csv-parse/lib/sync');
let jsonfile = require('jsonfile');


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

// removing field declarations
users.map( function(item){
	item.shift()
} )

// concating all arrays in one
let users_All= [].concat.apply([], users)


//location users.json
let JSON_file = './model/users.json'
fs.unlink( JSON_file )

// Interface formation
users_All.map( function(user){
	
	//Date formatting
	let date_format = user[8].split('/')
			
	let user_data= {
		"name": `${user[0]} ${user[1]}`,
		"phone": user[5].replace(/[() -]/g, ''),
		"person": {
			"firstName": user[0],
			"lastName": user[1],
		},
		"amount": user[7],
		"date":  date_format[2]+'-'+date_format[1]+'-'+date_format[0],
		"costCenterNum": user[6].match(/[0-9]{1,}/)[0] 
	}
	jsonfile.writeFileSync(JSON_file, user_data, {flag: 'a'})
} )