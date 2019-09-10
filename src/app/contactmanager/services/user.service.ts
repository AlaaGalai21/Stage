import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { error } from 'protractor';
import { Observable } from 'rxjs/Observable';
import { reject } from 'q';
import { resolve, resolve4 } from 'dns';
import { hostname } from 'os';

@Injectable()
export class UserService {
  private _users : BehaviorSubject<User[]>;

  private datastore: {
    users: User[];

  }

  constructor(private http : HttpClient) {
    this.datastore ={users:[]};
    this._users = new BehaviorSubject<User[]>([]);
   }

   get users(): Observable<User[]> {
     return this._users.asObservable();


   }

   userById(id:number)  {
     return this.datastore.users.find(x => x.id == id );
     

   }
   addUser (user : User) : Promise<User> {
     return new Promise((resolver, reject ) => {
       user.id = this.datastore.users.length +1;
       this.datastore.users.push(user);
       this._users.next(Object.assign({},this.datastore).users);
       resolver(user);
     });
   }


   loadAll(){
     const usersUrl ='https://angular-material-api.azurewebsites.net/users';
     return this.http.get<User[]>(usersUrl).subscribe(data => {
       this.datastore.users = data;
       this._users.next(Object.assign({},this.datastore).users);
     }, error => {
       console.log("failed to fetch users");
     }
     );


   }

}
