// Chronology Check
=IFS(
	COUNTA(A4:Q4)<17, "Warning: An incomplete set of headings detected.",
	Cases!C4<>"No case mismatches detected.", Cases!C4,
	Aliases!C4<>"No Aliases detected.",Aliases!C4,
	SUM(OFFSET($A3,2,0):OFFSET($A$614,-2,0)) <> ((MAX(OFFSET($A3,2,0):OFFSET($A$614,-2,0))^2+MAX(OFFSET($A3,2,0):OFFSET($A$614,-2,0)))/2), "A Tour Night # is incorrect.",
	REGEXEXTRACT(F4,"\d+")<REGEXEXTRACT(E4,"\d+"), "Warning: Total number of winners is less than the expected number of tournaments (indicated by tiers). See Step 7.",
	REGEXEXTRACT(F4,"\d+")>REGEXEXTRACT(E4,"\d+"), "Warning: Total number of winners is greater than the expected number of tournaments (indicated by tiers). See Step 6.",
	(COUNTBLANK(OFFSET($A$3,2,0):OFFSET($K$614,-2,0))+COUNTBLANK(OFFSET($N$3,2,0):OFFSET($N$614,-2,0))-166+COUNTBLANK(OFFSET($Q$3,2,0):OFFSET($Q$614,-2,0)))>0, "Warning: Missing cell content detected.",
	IFERROR(VALUE(REGEXEXTRACT('Host Standings'!D5,"\d+"))<>(COUNTA(OFFSET($A$3,2,0):OFFSET(A$614,-2,0))+COUNTBLANK(OFFSET($A$3,2,0):OFFSET($A$614,-2,0))),TRUE)+IFERROR(REGEXEXTRACT('Host Standings'!C5,"\d+")<>REGEXEXTRACT(D4,"\d+"),TRUE)+IFERROR(REGEXEXTRACT('Host Standings'!E5,"\d+")<>REGEXEXTRACT(F4,"\d+"),TRUE)+IF(""&COUNTA('Host Standings'!C6:C)<>IFERROR(REGEXEXTRACT('Host Standings'!C5,"\d+"),COUNTA('Host Standings'!C6:C)),1,0), "Warning: Host Standings disparity! Please attempt updating the standings.",
	IFERROR(REGEXEXTRACT('Tier Standings'!E4,"\d+")<>REGEXEXTRACT(E4,"\d+"),TRUE)+IF(""&COUNTA('Tier Standings'!B5:B)<>IFERROR(REGEXEXTRACT('Tier Standings'!B4,"\d+"),COUNTA('Tier Standings'!B5:B)),1,0), "Warning: Tier Standings disparity! Please attempt updating the standings.",
	IFERROR(REGEXEXTRACT('Winner Standings'!D5,"\d+")<>REGEXEXTRACT(F4,"\d+"),TRUE)+IF(""&COUNTA('Winner Standings'!C6:C)<>IFERROR(REGEXEXTRACT('Winner Standings'!C5,"\d+"),COUNTA('Winner Standings'!C6:C)),1,0), "Warning: Winner Standings disparity! Please attempt updating the standings.",
	IFERROR(REGEXEXTRACT(Cases!E5,"\d+")<>REGEXEXTRACT(G4,"\d+"),TRUE)+IF(""&COUNTA(Cases!E6:E)<>IFERROR(REGEXEXTRACT(Cases!E5,"\d+"),COUNTA(Cases!E5)),1,0), "Warning: Replay disparity detected. Check every replay begins with https://",
	ARRAYFORMULA(SUM(IFERROR(O5:O,1)))>0, "Warning: Probably a length disparity between Winners, Tiers and Replay Links arrays.",
	IFERROR(VALUE(REGEXEXTRACT(P4,"\d+"))+COUNTBLANK(OFFSET($P$3,2,0):OFFSET($P$614,-2,0)),(COUNTIF(OFFSET($C$3,2,0):OFFSET($C$614,-2,0),CEILING(MAX(OFFSET($C$3,2,0):OFFSET($C$614,-2,0))/3)*3)+COUNTIF(OFFSET($C$3,2,0):OFFSET($C$614,-2,0),(CEILING(MAX(OFFSET($C$3,2,0):OFFSET($C$614,-2,0))/3)*3)-1)+COUNTIF(OFFSET($C$3,2,0):OFFSET($C$614,-2,0),(CEILING(MAX(OFFSET($C$3,2,0):OFFSET($C$614,-2,0))/3)*3)-2)+((FLOOR((OFFSET($C$614,-2,0)-1)/3)*3)*7+18))) < (COUNTIF(OFFSET($C$3,2,0):OFFSET($C$614,-2,0),CEILING(MAX(OFFSET($C$3,2,0):OFFSET($C$614,-2,0))/3)*3)+COUNTIF(OFFSET($C$3,2,0):OFFSET($C$614,-2,0),(CEILING(MAX(OFFSET($C$3,2,0):OFFSET($C$614,-2,0))/3)*3)-1)+COUNTIF(OFFSET($C$3,2,0):OFFSET($C$614,-2,0),(CEILING(MAX(OFFSET($C$3,2,0):OFFSET($C$614,-2,0))/3)*3)-2)+((FLOOR((OFFSET($C$614,-2,0)-1)/3)*3)*7+18)), "Warning: A row entry appears to be missing!",
	COUNTBLANK(OFFSET($P$3,2,0):OFFSET($P$614,-2,0))>0, "Warning: Missing post URL detected. Post required on the forums. See Step 15.",
	""&COUNTA(OFFSET($C$3,2,0):OFFSET($C$614,-2,0))<>IFERROR(REGEXEXTRACT(P4,"\d+"),COUNTA(OFFSET($C$3,2,0):OFFSET($C$614,-2,0))), "Warning: Duplicate linked post",
	TRUE, "No chronology sheet errors detected."
)

