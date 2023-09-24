import { ApiResponseProperty } from '@nestjs/swagger';

export class SubmitConsultationResponse {
  constructor(isSaved: boolean) {
    this.isSaved = isSaved;
  }

  @ApiResponseProperty()
  readonly isSaved: boolean;
}
