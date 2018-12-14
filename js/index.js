import { stateModel } from "./stateModel.js"; // import du state chart Model
import { Port } from "./port.js"; // import de la variable Port

let myConsole,buttonGo,buttonStart,buttonStop,requestsBtn = null; // Déclaration des variables global

let interpreter = new scion.Statechart(stateModel);

interpreter.registerListener(
    {onTransition:function(source, target, index)
        {
            if((source[0] !== '$') && (target[0] !== '$') && (target !== '$final'))
                logMyConsole("\n\t ELIGIBLE TRANSITION : " + source + " -> "+ target);
        }
    }
);

interpreter.registerListener(
    {onEntry:function(currState)
        {
            if(currState.charAt(0) !== '$')
            switch(currState)
            {
                case currState === "busy":
                    logMyConsole("\n\tENTRY ACTION: Port.setOpen(Boolean)|result: null");
                    logMyConsole("\n\t\tinvariant: [Port.isOpen]|true");
                break;

                case currState === "idle":
                    logMyConsole("\n\t\tinvariant: [Port.isClosed]|false");
                break;

                case currState === "S11":
                    logMyConsole("\n\tENTRY ACTION: My_device.w|result: null");
                break;

                case currState === "S12":
                    logMyConsole("\n\tENTRY ACTION: My_device.y|result: null");
                break;

                case currState === "S22":
                    logMyConsole("\n\tENTRY ACTION: My_device.request_h|result: null");
                break;

                case currState === "S32":
                    logMyConsole("\n\tDO ACTIVITY: Port.listenTo|result: null");
                break;
            }
        }
    }
);

interpreter.registerListener(
    {onExit:function(currState)
        {
            logMyConsole("\n\tDESACTIVATED STATE :" + currState);
            if(currState == 'S11')
                logMyConsole("\n\tEXIT ACTION: My_device.z|result: null");
            else if(currState === 'S12')
                logMyConsole("\n\tEXIT ACTION: My_device.x|result: null");
        }
    }
);

function logMyConsole(elt) // Fonction qui écrit dans la console
{
    if(typeof elt === "string")// On regarde si l'objet est un string
        myConsole.innerHTML += elt + "<br/>";// si oui on l'affiche 
    else // sinon on rappelle la fonction avec chaque élément
        elt.forEach(element => 
            {
                logMyConsole("\t Active States : " + element);// rapelle réccursivement la fonction.
            });
}

function getStateModelStatus(itr) // retourne l'état actuel de l'objet
{
    let state = itr.getFullConfiguration();
    let itrToString = state.filter(elt => elt.charAt(0) !== '$');
    return itrToString;
}

function abonnement()
{
    document.querySelectorAll(".request").forEach(
        elt =>
        {
            elt.addEventListener("click",
            (event)=>
            {
                let eventT = event.target.textContent;
                let nameWNSpace = eventT.replace(/\s/g,'');
                let fName = nameWNSpace.charAt(nameWNSpace.length - 1).toLowerCase();
                interpreter.gen({name:fName,data:event});
                logMyConsole(getStateModelStatus(interpreter));
            },false);
        }
    );

    buttonStop.addEventListener("click",
        ()=>{
            logMyConsole("*** STOP ***");
        },false);

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
}

window.onload = function() // Ecouteur d'événément sur la fenêtre
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
    let port = new Port();

    myConsole = document.querySelector("#myConsole");
    buttonGo =  document.querySelector("#go");
    buttonStart = document.querySelector("#start");
    buttonStop = document.querySelector("#stop");
    requestsBtn = document.querySelectorAll(".request");

    abonnement();
};