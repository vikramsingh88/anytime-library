import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from "@angular/material";

@Component({
  selector: 'app-book-review',
  templateUrl: './book-review.component.html',
  styleUrls: ['./book-review.component.css']
})
export class BookReviewComponent implements OnInit {
  starsCount : string;
  comment : string
  constructor(public dialogRef: MdDialogRef<BookReviewComponent>) { }

  ngOnInit() {
  }

  confirmSelection() {
    this.dialogRef.close({'starsCount' : this.starsCount, 'comment' : this.comment});
  }

}
