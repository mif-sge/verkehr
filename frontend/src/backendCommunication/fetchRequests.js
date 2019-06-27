//import { SHORTBUSSTOPS, BUSSTOPS, HOSPITALS, MALLS, SHORTBUSLINES, BUSLINES, ROUTE } from "./urls";

export async function fetchBusstops(requestMode) {
    /*const URL = requestMode === "short" ? SHORTBUSSTOPS : BUSSTOPS;
    const answer = await fetch(URL, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });
    //return await answer.json();*/
    return [
        {
            "id": 1,
            "name": "Parkhotel",
            "lat": 52.3040848,
            "lon": 8.9159483
        },
        {
            "id": 2,
            "name": "Lichtenbergstraße",
            "lat": 52.28867,
            "lon": 8.897962
        },
        {
            "id": 3,
            "name": "Gertrudstraße",
            "lat": 52.285966,
            "lon": 8.8976136
        },
        {
            "id": 4,
            "name": "Gertrudstraße",
            "lat": 52.2860843,
            "lon": 8.8974831
        },
        {
            "id": 5,
            "name": "Ringstraße/Königstraße",
            "lat": 52.2879623,
            "lon": 8.9025578
        },
        {
            "id": 6,
            "name": "Ringstraße/Königstraße",
            "lat": 52.2881181,
            "lon": 8.9021904
        },
        {
            "id": 7,
            "name": "Königswall",
            "lat": 52.2873156,
            "lon": 8.9079099
        },
        {
            "id": 8,
            "name": "Wilhelmstraße/Oberstadt",
            "lat": 52.2980487,
            "lon": 8.9115853
        },
        {
            "id": 9,
            "name": "Steinstraße",
            "lat": 52.2962903,
            "lon": 8.9123538
        },
        {
            "id": 10,
            "name": "Bildungszentrum",
            "lat": 52.286341,
            "lon": 8.9086159
        },
        {
            "id": 11,
            "name": "Königswall / Aula",
            "lat": 52.2880588,
            "lon": 8.9106874
        },
        {
            "id": 12,
            "name": "Königswall / Aula",
            "lat": 52.2880387,
            "lon": 8.9106601
        },
        {
            "id": 13,
            "name": "Kanzlers Weide",
            "lat": 52.2877592,
            "lon": 8.9264768
        },
        {
            "id": 14,
            "name": "Hafenstraße",
            "lat": 52.2900617,
            "lon": 8.9301318
        },
        {
            "id": 15,
            "name": "Kaiserstraße",
            "lat": 52.2893201,
            "lon": 8.9273886
        },
        {
            "id": 16,
            "name": "Friedrich-Wilhelm-Str./Bahnhof",
            "lat": 52.2892983,
            "lon": 8.9320435
        },
        {
            "id": 17,
            "name": "Kaiserstraße",
            "lat": 52.289475,
            "lon": 8.9274205
        },
        {
            "id": 18,
            "name": "Grimpenwall",
            "lat": 52.2922169,
            "lon": 8.9187173
        },
        {
            "id": 19,
            "name": "Grimpenwall",
            "lat": 52.2918234,
            "lon": 8.9210917
        },
        {
            "id": 20,
            "name": "Domschule",
            "lat": 52.2933709,
            "lon": 8.9147603
        },
        {
            "id": 21,
            "name": "Hermannstraße",
            "lat": 52.2939446,
            "lon": 8.9235053
        },
        {
            "id": 22,
            "name": "Dorotheenstraße",
            "lat": 52.2956905,
            "lon": 8.9235865
        },
        {
            "id": 23,
            "name": "Marienstraße",
            "lat": 52.2930297,
            "lon": 8.915825
        },
        {
            "id": 24,
            "name": "Werftstraße",
            "lat": 52.297764,
            "lon": 8.9248527
        },
        {
            "id": 25,
            "name": "Agentur für Arbeit",
            "lat": 52.2918075,
            "lon": 8.9223509
        },
        {
            "id": 26,
            "name": "Omnibusbetriebshof",
            "lat": 52.3004392,
            "lon": 8.9259639
        },
        {
            "id": 27,
            "name": "Minden ZOB",
            "lat": 52.2868361,
            "lon": 8.9172131
        },
        {
            "id": 28,
            "name": "Minden ZOB",
            "lat": 52.2865595,
            "lon": 8.9174432
        },
        {
            "id": 29,
            "name": "Minden ZOB",
            "lat": 52.2865981,
            "lon": 8.9171944
        },
        {
            "id": 30,
            "name": "Minden ZOB",
            "lat": 52.2870979,
            "lon": 8.917544
        },
        {
            "id": 31,
            "name": "Minden ZOB",
            "lat": 52.2864378,
            "lon": 8.9168083
        },
        {
            "id": 32,
            "name": "Minden ZOB",
            "lat": 52.2868258,
            "lon": 8.9174721
        },
        {
            "id": 33,
            "name": "Minden ZOB",
            "lat": 52.2869711,
            "lon": 8.9179278
        },
        {
            "id": 34,
            "name": "Minden ZOB",
            "lat": 52.2869575,
            "lon": 8.9180499
        },
        {
            "id": 35,
            "name": "Minden ZOB",
            "lat": 52.2871281,
            "lon": 8.9177682
        },
        {
            "id": 36,
            "name": "Agentur für Arbeit",
            "lat": 52.2919307,
            "lon": 8.9225075
        },
        {
            "id": 37,
            "name": "Goebenstraße",
            "lat": 52.2923474,
            "lon": 8.919667
        },
        {
            "id": 38,
            "name": "Brühlstraße",
            "lat": 52.2965962,
            "lon": 8.9196563
        },
        {
            "id": 39,
            "name": "Rosentalstraße",
            "lat": 52.2948223,
            "lon": 8.9195514
        },
        {
            "id": 40,
            "name": "Brühlstraße",
            "lat": 52.2967888,
            "lon": 8.9198799
        },
        {
            "id": 41,
            "name": "Simeonsplatz",
            "lat": 52.2844915,
            "lon": 8.9122078
        },
        {
            "id": 42,
            "name": "Simeonsplatz",
            "lat": 52.2846327,
            "lon": 8.9130071
        },
        {
            "id": 43,
            "name": "Minden, Bahnhof",
            "lat": 52.2899065,
            "lon": 8.9355967
        },
        {
            "id": 44,
            "name": "Minden, Bahnhof",
            "lat": 52.2900991,
            "lon": 8.9355701
        },
        {
            "id": 45,
            "name": "Minden, Bahnhof",
            "lat": 52.2899632,
            "lon": 8.9354813
        },
        {
            "id": 46,
            "name": "Bleekstraße",
            "lat": 52.2858981,
            "lon": 8.9025054
        },
        {
            "id": 47,
            "name": "Kuhlenstraße",
            "lat": 52.2849867,
            "lon": 8.8989973
        },
        {
            "id": 48,
            "name": "Minden ZOB",
            "lat": 52.2863146,
            "lon": 8.9171109
        },
        {
            "id": 49,
            "name": "Parkstraße",
            "lat": 52.2855659,
            "lon": 8.9064685
        },
        {
            "id": 50,
            "name": "Alsenweg",
            "lat": 52.2890831,
            "lon": 8.9423487
        },
        {
            "id": 51,
            "name": "Gabelsberger Straße",
            "lat": 52.3030007,
            "lon": 8.9117097
        },
        {
            "id": 52,
            "name": "Stiftstraße",
            "lat": 52.2941367,
            "lon": 8.9131374
        },
        {
            "id": 53,
            "name": "Nettelbeckstraße",
            "lat": 52.2949344,
            "lon": 8.9006016
        },
        {
            "id": 54,
            "name": "Nettelbeckstraße",
            "lat": 52.2948766,
            "lon": 8.901353
        },
        {
            "id": 55,
            "name": "Hahler Straße",
            "lat": 52.2959283,
            "lon": 8.8983747
        },
        {
            "id": 56,
            "name": "Gerichtszentrum",
            "lat": 52.2913595,
            "lon": 8.9121043
        },
        {
            "id": 57,
            "name": "Greisenbruchstraße",
            "lat": 52.2897503,
            "lon": 8.9120926
        },
        {
            "id": 58,
            "name": "Steinstraße",
            "lat": 52.2934336,
            "lon": 8.9065121
        },
        {
            "id": 59,
            "name": "Bachstraße",
            "lat": 52.2890782,
            "lon": 8.9376879
        },
        {
            "id": 60,
            "name": "Karlstraße",
            "lat": 52.2981655,
            "lon": 8.9361604
        },
        {
            "id": 61,
            "name": "Nordbrücke",
            "lat": 52.297987,
            "lon": 8.9385298
        },
        {
            "id": 62,
            "name": "Karlstraße",
            "lat": 52.297155,
            "lon": 8.9362731
        },
        {
            "id": 63,
            "name": "Kornhaus",
            "lat": 52.2939171,
            "lon": 8.9339297
        },
        {
            "id": 64,
            "name": "Windmühlenstraße",
            "lat": 52.3012297,
            "lon": 8.9343823
        },
        {
            "id": 65,
            "name": "Karolingerring",
            "lat": 52.3030728,
            "lon": 8.9056246
        },
        {
            "id": 66,
            "name": "Hermann-Schoppe-Straße",
            "lat": 52.3007725,
            "lon": 8.9094882
        },
        {
            "id": 67,
            "name": "Hermann-Schoppe-Straße",
            "lat": 52.3009304,
            "lon": 8.9095332
        },
        {
            "id": 68,
            "name": "Königswall",
            "lat": 52.2874269,
            "lon": 8.9069865
        },
        {
            "id": 69,
            "name": "Immanuelstraße",
            "lat": 52.2925284,
            "lon": 8.9139828
        },
        {
            "id": 70,
            "name": "Paulinenstraße",
            "lat": 52.2946617,
            "lon": 8.9154127
        },
        {
            "id": 71,
            "name": "Wilhelmstraße",
            "lat": 52.2981458,
            "lon": 8.9158145
        },
        {
            "id": 72,
            "name": "Bachstraße",
            "lat": 52.2889429,
            "lon": 8.937677
        },
        {
            "id": 73,
            "name": "Dorotheenstraße",
            "lat": 52.2954586,
            "lon": 8.9234167
        },
        {
            "id": 74,
            "name": "Hermannstraße",
            "lat": 52.2940653,
            "lon": 8.9233448
        },
        {
            "id": 75,
            "name": "Werftstraße",
            "lat": 52.2978168,
            "lon": 8.9246892
        },
        {
            "id": 76,
            "name": "Rosentalstraße",
            "lat": 52.2948181,
            "lon": 8.9197228
        },
        {
            "id": 77,
            "name": "Paulinenstraße",
            "lat": 52.2952711,
            "lon": 8.9151209
        },
        {
            "id": 78,
            "name": "Wilhelmstraße",
            "lat": 52.2970383,
            "lon": 8.9155248
        },
        {
            "id": 79,
            "name": "Kuhlenstraße",
            "lat": 52.2850542,
            "lon": 8.898958
        },
        {
            "id": 80,
            "name": "Nordbrücke",
            "lat": 52.2977949,
            "lon": 8.9377776
        },
        {
            "id": 81,
            "name": "Alsenweg",
            "lat": 52.2891774,
            "lon": 8.9419993
        },
        {
            "id": 82,
            "name": "Minden ZOB",
            "lat": 52.2863865,
            "lon": 8.9162957
        },
        {
            "id": 83,
            "name": "Minden ZOB",
            "lat": 52.2865637,
            "lon": 8.9165613
        },
        {
            "id": 84,
            "name": "Martin-Luther-Straße",
            "lat": 52.3038997,
            "lon": 8.8984349
        },
        {
            "id": 85,
            "name": "Martin-Luther-Straße",
            "lat": 52.303689,
            "lon": 8.8978019
        },
        {
            "id": 86,
            "lat": 52.2845997,
            "lon": 8.9153744
        },
        {
            "id": 87,
            "name": "Marienglacis",
            "lat": 52.2913676,
            "lon": 8.9072674
        },
        {
            "id": 88,
            "name": "Gesamtschule",
            "lat": 52.28954,
            "lon": 8.9114517
        },
        {
            "id": 89,
            "name": "Fachhochschule",
            "lat": 52.2979367,
            "lon": 8.904148
        },
        {
            "id": 90,
            "name": "Fachhochschule",
            "lat": 52.2973757,
            "lon": 8.9038758
        },
        {
            "id": 91,
            "name": "Steinstraße",
            "lat": 52.293424,
            "lon": 8.906385
        },
        {
            "id": 92,
            "name": "Steinstraße",
            "lat": 52.2934748,
            "lon": 8.9065741
        },
        {
            "id": 93,
            "name": "Bismarckstraße",
            "lat": 52.2914275,
            "lon": 8.8988265
        },
        {
            "id": 94,
            "name": "Bismarckstraße",
            "lat": 52.2915431,
            "lon": 8.8983491
        },
        {
            "id": 95,
            "name": "Hardenbergstraße",
            "lat": 52.2877008,
            "lon": 8.9053416
        },
        {
            "id": 96,
            "name": "Hardenbergstraße",
            "lat": 52.2878993,
            "lon": 8.9049688
        }
    ]
}

