import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  Route,
  Security,
  Tags,
} from "tsoa";
import {
  TEmailField,
  IAuthenticatedRequest,
  IClientUser,
  IUser,
  LoginUser,
  UserToken,
} from "../types";
import {
  getClientUserByEmail,
  loginUser,
  inviteNewTeamMember,
  signUpNewUser,
  signupInvitedUser,
} from "../services/users";

@Route("users")
@Tags("Users")
export class UsersController extends Controller {
  /**
   * Create a new user without an assigned team. This user can later create a team and invite others.
   */
  @Post("signup")
  public async createUnassignedUser(@Body() body: IUser): Promise<void> {
    if (process.env.NODE_ENV === "prod") {
      return;
    }

    try {
      return await signUpNewUser(body);
    } catch (e: unknown) {
      console.log(e);
      this.setStatus(400);
      return;
    }
  }

  /**
   * Create a new user without an assigned team. This user can later create a team and invite others.
   */
  @Post("login")
  public async loginUserWithUserPass(
    @Body() body: LoginUser
  ): Promise<UserToken | undefined> {
    try {
      return await loginUser(body);
    } catch (e: unknown) {
      console.log(e);
      this.setStatus(400);
      return;
    }
  }

  /**
   * Get current user authenticated via Bearer JWT
   */
  @Get("me")
  @Security("jwt")
  public async me(
    @Request() req: IAuthenticatedRequest
  ): Promise<IClientUser | undefined> {
    try {
      return await getClientUserByEmail(req.email);
    } catch (e: unknown) {
      console.log(e);
      this.setStatus(400);
      return;
    }
  }

  /**
   * Invite a user to join your team
   */
  @Post("invite")
  @Security("jwt")
  public async invite(
    @Request() req: IAuthenticatedRequest,
    @Body() body: { email: TEmailField }
  ): Promise<void> {
    try {
      return await inviteNewTeamMember(body.email, req.email);
    } catch (e: unknown) {
      console.log(e);
      this.setStatus(400);
      return;
    }
  }

  /**
   * Sign up authenticated team member (email invitation flow)
   */
  @Post("signup-teammate")
  @Security("jwt")
  public async signUpTeamMember(
    @Request() req: IAuthenticatedRequest,
    @Body() body: IUser
  ): Promise<void> {
    const { team, email } = req;
    console.log({ team, email });
    if (!req.team) {
      this.setStatus(400);
      return;
    }
    if (!req.team) {
      this.setStatus(400);
      return;
    }
    try {
      return await signupInvitedUser({ ...body, email: req.email }, req.team);
    } catch (e: unknown) {
      console.log(e);
      this.setStatus(400);
      return;
    }
  }
}
