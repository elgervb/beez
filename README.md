# Beez

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.2.8.

## Development 

 - https://angular.io/cli/generate
 - https://material.angular.io/components/categories
   - https://material.angular.io/guide/schematics
 - https://ngrx.io/guide/store
 - https://firebase.google.com/
   - https://github.com/angular/angularfire
   - auth guards: https://github.com/angular/angularfire/blob/master/docs/auth/router-guards.md

 
 ### NgRX
 create feature
 ```
 yarn ng g feature queen/Queen -m queen/queen.module --group --flat false --creators --api true
 ```

 create container
 ```
 yarn ng g container queen/containers/queen --state ../store/reducers/queen/queen.reducer.ts --state-interface State
 ```
