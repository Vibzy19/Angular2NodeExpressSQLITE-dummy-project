import { Component } from '@angular/core';
import {  } from '@angular/router';

@Component({

    selector : 'app-home',
    template : require("./home.component.html"),
    styles : [
        `.btn {
    padding: 10px 90px;
    border: 0 none;
    font-weight: 700;
    font-size: 250%;
    letter-spacing: 3px;
    text-transform: uppercase;
    margin-top: 3px; 
    margin-bottom: 3px; 
    height:90px; 
    margin-right: 3px; 
    margin-left: 3px; 
}

 
.btn:focus, .btn:active:focus, .btn.active:focus {
    outline: 0 none;
}
 
.btn-primary {
    background: #0099cc;
    color: #ffffff;
}
 
.btn-primary:hover, .btn-primary:focus, .btn-primary:active, .btn-primary.active, .open > .dropdown-toggle.btn-primary {
    background: #33a6cc;
}
 
.btn-primary:active, .btn-primary.active {
    background: #007299;
    box-shadow: none;
}

.btn-primary.outline:hover, .btn-primary.outline:focus, .btn-primary.outline:active, .btn-primary.outline.active, .open > .dropdown-toggle.btn-primary {
	color: #33a6cc;
	border-color: #33a6cc;
}
.btn-primary.outline:active, .btn-primary.outline.active {
	border-color: #007299;
	color: #007299;
	box-shadow: none;
}
        `
    ]

})

export class HomeComponent{
    public title = "Angular 2 Dum Dum";
    public subheading = "Acute Angular";

    public navClass = 
    [
        "container",
        "nav navbar-nav navbar-center",
        "nav nav-pills",
        "btn btn-primary"
    ];
    public topics = ["Lookout"];
}