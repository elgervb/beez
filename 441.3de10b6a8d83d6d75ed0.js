"use strict";(self.webpackChunkbeez=self.webpackChunkbeez||[]).push([[441],{6441:(S,E,r)=>{r.r(E),r.d(E,{LedgerEntryType:()=>m,LedgerModule:()=>W,LedgerRoutingModule:()=>y,LegderComponent:()=>M});var e=r(7716),_=r(2882),s=r(171),L=r(9699),h=r(4294),T=r(9922),v=r(2329),D=r(2232),O=r(9523),u=r(3738),P=r(4762),a=r(3679),c=r(8295),f=r(3220),p=r(7299),U=r(1095),x=r(9983),g=r(4269),Z=r(7746),d=r(8583),b=r(2458);function q(n,i){if(1&n&&(e.TgZ(0,"mat-list-item",2),e.TgZ(1,"div",3),e.TgZ(2,"span",4),e._uU(3),e.ALo(4,"timestamp"),e.qZA(),e.TgZ(5,"span",5),e._uU(6),e.qZA(),e.TgZ(7,"span",6),e._uU(8),e.ALo(9,"currency"),e.qZA(),e.qZA(),e.TgZ(10,"p",7),e._uU(11),e.qZA(),e.qZA()),2&n){const t=i.$implicit;e.xp6(3),e.Oqu(e.xi3(4,4,t.date,"MM-dd-yyyy HH:ss")),e.xp6(3),e.Oqu(t.description),e.xp6(2),e.Oqu(e.lcZ(9,7,t.amount)),e.xp6(3),e.Oqu(t.comment)}}let I=(()=>{class n{constructor(t,o){this.angularFirestore=t,this.authService=o}get collectionPath(){return`beez/${this.authService.uid}/ledger`}createEntry(t){return(0,L.D)(this.angularFirestore.collection(this.collectionPath).add(t))}getEntries(t){return this.angularFirestore.collection(this.collectionPath,o=>o.orderBy("date","desc").startAt(v.Z.firestore.Timestamp.fromDate(new Date(`12-31-${t}`))).endAt(v.Z.firestore.Timestamp.fromDate(new Date(`1-1-${t}`))).limit(250)).valueChanges({idField:"id"})}}return n.\u0275fac=function(t){return new(t||n)(e.LFG(D.ST),e.LFG(O.e8))},n.\u0275prov=e.Yz7({token:n,factory:n.\u0275fac,providedIn:"root"}),n})();var m=(()=>{return(n=m||(m={})).expense="expense",n.income="income",m;var n})();let F=(()=>{class n{constructor(t){this.formBuilder=t,this.cancelEvent=new e.vpe,this.submitEvent=new e.vpe,this.form=this.formBuilder.group({type:[m.income,a.kI.required],date:[new Date],description:["",a.kI.required],amountEur:["",a.kI.required],amountCents:[""],comment:[""]})}cancel(){this.cancelEvent.emit(),this.resetForm()}submit(){var t,o;if(this.form.valid){const C=(0,P._T)(this.form.value,["amountEur","amountCents"]);C.amount=parseFloat(`${null===(t=this.form.get("amountEur"))||void 0===t?void 0:t.value}.${null===(o=this.form.get("amountCents"))||void 0===o?void 0:o.value}`),this.submitEvent.emit(C),this.resetForm()}}resetForm(){var t,o;this.form.reset(),null===(t=this.form.get("date"))||void 0===t||t.setValue(new Date),null===(o=this.form.get("type"))||void 0===o||o.setValue(m.income)}}return n.\u0275fac=function(t){return new(t||n)(e.Y36(a.qu))},n.\u0275cmp=e.Xpm({type:n,selectors:[["bee-ledger-entry-form"]],outputs:{cancelEvent:"cancelEvent",submitEvent:"submitEvent"},decls:41,vars:22,consts:[[3,"formGroup","ngSubmit"],["appearance","fill",1,"date"],["matInput","","formControlName","date",3,"matDatepicker"],["matSuffix","",3,"for"],["touchUi",""],["picker",""],["appearance","fill",1,"amount-eur"],["matPrefix",""],["type","number","matInput","","formControlName","amountEur","autofocus",""],["matSuffix",""],["appearance","fill",1,"amount-cents"],["type","number","matInput","","matPostfix","","placeholder","00","formControlName","amountCents"],["appearance","fill",1,"description"],["matInput","","placeholder","Eg. Honey","formControlName","description","list","sell-list"],["id","sell-list"],["value","honey"],["appearance","fill",1,"full-width"],["matInput","","placeholder","comment","formControlName","comment"],["justify","right"],["mat-stroked-button","","type","button",3,"click"],["mat-stroked-button","","type","submit","color","primary",3,"disabled"]],template:function(t,o){if(1&t&&(e.TgZ(0,"form",0),e.NdJ("ngSubmit",function(){return o.submit()}),e.TgZ(1,"div"),e.TgZ(2,"mat-form-field",1),e.TgZ(3,"mat-label"),e._uU(4),e.ALo(5,"i18nextCap"),e.qZA(),e._UZ(6,"input",2),e._UZ(7,"mat-datepicker-toggle",3),e._UZ(8,"mat-datepicker",4,5),e.qZA(),e.qZA(),e.TgZ(10,"div"),e.TgZ(11,"mat-form-field",6),e.TgZ(12,"mat-label"),e._uU(13),e.ALo(14,"i18nextCap"),e.qZA(),e.TgZ(15,"span",7),e._uU(16,"EUR \xa0"),e.qZA(),e._UZ(17,"input",8),e.TgZ(18,"span",9),e._uU(19,","),e.qZA(),e.qZA(),e.TgZ(20,"mat-form-field",10),e._UZ(21,"input",11),e.qZA(),e.TgZ(22,"mat-form-field",12),e.TgZ(23,"mat-label"),e._uU(24),e.ALo(25,"i18nextCap"),e.qZA(),e._UZ(26,"input",13),e.qZA(),e.TgZ(27,"datalist",14),e._UZ(28,"option",15),e.qZA(),e.qZA(),e.TgZ(29,"mat-form-field",16),e.TgZ(30,"mat-label"),e._uU(31),e.ALo(32,"i18nextCap"),e.qZA(),e._UZ(33,"textarea",17),e.qZA(),e.TgZ(34,"bee-button-bar",18),e.TgZ(35,"button",19),e.NdJ("click",function(){return o.cancel()}),e._uU(36),e.ALo(37,"i18nextCap"),e.qZA(),e.TgZ(38,"button",20),e._uU(39),e.ALo(40,"i18nextCap"),e.qZA(),e.qZA(),e.qZA()),2&t){const l=e.MAs(9);e.Q6J("formGroup",o.form),e.xp6(4),e.Oqu(e.lcZ(5,10,"date")),e.xp6(2),e.Q6J("matDatepicker",l),e.xp6(1),e.Q6J("for",l),e.xp6(6),e.Oqu(e.lcZ(14,12,"amount")),e.xp6(11),e.Oqu(e.lcZ(25,14,"description")),e.xp6(7),e.Oqu(e.lcZ(32,16,"sentence.leaveComment")),e.xp6(5),e.Oqu(e.lcZ(37,18,"cancel")),e.xp6(2),e.Q6J("disabled",o.form.invalid||o.form.pristine),e.xp6(1),e.Oqu(e.lcZ(40,20,"save"))}},directives:[a._Y,a.JL,a.sg,c.KE,c.hX,x.Nt,a.Fj,f.hl,a.JJ,a.u,f.nW,c.R9,f.Mq,c.qo,a.wV,a.YN,a.Kr,p.N3,U.lW],pipes:[g.Mz],styles:[".form-field-group[_ngcontent-%COMP%]{display:flex;width:100%}.date[_ngcontent-%COMP%]{margin-right:.5rem}.amount-eur[_ngcontent-%COMP%]{text-align:right;width:7rem}.amount-cents[_ngcontent-%COMP%]{margin-right:.5rem;width:2.5rem}.description[_ngcontent-%COMP%]{width:8.3rem}.full-width[_ngcontent-%COMP%]{width:100%}"]}),n})(),B=(()=>{class n{}return n.\u0275fac=function(t){return new(t||n)},n.\u0275cmp=e.Xpm({type:n,selectors:[["bee-entry-list"]],inputs:{entries:"entries"},decls:2,vars:1,consts:[["role","list"],["role","listitem",4,"ngFor","ngForOf"],["role","listitem"],["matLine","",1,"line"],[1,"date"],[1,"description"],[1,"amount"],["matLine","",1,"comments"]],template:function(t,o){1&t&&(e.TgZ(0,"mat-list",0),e.YNc(1,q,12,9,"mat-list-item",1),e.qZA()),2&t&&(e.xp6(1),e.Q6J("ngForOf",o.entries))},directives:[Z.i$,d.sg,Z.Tg,b.X2],pipes:[p.dS,d.H9],styles:[".mat-line.line[_ngcontent-%COMP%]{display:flex;justify-content:space-between}.comments[_ngcontent-%COMP%]{font-size:.8em;opacity:.75}.amount[_ngcontent-%COMP%]{text-align:right}"]}),n})(),R=(()=>{class n{transform(t){return t&&t.length>0?t.reduce((o,l)=>o+l.amount,0):null}}return n.\u0275fac=function(t){return new(t||n)},n.\u0275pipe=e.Yjl({name:"sum",type:n,pure:!0}),n})(),M=(()=>{class n{constructor(t,o){this.ledgerService=t,this.route=o}ngOnInit(){this.year=this.route.snapshot.paramMap.get("year")||(new Date).getFullYear(),this.entries$=this.ledgerService.getEntries(this.year)}addEntry(t){this.ledgerService.createEntry(t).pipe((0,h.q)(1),(0,T.b)(()=>this.collapse())).subscribe()}collapse(){this.expansionPanel.close()}}return n.\u0275fac=function(t){return new(t||n)(e.Y36(I),e.Y36(_.gz))},n.\u0275cmp=e.Xpm({type:n,selectors:[["bee-legder"]],viewQuery:function(t,o){if(1&t&&e.Gf(s.ib,5),2&t){let l;e.iGM(l=e.CRH())&&(o.expansionPanel=l.first)}},decls:24,vars:26,consts:[[3,"cancelEvent","submitEvent"],[3,"entries"]],template:function(t,o){1&t&&(e.TgZ(0,"mat-card"),e.TgZ(1,"mat-card-header"),e.TgZ(2,"mat-card-title"),e._uU(3),e.ALo(4,"i18nextCap"),e.ALo(5,"i18next"),e.qZA(),e.qZA(),e.TgZ(6,"mat-card-content"),e.TgZ(7,"mat-expansion-panel"),e.TgZ(8,"mat-expansion-panel-header"),e.TgZ(9,"mat-panel-title"),e._uU(10),e.ALo(11,"i18nextCap"),e.qZA(),e.TgZ(12,"mat-panel-description"),e._uU(13),e.ALo(14,"i18nextCap"),e.qZA(),e.qZA(),e.TgZ(15,"bee-ledger-entry-form",0),e.NdJ("cancelEvent",function(){return o.collapse()})("submitEvent",function(A){return o.addEntry(A)}),e.qZA(),e.qZA(),e._UZ(16,"bee-entry-list",1),e.ALo(17,"async"),e.qZA(),e.TgZ(18,"mat-card-footer"),e._uU(19),e.ALo(20,"i18nextCap"),e.ALo(21,"currency"),e.ALo(22,"sum"),e.ALo(23,"async"),e.qZA(),e.qZA()),2&t&&(e.xp6(3),e.lnq("",e.lcZ(4,8,"ledger.ledger")," ",e.lcZ(5,10,"ledger.for")," ",o.year,""),e.xp6(7),e.hij(" ",e.lcZ(11,12,"add")," + "),e.xp6(3),e.hij(" ",e.lcZ(14,14,"ledger.sentence.addNewEntry")," "),e.xp6(3),e.Q6J("entries",e.lcZ(17,16,o.entries$)),e.xp6(3),e.AsE(" ",e.lcZ(20,18,"total"),": ",e.lcZ(21,20,e.lcZ(22,22,e.lcZ(23,24,o.entries$)))," "))},directives:[u.a8,u.dk,u.n5,u.dn,s.ib,s.yz,s.yK,s.u4,F,B,u.rt],pipes:[g.Mz,g.e3,d.Ov,d.H9,R],styles:["mat-card-footer[_ngcontent-%COMP%]{background-color:#fff;bottom:0;padding:1rem 2rem;position:sticky;text-align:right}"]}),n})();const K=[{path:":year",component:M},{path:"**",redirectTo:(new Date).getFullYear().toString()}];let y=(()=>{class n{}return n.\u0275fac=function(t){return new(t||n)},n.\u0275mod=e.oAB({type:n}),n.\u0275inj=e.cJS({imports:[[_.Bz.forChild(K)],_.Bz]}),n})(),W=(()=>{class n{}return n.\u0275fac=function(t){return new(t||n)},n.\u0275mod=e.oAB({type:n}),n.\u0275inj=e.cJS({imports:[[d.ez,p.Kk,g.zH,y,p.qX,a.UX]]}),n})()}}]);