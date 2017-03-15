import {Component, OnInit} from '@angular/core';
import {EventEmitter} from '@angular/core';
import {TableService} from '../../services/table.service';
import {TimeDetails} from '../../models/TimeDetails';
import {CategorySentiment} from '../../models/CategorySentiment';
import { GraphMiniComponent } from '../graph/mini/graph.mini.component';


@Component({

    moduleId :module.id,
    selector : "table-component",
    template : require("./table.component.html"),
    styles : [`
    .containerStyle {
        padding : 30px;
        
    },
    `],
    providers :[TableService]
})


export class TableComponent{
     
    timeDetails : TimeDetails[];
    categorySentiment : CategorySentiment[];

    public colnames = ["Category", "Sentiment", "Volume of Mentions"];
    public containerClass = "container col-md-8 ";
    public errorMsg :string;

    public todate = new Date(); //need to make changes

    constructor(private tableService: TableService){
        

        this.tableService.getTimeDetails(100)
            .subscribe(timeDetails =>{
                this.timeDetails = timeDetails;
            });
        this.tableService.getCategories(this.todate)
            .subscribe(categorySentiment =>{
                this.categorySentiment = categorySentiment;
            });

    }

    

    
}