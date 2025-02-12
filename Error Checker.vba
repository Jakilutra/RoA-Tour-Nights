// Chronology Check

=IFS(
        COUNTA(A4:U4)<21, "Warning: An incomplete set of headings detected.",
        Cases!$C$4<>"No case mismatches detected.", Cases!C4, 
        Aliases!$C$4<>"No Aliases detected.", Aliases!C4,
        SUM(OFFSET($A3,2,0):OFFSET($A$1999,-2,0)) <> ((MAX(OFFSET($A3,2,0):OFFSET($A$1999,-2,0))^2+MAX(OFFSET($A3,2,0):OFFSET($A$1999,-2,0)))/2), "A Tour Night # is incorrect.",
        REGEXEXTRACT(I4,"\d+")<REGEXEXTRACT(H4,"\d+"), "Warning: Total number of winners is less than the expected number of tournaments (indicated by tiers). See Step 11.",
        REGEXEXTRACT(I4,"\d+")>REGEXEXTRACT(H4,"\d+"), "Warning: Total number of winners is greater than the expected number of tournaments (indicated by tiers). See Step 10.",
        (COUNTBLANK(OFFSET($A$3,2,0):OFFSET($O$1999,-2,0))+COUNTBLANK(OFFSET($R$3,2,0):OFFSET($R$1999,-2,0))-166+COUNTBLANK(OFFSET($U$3,2,0):OFFSET($U$1999,-2,0)))>0, "Warning: Missing cell content detected.",
        IFERROR(VALUE(REGEXEXTRACT('Host Standings'!E5,"\d+"))<>(COUNTA(OFFSET($A$3,2,0):OFFSET(A$1999,-2,0))+COUNTBLANK(OFFSET($A$3,2,0):OFFSET($A$1999,-2,0))),TRUE)+IFERROR(REGEXEXTRACT('Host Standings'!C5,"\d+")<>REGEXEXTRACT(F4,"\d+"),TRUE)+IFERROR(REGEXEXTRACT('Host Standings'!G5,"\d+")<>REGEXEXTRACT(I4,"\d+"),TRUE)+IF(""&COUNTA('Host Standings'!C6:C)<>IFERROR(REGEXEXTRACT('Host Standings'!C5,"\d+"),COUNTA('Host Standings'!C6:C)),1,0), "Warning: Host Standings disparity! Please attempt updating the standings.",
        IFERROR(REGEXEXTRACT('Tier Standings'!E4,"\d+")<>REGEXEXTRACT(H4,"\d+"),TRUE)+IF(""&COUNTA('Tier Standings'!B5:B)<>IFERROR(REGEXEXTRACT('Tier Standings'!B4,"\d+"),COUNTA('Tier Standings'!B5:B)),1,0), "Warning: Tier Standings disparity! Please attempt updating the standings.",
        IFERROR(REGEXEXTRACT('Winner Standings'!F5,"\d+")<>REGEXEXTRACT(I4,"\d+"),TRUE)+IF(""&COUNTA('Winner Standings'!C6:C)<>IFERROR(REGEXEXTRACT('Winner Standings'!C5,"\d+"),COUNTA('Winner Standings'!C6:C)),1,0), "Warning: Winner Standings disparity! Please attempt updating the standings.",
        IFERROR(REGEXEXTRACT(Cases!E5,"\d+")<>REGEXEXTRACT(K4,"\d+"),TRUE)+IF(""&(COUNTIF(Cases!E6:E,"?*")+SUMPRODUCT(COUNTIFS(Cases!E6:E,{"*_*","*_*_*"})))<>IFERROR(REGEXEXTRACT(Cases!E5,"\d+"),COUNTIF(Cases!E6:E,"?*")+SUMPRODUCT(COUNTIFS(Cases!E6:E,{"*_*","*_*_*"}))),1,0), "Warning: Replay disparity detected. Check every replay begins with https://",
        OR(COUNTA(Cases!E6:E) <> COUNTA(Cases!G6:G), COUNTA(Cases!E6:E) <> COUNTA(Cases!H6:H),COUNTA(Cases!E6:E) <> (COUNTA(Cases!I6:I)+3844)), "Warning: Probably a length disparity between Winners, Tiers, Sizes and Replay Links arrays.",
         IFERROR(VALUE(REGEXEXTRACT(T4,"\d+"))+COUNTBLANK(OFFSET($T$3,2,0):OFFSET($T$1999,-2,0)),(COUNTIF(OFFSET($D$3,2,0):OFFSET($D$1999,-2,0),CEILING(MAX(OFFSET($D$3,2,0):OFFSET($D$1999,-2,0))/3)*3)+COUNTIF(OFFSET($D$3,2,0):OFFSET($D$1999,-2,0),(CEILING(MAX(OFFSET($D$3,2,0):OFFSET($D$1999,-2,0))/3)*3)-1)+COUNTIF(OFFSET($D$3,2,0):OFFSET($D$1999,-2,0),(CEILING(MAX(OFFSET($D$3,2,0):OFFSET($D$1999,-2,0))/3)*3)-2)+((FLOOR((OFFSET($D$1999,-2,0)-1)/3)*3)*7+18))) < (COUNTIF(OFFSET($D$3,2,0):OFFSET($D$1999,-2,0),CEILING(MAX(OFFSET($D$3,2,0):OFFSET($D$1999,-2,0))/3)*3)+COUNTIF(OFFSET($D$3,2,0):OFFSET($D$1999,-2,0),(CEILING(MAX(OFFSET($D$3,2,0):OFFSET($D$1999,-2,0))/3)*3)-1)+COUNTIF(OFFSET($D$3,2,0):OFFSET($D$1999,-2,0),(CEILING(MAX(OFFSET($D$3,2,0):OFFSET($D$1999,-2,0))/3)*3)-2)+((FLOOR((OFFSET($D$1999,-2,0)-1)/3)*3)*7+18)), "Warning: A row entry appears to be missing!",
        COUNTBLANK(OFFSET($T$3,2,0):OFFSET($T$1999,-2,0))>0, "Warning: Missing post URL detected. Post required on the forums. See Step 22.",
        ""&COUNTA(OFFSET($D$3,2,0):OFFSET($D$1999,-2,0))<>IFERROR(REGEXEXTRACT(T4,"\d+"),COUNTA(OFFSET($D$3,2,0):OFFSET($D$1999,-2,0))), "Warning: Duplicate linked post",
        SUMPRODUCT(REGEXMATCH(OFFSET($T$3,20,0):OFFSET($T$1999,-2,0),"https:\/\/www\.smogon\.com\/forums\/threads\/roa-tour-nights\.3615570\/post-\d+"))<(REGEXEXTRACT(T4,"\d+")-18), "Warning: Wrong Post URL format detected. You may need to remove `page-X#` from your URL.",
        TRUE, "No chronology sheet errors detected."
)

