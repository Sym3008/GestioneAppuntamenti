let host="localhost"

window.addEventListener("load", function (Event) {
    console.log(getCookie("token"))
    console.log(getCookie("idUtn"))
})

    function getCookie(nome) {
       var name = nome + "=";
       var ca = document.cookie.split(';');
       for (var i = 0; i < ca.length; i++) {
           var c = ca[i];
           while (c.charAt(0) == ' ')
               c = c.substring(1);
           if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
       }
       return "";
    }