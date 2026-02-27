import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "manivel23@gmail.com",
    pass: "xlml ybby xcgi fvko",
  },
  secure: false, // disable SSL
  tls: {
    rejectUnauthorized: false, // accept self-signed certs
  },
});
export const sendEmail = async (to: string, name: string) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: "We've Received Your Inquiry - ARK Global",
    html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>MyRecruit Employee Shortlisted</title>
    <link rel="stylesheet" href="./style.css" />
  </head>
  <body>
    <style>
      body {
        margin: 0;
        padding: 0;
        mso-line-height-rule: exactly;
        min-width: 100%;
      }

      .wrapper {
        display: table;
        table-layout: fixed;
        width: 100%;
        min-width: 620px;
        -webkit-text-size-adjust: 100%;
        -ms-text-size-adjust: 100%;
      }

      body,
      .wrapper {
        background-color: #ffffff;
      }
      .back_color {
        background-color: #1b4f72;
        color: #fff;
      }
      table {
        border-collapse: collapse;
        border-spacing: 0;
      }
      table.center {
        margin: 0 auto;
        width: 602px;
      }
      td {
        padding: 0;
        vertical-align: top;
      }

      .spacer,
      .border {
        font-size: 1px;
        line-height: 1px;
      }
      .spacer {
        width: 100%;
        line-height: 16px;
      }
      .border {
        background-color: #e0e0e0;
        width: 1px;
      }

      .padded {
        padding: 0 24px;
      }
      img {
        border: 0;
        -ms-interpolation-mode: bicubic;
      }
      .image {
        font-size: 12px;
      }
      .image img {
        display: block;
      }
      strong,
      .strong {
        font-weight: 700;
      }
      h1,
      h2,
      h3,
      p,
      ol,
      ul,
      li {
        margin-top: 0;
      }
      ol,
      ul,
      li {
        padding-left: 0;
      }

      a {
        text-decoration: none;
        color: #616161;
      }
      .btn {
        background-color: #2196f3;
        border: 1px solid #2196f3;
        border-radius: 2px;
        color: #ffffff;
        display: inline-block;
        font-family: Roboto, Helvetica, sans-serif;
        font-size: 14px;
        font-weight: 400;
        line-height: 36px;
        text-align: center;
        text-decoration: none;
        text-transform: uppercase;
        width: 200px;
        height: 36px;
        padding: 0 8px;
        margin: 0;
        outline: 0;
        outline-offset: 0;
        -webkit-text-size-adjust: none;
        mso-hide: all;
      }

      /* Top panel */
      .title {
        text-align: left;
      }

      .subject {
        text-align: right;
      }

      .title,
      .subject {
        width: 300px;
        padding: 8px 0;
        color: #616161;
        font-family: Roboto, Helvetica, sans-serif;
        font-weight: 400;
        font-size: 12px;
        line-height: 14px;
      }

      /* Header */
      .logo {
        padding: 16px 0;
      }

      /* Logo */
      .logo-image {
        min-width: 200px;
        width: 50%;
        padding: 0;
      }
      .centers {
        text-align: center;
        margin: 0;
        padding: 20px 3px;
        font-size: 14px;
        letter-spacing: 1px;
      }
      .no_margin {
        margin: 0 !important;
      }
      .center_div {
        text-align: center;
      }
      /* Main */
      .main {
        -webkit-box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12),
          0 1px 2px 0 rgba(0, 0, 0, 0.24);
        -moz-box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12),
          0 1px 2px 0 rgba(0, 0, 0, 0.24);
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12),
          0 1px 2px 0 rgba(0, 0, 0, 0.24);
      }

      /* Content */
      .columns {
        margin: 0 auto;
        width: 600px;
        background-color: #ffffff;
        font-size: 14px;
      }

      .column {
        text-align: left;
        background-color: #ffffff;
        font-size: 14px;
      }

      .column-top {
        font-size: 24px;
        line-height: 24px;
      }

      .content {
        width: 100%;
      }

      .column-bottom {
        font-size: 8px;
        line-height: 8px;
      }

      .content h1 {
        margin-top: 0;
        margin-bottom: 16px;
        color: #212121;
        font-family: Roboto, Helvetica, sans-serif;
        font-weight: 400;
        font-size: 20px;
        line-height: 28px;
      }

      .content p {
        margin-top: 0;
        margin-bottom: 16px;
        color: #212121;
        font-family: Roboto, Helvetica, sans-serif;
        font-weight: 400;
        font-size: 18px;
        line-height: 24px;
      }
      .content .caption {
        color: #616161;
        font-size: 12px;
        line-height: 20px;
      }

      /* Footer */
      .signature,
      .subscription {
        vertical-align: bottom;
        width: 300px;
        padding-top: 8px;
        margin-bottom: 16px;
      }

      .signature {
        text-align: left;
      }
      .subscription {
        text-align: right;
      }

      .signature p,
      .subscription p {
        margin-top: 0;
        margin-bottom: 8px;
        color: #616161;
        font-family: Roboto, Helvetica, sans-serif;
        font-weight: 400;
        font-size: 12px;
        line-height: 18px;
      }
    </style>

    <center class="wrapper">
      <table
        class="top-panel center"
        width="602"
        border="0"
        cellspacing="0"
        cellpadding="0"
      >
        <tbody>
          <tr>
            <td class="title" width="300">ARK Global PTE. Ltd.,</td>
            <td class="subject" width="300"
              ><a class="strong" href="#" target="_blank"
                >www.arkglobalworldwide.com</a
              ></td
            >
          </tr>
          <tr>
            <td class="border" colspan="2">&nbsp;</td>
          </tr>
        </tbody>
      </table>

      <div class="spacer">&nbsp;</div>

      <table
        class="main center"
        width="602"
        border="0"
        cellspacing="0"
        cellpadding="0"
      >
        <tbody>
          <tr>
            <td class="column">
              <table
                class=""
                width="602"
                border="0"
                cellspacing="0"
                cellpadding="0"
                style="background-color: #1b4f72;color: #fff;text-align: center;"
              >
                <tr>
                   <td class="padded center_div">
                    <img src="${process.env.NEXT_PUBLIC_APP_URL}/assets/logo/logo.png"
                    alt="ARK Global" class="logo-image" style="width: 300px;" />
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td class="column">
              <div class="column-top">&nbsp;</div>
              <table class="content" border="0" cellspacing="0" cellpadding="0">
                <tbody>
                  <tr>
                    <td class="padded"> </td>
                  </tr>
                  <tr>
                    <td class="padded">
                      <p style="font-size:1rem; font-weight: 500;">Hi ${name},</p>
                      <p>Thank you for reaching out to ArkGlobal!.</p>
                      <p>
                        We appreciate your interest in our services and have
                        received your inquiry.</p
                      >
                      <p
                        >Our team is reviewing your message and will get back to
                        you within 24 hours. If you have any urgent questions,
                        feel free to reply to this email or contact us directly
                        @ <a href="mailto:arkglobalmanagement@gmail.com">arkglobalmanagement@gmail.com</a>.</p>

                      <p> Call : +65 65 9664 1872.</p>

                      <p>We look forward to assisting you!</p>
                    </td>
                  </tr>

                  <tr>
                    <td class="padded">
                      <p
                        ><tr>
                          <td class="padded">
                            <p class="no_margin">Thank You!</p>
                            <p>ARK Global Group</p>
                          </td>
                        </tr>
                      </p>
                    </td>
                  </tr>

                  <tr>
                    <td class="padded">
                      <p
                        ><tr>
                          <td class="padded"> </td>
                        </tr>
                      </p>
                    </td>
                  </tr>
                </tbody>
              </table>
              <table
                class="back_color"
                width="602"
                border="0"
                cellspacing="0"
                cellpadding="0"
                style="background-color: #1b4f72;color: #fff;text-align: center;"
              >
                <tr>
                  <td class="padded">
                    <p class="centers"
                      ><i
                        >" Success is built on relationships—let’s make this one
                        count! "</i
                      ></p
                    >
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    </center>
  </body>
</html>
`,
  };
  await transporter.sendMail(mailOptions);
};