// Cases Check

=IFS(
	SUMPRODUCT(TRANSPOSE(SPLIT(B5,"(=/)")),{0;0;1;0;-1})<>0,"Warning: Multiple forms of Host — "&JOIN(", ",UNIQUE(ARRAYFORMULA(IFERROR(VLOOKUP(PROPER(FILTER(OFFSET(B$4,2,0):OFFSET(B$7105,-2,0),ARRAYFORMULA(COUNTIF(OFFSET(B$4,2,0):OFFSET(B$7105,-2,0),OFFSET(B$4,2,0):OFFSET(B$7105,-2,0))>1))),OFFSET(B$4,2,0):OFFSET(B$7105,-2,0),1,0),0))))&" detected. Please check upper/lower cases of characters.",
	SUMPRODUCT(TRANSPOSE(SPLIT(C5,"(=/)")),{0;0;1;0;-1})<>0,"Warning: Multiple forms of Tier — "&JOIN(", ",UNIQUE(ARRAYFORMULA(IFERROR(VLOOKUP(PROPER(FILTER(OFFSET(C$4,2,0):OFFSET(C$7105,-2,0),ARRAYFORMULA(COUNTIF(OFFSET(C$4,2,0):OFFSET(C$7105,-2,0),OFFSET(C$4,2,0):OFFSET(C$7105,-2,0))>1))),OFFSET(C$4,2,0):OFFSET(C$7105,-2,0),1,0),0))))&" detected. Please check upper/lower cases of characters.",
	SUMPRODUCT(TRANSPOSE(SPLIT(D5,"(=/)")),{0;0;1;0;-1})<>0,"Warning: Multiple forms of Winner — "&JOIN(", ",UNIQUE(ARRAYFORMULA(IFERROR(VLOOKUP(PROPER(FILTER(OFFSET(D$4,2,0):OFFSET(D$7105,-2,0),ARRAYFORMULA(COUNTIF(OFFSET(D$4,2,0):OFFSET(D$7105,-2,0),OFFSET(D$4,2,0):OFFSET(D$7105,-2,0))>1))),OFFSET(D$4,2,0):OFFSET(D$7105,-2,0),1,0),0))))&" detected. Please check upper/lower cases of characters.",
	OR(COUNTIF(OFFSET(D$4,2,0):OFFSET(D$7105,-2,0),"*((*"),COUNTIF(OFFSET(D$4,2,0):OFFSET(D$7105,-2,0),"*))*")), "Warning: Double brackets not paired up. Please correct.",
	TRUE, "No case mismatches detected."
)

// Aliases Check