export async function fetchHospitals() {
    /*const answer = await fetch(HOSPITALS, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });
    //return await answer.json();*/
    return [
        {
            "id": 1,
            "name": "Johannes Wesling Klinikum",
            "lat": 52.2606695,
            "lon": 8.8866916,
        }
    ];
}

export async function fetchMalls() {
    /*const answer = await fetch(MALLS, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });
    //return await answer.json();*/
    return [
        {
            "id": 1,
            "name": "Obermarktpassage",
            "lat": 52.2857872,
            "lon": 8.9152269
        },
        {
            "id": 2,
            "name": "E-Center",
            "lat": 52.2623475,
            "lon": 8.9010628
        },
        {
            "id": 3,
            "name": "Porta Markt",
            "lat": 52.2600871,
            "lon": 8.8997814
        }
    ];
}

export async function fetchBuslines(requestMode) {
    /*const URL = requestMode === "short" ? SHORTBUSLINES : BUSLINES;
    const answer = await fetch(URL, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });
    //return await answer.json();*/
    if (requestMode === "short") {
        return [
            {
                "id": 1,
                "name": "Vom Campus zum Bahnhof",
                "busstops": [
                    90,
                    45
                ]
            }, {
                "id": 2,
                "name": "Vom Bahnhof zum Campus",
                "busstops": [
                    45,
                    89
                ]
            }
        ]
    }
    else return [
        {
            "id": 1,
            "name": "Vom Campus zum Bahnhof",
            "busstops": [
                90,
                45
            ],
            "coordinates": [
                {
                    lon: 8.903798,
                    lat: 52.2974003
                },
                {
                    lon: 8.903798,
                    lat: 52.2974003
                },
                {
                    lon: 8.903798,
                    lat: 52.2974003
                },
                {
                    lon: 8.903798,
                    lat: 52.2974003
                },
                {
                    lon: 8.9038944,
                    lat: 52.2974914
                },
                {
                    lon: 8.9040217,
                    lat: 52.2976149
                },
                {
                    lon: 8.9042272,
                    lat: 52.2977538
                },
                {
                    lon: 8.9044179,
                    lat: 52.2978861
                },
                {
                    lon: 8.9047447,
                    lat: 52.2980335
                },
                {
                    lon: 8.9050531,
                    lat: 52.2981772
                },
                {
                    lon: 8.9055197,
                    lat: 52.2983538
                },
                {
                    lon: 8.9060062,
                    lat: 52.2984843
                },
                {
                    lon: 8.9070331,
                    lat: 52.2987291
                },
                {
                    lon: 8.9075474,
                    lat: 52.2988519
                },
                {
                    lon: 8.9080713,
                    lat: 52.2989515
                },
                {
                    lon: 8.9095025,
                    lat: 52.299167
                },
                {
                    lon: 8.9096353,
                    lat: 52.2991881
                },
                {
                    lon: 8.9099146,
                    lat: 52.2992324
                },
                {
                    lon: 8.9103368,
                    lat: 52.2992963
                },
                {
                    lon: 8.9106435,
                    lat: 52.2993427
                },
                {
                    lon: 8.9107169,
                    lat: 52.2993527
                },
                {
                    lon: 8.9108942,
                    lat: 52.2993768
                },
                {
                    lon: 8.911008,
                    lat: 52.2993922
                },
                {
                    lon: 8.9111922,
                    lat: 52.2994174
                },
                {
                    lon: 8.9112993,
                    lat: 52.2994363
                },
                {
                    lon: 8.9114472,
                    lat: 52.2994624
                },
                {
                    lon: 8.9128832,
                    lat: 52.2997158
                },
                {
                    lon: 8.9134376,
                    lat: 52.2998087
                },
                {
                    lon: 8.9139228,
                    lat: 52.2998575
                },
                {
                    lon: 8.9145227,
                    lat: 52.2998818
                },
                {
                    lon: 8.9150911,
                    lat: 52.2998798
                },
                {
                    lon: 8.9155982,
                    lat: 52.2998547
                },
                {
                    lon: 8.9162906,
                    lat: 52.2997818
                },
                {
                    lon: 8.9188887,
                    lat: 52.2993804
                },
                {
                    lon: 8.9198967,
                    lat: 52.299262
                },
                {
                    lon: 8.9205816,
                    lat: 52.299191
                },
                {
                    lon: 8.9213001,
                    lat: 52.2991173
                },
                {
                    lon: 8.9231184,
                    lat: 52.2989572
                },
                {
                    lon: 8.9247231,
                    lat: 52.2987736
                },
                {
                    lon: 8.9250205,
                    lat: 52.2987254
                },
                {
                    lon: 8.9253194,
                    lat: 52.2986689
                },
                {
                    lon: 8.9257484,
                    lat: 52.2985888
                },
                {
                    lon: 8.9264168,
                    lat: 52.2984655
                },
                {
                    lon: 8.9272086,
                    lat: 52.2983281
                },
                {
                    lon: 8.927332,
                    lat: 52.2983005
                },
                {
                    lon: 8.9299164,
                    lat: 52.2977753
                },
                {
                    lon: 8.9307363,
                    lat: 52.2976621
                },
                {
                    lon: 8.9312894,
                    lat: 52.2976092
                },
                {
                    lon: 8.9318579,
                    lat: 52.2975652
                },
                {
                    lon: 8.932926,
                    lat: 52.2975154
                },
                {
                    lon: 8.9336338,
                    lat: 52.2975212
                },
                {
                    lon: 8.9344162,
                    lat: 52.2975638
                },
                {
                    lon: 8.9360814,
                    lat: 52.2976912
                },
                {
                    lon: 8.9362053,
                    lat: 52.2977013
                },
                {
                    lon: 8.9362722,
                    lat: 52.2975427
                },
                {
                    lon: 8.9363166,
                    lat: 52.2974361
                },
                {
                    lon: 8.93632,
                    lat: 52.2973752
                },
                {
                    lon: 8.9363296,
                    lat: 52.2972021
                },
                {
                    lon: 8.9362679,
                    lat: 52.2969825
                },
                {
                    lon: 8.9361441,
                    lat: 52.2968122
                },
                {
                    lon: 8.9360754,
                    lat: 52.2967314
                },
                {
                    lon: 8.9358861,
                    lat: 52.2965343
                },
                {
                    lon: 8.9355214,
                    lat: 52.2962406
                },
                {
                    lon: 8.9353663,
                    lat: 52.2961127
                },
                {
                    lon: 8.9352282,
                    lat: 52.2959855
                },
                {
                    lon: 8.9350667,
                    lat: 52.2958233
                },
                {
                    lon: 8.9349267,
                    lat: 52.2956571
                },
                {
                    lon: 8.9345722,
                    lat: 52.2951626
                },
                {
                    lon: 8.9342712,
                    lat: 52.2946446
                },
                {
                    lon: 8.9339447,
                    lat: 52.2939552
                },
                {
                    lon: 8.9339297,
                    lat: 52.2939171
                },
                {
                    lon: 8.9337672,
                    lat: 52.2935406
                },
                {
                    lon: 8.9336053,
                    lat: 52.2934371
                },
                {
                    lon: 8.9334257,
                    lat: 52.2933871
                },
                {
                    lon: 8.9330795,
                    lat: 52.2933457
                },
                {
                    lon: 8.932946,
                    lat: 52.293242
                },
                {
                    lon: 8.9326181,
                    lat: 52.2929558
                },
                {
                    lon: 8.9323389,
                    lat: 52.2927483
                },
                {
                    lon: 8.9320494,
                    lat: 52.2926218
                },
                {
                    lon: 8.9317067,
                    lat: 52.2925074
                },
                {
                    lon: 8.9314036,
                    lat: 52.2924434
                },
                {
                    lon: 8.9312654,
                    lat: 52.2923868
                },
                {
                    lon: 8.9309289,
                    lat: 52.2920929
                },
                {
                    lon: 8.9307398,
                    lat: 52.2918888
                },
                {
                    lon: 8.9306407,
                    lat: 52.2917239
                },
                {
                    lon: 8.9305952,
                    lat: 52.291648
                },
                {
                    lon: 8.9305832,
                    lat: 52.291566
                },
                {
                    lon: 8.9304903,
                    lat: 52.290934
                },
                {
                    lon: 8.9303295,
                    lat: 52.290526
                },
                {
                    lon: 8.930255,
                    lat: 52.2900318
                },
                {
                    lon: 8.9302257,
                    lat: 52.2898198
                },
                {
                    lon: 8.9301634,
                    lat: 52.28951
                },
                {
                    lon: 8.9301593,
                    lat: 52.2894885
                },
                {
                    lon: 8.9301554,
                    lat: 52.2894608
                },
                {
                    lon: 8.930146,
                    lat: 52.2893544
                },
                {
                    lon: 8.9301427,
                    lat: 52.2892651
                },
                {
                    lon: 8.9304784,
                    lat: 52.2892233
                },
                {
                    lon: 8.931018,
                    lat: 52.2891422
                },
                {
                    lon: 8.9311431,
                    lat: 52.2891127
                },
                {
                    lon: 8.9313287,
                    lat: 52.289076
                },
                {
                    lon: 8.9324621,
                    lat: 52.2888956
                },
                {
                    lon: 8.9326655,
                    lat: 52.2888652
                },
                {
                    lon: 8.9334269,
                    lat: 52.2887926
                },
                {
                    lon: 8.9335809,
                    lat: 52.288781
                },
                {
                    lon: 8.9340901,
                    lat: 52.2887543
                },
                {
                    lon: 8.9348031,
                    lat: 52.2887144
                },
                {
                    lon: 8.9349006,
                    lat: 52.2887149
                },
                {
                    lon: 8.935049,
                    lat: 52.2887328
                },
                {
                    lon: 8.9354239,
                    lat: 52.288824
                },
                {
                    lon: 8.9355837,
                    lat: 52.2888858
                },
                {
                    lon: 8.9355112,
                    lat: 52.2889728
                },
                {
                    lon: 8.9354577,
                    lat: 52.2890371
                },
                {
                    lon: 8.9354199,
                    lat: 52.2891981
                },
                {
                    lon: 8.9354468,
                    lat: 52.2893367
                },
                {
                    lon: 8.9354796,
                    lat: 52.2894473
                },
                {
                    lon: 8.9355013,
                    lat: 52.2894952
                },
                {
                    lon: 8.935545,
                    lat: 52.2895699
                },
                {
                    lon: 8.9355992,
                    lat: 52.2896621
                },
                {
                    lon: 8.9357679,
                    lat: 52.2899403
                },
                {
                    lon: 8.9358271,
                    lat: 52.2900374
                },
                {
                    lon: 8.9358985,
                    lat: 52.2901547
                },
                {
                    lon: 8.9359466,
                    lat: 52.2902337
                },
                {
                    lon: 8.9357839,
                    lat: 52.2902671
                },
                {
                    lon: 8.9356596,
                    lat: 52.2902463
                },
                {
                    lon: 8.9356246,
                    lat: 52.2901887
                },
                {
                    lon: 8.9355701,
                    lat: 52.2900991
                },
                {
                    lon: 8.9355406,
                    lat: 52.2900507
                },
                {
                    lon: 8.9354813,
                    lat: 52.2899632
                }
            ]
        }, {
            "id": 2,
            "name": "Vom Bahnhof zum Campus",
            "busstops": [
                45,
                89
            ],
            "coordinates": [
                {
                    lon: 8.9354813,
                    lat: 52.2899632
                },
                {
                    lon: 8.9354379,
                    lat: 52.2898992
                },
                {
                    lon: 8.9354879,
                    lat: 52.2897338
                },
                {
                    lon: 8.935545,
                    lat: 52.2895699
                },
                {
                    lon: 8.9355013,
                    lat: 52.2894952
                },
                {
                    lon: 8.9354796,
                    lat: 52.2894473
                },
                {
                    lon: 8.9354468,
                    lat: 52.2893367
                },
                {
                    lon: 8.9354199,
                    lat: 52.2891981
                },
                {
                    lon: 8.9354577,
                    lat: 52.2890371
                },
                {
                    lon: 8.9355112,
                    lat: 52.2889728
                },
                {
                    lon: 8.9355837,
                    lat: 52.2888858
                },
                {
                    lon: 8.9354239,
                    lat: 52.288824
                },
                {
                    lon: 8.935049,
                    lat: 52.2887328
                },
                {
                    lon: 8.9349006,
                    lat: 52.2887149
                },
                {
                    lon: 8.9348031,
                    lat: 52.2887144
                },
                {
                    lon: 8.9340901,
                    lat: 52.2887543
                },
                {
                    lon: 8.9335809,
                    lat: 52.288781
                },
                {
                    lon: 8.9334269,
                    lat: 52.2887926
                },
                {
                    lon: 8.9326655,
                    lat: 52.2888652
                },
                {
                    lon: 8.9324621,
                    lat: 52.2888956
                },
                {
                    lon: 8.9313287,
                    lat: 52.289076
                },
                {
                    lon: 8.9311431,
                    lat: 52.2891127
                },
                {
                    lon: 8.931018,
                    lat: 52.2891422
                },
                {
                    lon: 8.9308662,
                    lat: 52.2892184
                },
                {
                    lon: 8.9308537,
                    lat: 52.2892799
                },
                {
                    lon: 8.9308748,
                    lat: 52.2893271
                },
                {
                    lon: 8.9309043,
                    lat: 52.2893471
                },
                {
                    lon: 8.9309361,
                    lat: 52.2893685
                },
                {
                    lon: 8.9310738,
                    lat: 52.2893849
                },
                {
                    lon: 8.9316715,
                    lat: 52.2893427
                },
                {
                    lon: 8.9319605,
                    lat: 52.2893217
                },
                {
                    lon: 8.9324449,
                    lat: 52.2892973
                },
                {
                    lon: 8.9325506,
                    lat: 52.2892959
                },
                {
                    lon: 8.9326331,
                    lat: 52.2893235
                },
                {
                    lon: 8.9326722,
                    lat: 52.2893737
                },
                {
                    lon: 8.9326637,
                    lat: 52.2899367
                },
                {
                    lon: 8.9326627,
                    lat: 52.2902926
                },
                {
                    lon: 8.9326632,
                    lat: 52.290534
                },
                {
                    lon: 8.9326601,
                    lat: 52.2912852
                },
                {
                    lon: 8.9326583,
                    lat: 52.2917199
                },
                {
                    lon: 8.9326581,
                    lat: 52.2917594
                },
                {
                    lon: 8.932658,
                    lat: 52.2917774
                },
                {
                    lon: 8.9326563,
                    lat: 52.2921701
                },
                {
                    lon: 8.9327488,
                    lat: 52.2923673
                },
                {
                    lon: 8.9329338,
                    lat: 52.2925593
                },
                {
                    lon: 8.9331835,
                    lat: 52.2928184
                },
                {
                    lon: 8.9334541,
                    lat: 52.2930991
                },
                {
                    lon: 8.9335698,
                    lat: 52.2932191
                },
                {
                    lon: 8.9336368,
                    lat: 52.2932754
                },
                {
                    lon: 8.9337055,
                    lat: 52.2933792
                },
                {
                    lon: 8.9337672,
                    lat: 52.2935406
                },
                {
                    lon: 8.9339297,
                    lat: 52.2939171
                },
                {
                    lon: 8.9339447,
                    lat: 52.2939552
                },
                {
                    lon: 8.9342712,
                    lat: 52.2946446
                },
                {
                    lon: 8.9345722,
                    lat: 52.2951626
                },
                {
                    lon: 8.9349756,
                    lat: 52.2955858
                },
                {
                    lon: 8.9353361,
                    lat: 52.295921
                },
                {
                    lon: 8.935482,
                    lat: 52.2960535
                },
                {
                    lon: 8.9357779,
                    lat: 52.2962997
                },
                {
                    lon: 8.9359947,
                    lat: 52.29647
                },
                {
                    lon: 8.9362104,
                    lat: 52.2966443
                },
                {
                    lon: 8.9362948,
                    lat: 52.2967528
                },
                {
                    lon: 8.9364217,
                    lat: 52.2969237
                },
                {
                    lon: 8.9364794,
                    lat: 52.297058
                },
                {
                    lon: 8.9365199,
                    lat: 52.2971815
                },
                {
                    lon: 8.936498,
                    lat: 52.2973866
                },
                {
                    lon: 8.9364659,
                    lat: 52.297511
                },
                {
                    lon: 8.9364374,
                    lat: 52.2975944
                },
                {
                    lon: 8.9363853,
                    lat: 52.297716
                },
                {
                    lon: 8.9363262,
                    lat: 52.2978007
                },
                {
                    lon: 8.936165,
                    lat: 52.2977891
                },
                {
                    lon: 8.9359966,
                    lat: 52.2977769
                },
                {
                    lon: 8.9343871,
                    lat: 52.2976624
                },
                {
                    lon: 8.9336693,
                    lat: 52.2976284
                },
                {
                    lon: 8.9329675,
                    lat: 52.2976202
                },
                {
                    lon: 8.9318695,
                    lat: 52.297673
                },
                {
                    lon: 8.9312315,
                    lat: 52.2977257
                },
                {
                    lon: 8.9307925,
                    lat: 52.2977691
                },
                {
                    lon: 8.9299986,
                    lat: 52.2978832
                },
                {
                    lon: 8.9288494,
                    lat: 52.2981015
                },
                {
                    lon: 8.927467,
                    lat: 52.2983691
                },
                {
                    lon: 8.927345,
                    lat: 52.2983916
                },
                {
                    lon: 8.926609,
                    lat: 52.298539
                },
                {
                    lon: 8.9258281,
                    lat: 52.2986883
                },
                {
                    lon: 8.9253529,
                    lat: 52.2987656
                },
                {
                    lon: 8.9250546,
                    lat: 52.2988122
                },
                {
                    lon: 8.9247433,
                    lat: 52.2988565
                },
                {
                    lon: 8.9235102,
                    lat: 52.2990094
                },
                {
                    lon: 8.9210182,
                    lat: 52.2992503
                },
                {
                    lon: 8.9206,
                    lat: 52.2992636
                },
                {
                    lon: 8.9198946,
                    lat: 52.2993416
                },
                {
                    lon: 8.918901,
                    lat: 52.2994625
                },
                {
                    lon: 8.9167952,
                    lat: 52.2997981
                },
                {
                    lon: 8.9163134,
                    lat: 52.2998565
                },
                {
                    lon: 8.9156347,
                    lat: 52.299927
                },
                {
                    lon: 8.9151104,
                    lat: 52.2999715
                },
                {
                    lon: 8.9145423,
                    lat: 52.2999719
                },
                {
                    lon: 8.9141181,
                    lat: 52.2999437
                },
                {
                    lon: 8.9138138,
                    lat: 52.2999234
                },
                {
                    lon: 8.913267,
                    lat: 52.2998678
                },
                {
                    lon: 8.9125327,
                    lat: 52.2997565
                },
                {
                    lon: 8.9114672,
                    lat: 52.2995968
                },
                {
                    lon: 8.911407,
                    lat: 52.2995858
                },
                {
                    lon: 8.9112699,
                    lat: 52.2995609
                },
                {
                    lon: 8.9111482,
                    lat: 52.2995387
                },
                {
                    lon: 8.9109649,
                    lat: 52.2995108
                },
                {
                    lon: 8.9108473,
                    lat: 52.2994917
                },
                {
                    lon: 8.9106774,
                    lat: 52.2994642
                },
                {
                    lon: 8.910324,
                    lat: 52.299407
                },
                {
                    lon: 8.9100599,
                    lat: 52.2993624
                },
                {
                    lon: 8.9080626,
                    lat: 52.2990246
                },
                {
                    lon: 8.9075453,
                    lat: 52.2989287
                },
                {
                    lon: 8.9070354,
                    lat: 52.2988013
                },
                {
                    lon: 8.9059822,
                    lat: 52.2985568
                },
                {
                    lon: 8.9054569,
                    lat: 52.2984213
                },
                {
                    lon: 8.9049592,
                    lat: 52.29825
                },
                {
                    lon: 8.9046654,
                    lat: 52.2981221
                },
                {
                    lon: 8.9045065,
                    lat: 52.2980559
                },
                {
                    lon: 8.9043496,
                    lat: 52.2979686
                },
                {
                    lon: 8.9042258,
                    lat: 52.2978908
                }
            ]
        }
    ]
}

export async function fetchRoute(busstopFrom, busstopTo) {
    /*
    const URL = ROUTE(busstopFrom, busstopTo);
    const answer = await fetch(URL, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });
    //return await answer.json();*/
    return [
        {
            "id": 1, //Buslinie
            "from": 90,
            "to": 45,
        },
        {
            "id": 2, //Buslinie
            "from": 45,
            "to": 89,
        },
    ];
}