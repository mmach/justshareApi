<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
    <xsl:template match="/">
        <xsl:variable name="color" select="/body/color" />
        <xsl:variable name="base_url" select="/body/base_url" />
        <xsl:variable name="mail_template_link" select="/body/mail_template_link" />
        <xsl:variable name="logo" select="/body/logo" />

          <mjml>
            <mj-head>
               <mj-attributes>
                <mj-text padding="0" />
                <mj-class name="brd" border="1px solid {color}" />
                <mj-class name="color" color=" #a10f2b" />
                <mj-class name="bgcolor" background-color=" {color}" />

                <mj-all font-family="Helvetica" />
              </mj-attributes>
                <mj-style>
        .divider
        {
            height:1px;
              background-image: -webkit-linear-gradient(left, #fff, <xsl:value-of select="color" />, #fff); 
              background-image: -moz-linear-gradient(left, #fff,  <xsl:value-of select="color" />, #fff);  
              background-image: -ms-linear-gradient(left, #fff, <xsl:value-of select="color" />, #fff);  
              background-image: -o-linear-gradient(left, #fff,  <xsl:value-of select="color" />, #fff); 
            }
        .mj-link:hover { color: #ddd !important; }    
              
        </mj-style>
            </mj-head>
            <mj-body background-color="#eee">
                <mj-section padding="0px" full-width="full-width" background-color="{color}">
                    <mj-column padding="0px"></mj-column>
                    <mj-column padding="0px">
                        <mj-navbar base-url="{$base_url}" hamburger="hamburger" padding-top="5px" ico-color="#fff">
                            <mj-navbar-link padding="0px" padding-top="5px" padding-bottom="5px" padding-right="10px" padding-left="10px" href="/" color="#fff">#TRAN_MAIL_HOME_LINK_LABEL#</mj-navbar-link>
                            <mj-navbar-link padding="0px" padding-top="5px" padding-bottom="5px" padding-right="10px" padding-left="10px" href="/search" color="#fff">#TRAN_MAIL_SEARCH_LINK_LABEL#</mj-navbar-link>
                            <mj-navbar-link padding="0px" padding-top="5px" padding-bottom="5px" padding-right="10px" padding-left="10px" href="/" color="#fff">#TRAN_MAIL_ABOUT_LINK_LABEL#</mj-navbar-link>
                        </mj-navbar>
                    </mj-column>
                </mj-section>
			<mj-wrapper padding="0px" >

                <mj-section padding="0px" padding-top="10px" background-color="#fff" full-width="full-width">
                    <mj-column>
                        <mj-image src="{logo}" alt="OnePage" width="80px" padding-bottom="0px" padding-top="10px"></mj-image>
                    </mj-column>
                </mj-section>
                <mj-section padding="0px" background-color="#fff" full-width="full-width"></mj-section>
                <mj-section full-width="full-width" background-color="#fff">
                    <mj-column css-class="divider"></mj-column>
                </mj-section>
               #body#
                <mj-section full-width="full-width" background-color="#fff">
                    <mj-column css-class="divider"></mj-column>
                </mj-section>
                <mj-section full-width="full-width" background-color="#fff">
                    <mj-column>
                        <mj-social font-size="15px" icon-size="30px" mode="horizontal">
                            <mj-social-element name="facebook" href="https://facebook.com/justshare.it"></mj-social-element>
                            <mj-social-element name="twitter" href="https://twitter.com/justshare.it"></mj-social-element>
                        </mj-social>
                    </mj-column>
                </mj-section>
				</mj-wrapper>
                <mj-section padding="0px" full-width="full-width" background-color="{color}">
                    <mj-column></mj-column>
                    <mj-column></mj-column>
                   
                    <mj-column>
                        <mj-navbar base-url="https://www.apptruth.pl" hamburger="" padding-top="5px" ico-color="#fff">
                            <mj-navbar-link padding="0px" padding-top="5px" padding-bottom="5px" href="/" color="#ccc">
                                <span>powered by</span>
                                <span id="apptruth" style="color:rgb(229,146,40)"> Apptruth </span>
                            </mj-navbar-link>
                        </mj-navbar>
                    </mj-column>
                </mj-section>
            </mj-body>
        </mjml>
    </xsl:template>
</xsl:stylesheet>