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
        firebaseRef.child("Text").set("some value");
    });

});