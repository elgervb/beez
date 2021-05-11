import { Component, OnInit } from '@angular/core';
import { DocumentReference } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { first, tap } from 'rxjs/operators';
import { Hive } from '../../models';
import { HiveService } from '../../services/hive.service';

@Component({
  selector: 'bee-hive-edit',
  templateUrl: './hive-edit.component.html',
  styleUrls: ['./hive-edit.component.css']
})
export class HiveEditComponent implements OnInit {

  hive$?: Observable<Hive | undefined>;

  get isEdit(): boolean {
    return !!this.hiveId;
  }

  get hiveId(): string | null {
    return this.route.snapshot.paramMap.get('hiveId');
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private hiveService: HiveService
  ) { }

  ngOnInit(): void {
    const hiveId = this.hiveId;
    if (hiveId) {
      this.hive$ = this.hiveService.getHive(hiveId);
    }
  }

  edit(hive: Hive): void {
    const result: Observable<DocumentReference<Hive> | Hive | undefined> =
      !!hive.id ? this.hiveService.updateHive(hive) : this.hiveService.createHive(hive);

    result.pipe(
      first(),
      tap(() => this.cancel())
    ).subscribe();
  }

  cancel(): void {
    const path = this.isEdit ? '../..' : '..';
    this.router.navigate([path], { relativeTo: this.route });
  }

}
