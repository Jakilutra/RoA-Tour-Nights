=IF(OR($N$3 = "No chronology sheet errors detected.",REGEXMATCH($N$3,"post"),OFFSET($S$3,ROW()-2,0) <> ""),
        SUBSTITUTE(
                "[CENTER][SIZE=6][IMG]"&M2027&"[/IMG][B][U]"
                        &IF(C2027="RBY","RBY Monday #"&D2027,"")
                        &IF(C2027="GSC","GSC Tuesday #"&D2027,"")
                        &IF(C2027="ADV","ADV Wednesday #"&D2027,"")
                        &IF(C2027="DPP","DPP Thursday #"&D2027,"")
                        &IF(C2027="BW","BW Friday #"&D2027,"")
                        &IF(C2027="ORAS","ORAS Saturday #"&D2027,"")
                        &IF(C2027="SM", "SM Saturday #"&D2027,"")
                        &IF(C2027="Spotlight", "Spotlight Sunday #"&D2027,"")
                        &IF(C2027="Season 1", "Old Gen Tour Night #"&D2027,"")
                &"[/U][/B][IMG]"&N2027&"[/IMG][/SIZE]"&CHAR(13)
                &CHAR(13)
                &"[SIZE=4][B]Finals Replays: [/B]"&IF(OR(H2027="",K2027=""),"",JOIN(" / ",ARRAYFORMULA("[URL="&QUERY(SPLIT(K2027,","), "SELECT *")&"]"&QUERY(SPLIT(H2027,","),"SELECT *")&"[/URL]"))&CHAR(13)
                &"[HIDE="&CHAR(34)&"Winners"&CHAR(34)&"]"
                        &IF(OR(H2027="",K2027=""),"",
                                JOIN(CHAR(13),ARRAYFORMULA(
                                        "[B]"&QUERY(SPLIT(H2027,","), "SELECT *")
                                        &"[COLOR='#9c967e'] ("&QUERY(SPLIT(J2027,","),"SELECT *")&")[/COLOR]:[/B][IMG]http://www.smogon.com/tiers/oldgen/tour_night_winner.png[/IMG] @"&QUERY(SUBSTITUTE(SUBSTITUTE(SPLIT(I2027,","), "((", "("),"))",")"),"SELECT *")
                                ))
                        )
                &"[/HIDE]"
                &IF(P2027<>"","[B][COLOR=#339ACC][U]Replay Issues[/U][/COLOR][/B] "&CHAR(13)
                        &P2027&CHAR(13),"")
                &IF(Q2027<>"",CHAR(13)&"[B][COLOR=#63B76C][U]Hosting Comments[/U][/COLOR][/B] "&CHAR(13)
                        &Q2027&CHAR(13),"")
                &IF(R2027<>"",CHAR(13)&"[B][COLOR=#CA3435][U]Next Week Tiers[/U][/COLOR][/B] "&CHAR(13)
                        &JOIN(" / ",ARRAYFORMULA(QUERY(SPLIT(R2027,","), "SELECT *"))),"")&"[/SIZE][/CENTER]")
        ,"@ ","@")
, "Not available yet.")
