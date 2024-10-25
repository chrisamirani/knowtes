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
  IAuthenticatedRequest,
  IClientUser,
  IUser,
  LoginUser,
  UserToken,
} from "../types";
import {
  getClientUserByEmail,
  loginUser,
  signUpNewUser,
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
}
