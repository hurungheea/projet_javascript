export class Port 
{   // Constructeur de la class Port
    constructor()
    {
        this.open = false;
        this.port = 8080;
    }
    // Retourne si le port est ouvert ou non
    isOpen() 
    {
        return this.open;
    }
    //Retroune quelle port est écouté
    isListening()
    {
        return this.port;
    }
    // Ouvre ou ferme un port
    setOpen(p_open)
    {
        this.open = p_open;
    }
    // Permet de donner un port d'écoute
    setPort(p_port)
    {
        this.port = p_port;
    }
    // Affiche dans la console le Port qui est écouté
    listenTo()
    {
        console.log("port listen to : " + this.isListening());
    }
}