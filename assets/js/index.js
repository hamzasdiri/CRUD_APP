$("#add_user").submit(function(event){
    alert("user inserted !")
})

if(window.location.pathname == "/"){
    $ondelete = $(".table tbody td a.delete");
    $ondelete.click(function(){
        var id =$(this).attr("data-id");
        var request ={
            "url" : `http://localhost:3000/api/users/${id}`,
            "method" : "DELETE",
        }

        if(confirm("DO YOU REALLY WANT TO DELETE THIS USER ?")){
            $.ajax(request).done(function(response){
                alert("User Deleted !");
                location.reload();
            })
        }
    })
}

$("#update_user").submit(function(event){
   event.preventDefault(); //prevent the browser from reloading the page
   
   var unindexed_array = $(this).serializeArray();

   var data= {}
   $.map(unindexed_array,function(n,r){
  data[n[`name`]] = n['value']
   })
   var request = {
    "url" : `http://localhost:3000/api/users/${data.id}`,
    "method" : "PUT",
    "data" : data
} 
console.log(request);

$.ajax(request).done(function(response){
    alert("Data Updated Successfully");
})
})