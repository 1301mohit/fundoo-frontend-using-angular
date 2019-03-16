import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Output } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { MatCard } from '@angular/material';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { log } from 'util';

@Component({
  selector: 'app-icon-list',
  templateUrl: './icon-list.component.html',
  styleUrls: ['./icon-list.component.scss']
})
export class IconListComponent implements OnInit {

  // @Input() color;
  @Output() colorEmit = new EventEmitter();
  @Output() colorchange = new EventEmitter();
  @Input() card;
  constructor(private httpService: HttpService,
    private snackbar: MatSnackBar,
    private router: Router) { }

  ngOnInit() {
  }

  colorArray = [[{ 'color': '#FFFFFF', 'name': 'White' },
  { 'color': '#E53935', 'name': 'Red' },
  { 'color': '#EF6C00', 'name': 'Orange' },
  { 'color': '#FFEB3B', 'name': 'Yellow' }],

  [{ 'color': '#B2FF59', 'name': 'green' },
  { 'color': '#69F0AE', 'name': 'teal' },
  { 'color': '#81D4FA', 'name': 'blue' },
  { 'color': '#0288D1', 'name': 'darkblue' }],

  [{ 'color': '#B39DDB', 'name': 'purple' },
  { 'color': '#F48FB1', 'name': 'pink' },
  { 'color': '#FFAB40', 'name': 'brown' },
  { 'color': '#E0E0E0', 'name': 'gray' }]]
  //   colorsEdit(id, card) {
  //     if(card.noteId != undefined)

  //     {
  //     console.log('color is ',id);
  //     console.log("Card is",card.noteId);
  //     card.color = id;
  //     console.log("Color:",card.color);
  //     this.colorEmit.emit(id)

  //     console.log('color')
  //    //   this.card.type = 'color'

  // //        const reqData = {
  // //   "color": id,
  // //   "noteIdList": [card.id]
  // // }
  //     console.log("card:",card)
  //     this.httpService.postRequest('/color/card.id?color='+this.color.value,'').subscribe(data =>{
  //       this.snackbar.open(data.statusMessage,"End Now", {duration:3000});
  //       this.colorchange.emit(id);
  //   })
  //     }


  // this.noteService.postcolor({
  //   "color": id,
  // //  "noteIdList": [card.id]
  // }).subscribe(data => {
  //   console.log("color event reached ",data)
  //   // localStorage.setItem('colorId', this.color.id)
  //   this.colorchange.emit(id);
  // })

  // }
  //this.colorEmit.emit(colorId);

  colorsEdit(colorId) {
    if (this.card.noteId != undefined) {
      console.log("card id is ",this.card.noteId);
      console.log("card data at icon", this.card);
      console.log("card color set", colorId);

      this.httpService.postRequestForNote('/color/'+this.card.noteId+'?color=' +colorId, '').subscribe(data => {
        this.snackbar.open(data.statusMessage, "End Now", { duration: 3000 });
        this.colorchange.emit(colorId);
      })
    }
  }

  delete() {
    console.log("Delete note");
    console.log("CardId", this.card.noteId);
    this.httpService.deleteRequestForNote('/deleteNote/'+this.card.noteId).subscribe(data => {
      this.snackbar.open(data.statusMessage, "End Now", { duration: 3000 });
    },
      error => {
        this.snackbar.open('Retry', 'End Now', { duration: 3000 });
      });
  }

  archiveNote(){
    console.log("Archive note");
    this.httpService.putRequestForNote('/archiveNote/'+this.card.noteId).subscribe(data => {
      this.snackbar.open(data.statusMessage, "End Now", { duration: 3000 });
    },
    error =>{
      this.snackbar.open('Retry', 'End Now', { duration: 3000 });
    }
    )
  }
}
