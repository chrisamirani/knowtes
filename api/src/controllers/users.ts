import { Body, Controller, Post, Route } from "tsoa";
import { SignupUser } from "../types";
import { signUpNewUser } from "../services/users";

@Route("users")
export class UsersController extends Controller {
  /**
   * Create a new user without an assigned team. This user can later create a team and invite others.
   */
  @Post("signup")
  public async createUnassignedUser(@Body() body: SignupUser): Promise<void> {
    try {
      return await signUpNewUser(body);
    } catch (e: unknown) {
      console.log(e);
      this.setStatus(400);
      return;
    }
  }
}
