import { PreventUnSavedChanges } from './_guards/prevent-unsaved-changes-guard';
import { MemberEditResolver } from './_resolvers/member-edit.resolver';
import { MemberEditComponent } from './_member/member-edit/member-edit.component';
import { MemberDetailResolver } from './_resolvers/member-detail.resolver';
import { MemberListResolver } from './_resolvers/member-list.resolver';
import * as messagesComponent from './messages/messages.component';
import { MemberListComponent } from './_member/member-list/member-list.component';
import { HomeComponent } from './home/home.component';
import { ListsComponent } from './lists/lists.component';
import {Routes} from '@angular/router';
import { MessagesComponent } from './messages/messages.component';
import { AuthGuard } from './_guards/auth.guard';
import { MemberDetailComponent } from './_member/member-detail/member-detail.component';

export const appRoutes: Routes = [
  { path: '', component: HomeComponent},
  { path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard] ,
    children: [
      { path: 'members', component: MemberListComponent,
      resolve: {users: MemberListResolver}},
      { path: 'members/:id', component: MemberDetailComponent,
       resolve: {user: MemberDetailResolver}},
       { path: 'member/edit' , component: MemberEditComponent ,
       resolve: {user: MemberEditResolver} , canDeactivate: [PreventUnSavedChanges]},
      { path: 'messages' , component: MessagesComponent },
      { path: 'lists', component : ListsComponent }
    ]
  },
  { path: '**', redirectTo: '', pathMatch: 'full'}
];
