(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{fp69:function(e,t,n){"use strict";n.r(t),n.d(t,"QueenModule",function(){return ee});var c=n("ofXK"),i=n("tyNb"),a=n("pLZG"),r=n("eIep"),o=n("vkgz"),s=n("n4x5"),b=n("fXoL"),u=n("0IaG"),l=n("Cfvw"),d=n("LRne"),m=n("lJxs"),f=n("I/3d"),h=n("i6m5");let p=(()=>{class e{constructor(e,t){this.angularFirestore=e,this.authService=t}get collectionPath(){return`beez/${this.authService.uid}/queens`}createQueen(e){return Object(l.a)(this.angularFirestore.collection(this.collectionPath).add(e))}deleteQueen(e){return this.angularFirestore.doc(`${this.collectionPath}/${e.id}`).delete(),Object(d.a)(!0)}getQueen(e){return this.angularFirestore.collection(this.collectionPath).doc(e).get().pipe(Object(m.a)(e=>e.data()),Object(m.a)(t=>t?Object.assign(Object.assign({},t),{id:e}):t))}getQueens(){return this.angularFirestore.collection(this.collectionPath).valueChanges({idField:"id"})}updateQueen(e){const t=this.angularFirestore.collection(this.collectionPath).doc(e.id);return t.update(e),t.get().pipe(Object(m.a)(e=>e.data()))}}return e.\u0275fac=function(t){return new(t||e)(b.Yb(f.a),b.Yb(h.a))},e.\u0275prov=b.Kb({token:e,factory:e.\u0275fac,providedIn:"root"}),e})();var g=n("Wp6s"),v=n("MutI"),T=n("1jcm"),k=n("bTqV");let U=(()=>{class e{constructor(){}get backgroundColor(){return this.color}ngOnInit(){}}return e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=b.Ib({type:e,selectors:[["bee-color-dot"]],hostVars:2,hostBindings:function(e,t){2&e&&b.qc("background",t.backgroundColor)},inputs:{color:"color"},decls:0,vars:0,template:function(e,t){},styles:["[_nghost-%COMP%]{display:inline-block;border-radius:50%;box-shadow:0 0 2px 0 rgb(0 0 0/50%);min-height:1rem;min-width:1rem}"]}),e})();var w=n("TeOG");function O(e,t){if(1&e&&(b.Ub(0,"mat-list-item",2),b.Ub(1,"span"),b.uc(2,"Color"),b.Tb(),b.Pb(3,"bee-color-dot",7),b.Tb()),2&e){const e=b.ec().$implicit;b.Db(3),b.jc("color",e.color)}}function j(e,t){if(1&e&&(b.Ub(0,"mat-list-item",2),b.uc(1," Remarks "),b.Pb(2,"br"),b.uc(3),b.Tb()),2&e){const e=b.ec().$implicit;b.Db(3),b.wc(" ",e.remarks," ")}}function q(e,t){if(1&e){const e=b.Vb();b.Sb(0),b.Ub(1,"mat-card"),b.Ub(2,"mat-card-header"),b.Ub(3,"mat-card-title"),b.uc(4),b.Tb(),b.Tb(),b.Ub(5,"mat-card-content"),b.Ub(6,"mat-list",1),b.Ub(7,"mat-list-item",2),b.Ub(8,"span"),b.uc(9,"Active"),b.Tb(),b.Pb(10,"mat-slide-toggle",3),b.Tb(),b.tc(11,O,4,1,"mat-list-item",4),b.Ub(12,"mat-list-item",2),b.Ub(13,"span"),b.uc(14,"Date"),b.Tb(),b.uc(15),b.fc(16,"timestamp"),b.Tb(),b.Ub(17,"mat-list-item",2),b.Ub(18,"span"),b.uc(19,"Marked"),b.Tb(),b.Pb(20,"mat-slide-toggle",3),b.Tb(),b.tc(21,j,4,1,"mat-list-item",4),b.Tb(),b.Tb(),b.Ub(22,"mat-card-actions"),b.Ub(23,"button",5),b.bc("click",function(){return b.nc(e),b.ec().back()}),b.uc(24,"back"),b.Tb(),b.Ub(25,"button",5),b.bc("click",function(){b.nc(e);const t=b.ec();return t.navigateToEdit(t.queenId)}),b.uc(26,"edit"),b.Tb(),b.Ub(27,"button",6),b.bc("click",function(){b.nc(e);const n=t.$implicit;return b.ec().deleteQueen(n)}),b.uc(28,"delete"),b.Tb(),b.Tb(),b.Tb(),b.Rb()}if(2&e){const e=t.$implicit;b.Db(4),b.wc("Queen ",e.name,""),b.Db(6),b.jc("checked",e.active)("disabled",!0),b.Db(1),b.jc("ngIf",e.isMarked),b.Db(4),b.wc(" ",b.gc(16,8,e.date)," "),b.Db(5),b.jc("checked",e.isMarked)("disabled",!0),b.Db(1),b.jc("ngIf",e.remarks)}}let D=(()=>{class e{constructor(e,t,n,c){this.route=e,this.router=t,this.dialog=n,this.queenService=c}get queenId(){return this.route.snapshot.paramMap.get("queenId")}ngOnInit(){const e=this.queenId;e&&(this.queen$=this.queenService.getQueen(e))}back(){this.router.navigate(["../.."],{relativeTo:this.route})}deleteQueen(e,t){null==t||t.stopPropagation(),this.dialog.open(s.a,{data:{title:"Delete queen",content:`Are you sure you want to delete queen ${e.name}?`}}).afterClosed().pipe(Object(a.a)(e=>!!e),Object(r.a)(()=>this.queenService.deleteQueen(e).pipe(Object(o.a)(()=>this.back())))).subscribe()}navigateToEdit(e){e&&this.router.navigate(["../../edit",e],{relativeTo:this.route})}}return e.\u0275fac=function(t){return new(t||e)(b.Ob(i.a),b.Ob(i.b),b.Ob(u.b),b.Ob(p))},e.\u0275cmp=b.Ib({type:e,selectors:[["bee-queen-details"]],decls:2,vars:3,consts:[[4,"ngIf"],["role","list"],["role","listitem"],[3,"checked","disabled"],["role","listitem",4,"ngIf"],["mat-stroked-button","",3,"click"],["mat-stroked-button","","color","warn",3,"click"],[3,"color"]],template:function(e,t){1&e&&(b.tc(0,q,29,10,"ng-container",0),b.fc(1,"async")),2&e&&b.jc("ngIf",b.gc(1,1,t.queen$))},directives:[c.l,g.a,g.e,g.h,g.d,v.a,v.b,T.a,g.b,k.a,U],pipes:[c.b,w.a],styles:["span[_ngcontent-%COMP%]{flex:1 1 auto}"]}),e})();var I=n("SxV6"),y=n("3Pt+"),C=n("kmnG"),P=n("qFsG"),S=n("iadO"),M=n("Tdyx");function Q(e,t){1&e&&(b.Ub(0,"mat-form-field",3),b.Ub(1,"mat-label"),b.uc(2,"Color"),b.Tb(),b.Pb(3,"input",16),b.Ub(4,"mat-hint"),b.uc(5,"Queen is marked with this color"),b.Tb(),b.Tb())}let $=(()=>{class e{constructor(e){this.formBuilder=e,this.submitEvent=new b.o,this.cancelEvent=new b.o,this.form=this.formBuilder.group({id:[""],name:["",y.n.required],active:[!0],isMarked:[!1],color:[""],date:[new Date,y.n.required],remarks:[""]})}set queen(e){var t;if(e){const n=null===(t=e.date)||void 0===t?void 0:t.toDate(),c=Object.assign(Object.assign({},e),{date:n});this.form.patchValue(c)}}ngOnInit(){}cancel(){this.cancelEvent.emit()}submit(){this.form.valid&&this.submitEvent.emit(Object.assign({},this.form.value))}}return e.\u0275fac=function(t){return new(t||e)(b.Ob(y.d))},e.\u0275cmp=b.Ib({type:e,selectors:[["bee-queen-form"]],inputs:{queen:"queen"},outputs:{submitEvent:"submitEvent",cancelEvent:"cancelEvent"},decls:34,vars:5,consts:[[3,"formGroup","ngSubmit"],["type","hidden","formControlName","id"],[1,"form-field"],["appearance","fill"],["matInput","","placeholder","Queen's name","formControlName","name"],["matInput","","formControlName","date",3,"matDatepicker"],["matSuffix","",3,"for"],["touchUi",""],["picker1",""],["matInput","","formControlName","remarks"],["formControlName","isMarked"],["appearance","fill",4,"ngIf"],["formControlName","active"],["justify","right"],["mat-stroked-button","","type","button",3,"click"],["mat-stroked-button","","type","submit","color","primary",3,"disabled"],["matInput","","placeholder","Queed marked color","type","color","formControlName","color"]],template:function(e,t){if(1&e&&(b.Ub(0,"form",0),b.bc("ngSubmit",function(){return t.submit()}),b.Pb(1,"input",1),b.Ub(2,"div",2),b.Ub(3,"mat-form-field",3),b.Ub(4,"mat-label"),b.uc(5,"Name*"),b.Tb(),b.Pb(6,"input",4),b.Ub(7,"mat-hint"),b.uc(8,"Queens name (required)"),b.Tb(),b.Tb(),b.Tb(),b.Ub(9,"div",2),b.Ub(10,"mat-form-field",3),b.Ub(11,"mat-label"),b.uc(12,"Date"),b.Tb(),b.Pb(13,"input",5),b.Pb(14,"mat-datepicker-toggle",6),b.Pb(15,"mat-datepicker",7,8),b.Tb(),b.Tb(),b.Ub(17,"div",2),b.Ub(18,"mat-form-field",3),b.Ub(19,"mat-label"),b.uc(20,"Remarks"),b.Tb(),b.Pb(21,"textarea",9),b.Tb(),b.Tb(),b.Ub(22,"div",2),b.Ub(23,"mat-slide-toggle",10),b.uc(24,"Is marked"),b.Tb(),b.tc(25,Q,6,0,"mat-form-field",11),b.Tb(),b.Ub(26,"div",2),b.Ub(27,"mat-slide-toggle",12),b.uc(28,"Is active"),b.Tb(),b.Tb(),b.Ub(29,"bee-button-bar",13),b.Ub(30,"button",14),b.bc("click",function(){return t.cancel()}),b.uc(31,"cancel"),b.Tb(),b.Ub(32,"button",15),b.uc(33,"save"),b.Tb(),b.Tb(),b.Tb()),2&e){const e=b.mc(16);let n=null;b.jc("formGroup",t.form),b.Db(13),b.jc("matDatepicker",e),b.Db(1),b.jc("for",e),b.Db(11),b.jc("ngIf",null==(n=t.form.get("isMarked"))?null:n.value),b.Db(7),b.jc("disabled",t.form.invalid||t.form.pristine)}},directives:[y.o,y.k,y.f,y.c,y.j,y.e,C.b,C.f,P.b,C.e,S.b,S.d,C.g,S.a,T.a,c.l,M.a,k.a],styles:[".form-field[_ngcontent-%COMP%]{align-items:center;display:flex;margin:.5rem 0;min-height:5rem}.mat-form-field[_ngcontent-%COMP%]{align-items:center;flex:1 1 auto}textarea[_ngcontent-%COMP%]{min-height:6rem}"]}),e})(),E=(()=>{class e{constructor(e,t,n){this.router=e,this.route=t,this.queenService=n}get isEdit(){return!!this.queenId}get queenId(){return this.route.snapshot.paramMap.get("queenId")}ngOnInit(){const e=this.queenId;e&&(this.queen$=this.queenService.getQueen(e))}edit(e){const t=e.id?this.queenService.updateQueen(e):this.queenService.createQueen(e);null==t||t.pipe(Object(I.a)(),Object(o.a)(()=>this.cancel())).subscribe()}cancel(){this.router.navigate([this.isEdit?"../..":".."],{relativeTo:this.route})}}return e.\u0275fac=function(t){return new(t||e)(b.Ob(i.b),b.Ob(i.a),b.Ob(p))},e.\u0275cmp=b.Ib({type:e,selectors:[["bee-queen-edit"]],decls:7,vars:4,consts:[[3,"queen","cancelEvent","submitEvent"]],template:function(e,t){1&e&&(b.Ub(0,"mat-card"),b.Ub(1,"mat-card-header"),b.Ub(2,"mat-card-title"),b.uc(3),b.Tb(),b.Tb(),b.Ub(4,"mat-card-content"),b.Ub(5,"bee-queen-form",0),b.bc("cancelEvent",function(){return t.cancel()})("submitEvent",function(e){return t.edit(e)}),b.fc(6,"async"),b.Tb(),b.Tb(),b.Tb()),2&e&&(b.Db(3),b.wc("",t.isEdit?"Edit":"Add"," queen"),b.Db(2),b.jc("queen",b.gc(6,2,t.queen$)))},directives:[g.a,g.e,g.h,g.d,$],pipes:[c.b],styles:[""]}),e})();var x=n("Dh3D"),R=n("+0xr"),N=n("XNiG"),A=n("1G5W");function G(e,t){1&e&&(b.Ub(0,"th",9),b.uc(1," Name "),b.Tb())}function F(e,t){if(1&e&&(b.Ub(0,"td",10),b.uc(1),b.Tb()),2&e){const e=t.$implicit;b.Db(1),b.wc(" ",e.name," ")}}function _(e,t){1&e&&(b.Ub(0,"th",9),b.uc(1," Marked "),b.Tb())}function V(e,t){if(1&e&&b.Pb(0,"bee-color-dot",13),2&e){const e=b.ec().$implicit;b.jc("color",e.color)}}function H(e,t){1&e&&(b.Ub(0,"span"),b.uc(1,"-"),b.Tb())}function L(e,t){if(1&e&&(b.Ub(0,"td",10),b.tc(1,V,1,1,"bee-color-dot",11),b.tc(2,H,2,0,"span",12),b.Tb()),2&e){const e=t.$implicit;b.Db(1),b.jc("ngIf",e.isMarked),b.Db(1),b.jc("ngIf",!e.isMarked)}}function B(e,t){1&e&&(b.Ub(0,"th",9),b.uc(1," Active "),b.Tb())}function J(e,t){if(1&e&&(b.Ub(0,"td",10),b.Pb(1,"mat-slide-toggle",14),b.Tb()),2&e){const e=t.$implicit;b.Db(1),b.jc("checked",e.active)("disabled",!0)}}function X(e,t){1&e&&b.Pb(0,"tr",15)}function z(e,t){if(1&e){const e=b.Vb();b.Ub(0,"tr",16),b.bc("click",function(){b.nc(e);const n=t.$implicit;return b.ec().select(n)}),b.Tb()}}const K=[{path:"",component:(()=>{class e{constructor(e,t,n){this.router=e,this.route=t,this.queenService=n,this.dataSource=new R.k,this.displayedColumns=["name","isMarked","isActive"],this.destroy$=new N.a}ngOnInit(){this.queenService.getQueens().pipe(Object(o.a)(e=>this.dataSource.data=e),Object(A.a)(this.destroy$)).subscribe()}ngOnDestroy(){this.destroy$.next(),this.destroy$.complete()}ngAfterViewInit(){this.dataSource.sort=this.sort}addQueen(){this.router.navigate(["add"],{relativeTo:this.route})}select(e){this.router.navigate(["details",e.id],{relativeTo:this.route})}}return e.\u0275fac=function(t){return new(t||e)(b.Ob(i.b),b.Ob(i.a),b.Ob(p))},e.\u0275cmp=b.Ib({type:e,selectors:[["bee-queen-list"]],viewQuery:function(e,t){if(1&e&&b.xc(x.a,1),2&e){let e;b.lc(e=b.cc())&&(t.sort=e.first)}},decls:20,vars:4,consts:[["mat-table","","matSort","",3,"dataSource"],["matColumnDef","name"],["mat-header-cell","","mat-sort-header","",4,"matHeaderCellDef"],["mat-cell","",4,"matCellDef"],["matColumnDef","isMarked"],["matColumnDef","isActive"],["mat-header-row","",4,"matHeaderRowDef","matHeaderRowDefSticky"],["mat-row","",3,"click",4,"matRowDef","matRowDefColumns"],["mat-stroked-button","","color","primary","type","button",3,"click"],["mat-header-cell","","mat-sort-header",""],["mat-cell",""],[3,"color",4,"ngIf"],[4,"ngIf"],[3,"color"],[3,"checked","disabled"],["mat-header-row",""],["mat-row","",3,"click"]],template:function(e,t){1&e&&(b.Ub(0,"mat-card"),b.Ub(1,"mat-card-header"),b.Ub(2,"mat-card-title"),b.uc(3,"Queens"),b.Tb(),b.Tb(),b.Ub(4,"mat-card-content"),b.Ub(5,"table",0),b.Sb(6,1),b.tc(7,G,2,0,"th",2),b.tc(8,F,2,1,"td",3),b.Rb(),b.Sb(9,4),b.tc(10,_,2,0,"th",2),b.tc(11,L,3,2,"td",3),b.Rb(),b.Sb(12,5),b.tc(13,B,2,0,"th",2),b.tc(14,J,2,2,"td",3),b.Rb(),b.tc(15,X,1,0,"tr",6),b.tc(16,z,1,0,"tr",7),b.Tb(),b.Tb(),b.Ub(17,"mat-card-actions"),b.Ub(18,"button",8),b.bc("click",function(){return t.addQueen()}),b.uc(19," Add new "),b.Tb(),b.Tb(),b.Tb()),2&e&&(b.Db(5),b.jc("dataSource",t.dataSource),b.Db(10),b.jc("matHeaderRowDef",t.displayedColumns)("matHeaderRowDefSticky",!0),b.Db(1),b.jc("matRowDefColumns",t.displayedColumns))},directives:[g.a,g.e,g.h,g.d,R.j,x.a,R.c,R.e,R.b,R.g,R.i,g.b,k.a,R.d,x.b,R.a,c.l,U,T.a,R.f,R.h],styles:["table[_ngcontent-%COMP%]{width:100%}.mat-column-actions[_ngcontent-%COMP%]{width:75px}.mat-row[_ngcontent-%COMP%]:hover{background-color:#f5f5f5;cursor:pointer}"]}),e})()},{path:"add",component:E},{path:"edit/:queenId",component:E},{path:"details/:queenId",component:D}];let W=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=b.Mb({type:e}),e.\u0275inj=b.Lb({imports:[[i.e.forChild(K)],i.e]}),e})();var Y=n("jAig"),Z=n("PCNd");let ee=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=b.Mb({type:e}),e.\u0275inj=b.Lb({imports:[[c.c,Y.a,W,y.m,Z.a]]}),e})()}}]);