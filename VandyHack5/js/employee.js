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
        var customer_name = $('#customer_name').val();
        var phone_number = $('#phone_number').val();
      
        var random = 100 
        firebaseRef.child(random).child("employee_name").set(customer_name);
        firebaseRef.child(random).child("phone_number").set(phone_number);


    });

});