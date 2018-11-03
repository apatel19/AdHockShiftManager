$(document).ready(function(){
    $("#btnSaveManagerDetails").click('input', function(){
        console.log("Button was clicked!");
        var manager_name = $('#manager_name').val();
        var manager_data = {
            'Name': $('#manager_name').val(),
            'Email': $('#email_address').val(),
            'Phone': $('#phone_number').val(),
            'Bussiness Name': $('#bussiness_name').val(),
            'Store Number': $('#store_number').val(),
            'Bussiness Address': $('#bussiness_address').val() 
        } 
        var firebaseRef = firebase.database().ref();
        firebaseRef.child("Manager").child("Text").set(manager_name);
    });

});



