import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, AUTOCOMPLETE_OPTION_HEIGHT, AUTOCOMPLETE_PANEL_HEIGHT } from '@angular/material';
import { EditLabelComponent } from '../edit-label/edit-label.component';
import { AUTO_STYLE } from '@angular/animations';
import { HttpService } from 'src/app/services/http.service';
import { MatSnackBar } from '@angular/material';
import { ViewchangeService } from 'src/app/services/viewchange.service';
import { ProfilepicComponent } from '../profilepic/profilepic.component';
import { SearchService } from 'src/app/services/search.service';
//import {MediaMatcher} from '@angular/cdk/layout';
//import {ChangeDetectorRef, OnDestroy} from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  token: string = localStorage.getItem('token');
  titleName='Note';
  label: [];
  isClicked = true;
  card1: [];
  fName: string;
  flag=false;
  labelId:string;
  email = localStorage.getItem('email');
  searchContent : string;



  ngOnInit() {
    console.log("Dashboard");
    this.getAllLabel();
    this.titleName=localStorage.getItem('title')
    if(this.titleName == null){
      this.titleName="Note"
    }
    // if(this.searchContent.length > 2){
    //   this.searchService.changeMessage(this.searchContent);
    // }
  }

  mobileQuery: MediaQueryList;

  fillerNav = Array.from({ length: 5 }, (_, i) => `Nav Item ${i + 1}`);

  private _mobileQueryListener: () => void;

  constructor(private httpService: HttpService,
    changeDetectorRef: ChangeDetectorRef,
    private snackbar: MatSnackBar,
    media: MediaMatcher,
    private router: Router,
    public dialog: MatDialog,
    private viewChange: ViewchangeService,
    private searchService: SearchService
    ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  signOut(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  Note() {
    this.titleName = "Note"
    localStorage.setItem('title',"Note")
    this.labelId=''
    // this.router.navigateByUrl('/dashboard/note')
  }

  Remainder() {
    this.titleName = "Reminder"
    localStorage.setItem('title',"Reminder")

    this.labelId=''
    // this.router.navigate(['/dashboard/display-remainder']);
  }

  editLabels() {
    this.titleName = "EditLable"
    localStorage.setItem('title',"EditLable")

    this.labelId=''
    const dialogRef = this.dialog.open(EditLabelComponent, {
      data: {}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      //this.router.navigate(['/dashboard/note']);
      this.getAllLabel();
    });
  }

  archive() {
    this.titleName = "Archive"
    localStorage.setItem('title',"Archive")

    this.labelId=''
    //this.router.navigateByUrl('/dashboard/display-archive')
    //this.httpService.postRequestForNote('/archiveNote/'+)
  }

  trash() {
    this.titleName = "Trash"
    localStorage.setItem('title',"Trash")

    this.labelId=''
    //this.router.navigateByUrl('/dashboard/display-trash')
  }

  getAllLabel() {
    console.log("get All Labels");
    this.httpService.getRequestForNote('/getAllLabels').subscribe(data => {
      this.label = data;
    }, err => {
      this.snackbar.open(err, "End-Now", { duration: 3000 });
    }
    )
  }

  grid() {
    this.isClicked = !this.isClicked;
    console.log(this.isClicked);
  }

  change() {
    this.viewChange.onViewChange(this.isClicked);
  }

  labelNote(labelId,item) {
    //var labelId = localStorage.getItem('labelId');
    this.titleName=item.name;
    localStorage.setItem('labelId', this.titleName);

    let labelId1 = localStorage.getItem('labelId');
    console.log("Labelid", labelId);
    console.log("Labelid", labelId1);
    this.labelId=labelId;
    // this.httpService.getRequestForNote('/getNoteOfLabel/'+labelId).subscribe( data => {
    //   console.log("Card",data);
    //   this.card1 = data;
    //   console.log("Card",this.card1);
    // },error=>
    // {
    //   this.snackbar.open("Error in getNoteOfLabel", "End-Now", { duration : 3000 });
    // }
    //   )
    this.router.navigate(['/dashboard/edit-label-note/' + labelId]);
  }

  //search(){
      
   // this.searchService.changeMessage(this.searchContent);
      // this.httpService.getRequestForNote("getAllSearchNotes?query="+searchContent).subscribe( data => {
      // console.log("Search Content"+searchContent);
      // console.log("Data in Search"+data);

    //})
  //}

  ProfileSelect() {
    const dialogRef = this.dialog.open(ProfilepicComponent,
    {
      width: '900px',
      height: '600px'
    });

    dialogRef.afterClosed().subscribe(
      (x: any) => {
        if (x != null) {
          console.log('The dialog was closed');
          console.log("Image", x.file)
          // this.httpService.uploadProfilePic("/imageUpload",x.file).subscribe( response => {
          //       console.log(response);

          this.httpService.uploadProfilePic('/imageUpload', x.file).subscribe(response => {
            console.log("Response", response);
            this.snackbar.open(response.statusMessage, 'Success', { duration: 3000 });
          }
          );
        }
      })
  }

  onSearchChange(event : string){

      this.searchContent = event;
      this.searchService.changeMessage(this.searchContent);

  }
    

}














  // getMoreInformation(): string {
  //   return "Fundoo Account \n"+
  // }
  // change(){
  //   this.viewChange.onViewChange();
  // }



// ProfileSelect(){
  //   const dialogRef = this.dialog.open(ProfilepicComponent, {
  //     width: '900px',
  //     height: '600px',
  //   });
  //   dialogRef.afterClosed().subscribe((image:any) => {
  //     console.log('The dialog was closed');
  //     console.log('Image',image);
  //     console.log('Image file',typeof image);

  //     this.httpService.uploadProfilePic("/imageUpload",image.file).subscribe( response => {
  //       console.log(response);



  //       this.snackbar.open(response.statusMessage, 'Success', { duration:3000 });
  //     },error => {
  //         this.snackbar.open(error, 'fail', { duration:3000 });
  //     });
  //   })
  // }