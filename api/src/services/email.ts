import { Resend } from "resend";
const resend = new Resend(process.env.RESEND_KEY);

export async function sendEmailConfirmationEmail(email: string, token: string) {
  const confirmationLink = `${process.env.CLIENT_URL}/dashboard?token=${token}`;
  const unsubscribeLink = `${process.env.CLIENT_URL}/unsubscribe?token=${token}`;
  try {
    const data = await resend.emails.send({
      from: "Knowtes App <no-reply@updates.knowtes.app>",
      to: [email],
      subject: "Your Knowtes Dashboard",
      html: `
      <div style="font-family: sans-serif" class="body">
      <strong><center>Email Confirmation</center></strong>
      <br />
      <p>Hi there,</p>

      <p
        >Thanks for joining Knowtes!</p
      >

      <p>Please use the link below to confirm your email: </p>
      <a href="${confirmationLink}">${confirmationLink}</a> 

      <p>Thanks again,</p>
      <p>Knowtes Team</p>

      <a style="font-size:10px;color:#5c5c5c;" href="${unsubscribeLink}"><center>Unsubscribe</center></a>
    </div>
      
      `,
    });

    console.log({ data });
    if (data.error) {
      return false;
    }

    return true;
  } catch (error) {
    console.error({ error });
    return false;
  }
}

export async function sendInvitationEmail(email: string, token: string) {
  const confirmationLink = `${process.env.CLIENT_URL}/member-signup?t=${token}&email=${email}`;
  const unsubscribeLink = `${process.env.CLIENT_URL}/unsubscribe?token=${token}`;
  try {
    const data = await resend.emails.send({
      from: "Knowtes App <no-reply@updates.knowtes.app>",
      to: [email],
      subject: "Your Knowtes Invitation",
      html: `
      <div style="font-family: sans-serif" class="body">
      <strong><center>Email Confirmation</center></strong>
      <br />
      <p>Hi there,</p>

      <p
        >Your team has invited your to join!</p
      >

      <p>Please use the link below to confirm your email and complete registration (expires in 24 hours): </p>
      <a href="${confirmationLink}">${confirmationLink}</a> 

      <p>Thanks again,</p>
      <p>Knowtes Team</p>

      <a style="font-size:10px;color:#5c5c5c;" href="${unsubscribeLink}"><center>Unsubscribe</center></a>
    </div>
      
      `,
    });

    console.log({ data });
    if (data.error) {
      return false;
    }

    return true;
  } catch (error) {
    console.error({ error });
    return false;
  }
}
