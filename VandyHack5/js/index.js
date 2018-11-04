var lat, long;
var currentUserId;
var isManager = -1; // 0 means is employee; 1 means is manager, -1 means is not defined.
var auth = firebase.auth();
$(document).ready(function(){
    $("#btnSaveEmployeeDetails").click('input', function(){
        
        var email_address = $('#employee_email_address').val();
        console.log(email_address);
        verifyEmailWhichExistsInManagerDatabase(email_address);
        var employee_password = $('#employee_password').val();
        createUser(email_address, employee_password);
        setTimeout(addEmployeeToDatabase, 2500);
        LoadEmployeePortal();
       
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
        callAPItoGetLongLatFromAddress();
        //setTimeout(addRepo,4000);
        setTimeout(addManagerToDatabase,2500);
        LoadManagerPortal();
       
    });

    $("#btnShowBusinessForm").click('input', function(){
        $("#cardManagerSignUp").hide();
        $("#cardAddBusiness").show();
        
     });

     $("#btnLogin").click('input', function(){
        $("#btnSignOut").hide();
        $("#cardLogin").show();
        $("#cardManagerSignUp").hide();
        $("#cardAddBusiness").hide();
        $("#cardEmployeeSignUp").hide();
        $("#cardInitial").hide();


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

     
     auth.signInWithEmailAndPassword($('#login_email_address').val(), $('#login_password').val());
     setTimeout(loadCurrentUserID(auth),2500);
     
    
     });
});

function verifyEmailWhichExistsInManagerDatabase(email){

    // var leadsRef = firebase.database().ref('Manager');
    // leadsRef.on('value', function(snapshot) {
    //     snapshot.forEach(function(childSnapshot) {
    //       var childData = childSnapshot.val();
    //       console.log(childData["Bussiness Name"]);
    //     });
    // });
   

}

function makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for (var i = 0; i < 5; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return text;
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
function addManagerToDatabase (){
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
    firebaseRef.child("Business").child("Lat").set(lat);
    firebaseRef.child("Business").child("Long").set(long); 
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
    $("#btnSignOut").hide();
    $("#cardLogin").hide();
    $("#cardManagerSignUp").hide();
    $("#cardAddBusiness").hide();
    $("#cardEmployeeSignUp").hide();
    $("#cardInitial").hide();
    $("#cardEmployeePortal").hide();

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
    $("#yourEmployees").append(' <li class="mdl-list__item"> <span class="mdl-list__item-primary-content"><i class="material-icons mdl-list__item-icon">person</i> ' +  emailArray[i] +' </span> </li>"');
    }
    $("#yourEmployees").append('</ul>');
}


function LoadEmployeePortal()
{
    $("#btnSignOut").hide();
    $("#cardLogin").hide();
    $("#cardAddBusiness").hide();

    $("#cardManagerSignUp").hide();
    $("#cardEmployeeSignUp").hide();
    $("#cardInitial").hide();
    $("#cardManagerPortal").hide();
  
    $("#cardEmployeePortal").show();
}


function callAPItoGetLongLatFromAddress() {
    var street = $("#street_address").val();
    street = street.split(' ').join('');
    $.ajax({
        url: "http://dev.virtualearth.net/REST/v1/Locations?CountryRegion=US&adminDistrict=" + $("#state").val() + "&locality=Somewhere&postalCode=" + $("#zip_code").val() + "&addressLine=" + street + "&key=At1MPmDJGjOFF6WZ8rwDyhTn-ZHwl7MAQaeMuIunNCcdk6bYznOGuILjZ2ts5YVp",
        jsonp: true,
        method: "GET",
        dataType: "json",
        success: function(res) {

            lat = res["resourceSets"][0]["resources"][0]["geocodePoints"][0]["coordinates"][0];
            long = res["resourceSets"][0]["resources"][0]["geocodePoints"][0]["coordinates"][1];

            console.log(lat);
            console.log(long);

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