// Cases Check

=IFS(
	SUMPRODUCT(TRANSPOSE(SPLIT(B5,"(=/)")),{0;0;1;0;-1})<>0,"Warning: Multiple forms of Host — "&JOIN(", ",UNIQUE(ARRAYFORMULA(IFERROR(VLOOKUP(PROPER(FILTER(OFFSET(B$4,2,0):OFFSET(B$2014,-2,0),ARRAYFORMULA(COUNTIF(OFFSET(B$4,2,0):OFFSET(B$2014,-2,0),OFFSET(B$4,2,0):OFFSET(B$2014,-2,0))>1))),OFFSET(B$4,2,0):OFFSET(B$2014,-2,0),1,0),0))))&" detected. Please check upper/lower cases of characters.",
	SUMPRODUCT(TRANSPOSE(SPLIT(C5,"(=/)")),{0;0;1;0;-1})<>0,"Warning: Multiple forms of Tier — "&JOIN(", ",UNIQUE(ARRAYFORMULA(IFERROR(VLOOKUP(PROPER(FILTER(OFFSET(C$4,2,0):OFFSET(C$2014,-2,0),ARRAYFORMULA(COUNTIF(OFFSET(C$4,2,0):OFFSET(C$2014,-2,0),OFFSET(C$4,2,0):OFFSET(C$2014,-2,0))>1))),OFFSET(C$4,2,0):OFFSET(C$2014,-2,0),1,0),0))))&" detected. Please check upper/lower cases of characters.",
	SUMPRODUCT(TRANSPOSE(SPLIT(D5,"(=/)")),{0;0;1;0;-1})<>0,"Warning: Multiple forms of Winner — "&JOIN(", ",UNIQUE(ARRAYFORMULA(IFERROR(VLOOKUP(PROPER(FILTER(OFFSET(D$4,2,0):OFFSET(D$2014,-2,0),ARRAYFORMULA(COUNTIF(OFFSET(D$4,2,0):OFFSET(D$2014,-2,0),OFFSET(D$4,2,0):OFFSET(D$2014,-2,0))>1))),OFFSET(D$4,2,0):OFFSET(D$2014,-2,0),1,0),0))))&" detected. Please check upper/lower cases of characters.",
	OR(COUNTIF(OFFSET(D$4,2,0):OFFSET(D$2014,-2,0),"*((*"),COUNTIF(OFFSET(D$4,2,0):OFFSET(D$2014,-2,0),"*))*")), "Warning: Double brackets not paired up. Please correct.",
	TRUE, "No case mismatches detected."
)

// Aliases Check

