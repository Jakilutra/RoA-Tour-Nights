=IF(OR($N$3 = "No chronology sheet errors detected.",REGEXMATCH($N$3,"post"),S1998 <> ""),
	SUBSTITUTE(
		"[CENTER][SIZE=6][IMG]"&M1997&"[/IMG][B][U]"
			&IF(C1997="RBY","RBY Monday #"&D1997,"")
			&IF(C1997="GSC","GSC Tuesday #"&D1997,"")
			&IF(C1997="ADV","ADV Wednesday #"&D1997,"")
			&IF(C1997="DPP","DPP Thursday #"&D1997,"")
			&IF(C1997="BW","BW Friday #"&D1997,"")
			&IF(C1997="ORAS","ORAS Saturday #"&D1997,"")
			&IF(C1997="SM", "SM Saturday #"&D1997,"")
			&IF(C1997="Spotlight", "Spotlight Sunday #"&D1997,"")
			&IF(C1997="Season 1", "Old Gen Tour Night #"&D1997,"")
		&"[/U][/B][IMG]"&N1997&"[/IMG][/SIZE]"&CHAR(13)
		&CHAR(13)
		&"[SIZE=4][B]Finals Replays: [/B]"&IF(OR(H1997="",K1997=""),"",JOIN(" / ",ARRAYFORMULA("[URL="&QUERY(SPLIT(K1997,","), "SELECT *")&"]"&QUERY(SPLIT(H1997,","),"SELECT *")&"[/URL]"))&CHAR(13)
		&"[HIDE="&CHAR(34)&"Winners"&CHAR(34)&"]"
			&IF(OR(H1997="",K1997=""),"",
				JOIN(CHAR(13),ARRAYFORMULA(
					"[B]"&QUERY(SPLIT(H1997,","), "SELECT *")
					&"[COLOR='#9c967e'] ("&QUERY(SPLIT(J1997,","),"SELECT *")&")[/COLOR]:[/B][IMG]http://www.smogon.com/tiers/oldgen/tour_night_winner.png[/IMG] @"&QUERY(SUBSTITUTE(SUBSTITUTE(SPLIT(I1997,","), "((", "("),"))",")"),"SELECT *")
				))
			)
		&"[/HIDE]"
		&IF(P1997<>"","[B][COLOR=#339ACC][U]Replay Issues[/U][/COLOR][/B] "&CHAR(13)
			&P1997&CHAR(13),"")
		&IF(Q1997<>"",CHAR(13)&"[B][COLOR=#63B76C][U]Hosting Comments[/U][/COLOR][/B] "&CHAR(13)
			&Q1997&CHAR(13),"")
		&IF(R1997<>"",CHAR(13)&"[B][COLOR=#CA3435][U]Next Week Tiers[/U][/COLOR][/B] "&CHAR(13)
			&JOIN(" / ",ARRAYFORMULA(QUERY(SPLIT(R1997,","), "SELECT *"))),"")&"[/SIZE][/CENTER]")
	,"@ ","@")
, "Not available yet.")
