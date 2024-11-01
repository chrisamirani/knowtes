import {
  Controller,
  FormField,
  Post,
  Request,
  Route,
  Security,
  Tags,
  UploadedFile,
} from "tsoa";
import { uploadFile as uploadFileService } from "../services/uploads";
import { IAuthenticatedRequest } from "../types";

@Route("uploads")
@Tags("Uploads")
@Security("jwt")
export class UploadsController extends Controller {
  /**
   * Upload files
   */
  @Post("uploadFile")
  public async uploadFile(
    @Request() req: IAuthenticatedRequest,
    @FormField() fileType: string,
    @UploadedFile() file: Express.Multer.File
  ): Promise<string | undefined> {
    if (!req.team) {
      this.setStatus(400);
      return;
    }
    return await uploadFileService(file, fileType, req.team);
  }
}
