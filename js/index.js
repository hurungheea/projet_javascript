import { stateModel } from "./stateModel.js"; // import du state chart Model
import { Port } from "./port.js"; // import de la variable Port
import { myDom } from "./myDom.js";

var interpreter = null;

function logMyConsole(elt) // Fonction qui écrit dans la console
{
    myDom.myConsole.scrollTop = myDom.myConsole.scrollHeight;
    if(typeof elt === "string")// On regarde si l'objet est un string
        myDom.myConsole.innerHTML += elt + "<br/>";// si oui on l'affiche
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

    document.querySelectorAll(".mouseArrow").forEach( /* Traitement sur chanque éléments du tableau */
        elt =>
        {
            elt.addEventListener("mouseenter",
            (event)=>
            {
              var overBtnId = event.target.id;
              var overArrow = Object.entries(myDom.myArrows).filter(
                (elt)=>
                {
                  return (elt[1].classList[1] === overBtnId);
                });
              overArrow[0][1].setAttribute("fill","green");
            },false);

            elt.addEventListener("mouseout",
            (event)=>
            {
              var overBtnId = event.target.id;
              var overArrow = Object.entries(myDom.myArrows).filter(
                (elt)=>
                {
                  return (elt[1].classList[1] === overBtnId);
                });
              overArrow[0][1].setAttribute("fill","black");
            },false);
        }
    );

    myDom.buttonStop.addEventListener("click",
        ()=>
        {
            logMyConsole("*** STOP ***" + "<br/>");
            document.querySelector("#conteneur img").src = "./img/LoveMachineStop.gif";
        },false);

    myDom.buttonStart.addEventListener('click',
        ()=>
        {
            interpreter.start();
            logMyConsole("*** START ***" + "<br/>");
        }
        ,false);

      for(let i = 0;i<myDom.myArrows.length;i++)
      {
        myDom.myArrows[i].addEventListener("mouseenter",
        (event)=>
        {
          event.target.setAttribute("fill","green");
        },false);
        myDom.myArrows[i].addEventListener("mouseout",
        (event)=>
        {
          event.target.setAttribute("fill","black");
        },false);
        myDom.myArrows[i].addEventListener("click",handleEvent,false);
      }

      document.getElementById("clearConsole").addEventListener("click",
      ()=>
      {
        myDom.myConsole.innerHTML = " ";
        console.clear();
      });

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
    myDom.myConsole = document.querySelector("#myConsole");
    myDom.buttonGo =  document.querySelector("#go");
    myDom.buttonStart = document.querySelector("#start");
    myDom.buttonStop = document.querySelector("#stop");
    myDom.requestsBtn = document.querySelectorAll(".request");
    var objSvg = document.getElementById('ui').contentDocument;
    myDom.myArrows = objSvg.querySelectorAll('path.arrow');
    abonnement();
});
