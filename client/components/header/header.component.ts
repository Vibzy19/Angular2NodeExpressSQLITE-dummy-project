import { Component } from '@angular/core';
import { HeaderNavComponent } from './nav/nav.component';


@Component({

    selector : 'app-header',
    template : require("./header.component.html"),
       styles : [
        `
        .headerStyle{
            margin-left:0px; 
            margin-top: 7px; 
            margin-bottom: -10px;
        }
        .subheadingStyle{
            margin-top: -10px;
        }
        `
    ]
    
})

export class HeaderComponent{
    public title = "Sentinel Data Labs";
    public subheading = "with Great Data comes Great Responsibility";
    public headerClass = "navbar-header page-header"; //This class is taken from bootstrap
}