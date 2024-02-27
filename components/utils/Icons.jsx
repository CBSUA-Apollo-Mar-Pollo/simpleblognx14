import { User } from "lucide-react";

export const Icons = {
  user: User,
  bell: function (props) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
      >
        <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
        <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
      </svg>
    );
  },
  BioIcon: function (props) {
    return (
      <svg
        version="1.0"
        xmlns="http://www.w3.org/2000/svg"
        width="512.000000pt"
        height="512.000000pt"
        viewBox="0 0 512.000000 512.000000"
        preserveAspectRatio="xMidYMid meet"
        {...props}
      >
        <g
          transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
          stroke="none"
        >
          <path
            d="M2300 4785 c-408 -65 -755 -364 -885 -762 -212 -649 218 -1346 895
-1448 236 -36 449 -3 665 105 339 168 561 476 615 855 53 377 -110 781 -412
1020 -247 195 -567 279 -878 230z m370 -328 c209 -57 368 -171 480 -344 89
-136 125 -259 125 -433 0 -174 -36 -297 -125 -433 -238 -366 -718 -474 -1087
-247 -226 139 -363 368 -380 636 -26 400 254 753 662 833 67 13 257 6 325 -12z"
          />
          <path
            d="M4195 2481 c-60 -28 -1021 -996 -1029 -1036 -3 -16 -10 -133 -16
-259 l-11 -228 23 -47 c17 -35 34 -51 69 -69 l46 -23 239 12 c164 7 248 15
269 25 17 8 252 236 522 507 540 540 528 526 503 617 -10 39 -40 74 -228 263
-262 263 -293 282 -387 238z m-154 -935 l-388 -388 -93 -6 -93 -5 5 92 4 92
389 389 390 390 87 -87 88 -88 -389 -389z"
          />
          <path
            d="M1495 2229 c-313 -41 -601 -184 -830 -414 -169 -168 -282 -351 -355
-573 -57 -176 -64 -240 -65 -544 0 -264 1 -278 21 -304 11 -15 33 -37 48 -48
27 -21 32 -21 1166 -21 1134 0 1139 0 1166 21 53 39 69 71 69 134 0 63 -16 95
-69 134 -27 21 -35 21 -1057 24 l-1029 2 0 123 c0 141 19 269 55 380 124 382
429 657 835 755 53 12 167 16 617 21 537 6 552 7 579 27 53 39 69 71 69 134 0
63 -16 95 -69 134 -27 21 -39 21 -554 22 -290 1 -558 -2 -597 -7z"
          />
          <path
            d="M2975 626 c-67 -29 -105 -106 -91 -181 9 -47 59 -102 104 -115 25 -8
281 -10 794 -8 746 3 757 3 784 24 52 39 69 71 69 133 0 48 -5 64 -29 95 -52
69 -15 66 -848 66 -603 -1 -759 -3 -783 -14z"
          />
        </g>
      </svg>
    );
  },
  ImageLoaderIcon: function (props) {
    return (
      <svg
        version="1.0"
        xmlns="http://www.w3.org/2000/svg"
        width="512.000000pt"
        height="512.000000pt"
        viewBox="0 0 512.000000 512.000000"
        preserveAspectRatio="xMidYMid meet"
        {...props}
      >
        <g
          transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
          stroke="none"
        >
          <path
            d="M240 4541 c-90 -28 -169 -96 -209 -181 l-26 -55 0 -1745 0 -1745 26
     -55 c32 -66 86 -123 154 -158 l50 -27 2325 0 2325 0 52 27 c68 36 120 90 152
     158 l26 55 0 1745 0 1745 -26 55 c-32 68 -84 122 -152 158 l-52 27 -2310 2
     c-1270 1 -2321 -2 -2335 -6z m4550 -1493 l0 -1182 -27 26 c-238 221 -637 575
     -668 591 -51 27 -154 29 -205 3 -19 -10 -189 -172 -378 -359 -203 -203 -345
     -338 -350 -331 -37 54 -1292 1540 -1316 1558 -86 64 -215 61 -291 -6 -20 -17
     -297 -335 -617 -707 -319 -372 -587 -683 -594 -691 -12 -12 -14 166 -14 1133
     l0 1147 2230 0 2230 0 0 -1182z"
          />
          <path
            d="M3755 3806 c-119 -30 -237 -121 -290 -226 -117 -231 -23 -502 213
     -613 63 -30 74 -32 182 -32 109 0 119 2 183 32 182 86 291 286 259 473 -46
     260 -297 428 -547 366z"
          />
        </g>
      </svg>
    );
  },
  BackIcon: function (props) {
    return (
      <svg
        version="1.0"
        xmlns="http://www.w3.org/2000/svg"
        width="512.000000pt"
        height="512.000000pt"
        viewBox="0 0 512.000000 512.000000"
        preserveAspectRatio="xMidYMid meet"
        {...props}
      >
        <g
          transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
          stroke="none"
        >
          <path
            d="M1850 4257 c-27 -8 -212 -187 -813 -786 -466 -464 -787 -792 -800
-816 -28 -54 -28 -136 0 -190 32 -59 1547 -1570 1595 -1590 177 -73 359 110
279 280 -13 27 -205 225 -590 610 -314 313 -571 573 -571 577 0 4 859 9 1909
10 l1909 3 44 30 c138 97 118 306 -34 370 -33 13 -245 15 -1933 15 -1042 0
-1895 3 -1895 7 0 4 263 271 584 593 573 574 584 586 594 635 35 169 -112 302
-278 252z"
          />
        </g>
      </svg>
    );
  },
  SettingIcon: function (props) {
    return (
      <svg
        version="1.0"
        xmlns="http://www.w3.org/2000/svg"
        width="512.000000pt"
        height="512.000000pt"
        viewBox="0 0 512.000000 512.000000"
        preserveAspectRatio="xMidYMid meet"
        {...props}
      >
        <g
          transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
          stroke="none"
        >
          <path
            d="M2245 5111 c-50 -13 -112 -49 -151 -88 -65 -64 -81 -117 -111 -354
     -14 -118 -31 -219 -36 -226 -5 -7 -25 -17 -45 -23 -20 -7 -83 -32 -140 -57
     l-103 -46 -37 30 c-173 137 -304 234 -342 253 -61 31 -159 38 -236 15 -57 -16
     -67 -25 -291 -248 -223 -224 -232 -234 -248 -291 -23 -78 -16 -175 15 -236 13
     -25 77 -115 143 -200 66 -85 125 -161 130 -167 6 -9 -5 -46 -36 -115 -25 -57
     -50 -120 -57 -140 -6 -20 -16 -40 -23 -45 -7 -5 -109 -22 -227 -37 -238 -30
     -289 -46 -353 -110 -21 -20 -49 -60 -65 -89 l-27 -52 0 -320 0 -320 26 -56
     c15 -31 43 -73 64 -94 66 -66 118 -82 356 -112 118 -14 219 -31 226 -36 7 -5
     17 -25 23 -45 7 -20 32 -83 57 -140 31 -69 42 -106 36 -115 -5 -6 -64 -82
     -130 -167 -66 -85 -130 -175 -143 -200 -31 -62 -38 -158 -15 -236 16 -56 26
     -68 233 -277 259 -261 275 -272 407 -272 76 0 97 4 135 24 35 19 172 121 368
     274 8 7 36 -1 90 -26 42 -19 108 -46 145 -58 49 -17 69 -30 72 -44 2 -11 16
     -112 30 -225 28 -227 45 -279 110 -345 21 -21 63 -49 94 -64 l56 -26 315 0
     315 0 56 26 c31 15 73 43 94 64 66 67 82 118 112 356 14 118 31 219 37 225 6
     6 45 24 86 39 41 15 102 41 135 58 70 35 47 46 250 -113 83 -64 170 -127 195
     -140 62 -31 158 -38 236 -15 56 16 68 26 277 233 261 259 272 275 272 407 0
     113 -8 128 -168 335 -66 85 -125 161 -130 167 -6 9 5 46 36 115 25 57 50 120
     57 140 6 20 16 40 23 45 7 5 108 22 226 36 238 30 287 45 355 112 21 21 51 64
     65 94 l26 56 0 315 0 315 -26 56 c-15 31 -43 73 -64 94 -66 66 -118 82 -356
     112 -118 14 -219 31 -226 36 -7 5 -17 25 -23 45 -7 20 -32 83 -57 140 -31 69
     -42 106 -36 115 5 6 64 82 130 167 66 85 130 175 143 200 31 61 38 158 15 236
     -16 57 -25 67 -248 291 -224 223 -234 232 -291 248 -78 23 -175 16 -236 -15
     -25 -13 -112 -76 -195 -140 -203 -159 -180 -148 -250 -113 -33 17 -94 43 -135
     58 -41 15 -80 33 -86 39 -6 6 -23 107 -37 225 -30 238 -46 289 -112 356 -21
     21 -63 49 -94 64 l-56 26 -300 2 c-165 1 -313 -2 -330 -6z m425 -1491 c124
     -14 229 -44 335 -94 238 -112 409 -283 520 -519 192 -407 102 -894 -223 -1209
     -322 -311 -790 -392 -1188 -204 -121 58 -203 114 -296 204 -325 315 -415 802
     -223 1209 176 372 538 609 950 622 22 0 78 -4 125 -9z"
          />
        </g>
      </svg>
    );
  },
  DarkModeIcon: function (props) {
    return (
      <svg
        version="1.0"
        xmlns="http://www.w3.org/2000/svg"
        width="512.000000pt"
        height="512.000000pt"
        viewBox="0 0 512.000000 512.000000"
        preserveAspectRatio="xMidYMid meet"
        {...props}
      >
        <g
          transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
          stroke="none"
        >
          <path
            d="M1719 4922 c-307 -123 -565 -290 -803 -522 -473 -460 -728 -1032
     -753 -1690 -19 -512 123 -1016 407 -1443 788 -1187 2405 -1464 3545 -608 114
     86 318 280 410 391 164 198 304 436 400 680 51 132 43 194 -36 253 -46 33 -94
     32 -219 -6 -226 -68 -417 -97 -652 -97 -409 0 -802 115 -1153 338 -243 155
     -490 402 -647 647 -348 546 -432 1205 -233 1834 30 94 29 147 -2 190 -60 79
     -127 88 -264 33z"
          />
        </g>
      </svg>
    );
  },
  signOut: function (props) {
    return (
      <svg
        version="1.0"
        xmlns="http://www.w3.org/2000/svg"
        width="512.000000pt"
        height="512.000000pt"
        viewBox="0 0 512.000000 512.000000"
        preserveAspectRatio="xMidYMid meet"
        {...props}
      >
        <g
          transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
          stroke="none"
        >
          <path
            d="M740 5113 c-201 -34 -381 -193 -443 -388 l-22 -70 0 -1775 0 -1775
     26 -71 c33 -90 88 -173 153 -230 44 -39 1100 -659 1268 -745 71 -36 164 -59
     240 -59 183 0 385 112 477 265 65 108 75 150 81 360 l5 190 465 5 c449 5 467
     6 523 27 188 71 321 225 362 418 18 85 22 716 5 777 -22 79 -91 131 -175 131
     -80 0 -138 -40 -170 -115 -12 -31 -15 -94 -15 -380 0 -311 -2 -347 -19 -383
     -22 -50 -69 -91 -119 -105 -23 -6 -197 -10 -449 -10 l-413 0 0 1268 c0 1393 3
     1317 -61 1445 -20 39 -58 88 -103 132 -65 64 -119 97 -636 395 l-566 325 1115
     3 1116 2 44 -27 c28 -18 53 -44 68 -72 23 -44 23 -45 23 -435 0 -358 2 -394
     19 -431 57 -126 217 -149 305 -45 45 54 48 84 44 519 -3 394 -4 408 -26 471
     -32 89 -66 145 -130 212 -65 69 -130 112 -220 147 l-67 26 -1340 1 c-737 1
     -1351 0 -1365 -3z"
          />
          <path
            d="M4110 3661 c-89 -28 -140 -92 -140 -175 0 -72 19 -102 139 -221 l111
     -110 -709 -5 -709 -5 -39 -31 c-49 -40 -73 -87 -73 -148 0 -66 37 -128 93
     -159 l42 -22 693 -5 692 -5 -101 -100 c-55 -55 -109 -117 -120 -137 -21 -41
     -25 -111 -8 -155 23 -61 100 -113 169 -113 70 0 108 31 397 321 234 236 283
     291 292 324 14 50 14 60 0 110 -9 33 -58 87 -283 313 -149 151 -289 284 -311
     297 -46 27 -99 37 -135 26z"
          />
        </g>
      </svg>
    );
  },
};
