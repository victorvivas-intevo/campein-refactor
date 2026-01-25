import { Injectable, signal, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { GetFormsUseCase } from '../use-cases/get-forms.use-case';
import { GetFormUseCase } from '../use-cases/get-form.use-case';
import { GetFormSubmissionUseCase } from '../use-cases/get-form-submission.use-case';
import { GetFormSchemaUseCase } from '../use-cases/get-form-submissions.use-case';
import { Form as FormEntity } from '../../domain/entities/form.entity';
import { GetFormDTO, GetFormSubmissionDTO, GetFormVersionDTO, RequestGetFormDTO } from '../../domain/dtos/form-list.dto';
import { CreateFormDTO, ResponseCreateFormDTO } from '../../domain/dtos/form-magement.dto';

@Injectable({ providedIn: 'root' })
export class FormFacade {

  private getFormUC = inject(GetFormUseCase);
  private getFormsByTenantUC = inject(GetFormsUseCase);
  private getFormSubmissionUC = inject(GetFormSubmissionUseCase);
  private getFormSchemaUC = inject(GetFormSchemaUseCase);

  items = signal<GetFormDTO[]>([]);
  current = signal<GetFormDTO | null>(null);
  currentSchema = signal<GetFormVersionDTO | null>(null);
  currentSubmission = signal<GetFormSubmissionDTO | null>(null);
  loading = signal(false);

  async load() {
    this.loading.set(true);
    try {
      const forms = await firstValueFrom(this.getFormsByTenantUC.execute());
      this.items.set(forms);
    } finally {
      this.loading.set(false);
    }
  }

  async loadOne(dto: RequestGetFormDTO) {
    this.loading.set(true);
    try {
      const form = await firstValueFrom(this.getFormUC.execute(dto))
      this.current.set(form);
    } finally {
      this.loading.set(false);
    }
  }

  async loadSchema(id: string) {
    this.loading.set(true);
    try {
      const schema = await firstValueFrom(this.getFormSchemaUC.execute(id))
      this.currentSchema.set(schema);
    } finally {
      this.loading.set(false);
    }
  }

  async loadSubmission(formId: string, submissionId: string) {
    this.loading.set(true);
    try {
      const submission = await firstValueFrom(this.getFormSubmissionUC.execute(formId, submissionId))
      this.currentSubmission.set(submission);
    } finally {
      this.loading.set(false);
    }
  }



  // async create(dto: XxxCreateDto) {
  //   this.loading.set(true);
  //   try {
  //     return await this.createUC.execute(dto);
  //   } finally {
  //     this.loading.set(false);
  //   }
  // }

  // async update(id: string | number, dto: XxxUpdateDto) {
  //   this.loading.set(true);
  //   try {
  //     await this.updateUC.execute(id, dto);
  //   } finally {
  //     this.loading.set(false);
  //   }
  // }
}
