$(document).ready(function(){
    $("#btnSaveManagerDetails").click('input', function(){
        console.log("Button was clicked!");

        addRepo();

        setTimeout(addManagerToDatabase,3000);

       
    });

});

function addManagerToDatabase (){

    var firebaseRef = firebase.database().ref().child('Manager');

    var auth = firebase.auth();

    var manager_name = $("#manager_name").val();
    var manager_pass = $("#pass_manager").val();
    var manager_email = $('#email_address').val();
    var phone_number = $("#phone_number").val();
    var bussiness_name = $("#bussiness_name").val()
    var store_number = $('#store_number').val();
    var bussiness_street = $('#street').val();
    var bussiness_county = $('#county').val();
    var bussiness_state = $('#state').val();
    var bussiness_zip = $('#zip').val();

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
    var street = $("#street").val();
    street = street.split(' ').join('');
    $.ajax({
        url: "http://dev.virtualearth.net/REST/v1/Locations?CountryRegion=US&adminDistrict=" + $("#state").val() + "&locality=Somewhere&postalCode=" + $("#zip").val() + "&addressLine=" + street + "&key=At1MPmDJGjOFF6WZ8rwDyhTn-ZHwl7MAQaeMuIunNCcdk6bYznOGuILjZ2ts5YVp",
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
