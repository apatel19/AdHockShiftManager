var lat, long;
var currentUserId;
var verified = false;
var isManager = -1; // 0 means is employee; 1 means is manager, -1 means is not defined.
var auth = firebase.auth();
$(document).ready(function(){
    $("#btnSaveEmployeeDetails").click('input', function(){
        
        var email_address = $('#employee_email_address').val();
        
        document.getElementById("verified").className = 'hidden';
        document.getElementById("notVerified").className = 'hidden';
        verifyEmailWhichExistsInManagerDatabase(email_address);
    
        
        setTimeout(2500);

    });

    $("#btnSearch").click('input', function(){
    //    closeAllCards();

       $("#cardSearchResult").show();
        searchLogic();
    });


    $("#btnLoadSearchCard").click('input', function(){
        $("#divEmployeeDetails").hide();
        $("#cardSearchBox").show();
    });

    $("#btnLoadMyEmployee").click('input', function(){
        $("#divEmployeeDetails").show();
        $("#cardSearchBox").hide();
        $("#cardSearchResult").hide();
    });




    $("#btnManager").click('input', function(){
        $("#cardInitial").hide();
        $("#cardManagerSignUp").show();
    });

    $("#btnEmployee").click('input', function(){
        $("#cardInitial").hide();
        $("#cardEmployeeSignUp").show();
        
     });

     $("#btnSaveManagerDetails").click('input', function(){
        console.log("Button was clicked!");

        //authManager();
       
        var manager_email = $('#manager_email_address').val(); 
        var manager_pass = $("#manager_password").val(); 
       
        
       
        createUser(manager_email, manager_pass);
       
        callAPItoGetLongLatFromAddress($("#street_address").val(), $("#state").val(), $("#zip_code").val(), true);
        //setTimeout(addRepo,4000);
        
        //setTimeout(addManagerToDatabase(lat_and_long[0], lat_and_long[1]),2500);
        LoadManagerPortal();
       
    });

    $("#btnShowBusinessForm").click('input', function(){
     
        $("#cardAddBusiness").show();
        
     });

     $("#btnSignOut").click('input', function(){

        firebase.auth().signOut().then(function() {
            console.log('Signed Out');
          }, function(error) {
            console.error('Sign Out Error', error);
          });
     });

     $("#btnLogin").click('input', function(){
     
    closeAllCards();
    $("#cardLogin").show();
    $("#btnSignOut").hide();

        //getManagerDatabase();
         //verifyEmailWhichExistsInManagerDatabase("vidhipatel@gmail.com");

     });

     $("#btnAddMyEmployee").click('input', function(){
        $("#addEmployee").show();
     });

    
     $("#btnAddMyEmployeeEmail").click('input', function(){
        $("#addEmployee").hide();
        var autoid = makeid();
        var firebaseRef = firebase.database().ref().child('Manager').child(auth.currentUser.uid).child("Employer Emails");
        console.log($('#my_employee_email').val())
        firebaseRef.child(autoid).set($('#my_employee_email').val());

     });


     $("#btnSubmitLogin").click('input', function(){
        closeAllCards();
        auth.signInWithEmailAndPassword($('#login_email_address').val(), $('#login_password').val());

     setTimeout(loadCurrentUserID(auth),2500);
     
     });




     function searchLogic()
     {
        $("#search_street_address").val();
        $("#search_state").val();
        $("#search_county").val();
        $("#search_zip_code").val();

        callAPItoGetLongLatFromAddress(  $("#search_street_address").val(), $("#search_state").val(),  $("#search_zip_code").val(), false )
     }


     var monday = [];
     var tuesday = [];
     var wednesday = [];
     var thursday = [];
     var friday = [];
     var saturday = [];
     var sunday = [];
     var schedule = [];
     $("#btnTable").click('input', function(){

        console.log("Working");

        if (document.getElementById("Monday_Morning").checked){
            monday[0] = 1;
        } else {
            monday[0] = 0;
        }

        if (document.getElementById("Monday_Evening").checked){
            monday[1] = 1;
        } else {
            monday[1] = 0;
        }

        if (document.getElementById("Monday_Night").checked){
            monday[2] = 1;
        } else {
            monday[2] = 0;
        }

        var s = monday[0].toString() + monday[1].toString() + monday[2].toString();
        schedule.push(s);

        if (document.getElementById("Tuesday_Morning").checked){
            tuesday[0] = 1;
        } else {
            tuesday[0] = 0; 
        }

        if (document.getElementById("Tuesday_Evening").checked){
            tuesday[1] = 1;
        } else {
            tuesday[1] = 0;
        }
        
        if (document.getElementById("Tuesday_Night").checked){
            tuesday[2] = 1;
        } else {
            tuesday[2] = 0;
        }

        s = tuesday[0].toString() + tuesday[1].toString() + tuesday[2].toString();
        schedule.push(s);

        if (document.getElementById("Wednesday_Morning").checked){
            wednesday[0] = 1;
        } else {
            wednesday[0] = 0; 
        }

        if (document.getElementById("Wednesday_Evening").checked){
            wednesday[1] = 1;
        } else {
            wednesday[1] = 0;
        }
        
        if (document.getElementById("Wednesday_Night").checked){
            wednesday[2] = 1;
        } else {
            wednesday[2] = 0;
        }

        s = wednesday[0].toString() + wednesday[1].toString() + wednesday[2].toString();
        schedule.push(s);
        
        if (document.getElementById("Thursday_Morning").checked){
            thursday[0] = 1;
        } else {
            thursday[0] = 0; 
        }

        if (document.getElementById("Thursday_Evening").checked){
            thursday[1] = 1;
        } else {
            thursday[1] = 0;
        }
        
        if (document.getElementById("Thursday_Night").checked){
            thursday[2] = 1;
        } else {
            thursday[2] = 0;
        }

        s = thursday[0].toString() + thursday[1].toString() + thursday[2].toString();
        schedule.push(s);

        if (document.getElementById("Friday_Morning").checked){
            friday[0] = 1;
        } else {
            friday[0] = 0; 
        }

        if (document.getElementById("Friday_Evening").checked){
            friday[1] = 1;
        } else {
            friday[1] = 0;
        }
        
        if (document.getElementById("Friday_Night").checked){
            friday[2] = 1;
        } else {
            friday[2] = 0;
        }

        s = friday[0].toString() + friday[1].toString() + friday[2].toString();
        schedule.push(s);
        
        if (document.getElementById("Saturday_Morning").checked){
            saturday[0] = 1;
        } else {
            saturday[0] = 0; 
        }

        if (document.getElementById("Saturday_Evening").checked){
            saturday[1] = 1;
        } else {
            saturday[1] = 0;
        }
        
        if (document.getElementById("Saturday_Night").checked){
            saturday[2] = 1;
        } else {
            saturday[2] = 0;
        }

        s = saturday[0].toString() + saturday[1].toString() + saturday[2].toString();
        schedule.push(s);

        if (document.getElementById("Sunday_Morning").checked){
            sunday[0] = 1;
        } else {
            sunday[0] = 0; 
        }

        if (document.getElementById("Sunday_Evening").checked){
            sunday[1] = 1;
        } else {
            sunday[1] = 0;
        }
        
        if (document.getElementById("Sunday_Night").checked){
            sunday[2] = 1;
        } else {
            sunday[2] = 0;
        }

        s = sunday[0].toString() + sunday[1].toString() + sunday[2].toString();
        schedule.push(s);

        console.log(schedule);

        var uid = auth.currentUser.uid;
        console.log(uid);
        var firebaseRef = firebase.database().ref().child('Employee').child(uid);

        firebaseRef.child("Shchedule").set(schedule);
        schedule = [];
     });

});