=IFS(
	SUMPRODUCT(TRANSPOSE(SPLIT(B5,"(=/)")),{0;0;1;0;-1})<>0, "Warning: A duplicate row in the aliases sheet is detected.",
	SUMPRODUCT(TRANSPOSE(SPLIT(C5,"(=/)")),{0;0;1;0;-1})<>0, "Warning: The same alias is listed in multiple rows in the alias sheet.",
	SUMPRODUCT(TRANSPOSE(SPLIT(D5,"(=/)")),{0;0;1;0;-1})<>0, "Warning: The same alias range is listed in multiple rows in the alias sheet.",
	SUBSTITUTE(JOIN(", ",SPLIT(ARRAYFORMULA(CONCATENATE(IF(COUNTIF(OFFSET(Cases!$D$4,2,0):OFFSET(Cases!$D$7105,-2,0),SPLIT(SUBSTITUTE(OFFSET($C$4,2,0):OFFSET($C$182,-2,0),", ",","),",")),OFFSET($B$4,2,0):OFFSET($B$182,-2,0)&",",","))),",")),",","")<>"","Warning: Alias(es) of Winner — "&JOIN(", ",SPLIT(ARRAYFORMULA(CONCATENATE(IF(COUNTIF(OFFSET(Cases!$D$4,2,0):OFFSET(Cases!$D$7105,-2,0),SPLIT(SUBSTITUTE(OFFSET($C$4,2,0):OFFSET($C$182,-2,0),", ",","),",")),OFFSET($B$4,2,0):OFFSET($B$182,-2,0)&",",","))),","))&" detected.",
	SUBSTITUTE(JOIN(", ",SPLIT(ARRAYFORMULA(CONCATENATE(IF(COUNTIF(OFFSET(Cases!$D$4,2,0):OFFSET(Cases!$D$7105,-2,0)<>0,SPLIT(SUBSTITUTE(SUBSTITUTE(IF(OFFSET($D$4,2,0):OFFSET($D$182,-2,0)<>"",OFFSET($D$4,2,0):OFFSET($D$182,-2,0)&"*","~~~"&ROW(OFFSET($D$4,2,0):OFFSET($D$182,-2,0))),", ",","),",","*,"),",")),OFFSET($B$4,2,0):OFFSET($B$182,-2,0)&",",","))),",")),",","")<>"","Warning: Detected possible aliases of Winner — "&JOIN(", ",SPLIT(ARRAYFORMULA(CONCATENATE(IF(COUNTIF(OFFSET(Cases!$D$4,2,0):OFFSET(Cases!$D$7105,-2,0),SPLIT(SUBSTITUTE(SUBSTITUTE(IF(OFFSET($D$4,2,0):OFFSET($D$182,-2,0)<>"",OFFSET($D$4,2,0):OFFSET($D$182,-2,0)&"*","~~~"&ROW(OFFSET($D$4,2,0):OFFSET($D$182,-2,0))),", ",","),",","*,"),",")),OFFSET($B$4,2,0):OFFSET($B$182,-2,0)&",",","))),","))&".",
	SUBSTITUTE(JOIN(", ",SPLIT(ARRAYFORMULA(CONCATENATE(IF(COUNTIF(OFFSET(Cases!$B$4,2,0):OFFSET(Cases!$B$7105,-2,0),SPLIT(SUBSTITUTE(OFFSET($C$4,2,0):OFFSET($C$182,-2,0),", ",","),",")),OFFSET($B$4,2,0):OFFSET($B$182,-2,0)&",",","))),",")),",","")<>"","Warning: Alias(es) of Host — "&JOIN(", ",SPLIT(ARRAYFORMULA(CONCATENATE(IF(COUNTIF(OFFSET(Cases!$B$4,2,0):OFFSET(Cases!$B$7105,-2,0),SPLIT(SUBSTITUTE(OFFSET($C$4,2,0):OFFSET($C$182,-2,0),", ",","),",")),OFFSET($B$4,2,0):OFFSET($B$182,-2,0)&",",","))),","))&" detected.",
	SUBSTITUTE(JOIN(", ",SPLIT(ARRAYFORMULA(CONCATENATE(IF(COUNTIF(OFFSET(Cases!$B$4,2,0):OFFSET(Cases!$B$7105,-2,0),SPLIT(SUBSTITUTE(SUBSTITUTE(IF(OFFSET($D$4,2,0):OFFSET($D$182,-2,0)<>"",OFFSET($D$4,2,0):OFFSET($D$182,-2,0)&"*","~~~"&ROW(OFFSET($D$4,2,0):OFFSET($D$182,-2,0))),", ",","),",","*,"),",")),OFFSET($B$4,2,0):OFFSET($B$182,-2,0)&",",","))),",")),",","")<>"","Warning: Detected possible aliases of Host — "&JOIN(", ",SPLIT(ARRAYFORMULA(CONCATENATE(IF(COUNTIF(OFFSET(Cases!$B$4,2,0):OFFSET(Cases!$B$7105,-2,0),SPLIT(SUBSTITUTE(SUBSTITUTE(IF(OFFSET($D$4,2,0):OFFSET($D$182,-2,0)<>"",OFFSET($D$4,2,0):OFFSET($D$182,-2,0)&"*","~~~"&ROW(OFFSET($D$4,2,0):OFFSET($D$182,-2,0))),", ",","),",","*,"),","))),OFFSET($B$4,2,0):OFFSET($B$182,-2,0)&",",",")),","))&".",
	 TRUE,"No Aliases detected."
)
