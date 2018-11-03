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
        console.log("Button was clicked!");

        var firebaseRef = firebase.database().ref();
        var employee_name = $('#employee_name').val();
        var phone_number = $('#phone_number').val();
        var email_address = $('#email_address').val();
        var SSN = $('#SSN').val();
      
        var random = 100 
        firebaseRef.child(random).child("employee_name").set(employee_name);
        firebaseRef.child(random).child("phone_number").set(phone_number);
        firebaseRef.child(random).child("email_address").set(email_address);
        firebaseRef.child(random).child("SSN").set(SSN);

    });

});