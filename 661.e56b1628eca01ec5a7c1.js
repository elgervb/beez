"use strict";(self.webpackChunkbeez=self.webpackChunkbeez||[]).push([[661],{661:(ue,q,a)=>{a.r(q),a.d(q,{QueenModule:()=>ce});var d=a(8583),p=a(2882),f=a(4269),U=a(4689),k=a(7540),h=a(9922),_=a(4294),m=a(7299),e=a(7716),S=a(2238),M=a(9699),L=a(1964),Z=a(5207),N=a(2232),E=a(9523);let v=(()=>{class n{constructor(t,o){this.angularFirestore=t,this.authService=o}get collectionPath(){return`beez/${this.authService.uid}/queens`}createQueen(t){return(0,M.D)(this.angularFirestore.collection(this.collectionPath).add(t))}deleteQueen(t){return this.angularFirestore.doc(`${this.collectionPath}/${t.id}`).delete(),(0,L.of)(!0)}getQueen(t){return this.angularFirestore.collection(this.collectionPath).doc(t).get().pipe((0,Z.U)(o=>o.data()),(0,Z.U)(o=>o&&Object.assign(Object.assign({},o),{id:t})))}getQueens(){return this.angularFirestore.collection(this.collectionPath).valueChanges({idField:"id"})}updateQueen(t){const o=this.angularFirestore.collection(this.collectionPath).doc(t.id);return o.update(t),o.get().pipe((0,Z.U)(r=>r.data()))}}return n.\u0275fac=function(t){return new(t||n)(e.LFG(N.ST),e.LFG(E.e8))},n.\u0275prov=e.Yz7({token:n,factory:n.\u0275fac,providedIn:"root"}),n})();var I=a(6410),s=a(3738),b=a(7746),Q=a(5396),T=a(1095),Y=a(6627);function D(n,i){if(1&n&&(e.TgZ(0,"mat-list-item",2),e.TgZ(1,"span"),e._uU(2),e.ALo(3,"i18nextCap"),e.qZA(),e._UZ(4,"bee-color-dot",7),e.qZA()),2&n){const t=e.oxw().$implicit;e.xp6(2),e.Oqu(e.lcZ(3,2,"color")),e.xp6(2),e.Q6J("color",t.color)}}function J(n,i){if(1&n&&(e.TgZ(0,"mat-list-item",2),e._uU(1),e.ALo(2,"i18nextCap"),e._UZ(3,"br"),e._uU(4),e.qZA()),2&n){const t=e.oxw().$implicit;e.xp6(1),e.hij(" ",e.lcZ(2,2,"remarks")," "),e.xp6(3),e.hij(" ",t.remarks," ")}}function O(n,i){if(1&n){const t=e.EpF();e.ynx(0),e.TgZ(1,"mat-card"),e.TgZ(2,"mat-card-header"),e.TgZ(3,"mat-card-title"),e._uU(4),e.ALo(5,"i18nextCap"),e.qZA(),e.qZA(),e.TgZ(6,"mat-card-content"),e.TgZ(7,"mat-list",1),e.TgZ(8,"mat-list-item",2),e.TgZ(9,"span"),e._uU(10),e.ALo(11,"i18nextCap"),e.qZA(),e._UZ(12,"mat-slide-toggle",3),e.qZA(),e.YNc(13,D,5,4,"mat-list-item",4),e.TgZ(14,"mat-list-item",2),e.TgZ(15,"span"),e._uU(16),e.ALo(17,"i18nextCap"),e.qZA(),e._uU(18),e.ALo(19,"timestamp"),e.qZA(),e.TgZ(20,"mat-list-item",2),e.TgZ(21,"span"),e._uU(22),e.ALo(23,"i18nextCap"),e.qZA(),e._UZ(24,"mat-slide-toggle",3),e.qZA(),e.YNc(25,J,5,4,"mat-list-item",4),e.qZA(),e.qZA(),e.TgZ(26,"mat-card-actions"),e.TgZ(27,"button",5),e.NdJ("click",function(){return e.CHM(t),e.oxw().back()}),e._uU(28),e.ALo(29,"i18next"),e.qZA(),e.TgZ(30,"button",6),e.NdJ("click",function(){const c=e.CHM(t).$implicit;return e.oxw().openBottomSheet(c)}),e.TgZ(31,"mat-icon"),e._uU(32,"more_vert"),e.qZA(),e.qZA(),e.qZA(),e.qZA(),e.BQk()}if(2&n){const t=i.$implicit;e.xp6(4),e.AsE("",e.lcZ(5,13,"queen")," ",t.name,""),e.xp6(6),e.Oqu(e.lcZ(11,15,"active")),e.xp6(2),e.Q6J("checked",t.active)("disabled",!0),e.xp6(1),e.Q6J("ngIf",t.isMarked),e.xp6(3),e.Oqu(e.lcZ(17,17,"date")),e.xp6(2),e.hij(" ",e.lcZ(19,19,t.date)," "),e.xp6(4),e.Oqu(e.lcZ(23,21,"isMarked")),e.xp6(2),e.Q6J("checked",t.isMarked)("disabled",!0),e.xp6(1),e.Q6J("ngIf",t.remarks),e.xp6(3),e.Oqu(e.lcZ(29,23,"back"))}}const F={actions:[{type:"edit",transKey:"edit"},{type:"delete",transKey:"delete"}]};let $=(()=>{class n{constructor(t,o,r,c,x,le){this.route=t,this.router=o,this.dialog=r,this.queenService=c,this.bottomSheet=x,this.i18NextService=le}get queenId(){return this.route.snapshot.paramMap.get("queenId")}ngOnInit(){const{queenId:t}=this;t&&(this.queen$=this.queenService.getQueen(t))}back(){this.router.navigate([".."],{relativeTo:this.route})}deleteQueen(t){this.dialog.open(m.Xu,{data:{title:`${this.i18NextService.format("delete","cap")} ${this.i18NextService.t("queen")}`,content:this.i18NextService.t("sentence.confirmDelete",{replace:{what:t.name}})}}).afterClosed().pipe((0,U.h)(o=>!!o),(0,k.w)(()=>this.queenService.deleteQueen(t).pipe((0,h.b)(()=>this.back())))).subscribe()}openBottomSheet(t){const o=this.bottomSheet.open(m.yR,{data:F,closeOnNavigation:!0});o.instance.action$.pipe((0,h.b)(r=>{switch(r){case"edit":this.navigateToEdit(this.queenId);break;case"delete":this.deleteQueen(t);break;default:throw new Error("no such action")}o.dismiss()}),(0,_.q)(1)).subscribe()}navigateToEdit(t){t&&this.router.navigate(["../edit",t],{relativeTo:this.route})}}return n.\u0275fac=function(t){return new(t||n)(e.Y36(p.gz),e.Y36(p.F0),e.Y36(S.uw),e.Y36(v),e.Y36(I.ch),e.Y36(f.bu))},n.\u0275cmp=e.Xpm({type:n,selectors:[["bee-queen-details"]],decls:2,vars:3,consts:[[4,"ngIf"],["role","list"],["role","listitem"],[3,"checked","disabled"],["role","listitem",4,"ngIf"],["mat-stroked-button","",3,"click"],["mat-icon-button","",3,"click"],[3,"color"]],template:function(t,o){1&t&&(e.YNc(0,O,33,25,"ng-container",0),e.ALo(1,"async")),2&t&&e.Q6J("ngIf",e.lcZ(1,1,o.queen$))},directives:[d.O5,s.a8,s.dk,s.n5,s.dn,b.i$,b.Tg,Q.Rr,s.hq,T.lW,Y.Hw,m.lK],pipes:[d.Ov,f.Mz,m.dS,f.e3],styles:["span[_ngcontent-%COMP%]{flex:1 1 auto}"]}),n})();var j=a(7920),u=a(3679),g=a(8295),R=a(9983),C=a(3220);function w(n,i){1&n&&(e.TgZ(0,"mat-form-field",3),e.TgZ(1,"mat-label"),e._uU(2,"Color"),e.qZA(),e._UZ(3,"input",16),e.TgZ(4,"mat-hint"),e._uU(5,"Queen is marked with this color"),e.qZA(),e.qZA())}let z=(()=>{class n{constructor(t){this.formBuilder=t,this.submitEvent=new e.vpe,this.cancelEvent=new e.vpe,this.form=this.formBuilder.group({id:[""],name:["",u.kI.required],active:[!0],isMarked:[!1],color:[""],date:[new Date,u.kI.required],remarks:[""]})}set queen(t){var o;if(t){const r=null===(o=t.date)||void 0===o?void 0:o.toDate(),c=Object.assign(Object.assign({},t),{date:r});this.form.patchValue(c)}}cancel(){this.cancelEvent.emit()}submit(){this.form.valid&&this.submitEvent.emit(Object.assign({},this.form.value))}}return n.\u0275fac=function(t){return new(t||n)(e.Y36(u.qu))},n.\u0275cmp=e.Xpm({type:n,selectors:[["bee-queen-form"]],inputs:{queen:"queen"},outputs:{submitEvent:"submitEvent",cancelEvent:"cancelEvent"},decls:34,vars:5,consts:[[3,"formGroup","ngSubmit"],["type","hidden","formControlName","id"],[1,"form-field"],["appearance","fill"],["matInput","","placeholder","Queen's name","formControlName","name"],["matInput","","formControlName","date",3,"matDatepicker"],["matSuffix","",3,"for"],["touchUi",""],["picker1",""],["matInput","","formControlName","remarks"],["formControlName","isMarked"],["appearance","fill",4,"ngIf"],["formControlName","active"],["justify","right"],["mat-stroked-button","","type","button",3,"click"],["mat-stroked-button","","type","submit","color","primary",3,"disabled"],["matInput","","placeholder","Queed marked color","type","color","formControlName","color"]],template:function(t,o){if(1&t&&(e.TgZ(0,"form",0),e.NdJ("ngSubmit",function(){return o.submit()}),e._UZ(1,"input",1),e.TgZ(2,"div",2),e.TgZ(3,"mat-form-field",3),e.TgZ(4,"mat-label"),e._uU(5,"Name*"),e.qZA(),e._UZ(6,"input",4),e.TgZ(7,"mat-hint"),e._uU(8,"Queens name (required)"),e.qZA(),e.qZA(),e.qZA(),e.TgZ(9,"div",2),e.TgZ(10,"mat-form-field",3),e.TgZ(11,"mat-label"),e._uU(12,"Date"),e.qZA(),e._UZ(13,"input",5),e._UZ(14,"mat-datepicker-toggle",6),e._UZ(15,"mat-datepicker",7,8),e.qZA(),e.qZA(),e.TgZ(17,"div",2),e.TgZ(18,"mat-form-field",3),e.TgZ(19,"mat-label"),e._uU(20,"Remarks"),e.qZA(),e._UZ(21,"textarea",9),e.qZA(),e.qZA(),e.TgZ(22,"div",2),e.TgZ(23,"mat-slide-toggle",10),e._uU(24,"Is marked"),e.qZA(),e.YNc(25,w,6,0,"mat-form-field",11),e.qZA(),e.TgZ(26,"div",2),e.TgZ(27,"mat-slide-toggle",12),e._uU(28,"Is active"),e.qZA(),e.qZA(),e.TgZ(29,"bee-button-bar",13),e.TgZ(30,"button",14),e.NdJ("click",function(){return o.cancel()}),e._uU(31,"cancel"),e.qZA(),e.TgZ(32,"button",15),e._uU(33,"save"),e.qZA(),e.qZA(),e.qZA()),2&t){const r=e.MAs(16);let c;e.Q6J("formGroup",o.form),e.xp6(13),e.Q6J("matDatepicker",r),e.xp6(1),e.Q6J("for",r),e.xp6(11),e.Q6J("ngIf",null==(c=o.form.get("isMarked"))?null:c.value),e.xp6(7),e.Q6J("disabled",o.form.invalid||o.form.pristine)}},directives:[u._Y,u.JL,u.sg,u.Fj,u.JJ,u.u,g.KE,g.hX,R.Nt,g.bx,C.hl,C.nW,g.R9,C.Mq,Q.Rr,d.O5,m.N3,T.lW],styles:[".form-field[_ngcontent-%COMP%]{align-items:center;display:flex;margin:.5rem 0;min-height:5rem}.mat-form-field[_ngcontent-%COMP%]{align-items:center;flex:1 1 auto}textarea[_ngcontent-%COMP%]{min-height:6rem}"]}),n})(),y=(()=>{class n{constructor(t,o,r){this.route=t,this.location=o,this.queenService=r}get isEdit(){return!!this.queenId}get queenId(){return this.route.snapshot.paramMap.get("queenId")}ngOnInit(){const{queenId:t}=this;t&&(this.queen$=this.queenService.getQueen(t))}edit(t){const o=t.id?this.queenService.updateQueen(t):this.queenService.createQueen(t);null==o||o.pipe((0,j.P)(),(0,h.b)(()=>this.cancel())).subscribe()}cancel(){this.location.back()}}return n.\u0275fac=function(t){return new(t||n)(e.Y36(p.gz),e.Y36(d.Ye),e.Y36(v))},n.\u0275cmp=e.Xpm({type:n,selectors:[["bee-queen-edit"]],decls:7,vars:4,consts:[[3,"queen","cancelEvent","submitEvent"]],template:function(t,o){1&t&&(e.TgZ(0,"mat-card"),e.TgZ(1,"mat-card-header"),e.TgZ(2,"mat-card-title"),e._uU(3),e.qZA(),e.qZA(),e.TgZ(4,"mat-card-content"),e.TgZ(5,"bee-queen-form",0),e.NdJ("cancelEvent",function(){return o.cancel()})("submitEvent",function(c){return o.edit(c)}),e.ALo(6,"async"),e.qZA(),e.qZA(),e.qZA()),2&t&&(e.xp6(3),e.hij("",o.isEdit?"Edit":"Add"," queen"),e.xp6(2),e.Q6J("queen",e.lcZ(6,2,o.queen$)))},directives:[s.a8,s.dk,s.n5,s.dn,z],pipes:[d.Ov],styles:[""]}),n})();var A=a(1494),l=a(2789),P=a(6889),B=a(5755);function H(n,i){1&n&&(e.TgZ(0,"th",9),e._uU(1),e.ALo(2,"i18nextCap"),e.qZA()),2&n&&(e.xp6(1),e.hij(" ",e.lcZ(2,1,"name")," "))}function X(n,i){if(1&n&&(e.TgZ(0,"td",10),e._uU(1),e.qZA()),2&n){const t=i.$implicit;e.xp6(1),e.hij(" ",t.name," ")}}function G(n,i){1&n&&(e.TgZ(0,"th",9),e._uU(1),e.ALo(2,"i18nextCap"),e.qZA()),2&n&&(e.xp6(1),e.hij(" ",e.lcZ(2,1,"isMarked")," "))}function K(n,i){if(1&n&&e._UZ(0,"bee-color-dot",13),2&n){const t=e.oxw().$implicit;e.Q6J("color",t.color)}}function W(n,i){1&n&&(e.TgZ(0,"span"),e._uU(1,"-"),e.qZA())}function V(n,i){if(1&n&&(e.TgZ(0,"td",10),e.YNc(1,K,1,1,"bee-color-dot",11),e.YNc(2,W,2,0,"span",12),e.qZA()),2&n){const t=i.$implicit;e.xp6(1),e.Q6J("ngIf",t.isMarked),e.xp6(1),e.Q6J("ngIf",!t.isMarked)}}function ee(n,i){1&n&&(e.TgZ(0,"th",9),e._uU(1),e.ALo(2,"i18nextCap"),e.qZA()),2&n&&(e.xp6(1),e.hij(" ",e.lcZ(2,1,"active")," "))}function te(n,i){if(1&n&&(e.TgZ(0,"td",10),e._UZ(1,"mat-slide-toggle",14),e.qZA()),2&n){const t=i.$implicit;e.xp6(1),e.Q6J("checked",t.active)("disabled",!0)}}function ne(n,i){1&n&&e._UZ(0,"tr",15)}function oe(n,i){if(1&n){const t=e.EpF();e.TgZ(0,"tr",16),e.NdJ("click",function(){const c=e.CHM(t).$implicit;return e.oxw().select(c)}),e.qZA()}}const ie=function(){return{count:2}},ae=[{path:"",component:(()=>{class n{constructor(t,o,r){this.router=t,this.route=o,this.queenService=r,this.dataSource=new l.by,this.displayedColumns=["name","isMarked","isActive"],this.destroy$=new P.x}ngOnInit(){this.queenService.getQueens().pipe((0,h.b)(t=>this.dataSource.data=t),(0,B.R)(this.destroy$)).subscribe()}ngOnDestroy(){this.destroy$.next(),this.destroy$.complete()}ngAfterViewInit(){this.dataSource.sort=this.sort}addQueen(){this.router.navigate(["add"],{relativeTo:this.route})}select(t){this.router.navigate([t.id],{relativeTo:this.route})}}return n.\u0275fac=function(t){return new(t||n)(e.Y36(p.F0),e.Y36(p.gz),e.Y36(v))},n.\u0275cmp=e.Xpm({type:n,selectors:[["bee-queen-list"]],viewQuery:function(t,o){if(1&t&&e.Gf(A.YE,5),2&t){let r;e.iGM(r=e.CRH())&&(o.sort=r.first)}},decls:22,vars:12,consts:[["mat-table","","matSort","",3,"dataSource"],["matColumnDef","name"],["mat-header-cell","","mat-sort-header","",4,"matHeaderCellDef"],["mat-cell","",4,"matCellDef"],["matColumnDef","isMarked"],["matColumnDef","isActive"],["mat-header-row","",4,"matHeaderRowDef","matHeaderRowDefSticky"],["mat-row","",3,"click",4,"matRowDef","matRowDefColumns"],["mat-stroked-button","","color","primary","type","button",3,"click"],["mat-header-cell","","mat-sort-header",""],["mat-cell",""],[3,"color",4,"ngIf"],[4,"ngIf"],[3,"color"],[3,"checked","disabled"],["mat-header-row",""],["mat-row","",3,"click"]],template:function(t,o){1&t&&(e.TgZ(0,"mat-card"),e.TgZ(1,"mat-card-header"),e.TgZ(2,"mat-card-title"),e._uU(3),e.ALo(4,"i18nextCap"),e.qZA(),e.qZA(),e.TgZ(5,"mat-card-content"),e.TgZ(6,"table",0),e.ynx(7,1),e.YNc(8,H,3,3,"th",2),e.YNc(9,X,2,1,"td",3),e.BQk(),e.ynx(10,4),e.YNc(11,G,3,3,"th",2),e.YNc(12,V,3,2,"td",3),e.BQk(),e.ynx(13,5),e.YNc(14,ee,3,3,"th",2),e.YNc(15,te,2,2,"td",3),e.BQk(),e.YNc(16,ne,1,0,"tr",6),e.YNc(17,oe,1,0,"tr",7),e.qZA(),e.qZA(),e.TgZ(18,"mat-card-actions"),e.TgZ(19,"button",8),e.NdJ("click",function(){return o.addQueen()}),e._uU(20),e.ALo(21,"i18nextCap"),e.qZA(),e.qZA(),e.qZA()),2&t&&(e.xp6(3),e.Oqu(e.xi3(4,6,"queen",e.DdM(11,ie))),e.xp6(3),e.Q6J("dataSource",o.dataSource),e.xp6(10),e.Q6J("matHeaderRowDef",o.displayedColumns)("matHeaderRowDefSticky",!0),e.xp6(1),e.Q6J("matRowDefColumns",o.displayedColumns),e.xp6(3),e.hij(" ",e.lcZ(21,9,"add")," "))},directives:[s.a8,s.dk,s.n5,s.dn,l.BZ,A.YE,l.w1,l.fO,l.Dz,l.as,l.nj,s.hq,T.lW,l.ge,A.nU,l.ev,d.O5,m.lK,Q.Rr,l.XQ,l.Gk],pipes:[f.Mz],styles:["table[_ngcontent-%COMP%]{width:100%}.mat-column-actions[_ngcontent-%COMP%]{width:75px}.mat-row[_ngcontent-%COMP%]:hover{background-color:#f5f5f5;cursor:pointer}"]}),n})()},{path:"add",component:y},{path:"edit/:queenId",component:y},{path:":queenId",component:$}];let re=(()=>{class n{}return n.\u0275fac=function(t){return new(t||n)},n.\u0275mod=e.oAB({type:n}),n.\u0275inj=e.cJS({imports:[[p.Bz.forChild(ae)],p.Bz]}),n})();var se=a(4466);let ce=(()=>{class n{}return n.\u0275fac=function(t){return new(t||n)},n.\u0275mod=e.oAB({type:n}),n.\u0275inj=e.cJS({imports:[[d.ez,m.Kk,f.zH,m.qX,re,u.UX,se.m]]}),n})()}}]);