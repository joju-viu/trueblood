import {Entity} from '../classes/entity'

export class Sangre extends Entity{
    constructor(
        public code?:number,
        public name?:string,
        public content?:string,
        public level?:string,
        public type?:string,
        public createBy?:any,
    ){
        super();
    }
}