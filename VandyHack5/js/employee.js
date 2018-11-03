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
       addEmployee();
       
    });

});

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