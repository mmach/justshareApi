<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
   <xsl:template match="/">
    <xsl:variable name="url" select="/body/href" />
   
   <xsl:variable name="uid" select="/body/uid" />
      <html>
         <body style="background-color:#9E0B0F">
            <center>
               <table style="margin:2%;font-family: Calibri,Candara,Segoe,Segoe UI,Optima,Arial,sans-serif;  ">
                  <tr>
                     <td height="30px">
                        <br />
                     </td>
                  </tr>
                  <tr>
                     <td width="3%" bgcolor="#9E0B0F" />
                     <td width="94%" bgcolor="#FFFFFF" style="padding:5%">
                        <div>
                           <hr style="border: 0;height: 1px;background-image: -webkit-linear-gradient(left, #f0f0f0, #8c8b8b, #f0f0f0);   background-image: -moz-linear-gradient(left, #f0f0f0, #8c8b8b, #f0f0f0);   background-image: -ms-linear-gradient(left, #f0f0f0, #8c8b8b, #f0f0f0);   background-image: -o-linear-gradient(left, #f0f0f0, #8c8b8b, #f0f0f0); " />
                           <br />
                           <center>
                              <a href="{$url}">
							     <img style="width:15%" src="https://www.justshare.it/assets/android-chrome-384x384.png" />
                             
                              </a>
                              <br />
                              <br />
                           </center>
                           <hr style="border: 0;height: 1px;background-image: -webkit-linear-gradient(left, #f0f0f0, #8c8b8b, #f0f0f0);   background-image: -moz-linear-gradient(left, #f0f0f0, #8c8b8b, #f0f0f0);   background-image: -ms-linear-gradient(left, #f0f0f0, #8c8b8b, #f0f0f0);   background-image: -o-linear-gradient(left, #f0f0f0, #8c8b8b, #f0f0f0); " />
                           <div style="text-align:left;padding-top:1px;padding-bottom:5px;padding-left:5px;padding-right:5px;">
                              <p style="font-size:14px">
                                 Hi
                                 <xsl:value-of select="body/name" />
                              </p>
                              <p style="font-size:12px">Thank you for registration. I hope you will love this application :). This mail is for authenticate, if your email is truely. </p>
                              <p>To complete of registration please click on link below:</p>
                              <center><strong><br/><a href="{$url}/authorize/{$uid}" style="font-size:16px; background-color:#9E0B0F;color:white;padding-top:2px;padding-bottom:2px;padding-left:10px;padding-right:10px;border-radius:2px;text-decoration: none;font-weight:100">
                                 MAIL AUTHORIZATION
                              </a></strong></center>
                              <br />
                              <p style="text-align:left">If you will have some problem with sign in please send mail to our support.
						I wish you to use this application with peace and happines :).</p>
                              <p style="text-align:left">
                                 Regards,
                                 <br />
                                 <strong>StuffShare Team</strong>
                              </p>
                           </div>
                        </div>
                     </td>
                     <td width="3%" bgcolor="#9E0B0F" />
                  </tr>
                  <tr>
                     <td height="50px" />
                  </tr>
               </table>
            </center>
         </body>
      </html>
   </xsl:template>
</xsl:stylesheet>