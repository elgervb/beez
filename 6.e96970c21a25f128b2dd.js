(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{"8e26":function(t,e,i){"use strict";i.r(e),i.d(e,"HiveModule",function(){return L});var a=i("ofXK"),c=i("tyNb"),n=i("Dh3D"),r=i("+0xr"),o=i("XNiG"),s=i("vkgz"),b=i("1G5W"),l=i("pLZG"),d=i("n4x5"),u=i("fXoL"),m=i("0IaG"),h=i("Cfvw"),f=i("LRne"),v=i("lJxs"),p=i("I/3d"),g=i("i6m5");let w=(()=>{class t{constructor(t,e){this.angularFirestore=t,this.authService=e}get collectionPath(){return`beez/${this.authService.uid}/hives`}createHive(t){return Object(h.a)(this.angularFirestore.collection(this.collectionPath).add(t))}deleteHive(t){return this.angularFirestore.doc(`${this.collectionPath}/${t.id}`).delete(),Object(f.a)()}getHive(t){return this.angularFirestore.collection(this.collectionPath).doc(t).get().pipe(Object(v.a)(t=>t.data()),Object(v.a)(e=>e?Object.assign(Object.assign({},e),{id:t}):e))}getHives(){return this.angularFirestore.collection(this.collectionPath).valueChanges({idField:"id"})}updateHive(t){const e=this.angularFirestore.collection(this.collectionPath).doc(t.id);return e.update(t),e.get().pipe(Object(v.a)(t=>t.data()))}}return t.\u0275fac=function(e){return new(e||t)(u.Yb(p.a),u.Yb(g.a))},t.\u0275prov=u.Kb({token:t,factory:t.\u0275fac,providedIn:"root"}),t})();var T=i("Wp6s"),y=i("bTqV"),O=i("1jcm");function U(t,e){1&t&&(u.Ub(0,"th",10),u.uc(1," Name "),u.Tb())}function k(t,e){if(1&t&&(u.Ub(0,"td",11),u.uc(1),u.Tb()),2&t){const t=e.$implicit;u.Db(1),u.wc(" ",t.name," ")}}function D(t,e){1&t&&(u.Ub(0,"th",10),u.uc(1," Active "),u.Tb())}function j(t,e){if(1&t&&(u.Ub(0,"td",11),u.Pb(1,"mat-slide-toggle",12),u.Tb()),2&t){const t=e.$implicit;u.Db(1),u.jc("checked",t.active)("disabled",!0)}}function C(t,e){1&t&&(u.Ub(0,"th",13),u.uc(1," Actions "),u.Tb())}function S(t,e){if(1&t){const t=u.Vb();u.Ub(0,"td",11),u.Ub(1,"button",14),u.bc("click",function(i){u.nc(t);const a=e.$implicit;return u.ec().deleteHive(a,i)}),u.uc(2,"delete"),u.Tb(),u.Tb()}}function H(t,e){1&t&&u.Pb(0,"tr",15)}function P(t,e){if(1&t){const t=u.Vb();u.Ub(0,"tr",16),u.bc("click",function(){u.nc(t);const i=e.$implicit;return u.ec().select(i)}),u.Tb()}}let I=(()=>{class t{constructor(t,e,i,a){this.router=t,this.route=e,this.dialog=i,this.hiveService=a,this.dataSource=new r.k,this.displayedColumns=["name","isActive","actions"],this.destroy$=new o.a}ngOnInit(){this.hiveService.getHives().pipe(Object(s.a)(t=>this.dataSource.data=t),Object(b.a)(this.destroy$)).subscribe()}ngOnDestroy(){this.destroy$.next(),this.destroy$.complete()}ngAfterViewInit(){this.dataSource.sort=this.sort}addHive(){this.router.navigate(["add"],{relativeTo:this.route})}deleteHive(t,e){null==e||e.stopPropagation(),this.dialog.open(d.a,{data:{title:"Delete hive",content:`Are you sure you want to delete hive ${t.name}?`}}).afterClosed().pipe(Object(l.a)(t=>!!t),Object(s.a)(()=>this.hiveService.deleteHive(t))).subscribe()}select(t){this.router.navigate(["edit",t.id],{relativeTo:this.route})}}return t.\u0275fac=function(e){return new(e||t)(u.Ob(c.b),u.Ob(c.a),u.Ob(m.b),u.Ob(w))},t.\u0275cmp=u.Ib({type:t,selectors:[["bee-hive"]],viewQuery:function(t,e){if(1&t&&u.xc(n.a,1),2&t){let t;u.lc(t=u.cc())&&(e.sort=t.first)}},decls:20,vars:4,consts:[["mat-table","","matSort","",3,"dataSource"],["matColumnDef","name"],["mat-header-cell","","mat-sort-header","",4,"matHeaderCellDef"],["mat-cell","",4,"matCellDef"],["matColumnDef","isActive"],["matColumnDef","actions"],["mat-header-cell","",4,"matHeaderCellDef"],["mat-header-row","",4,"matHeaderRowDef","matHeaderRowDefSticky"],["mat-row","",3,"click",4,"matRowDef","matRowDefColumns"],["mat-stroked-button","","color","primary","type","button",3,"click"],["mat-header-cell","","mat-sort-header",""],["mat-cell",""],[3,"checked","disabled"],["mat-header-cell",""],["mat-stroked-button","","color","warn",3,"click"],["mat-header-row",""],["mat-row","",3,"click"]],template:function(t,e){1&t&&(u.Ub(0,"mat-card"),u.Ub(1,"mat-card-header"),u.Ub(2,"mat-card-title"),u.uc(3,"Hives"),u.Tb(),u.Tb(),u.Ub(4,"mat-card-content"),u.Ub(5,"table",0),u.Sb(6,1),u.tc(7,U,2,0,"th",2),u.tc(8,k,2,1,"td",3),u.Rb(),u.Sb(9,4),u.tc(10,D,2,0,"th",2),u.tc(11,j,2,2,"td",3),u.Rb(),u.Sb(12,5),u.tc(13,C,2,0,"th",6),u.tc(14,S,3,0,"td",3),u.Rb(),u.tc(15,H,1,0,"tr",7),u.tc(16,P,1,0,"tr",8),u.Tb(),u.Tb(),u.Ub(17,"mat-card-actions"),u.Ub(18,"button",9),u.bc("click",function(){return e.addHive()}),u.uc(19," Add new "),u.Tb(),u.Tb(),u.Tb()),2&t&&(u.Db(5),u.jc("dataSource",e.dataSource),u.Db(10),u.jc("matHeaderRowDef",e.displayedColumns)("matHeaderRowDefSticky",!0),u.Db(1),u.jc("matRowDefColumns",e.displayedColumns))},directives:[T.a,T.e,T.h,T.d,r.j,n.a,r.c,r.e,r.b,r.g,r.i,T.b,y.a,r.d,n.b,r.a,O.a,r.f,r.h],styles:["table[_ngcontent-%COMP%]{width:100%}.mat-column-actions[_ngcontent-%COMP%]{width:75px}.mat-row[_ngcontent-%COMP%]:hover{background-color:#f5f5f5;cursor:pointer}"]}),t})();var $=i("SxV6"),E=i("3Pt+"),x=i("kmnG"),R=i("qFsG"),M=i("iadO"),N=i("Tdyx");let A=(()=>{class t{constructor(t){this.formBuilder=t,this.submitEvent=new u.o,this.cancelEvent=new u.o,this.form=this.formBuilder.group({id:[""],name:["",E.n.required],active:[!0],date:[new Date,E.n.required],remarks:[""]})}set hive(t){var e;if(t){const i=null===(e=t.date)||void 0===e?void 0:e.toDate(),a=Object.assign(Object.assign({},t),{date:i});this.form.patchValue(a)}}ngOnInit(){}cancel(){this.cancelEvent.emit()}submit(){this.form.valid&&this.submitEvent.emit(Object.assign({},this.form.value))}}return t.\u0275fac=function(e){return new(e||t)(u.Ob(E.d))},t.\u0275cmp=u.Ib({type:t,selectors:[["bee-hive-form"]],inputs:{hive:"hive"},outputs:{submitEvent:"submitEvent",cancelEvent:"cancelEvent"},decls:30,vars:4,consts:[[3,"formGroup","ngSubmit"],["type","hidden","formControlName","id"],[1,"form-field"],["appearance","fill"],["matInput","","placeholder","Hive's name","formControlName","name"],["matInput","","formControlName","date",3,"matDatepicker"],["matSuffix","",3,"for"],["touchUi",""],["picker1",""],["matInput","","formControlName","remarks"],["formControlName","active"],["justify","right"],["mat-stroked-button","","type","button",3,"click"],["mat-stroked-button","","type","submit","color","primary",3,"disabled"]],template:function(t,e){if(1&t&&(u.Ub(0,"form",0),u.bc("ngSubmit",function(){return e.submit()}),u.Pb(1,"input",1),u.Ub(2,"div",2),u.Ub(3,"mat-form-field",3),u.Ub(4,"mat-label"),u.uc(5,"Name*"),u.Tb(),u.Pb(6,"input",4),u.Ub(7,"mat-hint"),u.uc(8,"Hive name (required)"),u.Tb(),u.Tb(),u.Tb(),u.Ub(9,"div",2),u.Ub(10,"mat-form-field",3),u.Ub(11,"mat-label"),u.uc(12,"Date"),u.Tb(),u.Pb(13,"input",5),u.Pb(14,"mat-datepicker-toggle",6),u.Pb(15,"mat-datepicker",7,8),u.Tb(),u.Tb(),u.Ub(17,"div",2),u.Ub(18,"mat-form-field",3),u.Ub(19,"mat-label"),u.uc(20,"Remarks"),u.Tb(),u.Pb(21,"textarea",9),u.Tb(),u.Tb(),u.Ub(22,"div",2),u.Ub(23,"mat-slide-toggle",10),u.uc(24,"Is active"),u.Tb(),u.Tb(),u.Ub(25,"bee-button-bar",11),u.Ub(26,"button",12),u.bc("click",function(){return e.cancel()}),u.uc(27,"cancel"),u.Tb(),u.Ub(28,"button",13),u.uc(29,"save"),u.Tb(),u.Tb(),u.Tb()),2&t){const t=u.mc(16);u.jc("formGroup",e.form),u.Db(13),u.jc("matDatepicker",t),u.Db(1),u.jc("for",t),u.Db(14),u.jc("disabled",e.form.invalid||e.form.pristine)}},directives:[E.o,E.k,E.f,E.c,E.j,E.e,x.b,x.f,R.b,x.e,M.b,M.d,x.g,M.a,O.a,N.a,y.a],styles:[".form-field[_ngcontent-%COMP%]{align-items:center;display:flex;margin:.5rem 0;min-height:5rem}.mat-form-field[_ngcontent-%COMP%]{align-items:center;flex:1 1 auto}textarea[_ngcontent-%COMP%]{min-height:6rem}"]}),t})(),F=(()=>{class t{constructor(t,e,i){this.router=t,this.route=e,this.hiveService=i,this.destroy$=new o.a}get isEdit(){return!!this.hiveId}get hiveId(){return this.route.snapshot.paramMap.get("hiveId")}ngOnInit(){const t=this.hiveId;t&&(this.hive$=this.hiveService.getHive(t))}ngOnDestroy(){this.destroy$.next(),this.destroy$.complete()}edit(t){(t.id?this.hiveService.updateHive(t):this.hiveService.createHive(t)).pipe(Object($.a)(),Object(s.a)(()=>this.cancel())).subscribe()}cancel(){this.router.navigate([this.isEdit?"../..":".."],{relativeTo:this.route})}}return t.\u0275fac=function(e){return new(e||t)(u.Ob(c.b),u.Ob(c.a),u.Ob(w))},t.\u0275cmp=u.Ib({type:t,selectors:[["bee-hive-edit"]],decls:4,vars:4,consts:[[1,"mat-title"],[3,"hive","cancelEvent","submitEvent"]],template:function(t,e){1&t&&(u.Ub(0,"h2",0),u.uc(1),u.Tb(),u.Ub(2,"bee-hive-form",1),u.bc("cancelEvent",function(){return e.cancel()})("submitEvent",function(t){return e.edit(t)}),u.fc(3,"async"),u.Tb()),2&t&&(u.Db(1),u.wc("",e.isEdit?"Edit":"Add"," hive"),u.Db(1),u.jc("hive",u.gc(3,2,e.hive$)))},directives:[A],pipes:[a.b],styles:[""]}),t})();const G=[{path:"",component:I},{path:"add",component:F},{path:"edit/:hiveId",component:F}];let V=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=u.Mb({type:t}),t.\u0275inj=u.Lb({imports:[[c.e.forChild(G)],c.e]}),t})();var _=i("jAig"),q=i("PCNd");let L=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=u.Mb({type:t}),t.\u0275inj=u.Lb({imports:[[a.c,_.a,V,E.m,q.a]]}),t})()}}]);