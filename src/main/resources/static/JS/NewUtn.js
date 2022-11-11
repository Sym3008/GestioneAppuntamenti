window.addEventListener('load', function (event) {

    let form = document.querySelector('#registrationForm')
    form.addEventListener('submit', function (event) {
        formValido = true;
        text = document.querySelectorAll('.textInput.richiesto');
        text.forEach(function (elT, ind, ar) {
            if (elT.value === "") {
                console.log("-> " + elT.id + " = NON E' PRESENTE!!");
                formValido = false;
                InErr(elT, elT.id);
            } else {
                console.log("-> " + elT.id + " = " + elT.value);
                TogErr(elT);
            }
        })

        let passWord = document.querySelector('#Password');
        let passWordC = document.querySelector('#Conferma-Password');
        if (passWord.value === "" || passWord.value !== passWordC.value) {
            console.log("Errore re-inserisci correttamente la tua password!");
            formValido = false;
            InErr(passWord, "Password");
        } else {
            console.log("Le password corrispondono!");
            TogErr(passWord);
        }

        function InErr(elemento, text) {
            if (elemento !== null) {
                let mess = elemento.closest('.boxIn').querySelector('.messErr');
                mess.innerHTML = "---" + text + " obbligatorio---";

            }
        }

        function TogErr(elemento) {
            if (elemento !== null) {
                let mess = elemento.closest('.boxIn').querySelector('.messErr');
                mess.innerHTML = "";
            }
        }

        if (formValido === false) {
            console.log("ERRORE!!!");
            event.preventDefault();
        } else {
            inserisciRecord();
            event.preventDefault();
        }
    })
})

function inserisciRecord() {
    let n = document.querySelector('#Nome');
    let c = document.querySelector('#Cognome');
    let tel = document.querySelector('#Telefono');
    let cf = document.querySelector('#CodiceFiscale');
    let e = document.querySelector('#Email');
    let p = document.querySelector('#Password');
    let newRecord;

    newRecord = {
        idAnagrafica: idAnagraficaPassato,
        nome: n.value,
        cognome: c.value,
        cell: tel.value,
        cf: cf.value,
        mail: e.value,
        password: p.value
    };

    let urlApi = "http://"+host+":8080/api/save-utenti";

    fetch(urlApi, {
        method: "POST",
        headers: {
            "content-type": "application/json",
            "Accept": "*/*",
            "Accept-Encoding": "gzip,deflate,br",
            "Connection": "keep-live"
        },
        body: JSON.stringify(newRecord),
    }).then(function (response) {
        return response.text()
    }).then(data => {
        console.log(data)
        if(data==="") {
            console.log("record inserito");
            alert("Anagrafica inserita correttamente")
            alert("Ti è stata inviata una mail per la registrazione\n-> "+e.value)
            // close();
            open("Index.html")
        }else{
            alert("Errore" +data)
        }
    });
}