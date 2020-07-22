<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
  <xsl:template match="/">
    <xsl:variable name="url" select="/body/href"/>
    <xsl:variable name="uid" select="/body/uid"/>
    <mj-wrapper background-color="#fff" padding="0px" full-width="full-width">
 
      <mj-section background-color="#fff" full-width="full-width">
        <mj-column width="100%" vertical-align="middle">
          <mj-text align="center" color="#666" font-size="14px" padding-bottom="10px" font-family="Helvetica">Wiadomość od użytkownika <xsl:value-of select="user_name"/></mj-text>
       
       <mj-section border="3px solid #334355" margin-bottom="0px" background-color="#FFF"  >
          <mj-text align="center" color="#666" font-size="14px" padding-bottom="10px" font-family="Helvetica">
            <xsl:value-of select="to_user_msg"/>
          </mj-text>
          </mj-section>
          <mj-section background-color="#334355"  margin-top="0px" padding-bottom="15px">
            <mj-column width="33%">
              <mj-text align="center" color="#FFF" font-size="15px" font-family="Ubuntu, Helvetica, Arial, sans-serif" padding-left="25px" padding-right="25px" padding-bottom="0px">
                <strong>START</strong>
              </mj-text>
              <mj-text align="center" color="#FFF" font-size="13px" font-family="Helvetica" padding-left="25px" padding-right="25px" padding-bottom="20px" padding-top="10px"><xsl:value-of select="start_date"/></mj-text>
            </mj-column  width="33%">
            <mj-column>
              <mj-text align="center" color="#FFF" font-size="15px" font-family="Ubuntu, Helvetica, Arial, sans-serif" padding-left="25px" padding-right="25px" padding-bottom="0px">
                <strong>KONIEC</strong>
              </mj-text>
              <mj-text align="center" color="#FFF" font-size="13px" font-family="Helvetica" padding-left="25px" padding-right="25px" padding-bottom="20px" padding-top="10px"> <xsl:value-of select="end_date"/>
</mj-text>
            </mj-column>
            <mj-column  width="33%">
              <mj-text align="center" color="#FFF" font-size="15px" font-family="Ubuntu, Helvetica, Arial, sans-serif" padding-left="25px" padding-right="25px" padding-bottom="0px">
                <strong>CENA</strong>
              </mj-text>
              <mj-text align="center" color="#FFF" font-size="13px" font-family="Helvetica" padding-left="25px" padding-right="25px" padding-bottom="20px" padding-top="10px"> <xsl:value-of select="price"/>  <xsl:value-of select="currency"/></mj-text>
            </mj-column>
          </mj-section>
          
             <mj-section full-width="full-width" background-color="#fff" padding="0px">
              <mj-carousel>
     
         <xsl:for-each select="img/">
   
              <mj-carousel-image css-class="" src="{./}" padding-left="0px" padding-right="0px" padding-bottom="0px" padding-top="0px"/>
       
    </xsl:for-each>
             </mj-carousel>
      
         </mj-section>
        </mj-column>
      </mj-section>
    </mj-wrapper>
  </xsl:template>
</xsl:stylesheet>