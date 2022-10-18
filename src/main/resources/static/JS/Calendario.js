window.addEventListener("load", function (Event) {
    /*-------------------------------------------------------------------------------------------
    const today = new Date(Date.now());
    console.log(today.toDateString()); // "Sun Jun 14 2020"
    console.log(today.toLocaleDateString()); // "6/14/2020"
    console.log(gg[today.getDay()] + " - "+ giorno[today.getDay()]);
    var tempo= new Date('2022-07-28');
    //tempo.setDate(28);
    //tempo.setMonth(6);
    //tempo.setYear(2022);
    console.log(gg[tempo.getDay()]);
    console.log(tempo.toDateString());
    console.log(tempo>today);
    console.log(" ");


    var q = new Date('2022-02-01');
    var w = new Date('2022-02-10');
    const diffInDays = Math.floor((w - q) / (1000 * 60 * 60 * 24));
    console.log("---> "+diffInDays);

    -------------------------------------------------------------------------------------------*/

})

var mese = ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Decembre"];
var giorno = ["Domenica", "Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato"];
var gg = ["Dom", "Lun", "Mar", "Mer", "Gio", "Ven", "Sab"];
var ggLav=[false,true,true,true,true,true,false];
const oggi = new Date(Date.now());

generaCalendario(1, oggi.getMonth(), oggi.getFullYear());

/* scorredno il calendario al mese precedente */
function preced() {
    if (oggi.getMonth() == 0) {
//    console.log("gennaio---")
        oggi.setMonth(11);
        oggi.setYear(oggi.getFullYear() - 1)
    } else {
        oggi.setMonth(oggi.getMonth() - 1);
    }
    generaCalendario(1, oggi.getMonth(), oggi.getFullYear());
    console.log(gg[oggi.getDay()] + " _ " + oggi.getDate() + " / " + mese[oggi.getMonth()] + "  / " + oggi.getFullYear());
}
/* scorredno il calendario al mese successivo */
function success() {
    if (oggi.getMonth() == 11) {
//    console.log("dicembre---")
        oggi.setMonth(0);
        oggi.setYear(oggi.getFullYear() + 1)
    } else {
        oggi.setMonth(oggi.getMonth() + 1);
    }
    generaCalendario(1, oggi.getMonth(), oggi.getFullYear());
    console.log(gg[oggi.getDay()] + " _ " + oggi.getDate() + " / " + mese[oggi.getMonth()] + "  / " + oggi.getFullYear());
}

