(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{yf6I:function(e,t,o){"use strict";o.r(t),o.d(t,"InspectionModule",function(){return W});var n=o("ofXK"),a=o("tyNb"),r=o("w1tV");const i=(e,t)=>{var o;return(null===(o=e.paramMap)||void 0===o?void 0:o.get(t))||e.children.reduce((e,o)=>e||(o.paramMap.has(t)?o.paramMap.get(t):i(o,t)),null)};var b=o("fXoL"),l=o("Cfvw"),c=o("I/3d"),s=o("i6m5");let m=(()=>{class e{constructor(e,t){this.angularFirestore=e,this.authService=t}add(e,t){return Object(l.a)(this.angularFirestore.collection(this.collectionPath(t)).add(e))}getInspections(e,t=5){return this.angularFirestore.collection(this.collectionPath(e),e=>e.limit(t).orderBy("date","desc")).valueChanges({idField:"id"})}collectionPath(e){return`beez/${this.authService.uid}/hives/${e}/inspections`}}return e.\u0275fac=function(t){return new(t||e)(b.Zb(c.a),b.Zb(s.a))},e.\u0275prov=b.Lb({token:e,factory:e.\u0275fac,providedIn:"root"}),e})();var d=o("MutI"),u=o("Tdyx"),p=o("bTqV"),f=o("FKr1"),h=o("Pm42"),g=o("NFeN"),V=o("TeOG");function U(e,t){if(1&e&&(b.Vb(0,"mat-list-item"),b.Vb(1,"h3",6),b.wc(2),b.gc(3,"timestamp"),b.Ub(),b.Vb(4,"p",7),b.Vb(5,"span"),b.wc(6),b.Ub(),b.Vb(7,"span"),b.wc(8,"queen "),b.Qb(9,"bee-color-dot",8),b.Ub(),b.Vb(10,"span"),b.wc(11,"health "),b.Vb(12,"mat-icon",9),b.wc(13),b.Ub(),b.Ub(),b.Ub(),b.Ub()),2&e){const e=t.$implicit,o=t.index,n=b.fc(2).$implicit,a=b.fc();b.Db(2),b.yc(" ",b.hc(3,4,e.date),""),b.Db(4),b.yc("honey ",a.honeyString(e),""),b.Db(3),b.kc("color",a.queenPresentColor(e)),b.Db(4),b.xc(a.trendingIconName(e,n[o]))}}function y(e,t){if(1&e&&(b.Tb(0),b.Vb(1,"bee-button-bar",3),b.Vb(2,"a",4),b.wc(3,"add"),b.Ub(),b.Ub(),b.uc(4,U,14,6,"mat-list-item",5),b.Sb()),2&e){const e=b.fc().$implicit,t=b.fc();b.Db(2),b.kc("relativeTo",t.route),b.Db(2),b.kc("ngForOf",e)}}function v(e,t){if(1&e&&(b.Vb(0,"mat-list"),b.uc(1,y,5,2,"ng-container",2),b.Ub()),2&e){const e=t.$implicit;b.fc();const o=b.nc(3);b.Db(1),b.kc("ngIf",e.length)("ngIfElse",o)}}function w(e,t){if(1&e&&(b.Vb(0,"div",10),b.Vb(1,"h3"),b.wc(2,"No inspections"),b.Ub(),b.Vb(3,"p"),b.Vb(4,"a",4),b.wc(5,"add"),b.Ub(),b.Ub(),b.Ub()),2&e){const e=b.fc();b.Db(4),b.kc("relativeTo",e.route)}}let k=(()=>{class e{constructor(e,t){this.route=e,this.inspectionService=t}ngOnInit(){const e=i(this.route.snapshot.root,"hiveId");e&&(this.inspections$=this.inspectionService.getInspections(e,5).pipe(Object(r.a)()))}queenPresentColor(e){return e.queen||e.eggs?"green":"red"}honeyString(e){return e.honey&&e.honeyClosed?`${e.honey} / ${e.honeyClosed}`:"n/a"}trendingIconName(e,t){if(!e||!t)return"compare_arrows";const o=e.health,n=t.health;return o>n?"trending_up":o<n?"trending_down":"compare_arrows"}}return e.\u0275fac=function(t){return new(t||e)(b.Pb(a.a),b.Pb(m))},e.\u0275cmp=b.Jb({type:e,selectors:[["bee-inspection-list"]],decls:4,vars:3,consts:[[4,"ngIf"],["noInspections",""],[4,"ngIf","ngIfElse"],["justify","center"],["mat-raised-button","","routerLink","add",3,"relativeTo"],[4,"ngFor","ngForOf"],["matLine",""],["matLine","",1,"line"],[3,"color"],["aria-hidden","false","aria-label","Example home icon"],[1,"notification"]],template:function(e,t){1&e&&(b.uc(0,v,2,2,"mat-list",0),b.gc(1,"async"),b.uc(2,w,6,1,"ng-template",null,1,b.vc)),2&e&&b.kc("ngIf",b.hc(1,1,t.inspections$))},directives:[n.l,d.a,u.a,p.a,a.e,n.k,d.b,f.g,h.a,g.a],pipes:[n.b,V.a],styles:["mat-list-item[_ngcontent-%COMP%]   .line[_ngcontent-%COMP%]{display:flex;justify-content:space-between}mat-list-item[_ngcontent-%COMP%]   .line[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{display:inline-flex;align-items:center}bee-color-dot[_ngcontent-%COMP%], mat-icon[_ngcontent-%COMP%]{margin-left:.5rem}.notification[_ngcontent-%COMP%]{text-align:center}"]}),e})();var C=o("3Pt+"),x=o("IzEk"),O=o("vkgz"),P=o("Wp6s"),I=o("qFsG"),D=o("iadO"),N=o("kmnG"),M=o("xHqg"),Q=o("5RNC"),_=o("1jcm");function G(e,t){1&e&&b.wc(0,"Honey super")}function B(e,t){1&e&&b.wc(0,"Hive body")}function S(e,t){1&e&&b.wc(0,"Overall")}function L(e,t){1&e&&b.wc(0,"Done")}const q=[{path:"",component:k},{path:"add",component:(()=>{class e{constructor(e,t,o,n){this.route=e,this.location=t,this.formBuilder=o,this.inspectionService=n,this.timestamp=new C.e({value:new Date,disabled:!0},C.r.required),this.honeySuperGroup=this.formBuilder.group({honey:[null],honeyClosed:[null]}),this.hiveBodyGroup=this.formBuilder.group({drones:[null],queen:[null],eggs:[null],larva:[null],closedBrood:[null],droneBrood:[null],queenBrood:[null],honeyFood:[null]}),this.overallGroup=this.formBuilder.group({health:[null,C.r.required],remarks:[null]})}ngOnInit(){}formatLabel(e){return e?e+"%":""}submit(){const e=Object.assign(Object.assign(Object.assign({date:this.timestamp.value},this.honeySuperGroup.value),this.hiveBodyGroup.value),this.overallGroup.value),t=i(this.route.snapshot.root,"hiveId");t&&this.inspectionService.add(e,t).pipe(Object(x.a)(1),Object(O.a)(()=>this.location.back())).subscribe()}}return e.\u0275fac=function(t){return new(t||e)(b.Pb(a.a),b.Pb(n.h),b.Pb(C.d),b.Pb(m))},e.\u0275cmp=b.Jb({type:e,selectors:[["bee-inspection-add"]],decls:120,vars:14,consts:[["matInput","",1,"timestamp-input",3,"formControl","matDatepicker"],["matSuffix","",3,"for"],["touchUi","","disabled","false"],["picker",""],[3,"linear"],["stepper",""],[3,"stepControl"],["matStepLabel",""],[3,"formGroup"],[1,"form-field"],["max","100","min","0","step","5","tickInterval","5","thumbLabel","true","aria-label","honey","formControlName","honey",3,"displayWith"],["matInput","","hidden",""],["max","100","min","0","step","5","tickInterval","5","thumbLabel","true","aria-label","honey closed","formControlName","honeyClosed",3,"displayWith"],["mat-stroked-button","","color","primary","matStepperNext",""],["formControlName","eggs"],["formControlName","larva"],["formControlName","closedBrood"],["formControlName","droneBrood"],["formControlName","queenBrood"],["formControlName","drones"],["formControlName","queen"],["floatLabel","always"],["max","100","min","0","step","5","tickInterval","5","thumbLabel","true","aria-label","food","formControlName","honeyFood",3,"displayWith"],["mat-stroked-button","","matStepperPrevious",""],["mat-stroked-button","","matStepperNext","","color","primary"],["max","100","min","0","step","5","tickInterval","5","thumbLabel","true","aria-label","health","formControlName","health",3,"displayWith"],["matInput","","formControlName","remarks"],["mat-stroked-button","","color","primary",3,"click"]],template:function(e,t){if(1&e&&(b.Vb(0,"mat-card"),b.Vb(1,"mat-card-header"),b.Vb(2,"mat-card-title"),b.wc(3," Inspection "),b.Qb(4,"input",0),b.Qb(5,"mat-datepicker-toggle",1),b.Qb(6,"mat-datepicker",2,3),b.Ub(),b.Ub(),b.Vb(8,"mat-card-content"),b.Vb(9,"mat-vertical-stepper",4,5),b.Vb(11,"mat-step",6),b.uc(12,G,1,0,"ng-template",7),b.Vb(13,"form",8),b.Vb(14,"div",9),b.Vb(15,"mat-form-field"),b.Vb(16,"mat-label"),b.wc(17,"Honey"),b.Ub(),b.Qb(18,"mat-slider",10),b.Qb(19,"textarea",11),b.Ub(),b.Ub(),b.Vb(20,"div",9),b.Vb(21,"mat-form-field"),b.Vb(22,"mat-label"),b.wc(23,"Honey closed"),b.Ub(),b.Qb(24,"mat-slider",12),b.Qb(25,"textarea",11),b.Ub(),b.Ub(),b.Vb(26,"bee-button-bar"),b.Vb(27,"button",13),b.wc(28,"Next"),b.Ub(),b.Ub(),b.Ub(),b.Ub(),b.Vb(29,"mat-step",6),b.uc(30,B,1,0,"ng-template",7),b.Vb(31,"form",8),b.Vb(32,"div",9),b.Vb(33,"mat-form-field"),b.Vb(34,"mat-slide-toggle",14),b.wc(35,"Eggs"),b.Ub(),b.Vb(36,"mat-hint"),b.wc(37,"are there any fresh eggs present? (first 3 days)"),b.Ub(),b.Qb(38,"textarea",11),b.Ub(),b.Ub(),b.Vb(39,"div",9),b.Vb(40,"mat-form-field"),b.Vb(41,"mat-slide-toggle",15),b.wc(42,"Larva"),b.Ub(),b.Vb(43,"mat-hint"),b.wc(44,"is there open brood with white larva? (day 4 to 7)"),b.Ub(),b.Qb(45,"textarea",11),b.Ub(),b.Ub(),b.Vb(46,"div",9),b.Vb(47,"mat-form-field"),b.Vb(48,"mat-slide-toggle",16),b.wc(49,"Closed brood"),b.Ub(),b.Vb(50,"mat-hint"),b.wc(51,"is there closed brood? (day 8 - 21)"),b.Ub(),b.Qb(52,"textarea",11),b.Ub(),b.Ub(),b.Vb(53,"div",9),b.Vb(54,"mat-form-field"),b.Vb(55,"mat-slide-toggle",17),b.wc(56,"Drone brood"),b.Ub(),b.Vb(57,"mat-hint"),b.wc(58,"is any of it drone brood?"),b.Ub(),b.Qb(59,"textarea",11),b.Ub(),b.Ub(),b.Vb(60,"div",9),b.Vb(61,"mat-form-field"),b.Vb(62,"mat-slide-toggle",18),b.wc(63,"Queen brood"),b.Ub(),b.Vb(64,"mat-hint"),b.wc(65,"did you see qrueen brood?"),b.Ub(),b.Qb(66,"textarea",11),b.Ub(),b.Ub(),b.Vb(67,"div",9),b.Vb(68,"mat-form-field"),b.Vb(69,"mat-slide-toggle",19),b.wc(70,"Drones"),b.Ub(),b.Vb(71,"mat-hint"),b.wc(72,"did you see any drones?"),b.Ub(),b.Qb(73,"textarea",11),b.Ub(),b.Ub(),b.Vb(74,"div",9),b.Vb(75,"mat-form-field"),b.Vb(76,"mat-slide-toggle",20),b.wc(77,"Queen"),b.Ub(),b.Vb(78,"mat-hint"),b.wc(79,"did you see the queen?"),b.Ub(),b.Qb(80,"textarea",11),b.Ub(),b.Ub(),b.Vb(81,"div",9),b.Vb(82,"mat-form-field",21),b.Vb(83,"mat-label"),b.wc(84,"Food (honey)"),b.Ub(),b.Qb(85,"mat-slider",22),b.Vb(86,"mat-hint"),b.wc(87,"Honey present in the hive body, used as food for the bees."),b.Ub(),b.Qb(88,"textarea",11),b.Ub(),b.Ub(),b.Vb(89,"bee-button-bar"),b.Vb(90,"button",23),b.wc(91,"Back"),b.Ub(),b.Vb(92,"button",24),b.wc(93,"Next"),b.Ub(),b.Ub(),b.Ub(),b.Ub(),b.Vb(94,"mat-step",6),b.uc(95,S,1,0,"ng-template",7),b.Vb(96,"form",8),b.Vb(97,"div",9),b.Vb(98,"mat-form-field"),b.Vb(99,"mat-label"),b.wc(100,"Overall health"),b.Ub(),b.Qb(101,"mat-slider",25),b.Qb(102,"textarea",11),b.Ub(),b.Ub(),b.Vb(103,"div",9),b.Vb(104,"mat-form-field"),b.Vb(105,"mat-label"),b.wc(106,"Remarks"),b.Ub(),b.Qb(107,"textarea",26),b.Ub(),b.Ub(),b.Vb(108,"bee-button-bar"),b.Vb(109,"button",23),b.wc(110,"Back"),b.Ub(),b.Vb(111,"button",24),b.wc(112,"Next"),b.Ub(),b.Ub(),b.Ub(),b.Ub(),b.Vb(113,"mat-step"),b.uc(114,L,1,0,"ng-template",7),b.Vb(115,"bee-button-bar"),b.Vb(116,"button",23),b.wc(117,"Back"),b.Ub(),b.Vb(118,"button",27),b.cc("click",function(){return t.submit()}),b.wc(119,"Done"),b.Ub(),b.Ub(),b.Ub(),b.Ub(),b.Ub(),b.Ub()),2&e){const e=b.nc(7);b.Db(4),b.kc("formControl",t.timestamp)("matDatepicker",e),b.Db(1),b.kc("for",e),b.Db(4),b.kc("linear",!0),b.Db(2),b.kc("stepControl",t.honeySuperGroup),b.Db(2),b.kc("formGroup",t.honeySuperGroup),b.Db(5),b.kc("displayWith",t.formatLabel),b.Db(6),b.kc("displayWith",t.formatLabel),b.Db(5),b.kc("stepControl",t.hiveBodyGroup),b.Db(2),b.kc("formGroup",t.hiveBodyGroup),b.Db(54),b.kc("displayWith",t.formatLabel),b.Db(9),b.kc("stepControl",t.overallGroup),b.Db(2),b.kc("formGroup",t.overallGroup),b.Db(5),b.kc("displayWith",t.formatLabel)}},directives:[P.a,P.e,P.h,I.b,C.c,D.b,C.m,C.f,D.d,N.g,D.a,P.d,M.f,M.a,M.b,C.s,C.n,C.h,N.b,N.f,Q.a,C.g,u.a,p.b,M.d,_.a,N.e,M.e],styles:[".form-field[_ngcontent-%COMP%]{align-items:center;display:flex;margin:.5rem 0;min-height:5rem}mat-form-field[_ngcontent-%COMP%]{flex:1 1 auto}.mat-form-field[_ngcontent-%COMP%]   mat-label[_ngcontent-%COMP%]{align-self:center;display:inline-flex;width:150px}.mat-form-field[_ngcontent-%COMP%]   mat-slider[_ngcontent-%COMP%]{max-width:320px;width:100%}textarea[_ngcontent-%COMP%]{height:10rem;width:100%}.timestamp-input[_ngcontent-%COMP%]{border:none;background:transparent;color:inherit;font:inherit;width:7rem}"]}),e})()}];let j=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=b.Nb({type:e}),e.\u0275inj=b.Mb({imports:[[a.f.forChild(q)],a.f]}),e})();var F=o("jAig"),$=o("PCNd");let W=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=b.Nb({type:e}),e.\u0275inj=b.Mb({imports:[[n.c,j,C.q,F.a,$.a]]}),e})()}}]);