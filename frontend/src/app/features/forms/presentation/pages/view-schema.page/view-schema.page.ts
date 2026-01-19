import { FormFacade } from '@/features/forms/application/fecades/form.fecade';
import { GetFormDTO, GetFormVersionDTO } from '@/features/forms/domain/dtos/form-list.dto';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-schema.page',
  imports: [],
  templateUrl: './view-schema.page.html',
  styles: ``,
})
export class ViewSchemaPage implements OnInit {
  fecade = inject(FormFacade);

  // schemaF = this.fecade.currentSchema
  
  form?: GetFormDTO
  versionForm?: GetFormVersionDTO
  schema?: any

  idVersion?: string;


  constructor(private readonly route: ActivatedRoute){}

  async ngOnInit() {
    this.idVersion = this.route.snapshot.paramMap.get('code')!;
    await this.fecade.loadSchema(this.idVersion).then(e => {
      this.versionForm = this.fecade.currentSchema()!
      this.schema = this.versionForm.schema
    });

    await this.fecade.loadOne({id: this.versionForm?.formId}).then(e =>{
      this.form = this.fecade.current() || undefined
    })
    // this.facade.load({ page: 1, pageSize: 10 }); // params
  }

}