function completeEmployeeCreation(email)
{
    var employee_password = $('#employee_password').val();
    setTimeout(createUser(email, employee_password), 2000);
    setTimeout(addEmployeeToDatabase, 2500);
    LoadEmployeePortal();
}



function verifyEmailWhichExistsInManagerDatabase(email){

    document.getElementById("verified").className = 'hidden';
    document.getElementById("notVerified").className = '';
    
    var leadsRef = firebase.database().ref('Manager');
    
    leadsRef.on('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
          var childData = childSnapshot.val();
          var json = JSON.stringify(childData["Employer Emails"]);
          console.log(json);
          if (json.includes(email)) {
             verified = true;
             document.getElementById("verified").className = '';
             document.getElementById("notVerified").className = 'hidden';
             completeEmployeeCreation(email);
          }
        }
        );
    }
    );
}


function getEmailsFromJson( string, distance, business )
{
    if (string !== null)
    {
    var emails = [];
    var x = string.split(':"');
    for (var i =1; i < x.length; i++ )
    {
    emails.push( x[i].split('"')[0], distance, business);
    }
   
    return emails;
    }
}

 function getEmployeeCloseToThisAddress(childDataArray, lat, long)
{
    var result = [];
    for(var i = 0; i < childDataArray.length; i++)
    {
        var distance =  differenceBetweenTwoLongLat(lat, long, childDataArray[i]['Lat'], childDataArray[i]['Long'] );
        if(distance != null)
        {
            if (distance < 10)
            {
                if(childDataArray[i]["Employer Emails"] !== undefined)
                {
                result = result.concat(getEmailsFromJson(JSON.stringify(childDataArray[i]["Employer Emails"]), distance, childDataArray[i]["Business"]['Bussiness Name'] + " : " + childDataArray[i]["Business"]['Street'] + ", " + childDataArray[i]["Business"]['County']  ));
                }
            }
        }
    //    console.log( differenceBetweenTwoLongLat(lat, long, childDataArray[i]['Lat'], childDataArray[i]['Long'] ));
        
    }
    return result;
}


