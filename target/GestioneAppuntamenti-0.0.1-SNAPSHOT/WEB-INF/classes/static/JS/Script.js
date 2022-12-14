let host="localhost"

window.addEventListener("load", function (Event) {
    let form = document.querySelector('#login')
    form.addEventListener('submit',function (event){
        formValido = true;
        text=document.querySelectorAll('.input-form.richiesto');
        text.forEach(function (elT,ind,ar){
            if (elT.value === ""){
                console.log("-> " + elT.id + " = NON E' PRESENTE!!");
                formValido = false;
                InErr(elT,elT.id);
                event.preventDefault();
            }else {
                //console.log("-> " + elT.id + " = " + elT.value);
                TogErr(elT);
            }
        })

        function InErr(elemento,text){
            if(elemento!== null){
                let mess= elemento.closest('.boxIn').querySelector('.messErr');
                mess.innerHTML="---"+text+" obbligatorio---";
            }
        }
        function TogErr(elemento){
            if(elemento!== null){
                let mess= elemento.closest('.boxIn').querySelector('.messErr');
                mess.innerHTML="";
            }
        }

        if(formValido === false){
            console.log("ERRORE!!!");
            event.preventDefault();
        } else {
            controllaDati();
            event.preventDefault();
        }
    })
})

        function controllaDati(){
            let E=document.querySelector('#User');
            let P=document.querySelector('#Password')

            let urlApi= "http://"+host+":8080/api/get-utenti";
            let trovato=false;
            fetch(urlApi, {
                method: "Get"
            }).then(function (response){
                 return response.json()
            }).then(data => {
                for(let i=0; i<data.length; i++){
                    if (data[i].mail===E.value && data[i].password===P.value){
                        trovato=true;
                        let t= generaToken(data[i].idUnt);
                        setCookie("token",t,15,"/");            //------- genero cookie temporaneo per il login --------
                        setCookie("idUtn",data[i].idUnt,15);

                        //open("Index.html",'_self');

                        break;
                    }else{
                        console.log("non trovato")
                        trovato=false
                    }
                }
                if (!trovato){
                    alert("Anagrafica non trovata")
                }
            });
        }

        function generaToken(idUnt){
            let tk="";
            let caratteri="1234567890QAZWSXEDCRFVTGBYHNUJMIKOLPqazwsxedcrfvtgbyhnujmikolp!??$%&/()?";
            let carLength=caratteri.length;
            for (let i = 0; i < 30; i++){
                tk += caratteri.charAt(Math.floor(Math.random() * carLength));
            }
            aggiornaRecord(idUnt, tk);
            return tk;
        }

       function aggiornaRecord(idUnt, tk){
            let nom = '';
            let cog = '';
            let cf = '';
            let mai = '';
            let cel = '';
            let pas = '';
            let tok = '';
            let ip = '';
            let ipAddress='';
            let last = '';
            let newRecord;

            let url = "http://"+host+":8080/api/get-utente/" + idUnt
            fetch(url, {
                method: "GET"
            }).then(function (response) {
                return response.json()
            }).then(function (data) {
                nom = data.nome;
                cog = data.cognome;
                cf = data.cf;
                mai = data.mail;
                cel = data.cell;
                pas = data.password;
                tok = data.token;
                ip = data.ip;
                last= data.lastLog;
                let currentdate = new Date();
                console.log (currentdate)
                let datetime =  currentdate.getFullYear() + "-" + (currentdate.getMonth()+1) + "-" + currentdate.getDate() + " "+ currentdate.getHours() + ":"+ currentdate.getMinutes() + ":" + currentdate.getSeconds();
                console.log("-"+datetime+"-")
                urlip = "http://api.db-ip.com/v2/free/self"
                fetch(urlip, {
                    method: "GET"
                }).then(function (response) {
                    return response.json()
                }).then(function (data) {
                    ipAddress = data.ipAddress;
                    newRecord = {
                    idUnt: idUnt,
                    nome: nom,
                    cognome: cog,
                    cf: cf,
                    mail: mai,
                    cell: cel,
                    password: pas,
                    token: tk,
                    ip: ipAddress,
                    //lastLog: currentdate.toISOString()
                    lastLog: datetime
                    }

                    let urlApi = "http://"+host+":8080/api/update-utenti";
                    fetch(urlApi, {
                        method: "PUT",
                        headers: {
                            "content-type": "application/json",
                            "Accept": "*/*",
                            "Accept-Encoding": "gzip,deflate,br",
                            "Connection": "keep-live"
                        },
                        body: JSON.stringify(newRecord),
                    }).then(function (response) {
                        console.log("record aggiornato");
                    });
                });
            });
        }

