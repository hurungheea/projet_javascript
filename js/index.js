import { stateModel } from "./stateModel.js";
import { Port } from "./port.js";

let myConsole,buttonGo,buttonStart = null;

function logMyConsole(elt)
{
    let n = (typeof elt);
    if(n === "string")
        myConsole.innerHTML += elt + "<br/>";
    else
        elt.forEach(element => 
            {
                logMyConsole("\t Active States : " + element);
            });
}

function getStateModelStatus(itrprtr)
{
    let x = itrprtr.getFullConfiguration();
    let xToString = x.filter(elt => elt.charAt(0) !== '$');
    return xToString;
}

window.onload = function()
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
    let interpreter = new scion.Statechart(stateModel);
    let port = new Port();

    myConsole = document.querySelector("#myConsole");
    buttonGo =  document.querySelector("#go");
    buttonStart = document.querySelector("#start");

    buttonStart.addEventListener('click',
        ()=>
        {
            interpreter.start();
            logMyConsole("*** START ***");
        }
        ,false);

    buttonGo.addEventListener('click',
        ()=>
        {
            logMyConsole(getStateModelStatus(interpreter));
        }
        ,false);   
};