=IFS(
	SUMPRODUCT(TRANSPOSE(SPLIT(B5,"(=/)")),{0;0;1;0;-1})<>0, "Warning: A duplicate row in the aliases sheet is detected.",
	SUMPRODUCT(TRANSPOSE(SPLIT(C5,"(=/)")),{0;0;1;0;-1})<>0, "Warning: The same alias is listed in multiple rows in the alias sheet.",
	SUMPRODUCT(TRANSPOSE(SPLIT(D5,"(=/)")),{0;0;1;0;-1})<>0, "Warning: The same alias range is listed in multiple rows in the alias sheet.",
	SUBSTITUTE(JOIN(", ",SPLIT(ARRAYFORMULA(CONCATENATE(IF(COUNTIF(OFFSET(Cases!$D$4,2,0):OFFSET(Cases!$D$2014,-2,0),SPLIT(SUBSTITUTE(OFFSET($C$4,2,0):OFFSET($C$94,-2,0),", ",","),",")),OFFSET($B$4,2,0):OFFSET($B$94,-2,0)&",",","))),",")),",","")<>"","Warning: Alias(es) of Winner — "&JOIN(", ",SPLIT(ARRAYFORMULA(CONCATENATE(IF(COUNTIF(OFFSET(Cases!$D$4,2,0):OFFSET(Cases!$D$2014,-2,0),SPLIT(SUBSTITUTE(OFFSET($C$4,2,0):OFFSET($C$94,-2,0),", ",","),",")),OFFSET($B$4,2,0):OFFSET($B$94,-2,0)&",",","))),","))&" detected.",
	SUBSTITUTE(JOIN(", ",SPLIT(ARRAYFORMULA(CONCATENATE(IF(COUNTIF(OFFSET(Cases!$D$4,2,0):OFFSET(Cases!$D$2014,-2,0)<>0,SPLIT(SUBSTITUTE(SUBSTITUTE(IF(OFFSET($D$4,2,0):OFFSET($D$94,-2,0)<>"",OFFSET($D$4,2,0):OFFSET($D$94,-2,0)&"*","~~~"&ROW(OFFSET($D$4,2,0):OFFSET($D$94,-2,0))),", ",","),",","*,"),",")),OFFSET($B$4,2,0):OFFSET($B$94,-2,0)&",",","))),",")),",","")<>"","Warning: Detected possible aliases of Winner — "&JOIN(", ",SPLIT(ARRAYFORMULA(CONCATENATE(IF(COUNTIF(OFFSET(Cases!$D$4,2,0):OFFSET(Cases!$D$2014,-2,0),SPLIT(SUBSTITUTE(SUBSTITUTE(IF(OFFSET($D$4,2,0):OFFSET($D$94,-2,0)<>"",OFFSET($D$4,2,0):OFFSET($D$94,-2,0)&"*","~~~"&ROW(OFFSET($D$4,2,0):OFFSET($D$94,-2,0))),", ",","),",","*,"),",")),OFFSET($B$4,2,0):OFFSET($B$94,-2,0)&",",","))),","))&".",
	SUBSTITUTE(JOIN(", ",SPLIT(ARRAYFORMULA(CONCATENATE(IF(COUNTIF(OFFSET(Cases!$B$4,2,0):OFFSET(Cases!$B$2014,-2,0),SPLIT(SUBSTITUTE(OFFSET($C$4,2,0):OFFSET($C$94,-2,0),", ",","),",")),OFFSET($B$4,2,0):OFFSET($B$94,-2,0)&",",","))),",")),",","")<>"","Warning: Alias(es) of Host — "&JOIN(", ",SPLIT(ARRAYFORMULA(CONCATENATE(IF(COUNTIF(OFFSET(Cases!$B$4,2,0):OFFSET(Cases!$B$2014,-2,0),SPLIT(SUBSTITUTE(OFFSET($C$4,2,0):OFFSET($C$94,-2,0),", ",","),",")),OFFSET($B$4,2,0):OFFSET($B$94,-2,0)&",",","))),","))&" detected.",
	SUBSTITUTE(JOIN(", ",SPLIT(ARRAYFORMULA(CONCATENATE(IF(COUNTIF(OFFSET(Cases!$B$4,2,0):OFFSET(Cases!$B$2014,-2,0),SPLIT(SUBSTITUTE(SUBSTITUTE(IF(OFFSET($D$4,2,0):OFFSET($D$94,-2,0)<>"",OFFSET($D$4,2,0):OFFSET($D$94,-2,0)&"*","~~~"&ROW(OFFSET($D$4,2,0):OFFSET($D$94,-2,0))),", ",","),",","*,"),",")),OFFSET($B$4,2,0):OFFSET($B$94,-2,0)&",",","))),",")),",","")<>"","Warning: Detected possible aliases of Host — "&JOIN(", ",SPLIT(ARRAYFORMULA(CONCATENATE(IF(COUNTIF(OFFSET(Cases!$B$4,2,0):OFFSET(Cases!$B$2014,-2,0),SPLIT(SUBSTITUTE(SUBSTITUTE(IF(OFFSET($D$4,2,0):OFFSET($D$94,-2,0)<>"",OFFSET($D$4,2,0):OFFSET($D$94,-2,0)&"*","~~~"&ROW(OFFSET($D$4,2,0):OFFSET($D$94,-2,0))),", ",","),",","*,"),","))),OFFSET($B$4,2,0):OFFSET($B$94,-2,0)&",",",")),","))&".",
	TRUE,"No Aliases detected."
)
