/* eslint-disable */

export const schema = {
  id: {
    prop: 'id',
    type: String,
  },
  SESSION: {
    prop: 'session',
    type: String,
  },
  'PRÉNOM OFFICIEL': {
    prop: 'prenomofficiel',
    type: String,
  },
  'NOM OFFICIEL': {
    prop: 'nomofficiel',
    type: String,
  },
  'PRÉNOM PRÉFÉRÉ': {
    prop: 'prenomprefere',
    type: String,
  },
  'NOM PRÉFÉRÉ': {
    prop: 'nomprefere',
    type: String,
  },
  COURRIEL: {
    prop: 'courriel',
    type: String,
  },
  'LANGUE DE COMMUNICATION': {
    prop: 'langue',
    type: String,
  },
  'CHARGE ACADÉMIQUE': {
    prop: 'langue',
    type: String,
  },
  GROUP: {
    prop: 'group',
    type: String,
  },
  'PROG DESCR': {
    prop: 'program',
    type: String,
  },
  DISCIPLINE: {
    prop: 'discipline',
    type: String,
  },
  'PLAN DESCR': {
    prop: 'plan',
    type: String,
  },
  LEVEL: {
    prop: 'level',
    type: String,
  },
  'RSG 1': {
    prop: 'rsg1',
    type: String,
  },
  'RSG 2': {
    prop: 'rsg2',
    type: String,
  },
};

export function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * @param link (@example 'https://vote.cssa-aei.ca/vote/d7c6a20c7f78770e76c47e33550649ff24646f7c6f96f14ac25cb3d212887185')
 * @param duration (@example '48')
 * @returns The HTML string to send
 */
