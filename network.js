var database = firebase.database();


console.log(database);
database.ref("message").set("test");