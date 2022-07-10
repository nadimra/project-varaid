clearBtn = document.querySelector("#clearStorageBtn");
uploadBtn = document.querySelector("#uploadVideoBtn");

clearBtn.addEventListener('click',() => {
    var elem = document.getElementById('clearStorageBtn');
    url = elem.getAttribute("data-href");
    $.ajax(
    {
        type:"GET",
        url: url,
        data:{
        },
        success: function() 
        {
            window.location.assign('/');
        }
     })
});
