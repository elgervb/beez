(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{yf6I:function(e,t,n){"use strict";n.r(t),n.d(t,"InspectionModule",function(){return z});var o=n("ofXK"),c=n("tyNb"),a=n("w1tV");const i=(e,t)=>{var n;return(null===(n=e.paramMap)||void 0===n?void 0:n.get(t))||e.children.reduce((e,n)=>e||(n.paramMap.has(t)?n.paramMap.get(t):i(n,t)),null)};var r=n("fXoL"),b=n("Cfvw"),l=n("I/3d"),s=n("i6m5");let m=(()=>{class e{constructor(e,t){this.angularFirestore=e,this.authService=t}add(e,t){return Object(b.a)(this.angularFirestore.collection(this.collectionPath(t)).add(e))}getInspections(e,t=5){return this.angularFirestore.collection(this.collectionPath(e),e=>e.limit(t).orderBy("date","desc")).valueChanges({idField:"id"})}collectionPath(e){return`beez/${this.authService.uid}/hives/${e}/inspections`}}return e.\u0275fac=function(t){return new(t||e)(r.Zb(l.a),r.Zb(s.a))},e.\u0275prov=r.Lb({token:e,factory:e.\u0275fac,providedIn:"root"}),e})();var d=n("MutI"),p=n("Tdyx"),h=n("bTqV"),u=n("FKr1"),f=n("NFeN"),g=n("Pm42"),x=n("FVgD"),y=n("TeOG");function V(e,t){if(1&e&&(r.Vb(0,"mat-list-item"),r.Vb(1,"h3",6),r.xc(2),r.gc(3,"timestamp"),r.Ub(),r.Vb(4,"p",7),r.Vb(5,"span"),r.xc(6),r.gc(7,"i18next"),r.Ub(),r.Vb(8,"span"),r.Qb(9,"mat-icon",8),r.Qb(10,"bee-color-dot",9),r.Ub(),r.Vb(11,"span"),r.Vb(12,"mat-icon",10),r.xc(13,"favorite_border"),r.Ub(),r.Vb(14,"mat-icon",10),r.xc(15),r.Ub(),r.Ub(),r.Ub(),r.Ub()),2&e){const e=t.$implicit,n=r.fc(2).$implicit,o=r.fc();r.Db(2),r.zc(" ",r.hc(3,5,e.date),""),r.Db(4),r.Ac("",r.hc(7,7,"honey")," ",o.honeyProgress(e),""),r.Db(4),r.lc("color",o.queenPresentColor(e)),r.Db(5),r.yc(o.trendingIconName(e,n))}}function U(e,t){if(1&e&&(r.Tb(0),r.Vb(1,"bee-button-bar",3),r.Vb(2,"a",4),r.xc(3),r.gc(4,"i18next"),r.Ub(),r.Ub(),r.vc(5,V,16,9,"mat-list-item",5),r.Sb()),2&e){const e=r.fc().$implicit,t=r.fc();r.Db(2),r.lc("relativeTo",t.route),r.Db(1),r.yc(r.hc(4,3,"add")),r.Db(2),r.lc("ngForOf",e)}}function v(e,t){if(1&e&&(r.Vb(0,"mat-list"),r.vc(1,U,6,5,"ng-container",2),r.Ub()),2&e){const e=t.$implicit;r.fc();const n=r.oc(3);r.Db(1),r.lc("ngIf",e.length)("ngIfElse",n)}}const C=function(){return{count:2}};function D(e,t){if(1&e&&(r.Vb(0,"div",11),r.Vb(1,"h3"),r.xc(2),r.gc(3,"i18nextCap"),r.gc(4,"i18next"),r.Ub(),r.Vb(5,"p"),r.Vb(6,"a",4),r.xc(7),r.gc(8,"i18next"),r.Ub(),r.Ub(),r.Ub()),2&e){const e=r.fc();r.Db(2),r.Ac("",r.hc(3,4,"none")," ",r.ic(4,6,"inspections",r.mc(11,C)),""),r.Db(4),r.lc("relativeTo",e.route),r.Db(1),r.yc(r.hc(8,9,"add"))}}let P=(()=>{class e{constructor(e,t){this.route=e,this.inspectionService=t}ngOnInit(){const e=i(this.route.snapshot.root,"hiveId");e&&(this.inspections$=this.inspectionService.getInspections(e,5).pipe(Object(a.a)()))}queenPresentColor(e){return e.queen||e.eggs?"green":e.larva?"orange":"red"}honeyProgress(e){return e.honey&&e.honeyClosed?`${e.honey} / ${e.honeyClosed}`:"n/a"}trendingIconName(e,t){const n=null==t?void 0:t.indexOf(e);if(t&&void 0!==n&&-1!==n&&(!n||n+1!==(null==t?void 0:t.length))){const o=t[n+1];if(o){const t=e.health,n=o.health;return t>n?"trending_up":t<n?"trending_down":"compare_arrows"}}return"compare_arrows"}}return e.\u0275fac=function(t){return new(t||e)(r.Pb(c.a),r.Pb(m))},e.\u0275cmp=r.Jb({type:e,selectors:[["bee-inspection-list"]],decls:4,vars:3,consts:[[4,"ngIf"],["noInspections",""],[4,"ngIf","ngIfElse"],["justify","center"],["mat-raised-button","","routerLink","add",3,"relativeTo"],[4,"ngFor","ngForOf"],["matLine",""],["matLine","",1,"line"],["svgIcon","queen"],[3,"color"],["aria-hidden","false","aria-label","health trend"],[1,"notification"]],template:function(e,t){1&e&&(r.vc(0,v,2,2,"mat-list",0),r.gc(1,"async"),r.vc(2,D,9,12,"ng-template",null,1,r.wc)),2&e&&r.lc("ngIf",r.hc(1,1,t.inspections$))},directives:[o.l,d.a,p.a,h.a,c.e,o.k,d.b,u.g,f.a,g.a],pipes:[o.b,x.d,y.a,x.b],styles:["mat-list-item[_ngcontent-%COMP%]   .line[_ngcontent-%COMP%]{display:flex;justify-content:space-between}mat-list-item[_ngcontent-%COMP%]   .line[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{align-items:center;display:inline-flex;flex:1 1 33.333%}mat-list-item[_ngcontent-%COMP%]   .line[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:nth-child(2){justify-content:center}mat-list-item[_ngcontent-%COMP%]   .line[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:nth-child(3){justify-content:flex-end}bee-color-dot[_ngcontent-%COMP%], mat-icon[_ngcontent-%COMP%]{margin-left:.5rem}.notification[_ngcontent-%COMP%]{text-align:center}"]}),e})();var O=n("3Pt+"),k=n("IzEk"),I=n("vkgz"),M=n("Wp6s"),_=n("qFsG"),w=n("iadO"),B=n("kmnG"),N=n("xHqg"),Q=n("5RNC"),G=n("1jcm");function q(e,t){1&e&&(r.xc(0),r.gc(1,"i18nextCap")),2&e&&r.yc(r.hc(1,1,"honeySuper"))}function S(e,t){1&e&&(r.xc(0),r.gc(1,"i18nextCap")),2&e&&r.yc(r.hc(1,1,"hiveBody"))}function L(e,t){1&e&&(r.xc(0),r.gc(1,"i18nextCap")),2&e&&r.yc(r.hc(1,1,"overall"))}function j(e,t){1&e&&(r.xc(0),r.gc(1,"i18nextCap")),2&e&&r.yc(r.hc(1,1,"done"))}const F=function(){return{count:2}},$=[{path:"",component:P},{path:"add",component:(()=>{class e{constructor(e,t,n,o){this.route=e,this.location=t,this.formBuilder=n,this.inspectionService=o,this.timestamp=new O.e({value:new Date,disabled:!0},O.r.required),this.honeySuperGroup=this.formBuilder.group({honey:[null],honeyClosed:[null]}),this.hiveBodyGroup=this.formBuilder.group({drones:[null],queen:[null],eggs:[null],larva:[null],closedBrood:[null],droneBrood:[null],queenBrood:[null],honeyFood:[null]}),this.overallGroup=this.formBuilder.group({health:[null,O.r.required],remarks:[null]})}ngOnInit(){}formatLabel(e){return e?e+"%":""}submit(){const e=Object.assign(Object.assign(Object.assign({date:this.timestamp.value},this.honeySuperGroup.value),this.hiveBodyGroup.value),this.overallGroup.value),t=i(this.route.snapshot.root,"hiveId");t&&this.inspectionService.add(e,t).pipe(Object(k.a)(1),Object(I.a)(()=>this.location.back())).subscribe()}}return e.\u0275fac=function(t){return new(t||e)(r.Pb(c.a),r.Pb(o.h),r.Pb(O.d),r.Pb(m))},e.\u0275cmp=r.Jb({type:e,selectors:[["bee-inspection-add"]],decls:152,vars:116,consts:[["matInput","",1,"timestamp-input",3,"formControl","matDatepicker"],["matSuffix","",3,"for"],["touchUi","","disabled","false"],["picker",""],[3,"linear"],["stepper",""],[3,"stepControl"],["matStepLabel",""],[3,"formGroup"],[1,"form-field"],["max","100","min","0","step","5","tickInterval","5","thumbLabel","true","aria-label","honey","formControlName","honey",3,"displayWith"],["matInput","","hidden",""],["max","100","min","0","step","5","tickInterval","5","thumbLabel","true","aria-label","honey closed","formControlName","honeyClosed",3,"displayWith"],["mat-stroked-button","","color","primary","matStepperNext",""],["formControlName","eggs"],["formControlName","larva"],["formControlName","closedBrood"],["formControlName","droneBrood"],["formControlName","queenBrood"],["formControlName","drones"],["formControlName","queen"],["floatLabel","always"],["max","100","min","0","step","5","tickInterval","5","thumbLabel","true","aria-label","food","formControlName","honeyFood",3,"displayWith"],["mat-stroked-button","","matStepperPrevious",""],["mat-stroked-button","","matStepperNext","","color","primary"],["max","100","min","0","step","5","tickInterval","5","thumbLabel","true","aria-label","health","formControlName","health",3,"displayWith"],["matInput","","formControlName","remarks"],["mat-stroked-button","","color","primary",3,"click"]],template:function(e,t){if(1&e&&(r.Vb(0,"mat-card"),r.Vb(1,"mat-card-header"),r.Vb(2,"mat-card-title"),r.xc(3),r.gc(4,"i18nextCap"),r.Qb(5,"input",0),r.Qb(6,"mat-datepicker-toggle",1),r.Qb(7,"mat-datepicker",2,3),r.Ub(),r.Ub(),r.Vb(9,"mat-card-content"),r.Vb(10,"mat-vertical-stepper",4,5),r.Vb(12,"mat-step",6),r.vc(13,q,2,3,"ng-template",7),r.Vb(14,"form",8),r.Vb(15,"div",9),r.Vb(16,"mat-form-field"),r.Vb(17,"mat-label"),r.xc(18),r.gc(19,"i18nextCap"),r.Ub(),r.Qb(20,"mat-slider",10),r.Qb(21,"textarea",11),r.Ub(),r.Ub(),r.Vb(22,"div",9),r.Vb(23,"mat-form-field"),r.Vb(24,"mat-label"),r.xc(25),r.gc(26,"i18nextCap"),r.gc(27,"i18next"),r.Ub(),r.Qb(28,"mat-slider",12),r.Qb(29,"textarea",11),r.Ub(),r.Ub(),r.Vb(30,"bee-button-bar"),r.Vb(31,"button",13),r.xc(32),r.gc(33,"i18nextCap"),r.Ub(),r.Ub(),r.Ub(),r.Ub(),r.Vb(34,"mat-step",6),r.vc(35,S,2,3,"ng-template",7),r.Vb(36,"form",8),r.Vb(37,"div",9),r.Vb(38,"mat-form-field"),r.Vb(39,"mat-slide-toggle",14),r.xc(40),r.gc(41,"i18nextCap"),r.Ub(),r.Vb(42,"mat-hint"),r.xc(43),r.gc(44,"i18next"),r.Ub(),r.Qb(45,"textarea",11),r.Ub(),r.Ub(),r.Vb(46,"div",9),r.Vb(47,"mat-form-field"),r.Vb(48,"mat-slide-toggle",15),r.xc(49),r.gc(50,"i18nextCap"),r.Ub(),r.Vb(51,"mat-hint"),r.xc(52),r.gc(53,"i18next"),r.Ub(),r.Qb(54,"textarea",11),r.Ub(),r.Ub(),r.Vb(55,"div",9),r.Vb(56,"mat-form-field"),r.Vb(57,"mat-slide-toggle",16),r.xc(58),r.gc(59,"i18nextCap"),r.gc(60,"i18next"),r.Ub(),r.Vb(61,"mat-hint"),r.xc(62),r.gc(63,"i18next"),r.Ub(),r.Qb(64,"textarea",11),r.Ub(),r.Ub(),r.Vb(65,"div",9),r.Vb(66,"mat-form-field"),r.Vb(67,"mat-slide-toggle",17),r.xc(68),r.gc(69,"i18nextCap"),r.Ub(),r.Vb(70,"mat-hint"),r.xc(71),r.gc(72,"i18next"),r.Ub(),r.Qb(73,"textarea",11),r.Ub(),r.Ub(),r.Vb(74,"div",9),r.Vb(75,"mat-form-field"),r.Vb(76,"mat-slide-toggle",18),r.xc(77),r.gc(78,"i18nextCap"),r.Ub(),r.Vb(79,"mat-hint"),r.xc(80),r.gc(81,"i18next"),r.Ub(),r.Qb(82,"textarea",11),r.Ub(),r.Ub(),r.Vb(83,"div",9),r.Vb(84,"mat-form-field"),r.Vb(85,"mat-slide-toggle",19),r.xc(86),r.gc(87,"i18nextCap"),r.Ub(),r.Vb(88,"mat-hint"),r.xc(89),r.gc(90,"i18next"),r.Ub(),r.Qb(91,"textarea",11),r.Ub(),r.Ub(),r.Vb(92,"div",9),r.Vb(93,"mat-form-field"),r.Vb(94,"mat-slide-toggle",20),r.xc(95),r.gc(96,"i18nextCap"),r.Ub(),r.Vb(97,"mat-hint"),r.xc(98),r.gc(99,"i18next"),r.Ub(),r.Qb(100,"textarea",11),r.Ub(),r.Ub(),r.Vb(101,"div",9),r.Vb(102,"mat-form-field",21),r.Vb(103,"mat-label"),r.xc(104),r.gc(105,"i18nextCap"),r.gc(106,"i18next"),r.Ub(),r.Qb(107,"mat-slider",22),r.Vb(108,"mat-hint"),r.xc(109),r.gc(110,"i18next"),r.Ub(),r.Qb(111,"textarea",11),r.Ub(),r.Ub(),r.Vb(112,"bee-button-bar"),r.Vb(113,"button",23),r.xc(114),r.gc(115,"i18nextCap"),r.Ub(),r.Vb(116,"button",24),r.xc(117),r.gc(118,"i18nextCap"),r.Ub(),r.Ub(),r.Ub(),r.Ub(),r.Vb(119,"mat-step",6),r.vc(120,L,2,3,"ng-template",7),r.Vb(121,"form",8),r.Vb(122,"div",9),r.Vb(123,"mat-form-field"),r.Vb(124,"mat-label"),r.xc(125),r.gc(126,"i18nextCap"),r.gc(127,"i18next"),r.Ub(),r.Qb(128,"mat-slider",25),r.Qb(129,"textarea",11),r.Ub(),r.Ub(),r.Vb(130,"div",9),r.Vb(131,"mat-form-field"),r.Vb(132,"mat-label"),r.xc(133),r.gc(134,"i18nextCap"),r.Ub(),r.Qb(135,"textarea",26),r.Ub(),r.Ub(),r.Vb(136,"bee-button-bar"),r.Vb(137,"button",23),r.xc(138),r.gc(139,"i18nextCap"),r.Ub(),r.Vb(140,"button",24),r.xc(141),r.gc(142,"i18nextCap"),r.Ub(),r.Ub(),r.Ub(),r.Ub(),r.Vb(143,"mat-step"),r.vc(144,j,2,3,"ng-template",7),r.Vb(145,"bee-button-bar"),r.Vb(146,"button",23),r.xc(147),r.gc(148,"i18nextCap"),r.Ub(),r.Vb(149,"button",27),r.cc("click",function(){return t.submit()}),r.xc(150),r.gc(151,"i18nextCap"),r.Ub(),r.Ub(),r.Ub(),r.Ub(),r.Ub(),r.Ub()),2&e){const e=r.oc(8);r.Db(3),r.zc(" ",r.hc(4,46,"inspection")," "),r.Db(2),r.lc("formControl",t.timestamp)("matDatepicker",e),r.Db(1),r.lc("for",e),r.Db(4),r.lc("linear",!0),r.Db(2),r.lc("stepControl",t.honeySuperGroup),r.Db(2),r.lc("formGroup",t.honeySuperGroup),r.Db(4),r.yc(r.hc(19,48,"honey")),r.Db(2),r.lc("displayWith",t.formatLabel),r.Db(5),r.Ac("",r.hc(26,50,"honey")," ",r.hc(27,52,"closed"),""),r.Db(3),r.lc("displayWith",t.formatLabel),r.Db(4),r.yc(r.hc(33,54,"next")),r.Db(2),r.lc("stepControl",t.hiveBodyGroup),r.Db(2),r.lc("formGroup",t.hiveBodyGroup),r.Db(4),r.yc(r.ic(41,56,"egg",r.mc(113,F))),r.Db(3),r.yc(r.hc(44,59,"sentence.eggsPresent")),r.Db(6),r.yc(r.ic(50,61,"larva",r.mc(114,F))),r.Db(3),r.yc(r.hc(53,64,"sentence.openBrood")),r.Db(6),r.Ac("",r.hc(59,66,"closed")," ",r.hc(60,68,"brood"),""),r.Db(4),r.yc(r.hc(63,70,"sentence.closedBrood")),r.Db(6),r.yc(r.hc(69,72,"droneBrood")),r.Db(3),r.yc(r.hc(72,74,"sentence.droneBroodPresent")),r.Db(6),r.yc(r.hc(78,76,"queenBrood")),r.Db(3),r.yc(r.hc(81,78,"sentence.queenBroodPresent")),r.Db(6),r.yc(r.ic(87,80,"drone",r.mc(115,F))),r.Db(3),r.yc(r.hc(90,83,"sentence.dronesPresent")),r.Db(6),r.yc(r.hc(96,85,"queen")),r.Db(3),r.yc(r.hc(99,87,"sentence.queenPresent")),r.Db(6),r.Ac("",r.hc(105,89,"food")," (",r.hc(106,91,"honey"),")"),r.Db(3),r.lc("displayWith",t.formatLabel),r.Db(2),r.zc("",r.hc(110,93,"sentence.hiveBodyFood"),"."),r.Db(5),r.yc(r.hc(115,95,"back")),r.Db(3),r.yc(r.hc(118,97,"next")),r.Db(2),r.lc("stepControl",t.overallGroup),r.Db(2),r.lc("formGroup",t.overallGroup),r.Db(4),r.Ac("",r.hc(126,99,"overall")," ",r.hc(127,101,"health"),""),r.Db(3),r.lc("displayWith",t.formatLabel),r.Db(5),r.yc(r.hc(134,103,"remarks")),r.Db(5),r.yc(r.hc(139,105,"back")),r.Db(3),r.yc(r.hc(142,107,"next")),r.Db(6),r.yc(r.hc(148,109,"back")),r.Db(3),r.yc(r.hc(151,111,"done"))}},directives:[M.a,M.e,M.h,_.b,O.c,w.b,O.m,O.f,w.d,B.g,w.a,M.d,N.f,N.a,N.b,O.s,O.n,O.h,B.b,B.f,Q.a,O.g,p.a,h.b,N.d,G.a,B.e,N.e],pipes:[x.b,x.d],styles:[".form-field[_ngcontent-%COMP%]{align-items:center;display:flex;margin:.5rem 0;min-height:5rem}mat-form-field[_ngcontent-%COMP%]{flex:1 1 auto}.mat-form-field[_ngcontent-%COMP%]   mat-label[_ngcontent-%COMP%]{align-self:center;display:inline-flex;width:150px}.mat-form-field[_ngcontent-%COMP%]   mat-slider[_ngcontent-%COMP%]{max-width:320px;width:100%}textarea[_ngcontent-%COMP%]{height:10rem;width:100%}.timestamp-input[_ngcontent-%COMP%]{border:none;background:transparent;color:inherit;font:inherit;width:7rem}"]}),e})()}];let W=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=r.Nb({type:e}),e.\u0275inj=r.Mb({imports:[[c.f.forChild($)],c.f]}),e})();var A=n("jAig"),T=n("PCNd");let z=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=r.Nb({type:e}),e.\u0275inj=r.Mb({imports:[[o.c,x.c,W,O.q,A.a,T.a]]}),e})()}}]);