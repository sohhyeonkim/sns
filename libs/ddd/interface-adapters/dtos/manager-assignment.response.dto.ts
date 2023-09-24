import { ApiResponseProperty } from '@nestjs/swagger';

export class ManagerAssignmentResponse {
  constructor(isSaved: boolean) {
    this.isSaved = isSaved;
  }

  @ApiResponseProperty()
  readonly isSaved: boolean;
}
