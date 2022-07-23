import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { AppState } from './Interfaces/AppState';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  title = 'MyNgrx';

  counter$?: Observable<number>;

 //14
  constructor(
    private store: Store<AppState>
  ){
    this.counter$ = store.select('counter');
  }

  ngOnInit(): void {

  }
}