function getManagerDatabase( lat, long){
 
    var leadsRef = firebase.database().ref('Manager');
    var result = [];
    leadsRef.on('value', function(snapshot) {
      
       
        var childDataArray = [];
        snapshot.forEach(function(childSnapshot) {
          var childData = childSnapshot.val();
          childDataArray.push(childData);
         

        //   console.log(json);
        //   if (json.includes(email)) {
        //      verified = true;
        //      document.getElementById("verified").className = '';
        //      document.getElementById("notVerified").className = 'hidden';
        //      completeEmployeeCreation(email);
          //}
        });
        // employee = employee.concat(getEmailsFromJson(JSON.stringify(childData["Employer Emails"])));
        // childDataArray.splice(-1,1)
        result = getEmployeeCloseToThisAddress(childDataArray, lat, long);
        createResultMarkUp(result);

        console.log(result);
    }
    );
    
}

function makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for (var i = 0; i < 5; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return text;
  }



  function closeAllCards()
  {
     $("#cardSearchBox").hide();
     $("#cardLogin").hide();
     $("#cardManagerSignUp").hide();
     $("#cardAddBusiness").hide();
     $("#cardEmployeeSignUp").hide();
     $("#cardInitial").hide();
     $("#cardEmployeePortal").hide();
     $("#cardManagerPortal").hide();
     $("#cardSearchResult").hide();

  }


