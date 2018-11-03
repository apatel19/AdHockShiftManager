$(document).ready(function(){
    $("#btnSaveManagerDetails").click('input', function(){
        console.log("Button was clicked!");

        var firebaseRef = firebase.database().ref();

        var auth = firebase.auth();

        var manager_name = $("#manager_name").val();
        var manager_pass = $("#pass_manager").val();
        var manager_email = $('#email_address').val();
        var phone_number = $("#phone_number").val();
        var bussiness_name = $("#bussiness_name").val()
        var store_number = $('#store_number').val();
        var bussiness_address = $('#bussiness_address').val();
        firebaseRef.child("Manager").child("Name").set(manager_name);
        firebaseRef.child("Manager").child("Email").set(manager_email);
        firebaseRef.child("Manager").child("Phone").set(phone_number);
        firebaseRef.child("Manager").child("Bussiness Name").set(bussiness_name);
        firebaseRef.child("Manager").child("Store Number").set(store_number);
        firebaseRef.child("Manager").child("Bussiness Address").set(bussiness_address);
        
        auth.createUserWithEmailAndPassword(manager_email, manager_pass);
        

    });

});



