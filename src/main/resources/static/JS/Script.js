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
                        open("Index.html?idUnt="+data[i].idUnt,"_self")
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