function loadCurrentUserID(auth)
{
    currentUserId = auth.currentUserId;
    var email = $('#login_email_address').val();
    email = email.replace(".","");

    return firebase.database().ref('/position/' + email).once('value').then(function(snapshot) {
        if (snapshot["node_"]["value_"] == "Employee")
        {
            isManager = 0;
            LoadEmployeePortal();
        }
        else
        {
            isManager = 1;
            LoadManagerPortal();
        }

    });

}
function addManagerToDatabase (lat_a, long_a){
    var uid = auth.currentUser.uid;
     currentUserId = uid;
     isManager = 1;
    console.log(uid);
    var firebaseRef = firebase.database().ref().child('Manager').child(uid);
    var firebaseRef_position = firebase.database().ref().child("position");

    var manager_name = $("#manager_name").val();
    var manager_email = $('#manager_email_address').val(); 
    var phone_number = $("#manager_contact_number").val();
    var bussiness_name = $("#business_name").val()
    var store_number = $('#store_number').val();
    var bussiness_street = $('#street_address').val();
    var bussiness_county = $('#county').val();
    var bussiness_state = $('#state').val();
    var bussiness_zip = $('#zip_code').val();

    firebaseRef.child("Name").set(manager_name);
    firebaseRef.child("Email").set(manager_email);
    firebaseRef.child("Phone").set(phone_number);
    firebaseRef.child("Business").child("Bussiness Name").set(bussiness_name);
    firebaseRef.child("Business").child("Store Number").set(store_number);
    firebaseRef.child("Business").child("Street").set(bussiness_street);
    firebaseRef.child("Business").child("County").set(bussiness_county);
    firebaseRef.child("Business").child("State").set(bussiness_state);
    firebaseRef.child("Business").child("Zip").set(bussiness_zip);
    console.log(lat);
    firebaseRef.child("Business").child("Lat").set(lat_a);
    firebaseRef.child("Business").child("Long").set(long_a); 
    firebaseRef.child("Business").child("ID").set(uid);
    manager_email = manager_email.replace('.',""); 

    firebaseRef.child("Lat").set(lat);
    firebaseRef.child("Long").set(long); 
    firebaseRef.child("ID").set(uid);
    
    manager_email = manager_email.replace('.',"");
    console.log(manager_email);
    firebaseRef_position.child(manager_email).set("Manager");
    

}

// function authManager () {
//     var manager_pass = $("#manager_password").val();
//     var manager_email = $('#manager_email_address').val();
   
//     auth.createUserWithEmailAndPassword(manager_email, manager_pass);
    
// }

function createUser (email, password) {
    auth.createUserWithEmailAndPassword(email,password);
    console.log("Created User Successfully");
}


function LoadManagerPortal()
{
    $("#btnSignOut").show();
    closeAllCards();

    $("#cardManagerPortal").show();

                

var leadsRef = firebase.database().ref('/Manager/'+ auth.currentUser.uid +'/Employer Emails' );
var arrayofEmails = [];
    leadsRef.on('value', function(snapshot) {
        arrayofEmails = [];
        snapshot.forEach(function(childSnapshot) {
          var childData = childSnapshot.val();
          arrayofEmails.push(childData);
          console.log(childData);
          
        });
        console.log(arrayofEmails);
       createEmployeeListMarkUp(arrayofEmails);

    //    for (var i = 0; i <  snapshot.length; i++)
    //    {
    //     snapshot
    //    } 

});
    

}

function createEmployeeListMarkUp( emailArray )
{
    $("#yourEmployees").html(" ");
    $("#yourEmployees").append('<ul class="demo-list-icon mdl-list">');
    for (var i =0; i< emailArray.length; i++)
    {
    $("#yourEmployees").append(' <li class="mdl-list__item"> <span class="mdl-list__item-primary-content"><i class="material-icons mdl-list__item-icon">person</i> ' +  emailArray[i] +' </span> </li>');
    }
    $("#yourEmployees").append('</ul>');
}


function createResultMarkUp( results )
{
    $("#searchResults").html(" ");
    $("#searchResults").append('<ul class="demo-list-icon mdl-list">');
    for (var i =0; i< results.length; i+=3)
    {
    $("#searchResults").append(' <li class="mdl-list__item mdl-list__item--two-line "> <span class="mdl-list__item-primary-content"><i class="material-icons mdl-list__item-icon">person</i> ' +  results[i] +' </span> <span class="mdl-list__item-sub-title"> '+ results[i+1].toFixed(2)  +" miles,  " + results[i+2] +'</span> </li>');
    }
    $("#searchResults").append('</ul>');
}


function LoadEmployeePortal()
{
    closeAllCards()
  
    $("#cardEmployeePortal").show();
}


