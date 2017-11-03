
export interface MenuItem {
    label:string;
    icon:string;
    items:MenuItem[];
    component:any;
    parent:MenuItem;
    active:boolean;
}
  
export class MenuState {

    display:boolean = false;

    constructor( public show:boolean ){
        
    }
    toggle():void{
        this.show = !this.show;
        if( this.show ){
        this.display = true;
        }
    }
    get state():string { 
        if( this.show ){ return 'show'; }
        return 'hide';
    }
}

export class Rectangle {
    x:number;
    y:number;
    width:number;
    height:number;
    constructor( x:number, y:number, w:number, h:number ){
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
    }
}
export class Vector2 {
    x:number;
    y:number;
    constructor( x:number, y:number ){ this.x = x; this.y = y; }
}