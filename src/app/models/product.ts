import {Entity} from '../classes/entity'

export class Product extends Entity{
    constructor(
        public code?:string,
        public title?:string,
        public content?:string,
        public status?:string,
        public category?:string,
        public id_user?:any,
        public price?:number,
        public image?: Array<string>,
        public currency?:string,
        public quantity?:number
    ){
        super();
    }
}