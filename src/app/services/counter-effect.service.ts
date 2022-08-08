import { tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

@Injectable({
  providedIn: 'root'
})
export class CounterEffectService {

  constructor(private actions$: Actions) { }

  counter$ = createEffect(() => (
    this.actions$.pipe(
      ofType('INCREMENT'),
      tap(action => console.log('increment happened:', action))
    )
  ), {dispatch: false});

}