export function getHTMLMessage(link: string, duration: string): string {
  return `
    <!DOCTYPE html>
    <html>
        <body>
            <td id="root" class="bodyCell" align="center" valign="top">
            <!--[if (gte mso 9)|(IE)]>
            <table align="center" border="0" cellspacing="0" cellpadding="0" width="660" style="width:660px;">
                <tr>
                    <td>
                        <![endif]-->
                        <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:660px" role="presentation">
                        <tbody>
                            <tr>
                                <td style="background-position:center;background-repeat:no-repeat;background-size:cover" class="mceSection" valign="top">
                                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout:fixed" role="presentation">
                                    <colgroup>
                                        <col span="1">
                                        <col span="1">
                                        <col span="1">
                                        <col span="1">
                                        <col span="1">
                                        <col span="1">
                                        <col span="1">
                                        <col span="1">
                                        <col span="1">
                                        <col span="1">
                                        <col span="1">
                                        <col span="1">
                                    </colgroup>
                                    <tbody>
                                        <tr>
                                            <td style="background-color:#ffffff;background-position:center;background-repeat:no-repeat;background-size:cover;padding-top:24px" class="mceColumn" valign="top" colspan="12" width="100%">
                                                <table border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation">
                                                <tbody>
                                                    <tr>
                                                        <td style="padding-left:48px;padding-right:48px" class="mceSpacing-24" id="mceColumnContainer" align="center" valign="top"><img width="564" style="width:564px;height:auto;max-width:100%;display:block" alt="CSSA-AÉI" src="https://dim.mcusercontent.com/cs/8c91dded6945aa036002b01f6/images/791acf81-4f39-847e-6d3a-1e21d9a12b96.png?w=564&amp;dpr=2"></td>
                                                    </tr>
                                                    <tr>
                                                        <td style="padding-top:24px" class="mceSpacing-24" id="mceColumnContainer" valign="top">
                                                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color:transparent;border-top:24px solid transparent;margin-bottom:0;margin-top:0" role="presentation">
                                                            <tbody>
                                                                <tr>
                                                                    <td style="min-width:100%" valign="top"></td>
                                                                </tr>
                                                            </tbody>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td style="padding-left:48px;padding-right:48px;padding-top:24px" class="mceSpacing-24" id="mceColumnContainer" valign="top">
                                                            <div class="mceText" style="font-size:14px;text-align:center;width:100%">
                                                            <h1 style="font-family:Verdana, Geneva, Tahoma, sans-serif" class="last-child">VOTE(Z): CSSA-AÉI</h1>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td style="padding-top:4px" class="mceSpacing-24" id="mceColumnContainer" valign="top">
                                                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color:transparent;border-top:20px solid transparent;margin-bottom:0;margin-top:0" role="presentation">
                                                            <tbody>
                                                                <tr>
                                                                    <td style="min-width:100%" valign="top"></td>
                                                                </tr>
                                                            </tbody>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td style="padding-left:48px;padding-right:48px;padding-top:24px" class="mceSpacing-24" id="mceColumnContainer" valign="top">
                                                            <div class="mceText" style="font-size:14px;text-align:center;width:100%">
                                                                <p style="font-family:Verdana, Geneva, Tahoma, sans-serif" class="last-child">
                                                                    The CSSA Elections are open!<br></br>
                                                                    If you would like to participate in the election, your unique voting link is:<br></br> 
                                                                    <a href=${link}>${link}</a><br></br>
                                                                    Voting ends in ${duration} hours.<br></br>
                                                                    Questions or issues? Your point of contact is it@cssa-aei.ca<br></br>
                                                                    Thank you for voting!<br> 
                                                                    - Your CSSA exec team
                                                                </p>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td style="padding-left:48px;padding-right:48px;padding-top:24px" class="mceSpacing-24" id="mceColumnContainer" valign="top">
                                                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color:transparent;border-top:2px solid #000000;margin-bottom:20px;margin-top:20px" role="presentation">
                                                            <tbody>
                                                                <tr>
                                                                    <td style="min-width:100%" valign="top"></td>
                                                                </tr>
                                                            </tbody>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td style="padding-left:48px;padding-right:48px;padding-top:24px" class="mceSpacing-24" id="mceColumnContainer" valign="top">
                                                            <div class="mceText" style="font-size:14px;text-align:center;width:100%">
                                                                <p style="font-family:Verdana, Geneva, Tahoma, sans-serif" class="last-child">
                                                                    Les élections de l'AÉI ont commencé!<br></br>
                                                                    Si vous souhaitez participer à cette élection, votre lien de vote est:<br></br>
                                                                    <a href=${link}>${link}</a><br></br>
                                                                    La periode de vote se termine dans ${duration} heures.<br></br>
                                                                    Questions ou problèmes? Votre point de contact est it@cssa-aei.ca<br></br>
                                                                    Merci pour votre participation!<br>
                                                                    - Votre équipe de direction de l'AÉI
                                                                </p>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td style="padding-top:24px" class="mceSpacing-24" id="mceColumnContainer" valign="top">
                                                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color:transparent;border-top:20px solid transparent;margin-bottom:0;margin-top:0" role="presentation">
                                                            <tbody>
                                                                <tr>
                                                                    <td style="min-width:100%" valign="top"></td>
                                                                </tr>
                                                            </tbody>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td style="padding-left:48px;padding-right:48px;padding-top:24px" class="mceSpacing-24" id="mceColumnContainer" align="center" valign="top">
                                                            <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation">
                                                            <tbody>
                                                                <tr>
                                                                    <td style="background-color:#316591;border-radius:0;text-align:center" class="mceButton" valign="top"><a href="http://www.cssa-aei.ca/" target="_blank" style="background-color:#316591;border-radius:0;border:2px solid #316591;color:#ffffff;display:inline-block;font-family:'Verdana', Geneva, Tahoma, sans-serif;font-size:14px;font-weight:normal;font-style:normal;padding:16px 28px;text-decoration:none;min-width:30px">cssa-aei.ca</a></td>
                                                                </tr>
                                                            </tbody>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td style="padding-left:48px;padding-right:48px;padding-top:24px" class="mceSpacing-24" id="mceColumnContainer" valign="top">
                                                            <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation">
                                                            <tbody>
                                                                <tr>
                                                                    <td style="background-color:transparent;background-position:center;background-repeat:no-repeat;background-size:cover;padding-top:0px;padding-bottom:0px;padding-left:0px;padding-right:0px" class="mceSection" valign="top">
                                                                        <table border="0" cellpadding="0" cellspacing="24" width="100%" style="table-layout:fixed" role="presentation">
                                                                        <colgroup>
                                                                            <col span="1">
                                                                            <col span="1">
                                                                            <col span="1">
                                                                            <col span="1">
                                                                            <col span="1">
                                                                            <col span="1">
                                                                            <col span="1">
                                                                            <col span="1">
                                                                            <col span="1">
                                                                            <col span="1">
                                                                            <col span="1">
                                                                            <col span="1">
                                                                        </colgroup>
                                                                        <tbody>
                                                                            <tr>
                                                                                <td style="background-position:center;background-repeat:no-repeat;background-size:cover" class="mceColumn" valign="top" colspan="12" width="100%">
                                                                                    <table border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation">
                                                                                    <tbody>
                                                                                        <tr>
                                                                                            <td class="mceSpacing-24" id="mceColumnContainer" align="center" valign="top">
                                                                                                <table border="0" cellpadding="0" cellspacing="0" width="" role="presentation" class="mceClusterLayout">
                                                                                                <tbody>
                                                                                                    <tr>
                                                                                                        <td style="padding-left:24px;padding-top:0;padding-right:24px" data-breakpoint="2" valign="top" class="mobileClass-2"><a href="https://instagram.com/cssa.aei" style="display:block" target="_blank"><img width="40" style="border:0;width:40px;height:auto;max-width:100%;display:block" alt="Instagram" src="https://dim.mcusercontent.com/https/cdn-images.mailchimp.com%2Ficons%2Fsocial-block-v2%2Fcolor-instagram-48.png?w=40&amp;dpr=2"></a></td>
                                                                                                        <td style="padding-left:24px;padding-top:0;padding-right:24px" data-breakpoint="2" valign="top" class="mobileClass-2"><a href="https://facebook.com/CSSAAEI" style="display:block" target="_blank"><img width="40" style="border:0;width:40px;height:auto;max-width:100%;display:block" alt="Facebook" src="https://dim.mcusercontent.com/https/cdn-images.mailchimp.com%2Ficons%2Fsocial-block-v2%2Fcolor-facebook-48.png?w=40&amp;dpr=2"></a></td>
                                                                                                        <td style="padding-left:24px;padding-top:0;padding-right:24px" data-breakpoint="2" valign="top" class="mobileClass-2"><a href="https://twitter.com/cssaaei" style="display:block" target="_blank"><img width="40" style="border:0;width:40px;height:auto;max-width:100%;display:block" alt="Twitter" src="https://dim.mcusercontent.com/https/cdn-images.mailchimp.com%2Ficons%2Fsocial-block-v2%2Fcolor-twitter-48.png?w=40&amp;dpr=2"></a></td>
                                                                                                    </tr>
                                                                                                </tbody>
                                                                                                </table>
                                                                                            </td>
                                                                                        </tr>
                                                                                    </tbody>
                                                                                    </table>
                                                                                </td>
                                                                            </tr>
                                                                        </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td style="padding-top:24px" class="mceSpacing-24" id="mceColumnContainer" valign="top">
                                                            <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation" id="section_e96053107d849e9c3d2121cbe805d189">
                                                            <tbody>
                                                                <tr>
                                                                    <td style="background-color:#4d4d4d;background-position:center;background-repeat:no-repeat;background-size:cover;padding-top:0px;padding-bottom:0px;padding-left:12px;padding-right:12px" class="mceSection" valign="top">
                                                                        <table border="0" cellpadding="0" cellspacing="12" width="100%" style="table-layout:fixed" role="presentation">
                                                                        <colgroup>
                                                                            <col span="1">
                                                                            <col span="1">
                                                                            <col span="1">
                                                                            <col span="1">
                                                                            <col span="1">
                                                                            <col span="1">
                                                                            <col span="1">
                                                                            <col span="1">
                                                                            <col span="1">
                                                                            <col span="1">
                                                                            <col span="1">
                                                                            <col span="1">
                                                                        </colgroup>
                                                                        <tbody>
                                                                            <tr>
                                                                                <td style="background-position:center;background-repeat:no-repeat;background-size:cover" class="mceColumn" valign="top" colspan="12" width="100%">
                                                                                    <table border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation">
                                                                                    <tbody>
                                                                                        <tr>
                                                                                            <td class="mceSpacing-24" id="mceColumnContainer" align="center" valign="top">
                                                                                                <div class="mceText" style="font-size:12px;display:inline-block;width:100%">
                                                                                                <p style="font-family:Verdana, Geneva, Tahoma, sans-serif" class="last-child"><em><span style="color:#ffffff;">Copyright (C) 2021 uOttawa CSSA-AEI. All rights reserved.</span></em><span style="color:#ffffff;"><br><br></span><strong><span style="color:#ffffff;">Our mailing address is:</span></strong><span style="color:#ffffff;"><br>800 King Edward Ave, SITE 4076<br>Ottawa, ON K1N 6N5<br>Canada</span></p>
                                                                                                </div>
                                                                                            </td>
                                                                                        </tr>
                                                                                    </tbody>
                                                                                    </table>
                                                                                </td>
                                                                            </tr>
                                                                        </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                    </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                        </table>
                        <!--[if (gte mso 9)|(IE)]>
                    </td>
                </tr>
            </table>
            <![endif]-->
            </td>
        </body>
    </html>
  `;
}