// function callAPItoGetLongLatFromAddress() {
//     var street = $("#street_address").val();
//     street = street.split(' ').join('');
//     $.ajax({
//         url: "http://dev.virtualearth.net/REST/v1/Locations?CountryRegion=US&adminDistrict=" + $("#state").val() + "&locality=Somewhere&postalCode=" + $("#zip_code").val() + "&addressLine=" + street + "&key=At1MPmDJGjOFF6WZ8rwDyhTn-ZHwl7MAQaeMuIunNCcdk6bYznOGuILjZ2ts5YVp",
//         jsonp: true,
//         method: "GET",
//         dataType: "json",
//         success: function(res) {

//             lat = res["resourceSets"][0]["resources"][0]["geocodePoints"][0]["coordinates"][0];
//             long = res["resourceSets"][0]["resources"][0]["geocodePoints"][0]["coordinates"][1];

//             console.log(lat);
//             console.log(long);

//         },

//         error : function(res) {
//             console.log(res);
//         }
//     });
// }

function buildAPI (street, state, zipcode) {
    street = street.split(' ').join('');
    return "http://dev.virtualearth.net/REST/v1/Locations?CountryRegion=US&adminDistrict=" + state + "&locality=Somewhere&postalCode=" + zipcode + "&addressLine=" + street + "&key=At1MPmDJGjOFF6WZ8rwDyhTn-ZHwl7MAQaeMuIunNCcdk6bYznOGuILjZ2ts5YVp"
}

function differenceBetweenTwoLongLat (lat1, long1, lat2, long2){
        let p = 0.017453292519943295;    // (pi / 180)
        let a = 0.5 - Math.cos((lat2 - lat1) * p)/2 +
            Math.cos(lat1 * p) * Math.cos(lat2 * p) *
            (1 - Math.cos((long2 - long1) * p))/2;
        return ((12742 * Math.asin(Math.sqrt(a)) * (0.621371))) // returning answer in mile
}

function callAPItoGetLongLatFromAddress (street, state, zipcode, check){
    $.ajax({
        url: buildAPI(street,state,zipcode),
        jsonp: true,
        method: "GET",
        dataType: "json",
        success: function(res) {

            var lat_a = res["resourceSets"][0]["resources"][0]["geocodePoints"][0]["coordinates"][0];
            var long_a = res["resourceSets"][0]["resources"][0]["geocodePoints"][0]["coordinates"][1];

            console.log(lat_a);
            console.log(long_a);
            if (check) {
             addManagerToDatabase(lat_a, long_a);
            } else {
                lat = lat_a;
                long = long_a;

                getManagerDatabase(lat,long);
                
            }
            // console.log(lat);
            // console.log(long);
        },
        error : function(res) {
            console.log(res);
        }
    });
}



//http://dev.virtualearth.net/REST/v1/Locations?CountryRegion=US&adminDistrict=AL&locality=Somewhere&postalCode=35401&addressLine=900%Hargrove%Road&key=At1MPmDJGjOFF6WZ8rwDyhTn-ZHwl7MAQaeMuIunNCcdk6bYznOGuILjZ2ts5YVp


function addEmployeeToDatabase() {

    var uid = auth.currentUser.uid;
    console.log(uid);
    var firebaseRef = firebase.database().ref().child('Employee').child(uid);
    var firebaseRef_position = firebase.database().ref().child("position");
    


    var employee_name = $('#employee_name').val();
    var phone_number = $('#employee_phone_number').val();
    var email_address = $('#employee_email_address').val();
    //var employee_password = $('#employee_password').val();
    var social_security_number = $('#employee_social_security_number').val();
    
    firebaseRef.child("Name").set(employee_name);
    firebaseRef.child("Phone").set(phone_number);
    firebaseRef.child("Email").set(email_address);
    firebaseRef.child("SSN").set(social_security_number);
    firebaseRef.child("ID").set(uid);

    email_address = email_address.replace('.',"");
    console.log(email_address);
    firebaseRef_position.child(email_address).set("Employee");

}