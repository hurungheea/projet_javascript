import { stateModel } from "./stateModel.js"; // import du state chart Model
import { Port } from "./port.js"; // import de la variable Port

let myConsole,buttonGo,buttonStart,buttonStop,interpreter,requestsBtn,myArrows = null; // Déclaration des variables global

function logMyConsole(elt) // Fonction qui écrit dans la console
{
    myConsole.scrollTop = myConsole.scrollHeight;
    if(typeof elt === "string")// On regarde si l'objet est un string
        myConsole.innerHTML += elt + "<br/>";// si oui on l'affiche
    else // sinon on rappelle la fonction avec chaque élément
        elt.forEach(element =>
            {
                logMyConsole("&nbsp; &nbsp;" + " Active States : " + element);// rapelle réccursivement la fonction.
            });
}

function getStateModelStatus(itr) // retourne l'état actuel de l'objet
{
    console.log(itr);
    let state = itr.getFullConfiguration(); // Reccupère l'état de l'objet INTERPRETER
    let itrToString = state.filter(elt => elt.charAt(0) !== '$'); // Enlève les états générés automatiquement
    return itrToString; // Retourne la chaine de caractère contenant l'objet
}

 function handleEvent(event)
{
  let name = event.target.id;
  interpreter.gen(name);
  logMyConsole(getStateModelStatus(interpreter))
}

function abonnement() // Attache des écouteurs d'événements sur les objets
{
    document.querySelectorAll(".request").forEach( /* Traitement sur chanque éléments du tableau */
        elt =>
        {
            elt.addEventListener("click",handleEvent,false);
        }
    );

    buttonStop.addEventListener("click",
        ()=>
        {
            logMyConsole("*** STOP ***" + "<br/>");
        },false);

    buttonStart.addEventListener('click',
        ()=>
        {
            interpreter.start();
            logMyConsole("*** START ***" + "<br/>");
        }
        ,false);

      for(let i = 0;i<myArrows.length;i++)
      {
        myArrows[i].addEventListener("mouseenter",
        (event)=>
        {
          event.target.setAttribute("fill","green");
        },false);
        myArrows[i].addEventListener("mouseout",
        (event)=>
        {
          event.target.setAttribute("fill","black");
        },false);
        myArrows[i].addEventListener("click",handleEvent,false);
      }

}

window.addEventListener("load",function() // Ecouteur d'événément sur la fenêtre
{
    if(scion === undefined)
    {
        swal({
            title:"Erreur de chargement !!",
            type:'error',
            text:'Un problème est survenu lors du téléchargement de la page, veuillez la recharger pour tenter de corriger l\'erreur',
            footer:'<a style="cursor:pointer;" onclick="document.location.reload(true);">Recharger la page</a>'
        });
    }
    interpreter = new scion.Statechart(stateModel);
    let port = new Port();
    myConsole = document.querySelector("#myConsole");
    buttonGo =  document.querySelector("#go");
    buttonStart = document.querySelector("#start");
    buttonStop = document.querySelector("#stop");
    requestsBtn = document.querySelectorAll(".request");
    var objSvg = document.getElementById('ui').contentDocument;
    myArrows = objSvg.querySelectorAll('path.arrow');
    abonnement();
});
