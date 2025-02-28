TODO                                      

WEBSITE{
    RESPONSIVENESS(NO)                                                              .ják
    szövegek                                                                        .madrász
}
SERVER{
    ADDS{
        template user                                                               .pipa
        12-15 felhasználó                                                           .pipa
        3-5 csoport                                                                 .pipa
        2-10 OU                                                                     .pipa
        Minden gép (kliens) regisztrálása az AD-ben                                 .pipa?FERDI
        4-10 GPO implementálása                                                     .pipa
        Felhasználók idejének korlátozása                                           .pipa
        jogosultságuk korlátozása a céges policy szerint (maguk határozzák meg)     .FERDI
        Home könyvtár                                                               .pipa?FERDI
        felcsatolt meghajtók létrehozása                                            .FERDIIIIIIIIIIIII
    }
    DNS                                                                             .pipa?
    DHCP                                                                            .FERDI
    FTP/TFTP                                                                        .FERDI
}
TESTING{
    WEBSITE                                                                         .ferdi
    irl hálózat/w SERVER                                                            .mindenki
    csidejó                                                                         .mindenki
}


DOKSI{
    hálózat(minden)                                                                 .ferdi/madrász
    WEBSITE{
        front                                                                       .madrász/jék
        back                                                                        .madrász
        SQL                                                                         .dzshjéjk
    }
    szerver
    minden más                                                                      .madrász
}

-----------------------------------------------------------------------------------------------------------------------------------------------

dokumentáció{
    bevezető{
        csapatról{
            csapattagok-feladatok
            feladatmenet
        }
        elvárások(összes)
    }
    hálózat{
        a készítőről
        elvárások
        ip táblázat
        jelszavak
        használt eszközök
        szerver{
            a készítőről
            DHCP
            ADDS
            FTP
            DNS
        }
        tesztelés(pinggel)
        melléklet{
            /*eszközök konfigurációi*/
        }
    }
    weboldal{
        elvárások
        dependenciák
        használt stack
        setup
        github
        frontend{
            a készítőről
            űrlapok
            funkcionalitások
            navigációs eszközök
            oldalak/szekciók
            kód{
                projekt felépülése
                működés
            }
            tesztelés
            hibák
        }
        backend{
            a készítőről
            adatbázis{
                er-model
                mysql
            }
            route-ok
            kontrollerek{
                alapból a kontrollerekről
                függvények felépítése
            }
            modellek
            tesztelés
            hibák
        }
        konklúzió
    }
    meeting-ek{
        /*meetingek ide*/
    }
}
