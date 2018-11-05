import { stateModel } from "./stateModel.js";
import { Port } from "./port.js";

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

    let consoleArea = document.querySelector('.myConsole');
    //consoleArea.attr('readOnly','true');
    consoleArea.scrollTop = consoleArea.scrollHeight;

    document.querySelector('.go').addEventListener("click",()=>
    {
        consoleArea.textContent += " 6d6df8d6 ";
        console.log(consoleArea);
    },false);
    
    $('.start').click(function()
    { 
        interpreter.start();
        //consoleArea.value = "";
    });
};