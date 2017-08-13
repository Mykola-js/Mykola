let fs= require('fs');
let AdmZip = require('adm-zip');
let csv_sync_parse = require('csv-parse/lib/sync');
let jsonfile = require('jsonfile');

let zip = new AdmZip("./model/archives/data.zip");
    let zip_Entries = zip.getEntries();

	//Extracts files
  function users_files_names() {

    let result = [];

      for (let i = 0, len = zip_Entries.length; i < len; i++) {

           let itemName = zip_Entries[i].name

          if( itemName.search(/^users[0-9]{1,5}.csv$/) === 0 ){

            result.push(itemName)
        	}
      }
    return result
  }

  // outputs the content users_files_names
  function users_Data_Array() {

    let result = [];

      for (let i = 0, len =  users_files_names().length; i < len; i++) {

        result.push(zip.readAsText(users_files_names()[i]))
      }
    return result
  }

// field delimiter '||' and // // // removing field declarations!!
function users() {

  let result = [];

    for (let i = 0, len = users_Data_Array().length; i < len; i++) {

      result.push(csv_sync_parse( users_Data_Array()[i], {delimiter: '||'} ))

        // // // removing field declarations!!
       result[i].shift()//
       // // //
    }
return result
}

// // concating all arrays in one
let users_All= [].concat.apply([], users())

//location users.json
let JSON_file = './model/users.json'
fs.unlink( JSON_file )

// // Interface formation
function date_format() {
  let user_data ;
    for (let i = 0, len = users_All.length; i < len; i++) {

        //  Date formatting
         let date_format = users_All[i][8].split('/')

         user_data= {
          		"name": `${users_All[i][0]} ${users_All[i][1]}`,
          		"phone": users_All[i][5].replace(/[() -]/g, ''),
          		"person": {
          			"firstName": users_All[i][0],
          			"lastName": users_All[i][1],
          		},
          		"amount": users_All[i][7],
          		"date": date_format[2]+'-'+date_format[1]+'-'+date_format[0],
          		"costCenterNum": users_All[i][6].match(/[0-9]{1,}/)[0]
          	}

            jsonfile.writeFileSync(JSON_file, user_data, {flag: 'a'})
    }
}
date_format()
