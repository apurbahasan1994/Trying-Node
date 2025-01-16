export default class Marketting{
    update({id,username}){
        /**
         * Its important o remmeber that the function [update] is responsible of 
         * handling his errors/exceptions  
         * 
         * Our subject wont have any await there. (or something that might block any execution)
         */
        console.log(`[${id}] : [marketting] will send an welcome email to [${username}]`)
    }
}