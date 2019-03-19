import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-display-trash',
  templateUrl: './display-trash.component.html',
  styleUrls: ['./display-trash.component.scss']
})
export class DisplayTrashComponent implements OnInit {
  constructor(private httpService: HttpService,
    private router: Router,
    private snackbar: MatSnackBar) { }

  //@Input() cardsArray=[];
  //@Input() card;
  color: String;
  card = [];
  // flag1 = true;
  ngOnInit() {
    this.getAllCard();
  }

  getAllCard() {
    this.httpService.getRequestForNote('/getAllNotes').subscribe(data => {
      console.log('data is in note', data);
      this.card = data;
    }, err => {
      console.log(err);
    })
  }

  changeOfColor($event) {
    this.color = $event;
  }

  update(event) {
    this.getAllCard();
  }
}
