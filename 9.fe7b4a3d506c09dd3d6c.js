(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{fp69:function(e,t,c){"use strict";c.r(t),c.d(t,"QueenModule",function(){return ee});var n=c("ofXK"),i=c("tyNb"),a=c("pLZG"),o=c("eIep"),r=c("vkgz"),s=c("n4x5"),b=c("fXoL"),u=c("0IaG"),l=c("Cfvw"),d=c("LRne"),m=c("lJxs"),f=c("I/3d"),h=c("i6m5");let p=(()=>{class e{constructor(e,t){this.angularFirestore=e,this.authService=t}get collectionPath(){return`beez/${this.authService.uid}/queens`}createQueen(e){return Object(l.a)(this.angularFirestore.collection(this.collectionPath).add(e))}deleteQueen(e){return this.angularFirestore.doc(`${this.collectionPath}/${e.id}`).delete(),Object(d.a)(!0)}getQueen(e){return this.angularFirestore.collection(this.collectionPath).doc(e).get().pipe(Object(m.a)(e=>e.data()),Object(m.a)(t=>t?Object.assign(Object.assign({},t),{id:e}):t))}getQueens(){return this.angularFirestore.collection(this.collectionPath).valueChanges({idField:"id"})}updateQueen(e){const t=this.angularFirestore.collection(this.collectionPath).doc(e.id);return t.update(e),t.get().pipe(Object(m.a)(e=>e.data()))}}return e.\u0275fac=function(t){return new(t||e)(b.Zb(f.a),b.Zb(h.a))},e.\u0275prov=b.Lb({token:e,factory:e.\u0275fac,providedIn:"root"}),e})();var g=c("Wp6s"),k=c("MutI"),v=c("1jcm"),w=c("bTqV"),V=c("Pm42"),U=c("TeOG");function q(e,t){if(1&e&&(b.Vb(0,"mat-list-item",2),b.Vb(1,"span"),b.wc(2,"Color"),b.Ub(),b.Qb(3,"bee-color-dot",7),b.Ub()),2&e){const e=b.fc().$implicit;b.Db(3),b.kc("color",e.color)}}function D(e,t){if(1&e&&(b.Vb(0,"mat-list-item",2),b.wc(1," Remarks "),b.Qb(2,"br"),b.wc(3),b.Ub()),2&e){const e=b.fc().$implicit;b.Db(3),b.yc(" ",e.remarks," ")}}function y(e,t){if(1&e){const e=b.Wb();b.Tb(0),b.Vb(1,"mat-card"),b.Vb(2,"mat-card-header"),b.Vb(3,"mat-card-title"),b.wc(4),b.Ub(),b.Ub(),b.Vb(5,"mat-card-content"),b.Vb(6,"mat-list",1),b.Vb(7,"mat-list-item",2),b.Vb(8,"span"),b.wc(9,"Active"),b.Ub(),b.Qb(10,"mat-slide-toggle",3),b.Ub(),b.uc(11,q,4,1,"mat-list-item",4),b.Vb(12,"mat-list-item",2),b.Vb(13,"span"),b.wc(14,"Date"),b.Ub(),b.wc(15),b.gc(16,"timestamp"),b.Ub(),b.Vb(17,"mat-list-item",2),b.Vb(18,"span"),b.wc(19,"Marked"),b.Ub(),b.Qb(20,"mat-slide-toggle",3),b.Ub(),b.uc(21,D,4,1,"mat-list-item",4),b.Ub(),b.Ub(),b.Vb(22,"mat-card-actions"),b.Vb(23,"button",5),b.cc("click",function(){return b.oc(e),b.fc().back()}),b.wc(24,"back"),b.Ub(),b.Vb(25,"button",5),b.cc("click",function(){b.oc(e);const t=b.fc();return t.navigateToEdit(t.queenId)}),b.wc(26,"edit"),b.Ub(),b.Vb(27,"button",6),b.cc("click",function(){b.oc(e);const c=t.$implicit;return b.fc().deleteQueen(c)}),b.wc(28,"delete"),b.Ub(),b.Ub(),b.Ub(),b.Sb()}if(2&e){const e=t.$implicit;b.Db(4),b.yc("Queen ",e.name,""),b.Db(6),b.kc("checked",e.active)("disabled",!0),b.Db(1),b.kc("ngIf",e.isMarked),b.Db(4),b.yc(" ",b.hc(16,8,e.date)," "),b.Db(5),b.kc("checked",e.isMarked)("disabled",!0),b.Db(1),b.kc("ngIf",e.remarks)}}let I=(()=>{class e{constructor(e,t,c,n){this.route=e,this.router=t,this.dialog=c,this.queenService=n}get queenId(){return this.route.snapshot.paramMap.get("queenId")}ngOnInit(){const e=this.queenId;e&&(this.queen$=this.queenService.getQueen(e))}back(){this.router.navigate([".."],{relativeTo:this.route})}deleteQueen(e,t){null==t||t.stopPropagation(),this.dialog.open(s.a,{data:{title:"Delete queen",content:`Are you sure you want to delete queen ${e.name}?`}}).afterClosed().pipe(Object(a.a)(e=>!!e),Object(o.a)(()=>this.queenService.deleteQueen(e).pipe(Object(r.a)(()=>this.back())))).subscribe()}navigateToEdit(e){e&&this.router.navigate(["../edit",e],{relativeTo:this.route})}}return e.\u0275fac=function(t){return new(t||e)(b.Pb(i.a),b.Pb(i.b),b.Pb(u.b),b.Pb(p))},e.\u0275cmp=b.Jb({type:e,selectors:[["bee-queen-details"]],decls:2,vars:3,consts:[[4,"ngIf"],["role","list"],["role","listitem"],[3,"checked","disabled"],["role","listitem",4,"ngIf"],["mat-stroked-button","",3,"click"],["mat-stroked-button","","color","warn",3,"click"],[3,"color"]],template:function(e,t){1&e&&(b.uc(0,y,29,10,"ng-container",0),b.gc(1,"async")),2&e&&b.kc("ngIf",b.hc(1,1,t.queen$))},directives:[n.l,g.a,g.e,g.h,g.d,k.a,k.b,v.a,g.b,w.b,V.a],pipes:[n.b,U.a],styles:["span[_ngcontent-%COMP%]{flex:1 1 auto}"]}),e})();var Q=c("SxV6"),C=c("3Pt+"),O=c("kmnG"),P=c("qFsG"),S=c("iadO"),M=c("Tdyx");function j(e,t){1&e&&(b.Vb(0,"mat-form-field",3),b.Vb(1,"mat-label"),b.wc(2,"Color"),b.Ub(),b.Qb(3,"input",16),b.Vb(4,"mat-hint"),b.wc(5,"Queen is marked with this color"),b.Ub(),b.Ub())}let $=(()=>{class e{constructor(e){this.formBuilder=e,this.submitEvent=new b.o,this.cancelEvent=new b.o,this.form=this.formBuilder.group({id:[""],name:["",C.p.required],active:[!0],isMarked:[!1],color:[""],date:[new Date,C.p.required],remarks:[""]})}set queen(e){var t;if(e){const c=null===(t=e.date)||void 0===t?void 0:t.toDate(),n=Object.assign(Object.assign({},e),{date:c});this.form.patchValue(n)}}ngOnInit(){}cancel(){this.cancelEvent.emit()}submit(){this.form.valid&&this.submitEvent.emit(Object.assign({},this.form.value))}}return e.\u0275fac=function(t){return new(t||e)(b.Pb(C.d))},e.\u0275cmp=b.Jb({type:e,selectors:[["bee-queen-form"]],inputs:{queen:"queen"},outputs:{submitEvent:"submitEvent",cancelEvent:"cancelEvent"},decls:34,vars:5,consts:[[3,"formGroup","ngSubmit"],["type","hidden","formControlName","id"],[1,"form-field"],["appearance","fill"],["matInput","","placeholder","Queen's name","formControlName","name"],["matInput","","formControlName","date",3,"matDatepicker"],["matSuffix","",3,"for"],["touchUi",""],["picker1",""],["matInput","","formControlName","remarks"],["formControlName","isMarked"],["appearance","fill",4,"ngIf"],["formControlName","active"],["justify","right"],["mat-stroked-button","","type","button",3,"click"],["mat-stroked-button","","type","submit","color","primary",3,"disabled"],["matInput","","placeholder","Queed marked color","type","color","formControlName","color"]],template:function(e,t){if(1&e&&(b.Vb(0,"form",0),b.cc("ngSubmit",function(){return t.submit()}),b.Qb(1,"input",1),b.Vb(2,"div",2),b.Vb(3,"mat-form-field",3),b.Vb(4,"mat-label"),b.wc(5,"Name*"),b.Ub(),b.Qb(6,"input",4),b.Vb(7,"mat-hint"),b.wc(8,"Queens name (required)"),b.Ub(),b.Ub(),b.Ub(),b.Vb(9,"div",2),b.Vb(10,"mat-form-field",3),b.Vb(11,"mat-label"),b.wc(12,"Date"),b.Ub(),b.Qb(13,"input",5),b.Qb(14,"mat-datepicker-toggle",6),b.Qb(15,"mat-datepicker",7,8),b.Ub(),b.Ub(),b.Vb(17,"div",2),b.Vb(18,"mat-form-field",3),b.Vb(19,"mat-label"),b.wc(20,"Remarks"),b.Ub(),b.Qb(21,"textarea",9),b.Ub(),b.Ub(),b.Vb(22,"div",2),b.Vb(23,"mat-slide-toggle",10),b.wc(24,"Is marked"),b.Ub(),b.uc(25,j,6,0,"mat-form-field",11),b.Ub(),b.Vb(26,"div",2),b.Vb(27,"mat-slide-toggle",12),b.wc(28,"Is active"),b.Ub(),b.Ub(),b.Vb(29,"bee-button-bar",13),b.Vb(30,"button",14),b.cc("click",function(){return t.cancel()}),b.wc(31,"cancel"),b.Ub(),b.Vb(32,"button",15),b.wc(33,"save"),b.Ub(),b.Ub(),b.Ub()),2&e){const e=b.nc(16);let c=null;b.kc("formGroup",t.form),b.Db(13),b.kc("matDatepicker",e),b.Db(1),b.kc("for",e),b.Db(11),b.kc("ngIf",null==(c=t.form.get("isMarked"))?null:c.value),b.Db(7),b.kc("disabled",t.form.invalid||t.form.pristine)}},directives:[C.q,C.m,C.h,C.c,C.l,C.g,O.b,O.f,P.b,O.e,S.b,S.d,O.g,S.a,v.a,n.l,M.a,w.b],styles:[".form-field[_ngcontent-%COMP%]{align-items:center;display:flex;margin:.5rem 0;min-height:5rem}.mat-form-field[_ngcontent-%COMP%]{align-items:center;flex:1 1 auto}textarea[_ngcontent-%COMP%]{min-height:6rem}"]}),e})(),E=(()=>{class e{constructor(e,t,c){this.route=e,this.location=t,this.queenService=c}get isEdit(){return!!this.queenId}get queenId(){return this.route.snapshot.paramMap.get("queenId")}ngOnInit(){const e=this.queenId;e&&(this.queen$=this.queenService.getQueen(e))}edit(e){const t=e.id?this.queenService.updateQueen(e):this.queenService.createQueen(e);null==t||t.pipe(Object(Q.a)(),Object(r.a)(()=>this.cancel())).subscribe()}cancel(){this.location.back()}}return e.\u0275fac=function(t){return new(t||e)(b.Pb(i.a),b.Pb(n.h),b.Pb(p))},e.\u0275cmp=b.Jb({type:e,selectors:[["bee-queen-edit"]],decls:7,vars:4,consts:[[3,"queen","cancelEvent","submitEvent"]],template:function(e,t){1&e&&(b.Vb(0,"mat-card"),b.Vb(1,"mat-card-header"),b.Vb(2,"mat-card-title"),b.wc(3),b.Ub(),b.Ub(),b.Vb(4,"mat-card-content"),b.Vb(5,"bee-queen-form",0),b.cc("cancelEvent",function(){return t.cancel()})("submitEvent",function(e){return t.edit(e)}),b.gc(6,"async"),b.Ub(),b.Ub(),b.Ub()),2&e&&(b.Db(3),b.yc("",t.isEdit?"Edit":"Add"," queen"),b.Db(2),b.kc("queen",b.hc(6,2,t.queen$)))},directives:[g.a,g.e,g.h,g.d,$],pipes:[n.b],styles:[""]}),e})();var N=c("Dh3D"),x=c("+0xr"),T=c("XNiG"),A=c("1G5W");function R(e,t){1&e&&(b.Vb(0,"th",9),b.wc(1," Name "),b.Ub())}function G(e,t){if(1&e&&(b.Vb(0,"td",10),b.wc(1),b.Ub()),2&e){const e=t.$implicit;b.Db(1),b.yc(" ",e.name," ")}}function F(e,t){1&e&&(b.Vb(0,"th",9),b.wc(1," Marked "),b.Ub())}function J(e,t){if(1&e&&b.Qb(0,"bee-color-dot",13),2&e){const e=b.fc().$implicit;b.kc("color",e.color)}}function _(e,t){1&e&&(b.Vb(0,"span"),b.wc(1,"-"),b.Ub())}function H(e,t){if(1&e&&(b.Vb(0,"td",10),b.uc(1,J,1,1,"bee-color-dot",11),b.uc(2,_,2,0,"span",12),b.Ub()),2&e){const e=t.$implicit;b.Db(1),b.kc("ngIf",e.isMarked),b.Db(1),b.kc("ngIf",!e.isMarked)}}function L(e,t){1&e&&(b.Vb(0,"th",9),b.wc(1," Active "),b.Ub())}function W(e,t){if(1&e&&(b.Vb(0,"td",10),b.Qb(1,"mat-slide-toggle",14),b.Ub()),2&e){const e=t.$implicit;b.Db(1),b.kc("checked",e.active)("disabled",!0)}}function X(e,t){1&e&&b.Qb(0,"tr",15)}function Z(e,t){if(1&e){const e=b.Wb();b.Vb(0,"tr",16),b.cc("click",function(){b.oc(e);const c=t.$implicit;return b.fc().select(c)}),b.Ub()}}const z=[{path:"",component:(()=>{class e{constructor(e,t,c){this.router=e,this.route=t,this.queenService=c,this.dataSource=new x.k,this.displayedColumns=["name","isMarked","isActive"],this.destroy$=new T.a}ngOnInit(){this.queenService.getQueens().pipe(Object(r.a)(e=>this.dataSource.data=e),Object(A.a)(this.destroy$)).subscribe()}ngOnDestroy(){this.destroy$.next(),this.destroy$.complete()}ngAfterViewInit(){this.dataSource.sort=this.sort}addQueen(){this.router.navigate(["add"],{relativeTo:this.route})}select(e){this.router.navigate([e.id],{relativeTo:this.route})}}return e.\u0275fac=function(t){return new(t||e)(b.Pb(i.b),b.Pb(i.a),b.Pb(p))},e.\u0275cmp=b.Jb({type:e,selectors:[["bee-queen-list"]],viewQuery:function(e,t){if(1&e&&b.Ac(N.a,1),2&e){let e;b.mc(e=b.dc())&&(t.sort=e.first)}},decls:20,vars:4,consts:[["mat-table","","matSort","",3,"dataSource"],["matColumnDef","name"],["mat-header-cell","","mat-sort-header","",4,"matHeaderCellDef"],["mat-cell","",4,"matCellDef"],["matColumnDef","isMarked"],["matColumnDef","isActive"],["mat-header-row","",4,"matHeaderRowDef","matHeaderRowDefSticky"],["mat-row","",3,"click",4,"matRowDef","matRowDefColumns"],["mat-stroked-button","","color","primary","type","button",3,"click"],["mat-header-cell","","mat-sort-header",""],["mat-cell",""],[3,"color",4,"ngIf"],[4,"ngIf"],[3,"color"],[3,"checked","disabled"],["mat-header-row",""],["mat-row","",3,"click"]],template:function(e,t){1&e&&(b.Vb(0,"mat-card"),b.Vb(1,"mat-card-header"),b.Vb(2,"mat-card-title"),b.wc(3,"Queens"),b.Ub(),b.Ub(),b.Vb(4,"mat-card-content"),b.Vb(5,"table",0),b.Tb(6,1),b.uc(7,R,2,0,"th",2),b.uc(8,G,2,1,"td",3),b.Sb(),b.Tb(9,4),b.uc(10,F,2,0,"th",2),b.uc(11,H,3,2,"td",3),b.Sb(),b.Tb(12,5),b.uc(13,L,2,0,"th",2),b.uc(14,W,2,2,"td",3),b.Sb(),b.uc(15,X,1,0,"tr",6),b.uc(16,Z,1,0,"tr",7),b.Ub(),b.Ub(),b.Vb(17,"mat-card-actions"),b.Vb(18,"button",8),b.cc("click",function(){return t.addQueen()}),b.wc(19," Add new "),b.Ub(),b.Ub(),b.Ub()),2&e&&(b.Db(5),b.kc("dataSource",t.dataSource),b.Db(10),b.kc("matHeaderRowDef",t.displayedColumns)("matHeaderRowDefSticky",!0),b.Db(1),b.kc("matRowDefColumns",t.displayedColumns))},directives:[g.a,g.e,g.h,g.d,x.j,N.a,x.c,x.e,x.b,x.g,x.i,g.b,w.b,x.d,N.b,x.a,n.l,V.a,v.a,x.f,x.h],styles:["table[_ngcontent-%COMP%]{width:100%}.mat-column-actions[_ngcontent-%COMP%]{width:75px}.mat-row[_ngcontent-%COMP%]:hover{background-color:#f5f5f5;cursor:pointer}"]}),e})()},{path:"add",component:E},{path:"edit/:queenId",component:E},{path:":queenId",component:I}];let B=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=b.Nb({type:e}),e.\u0275inj=b.Mb({imports:[[i.e.forChild(z)],i.e]}),e})();var K=c("jAig"),Y=c("PCNd");let ee=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=b.Nb({type:e}),e.\u0275inj=b.Mb({imports:[[n.c,K.a,B,C.o,Y.a]]}),e})()}}]);