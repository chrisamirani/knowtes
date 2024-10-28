import { Controller, Get, Request, Route, Security, Tags } from "tsoa";
import { IAuthenticatedRequest, ITeamMember } from "../types";
import { findTeamMembers } from "../services/team";

@Route("team")
@Tags("Team")
@Security("jwt")
export class TeamController extends Controller {
  /**
   * get team members
   */

  @Get("members")
  public async getMembers(
    @Request() req: IAuthenticatedRequest
  ): Promise<ITeamMember[] | undefined> {
    return await findTeamMembers(req.team ?? "");
  }
}
