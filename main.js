var ourRequest=new XMLHttpRequest();
ourRequest.open('GET','https://reqres.in/api/users?page=2');
ourRequest.onload=function(){
    //console.log(ourRequest.responseText);
    var ourUser=JSON.parse( ourRequest.responseText);
    console.log(ourUser);
}
ourRequest.send();