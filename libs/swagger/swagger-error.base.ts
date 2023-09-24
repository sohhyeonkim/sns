import { ApiProperty } from '@nestjs/swagger';

export class ErrorResponseObjectDto {
  constructor(props) {
    Object.assign(this, props);
  }

  @ApiProperty()
  readonly code: string;

  @ApiProperty()
  readonly response: string;
}

export class SwaggerErrorResponse {
  constructor(props: { statusCode: number; message: ErrorResponseObjectDto }) {
    Object.assign(this, props);
  }

  @ApiProperty()
  readonly statusCode: number;

  @ApiProperty({ type: ErrorResponseObjectDto })
  readonly message: ErrorResponseObjectDto;
}