function generaCalendario(gi, me, an) {
    let dtPass = new Date(an+'-'+(me+1)+'-'+gi)
    let m = document.querySelector("#mese")
    m.innerHTML = mese[me];
    let a = document.querySelector("#anno")
    a.innerHTML = an;
    let calend = document.querySelector("#calend");
    calend.innerHTML = "";

    let r = document.createElement("tr");
    let x = null, y = 0, cont = 1;
    /*  definisco gli spazi vuoti dei gionri della settimana del mese precedente */
    for (let idx=0; idx<7; idx++){
        if (gg[dtPass.getDay()]==gg[idx]){
            for (let i = 0; i < idx; i++) {
                let c = document.createElement("td");
                c.innerHTML = " ";
                r.appendChild(c)
            }
            x = idx;
        }
    }
    /*  controllo se l'anno è bisestile */
    let meseCorr = me;
    let annoCorr = an;
    let annoBise = false;
    annoBise = (annoCorr % 400) == 0 || ((annoCorr % 100) != 0 && (annoCorr % 4) == 0);
    /* genero il calendario secondo i giorni della settimanta in html
       rispettando i giorni di prenotazioni impostati
       variabili -> ggLav[] - maxGiorniPre
   */

    const maxGiorniPre = 30;
    while (y < 7) {
        while (x < 7) {
            let c = document.createElement("td");
            c.innerHTML = ""+cont;
            c.classList.add('p-1');
            let dtCorr = new Date(annoCorr+'-'+(meseCorr+1)+'-'+cont)
            const diffInDays = Math.floor((dtCorr - new Date(Date.now())) / (1000 * 60 * 60 * 24));

            if (diffInDays>=0 && diffInDays<=maxGiorniPre && ggLav[dtCorr.getDay()]){
                c.setAttribute('onclick', 'giornoSel('+annoCorr+','+(meseCorr+1)+','+cont+')');
                c.classList.add('sfondo');
                c.classList.add('TXnero');
            }
            cont++;
            x++;
            r.appendChild(c);
            /* -------- controllo la fine del mese -------- */
            if (cont == 29 && meseCorr == 1 && !annoBise) {
                calend.appendChild(r);
                x = 8;
                y = 8;
            } else if (cont == 30 && meseCorr == 1 && annoBise) {
                calend.appendChild(r);
                x = 8;
                y = 8;
            } else if (cont == 31 && (meseCorr == 3 || meseCorr == 5 || meseCorr == 8 || meseCorr == 10)) {
                calend.appendChild(r);
                x = 8;
                y = 8;
            } else if (cont == 32 && (meseCorr == 0 || meseCorr == 2 || meseCorr == 4 || meseCorr == 6 || meseCorr == 7 || meseCorr == 9 || meseCorr == 11)) {
                calend.appendChild(r);
                x = 8;
                y = 8;
            }
        }
        x = 0;
        y++;
        calend.appendChild(r);
        r = document.createElement("tr");
    }
}
/* al click sul giorno interessato */
function giornoSel(an,me,gi){
    let d=an+"-"+(me)+"-"+gi;
    let dt=new Date(d);

    let disp = document.querySelector("#disponibilita");
    disp.classList.add('disp');
    let titOre = document.querySelector("#titFasceOrarie");
    titOre.innerHTML="Disponibilità del </br><u><b>"+gg[dt.getDay()]+" - "+ dt.getDate()+"/"+ (dt.getMonth()+1)+"/"+dt.getFullYear()+"</b></u></br>";

    let ore = document.querySelector("#fasceOr");
    ore.innerHTML="";
    let iniOra=11
    let lavOre=6 /* deve essere proporziale alla matrice delle disponibilità dispPren */
    let numPreOra= 3 /* deve essere proporziale alla matrice delle disponibilità dispPren */
    /* deve essere [maxOre][numPreOra] valori MAX [12][12]*/
    let dispPren=[[true,true,true,true,true,true,true,true,true,true,true,true],
                  [true,true,true,true,true,true,true,true,true,true,true,true],
                  [true,true,true,true,true,true,true,true,true,true,true,true],
                  [true,true,true,true,true,true,true,true,true,true,true,true],
                  [true,true,true,true,true,true,true,true,true,true,true,true],
                  [true,true,true,true,true,true,true,true,true,true,true,true],
                  [true,true,true,true,true,true,true,true,true,true,true,true],
                  [true,true,true,true,true,true,true,true,true,true,true,true],
                  [true,true,true,true,true,true,true,true,true,true,true,true],
                  [true,true,true,true,true,true,true,true,true,true,true,true],
                  [true,true,true,true,true,true,true,true,true,true,true,true],
                  [true,true,true,true,true,true,true,true,true,true,true,true]
                 ];
    let iniPausa=13;
    let durPaura=1;


    for (let i=0; i<(lavOre+durPaura); i++){
        let col = document.createElement("div");
        let oraCor=iniOra+i;
        console.log(oraCor);
        for (let y=0; y<numPreOra; y++){
            let div = document.createElement("div");
            let v= Math.floor(60/numPreOra);
            v=v*y;
            div.innerHTML=""+oraCor+" : "+(v<10 ? "0"+v : v);
            div.classList.add("px-1");
            if (dispPren[i][y]){
                div.classList.add('sfondo');
                div.classList.add('TXnero');
            }
            col.appendChild(div);
        }
        ore.appendChild(col);
        if ((oraCor+1)==iniPausa){
            //console.log(i+" + "+ durPaura)
            i=i+durPaura;
            console.log(i)
        }
    }
}

