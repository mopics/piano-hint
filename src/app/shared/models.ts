
export interface MenuItem {
    label:string;
    icon:string;
    items:MenuItem[];
    component:any;
    parent:MenuItem;
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