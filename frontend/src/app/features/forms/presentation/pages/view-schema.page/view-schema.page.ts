import { FormFacade } from '@/features/forms/application/fecades/form.fecade';
import { GetFormDTO, GetFormVersionDTO } from '@/features/forms/domain/dtos/form-list.dto';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Card } from "@/shared/ui/components/card/card";
import { ViewVersionList } from "../../components/view-version-list/view-version-list";

@Component({
  selector: 'app-view-schema.page',
  imports: [Card, ViewVersionList],
  templateUrl: './view-schema.page.html',
  styles: ``,
})
export class ViewSchemaPage implements OnInit {
  fecade = inject(FormFacade);

  // schemaF = this.fecade.currentSchema
  
  // form?: GetFormDTO
  form$ = this.fecade.current
  form?: GetFormDTO
  versionForm?: GetFormVersionDTO
  schema?: any

  idForm?: string;
  idVersion?: string;


  constructor(private readonly route: ActivatedRoute){}

  async ngOnInit() {
    this.idForm = this.route.snapshot.paramMap.get('codeForm')!;
    this.idVersion = this.route.snapshot.paramMap.get('codeVersion')!;

    this.fecade.loadOne({id: this.idForm}).then(e =>{
      this.form = this.fecade.current() || undefined
      this.versionForm = this.form?.versions?.find(v => v.id === this.idVersion) || undefined
      console.log(this.getVersions)
    })
    // await this.fecade.loadOne({id: this.idForm}).then(e =>{
    //   this.form = this.fecade.current() || undefined
    //   this.versionForm = this.form?.versions?.find(v => v.id === this.idVersion) || undefined
    //   console.log(this.form)
    // })
    // this.facade.load({ page: 1, pageSize: 10 }); // params
  }

  get getVersions(): GetFormVersionDTO[] {
    return this.form?.versions ?? [];
  }

}
