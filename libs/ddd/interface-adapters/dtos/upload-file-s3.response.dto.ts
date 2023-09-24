import { ApiResponseProperty } from '@nestjs/swagger';

import { FileUploadResult } from '../../../../infrastructure/ports/s3.port';

export class UploadS3Response {
  constructor(fileUploadResult: FileUploadResult[]) {
    this.fileUploadResult = fileUploadResult;
  }

  @ApiResponseProperty({ type: [FileUploadResult] })
  readonly fileUploadResult: FileUploadResult[];
}
