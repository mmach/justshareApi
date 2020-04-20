  
<?xml version="1.0" encoding="UTF-8"?> 
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
   <xsl:template match="/">
      <xsl:variable name="url" select="/body/href" />
      <xsl:variable name="uid" select="/body/uid" />

<mj-wrapper background-color="#fff" padding="0px" full-width="full-width"> 
               <mj-section full-width="full-width" background-color="#fff" padding="0px">
                  <mj-column vertical-align="middle"  mj-class="brd" padding="3px">
                     <mj-image css-class=""  src="https://www.justshare.it/assets/mail_logo_desktop.jpg" padding-left="0px" padding-right="0px" padding-bottom="0px" padding-top="0px"></mj-image>
                  </mj-column>
               </mj-section>
               <mj-section background-color="#fff" full-width="full-width">
                  <mj-column width="100%" vertical-align="middle">
                     <mj-text align="center" color="#666" font-size="14px" padding-bottom="10px" font-family="Helvetica" >Witaj  <xsl:value-of select="body/name" /></mj-text>
                     <mj-text font-family="Helvetica"  align="center" color="#666" font-size="14px" padding-bottom="10px">
      Kliknij link aby aktywować konto</mj-text>
                     <mj-button css-class="hover" align="center" mj-class="bgcolor" color="#fff" border-radius="0px" href="{$url}/authorize/{$uid}" font-family="Ubuntu, Helvetica, Arial, sans-serif, Helvetica, Arial, sans-serif" padding-bottom="10px" padding-top="10px">AKTYWUJ</mj-button>
                  </mj-column>
               </mj-section>
            </mj-wrapper>
   </xsl:template>
</xsl:stylesheet>

