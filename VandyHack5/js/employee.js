$(document).ready(function(){
    $("#pic1Input").change(function(event){
        $('#pic1')
            .attr('src', event.target.result)
            .width(150)
            .height(200);
    });
    $("#pic2Input").change(function(event){
        $('#pic2')
            .attr('src', event.target.result)
            .width(150)
            .height(200);
    });
    $("#btnSaveEmployeeDetails").click('input', function(){
        
       addEmployee();
       
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

        addRepo();

        setTimeout(addManagerToDatabase,3000);

       
    });

    $("#btnShowBusinessForm").click('input', function(){
        $("#cardManagerSignUp").hide();
        $("#cardAddBusiness").show();
        
     });

});



function addManagerToDatabase (){

    var firebaseRef = firebase.database().ref().child('Manager');

    var auth = firebase.auth();

    var manager_name = $("#manager_name").val();
    var manager_pass = $("#manager_password_manager").val();
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
    firebaseRef.child("Bussiness Name").set(bussiness_name);
    firebaseRef.child("Store Number").set(store_number);
    firebaseRef.child("Street").set(bussiness_street);
    firebaseRef.child("County").set(bussiness_county);
    firebaseRef.child("State").set(bussiness_state);
    firebaseRef.child("Zip").set(bussiness_zip);
   
    console.log(lat);
    console.log(long);


    firebaseRef.child("Lat").set(lat);
    firebaseRef.child("Long").set(long); 

    
    //auth.createUserWithEmailAndPassword(manager_email, manager_pass);
   
    

}

var lat, long;
function addRepo() {
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

        },

        error : function(res) {
            console.log(res);
        }
    });
}

//http://dev.virtualearth.net/REST/v1/Locations?CountryRegion=US&adminDistrict=AL&locality=Somewhere&postalCode=35401&addressLine=900%Hargrove%Road&key=At1MPmDJGjOFF6WZ8rwDyhTn-ZHwl7MAQaeMuIunNCcdk6bYznOGuILjZ2ts5YVp


function addEmployee()
{

    var employee_name = $('#employee_name').val();
        var phone_number = $('#phone_number').val();
        var email_address = $('#email_address').val();
        var social_security_number = $('#social_security_number').val();
    var random = "employee";
    firebaseRef.child(random).child("employee_name").set(employee_name);
    firebaseRef.child(random).child("phone_number").set(phone_number);
    firebaseRef.child(random).child("email_address").set(email_address);
    firebaseRef.child(random).child("social_security_number").set(social_security_number);
}