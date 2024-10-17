import { Body, Controller, Post, Route } from "tsoa";
import { Subscription } from "../types";
import { createSubscription } from "../services/contact";

@Route("contact")
export class ContactsController extends Controller {
  /**
   * This service subscribes an email to receive development updates on Knowtes.
   */
  @Post("subscribe")
  public async subscribeToProgress(
    @Body() body: Subscription
  ): Promise<boolean> {
    return await createSubscription(body.email);
  }
}
