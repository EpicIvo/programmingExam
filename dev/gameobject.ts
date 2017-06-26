
abstract class Gameobject {

    public xspeed:number = 0;
    public yspeed:number = 0;
    public speedmultiplier:number = 1;
    public facing:number = 1;
    public div: HTMLElement;
    public x:number = 0;
    public y:number = 0;
    public width:number;
    public height:number;
    public inMordor: boolean = false;
    
    /*
    ** To be overwritten by instance
    */
    public update(){
    }
    
}