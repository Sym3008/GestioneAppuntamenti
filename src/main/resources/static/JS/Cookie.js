window.addEventListener("load", function (Event) {
    console.log(getCookie("token"))
    console.log(getCookie("idUtn"))
})

    function setCookie(nome, valore, minutiScadenza, path) {
        if (path == undefined) {
            path = "/";
        }
        let d = new Date();
        //                                     h    min  sec millisec
        //d.setTime(d.getTime() + (ggScadenza * 24 * 60 * 60 * 1000));
        d.setTime(d.getTime() + (minutiScadenza * 60 * 1000));
        let expires = "expires=" + d.toUTCString();
        document.cookie = nome + "=" + valore + "; " + expires + "; path=" + path;
    }

    function getCookie(nome) {
       let name = nome + "=";
       let ca = document.cookie.split(';');
       for (let i = 0; i < ca.length; i++) {
           let c = ca[i];
           while (c.charAt(0) == ' ')
               c = c.substring(1);
           if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
       }
       return "";
    }