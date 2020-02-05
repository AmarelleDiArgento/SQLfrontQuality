import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-drag-drop',
  templateUrl: './drag-drop.component.html',
  styleUrls: ['./drag-drop.component.scss']
})
export class DragDropComponent implements OnInit {

  Movies = [
    'Blade Runner',
    'Cool Hand Luke',
    'Heat',
    'Juice',
    'The Far Side of the World',
    'Morituri',
    'Napoleon Dynamite',
    'Pulp Fiction'
  ];

    // Transfer Items Between Lists
    MoviesList = [
      'The Far Side of the World',
      'Morituri',
      'Napoleon Dynamite',
      'Pulp Fiction',
      'Blade Runner',
      'Cool Hand Luke',
      'Heat',
      'Juice'
    ];
  
    MoviesWatched = [
    ];
    
  constructor() { }

  ngOnInit() {
  }



  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.Movies, event.previousIndex, event.currentIndex);
  }



  onDrop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }
}
