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
                console.log("-> " + elT.id + " = " + elT.value);
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
                        console.log(data[i].idUnt);
                        trovato=true;
                        open("Index.html?tk="+generaToken(data[i].idUnt)+"unt="+data[i].idUnt,"_self")
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
            let caratteri="1234567890QAZWSXEDCRFVTGBYHNUJMIKOLPqazwsxedcrfvtgbyhnujmikolp!£$%&/()?";
            let carLength=caratteri.length;
            for (let i = 0; i < 30; i++){
                tk += caratteri.charAt(Math.floor(Math.random() * carLength));
                aggiornaRecord(idUnt, tk);
            }
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
            })

            url = "http://api.db-ip.com/v2/free/self"
            fetch(url, {
                method: "GET"
            }).then(function (response) {
                return response.json()
            }).then(function (data) {
                ipAddress = data.ipAddress;
            })
            newRecord = {
                idUnt: idUnt,
                nome: nom.value,
                cognome: cog.value,
                cf: cf.value,
                mail: mai.value,
                cell: cel.value,
                password: pas.value,
                token: tk,
                ip: ipAddress
            };

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
            }).then(data => {
                console.log('Success:', data);
            });
        }