import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Query,
  Request,
  Route,
  Security,
  Tags,
} from "tsoa";
import { IAuthenticatedRequest, INote, TDocumentId } from "../types";
import {
  getNoteById,
  getRecentNotes,
  initNewNote,
  updateNote,
} from "../services/note";

@Route("notes")
@Tags("Notes")
@Security("jwt")
export class NotesController extends Controller {
  /**
   * Initialized an empty note
   */
  @Post("init")
  public async init(
    @Request() req: IAuthenticatedRequest
  ): Promise<TDocumentId | undefined> {
    const body = {
      id: undefined,
      title: "New note",
      body: [],
    };
    return await initNewNote(req.email, body);
  }

  /**
   * Update a note
   */
  @Put("update")
  public async update(
    @Request() req: IAuthenticatedRequest,
    @Body() body: INote
  ): Promise<void> {
    return await updateNote(req.email, body);
  }

  /**
   * Get recent 10 notes' titles
   */

  @Get("recent")
  public async getRecent(
    @Request() req: IAuthenticatedRequest
  ): Promise<Omit<INote, "body">[]> {
    return await getRecentNotes(req.email);
  }

  /**
   * Get full note content by id
   */

  @Get("by-id")
  public async byId(
    @Request() req: IAuthenticatedRequest,
    @Query() id: TDocumentId
  ): Promise<INote | undefined> {
    return await getNoteById(req.email, id);
  }
}
