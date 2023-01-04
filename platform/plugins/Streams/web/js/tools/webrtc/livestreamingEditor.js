(function ($, window, undefined) {
    var _streamingIcons = {
        addItem: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 13h-5v5h-2v-5h-5v-2h5v-5h2v5h5v2z"/></svg>',
        removeItem: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 16.538l-4.592-4.548 4.546-4.587-1.416-1.403-4.545 4.589-4.588-4.543-1.405 1.405 4.593 4.552-4.547 4.592 1.405 1.405 4.555-4.596 4.591 4.55 1.403-1.416z"/></svg>',
        moveUp: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M11.574 3.712c.195-.323.662-.323.857 0l9.37 15.545c.2.333-.039.757-.429.757l-18.668-.006c-.385 0-.629-.422-.428-.758l9.298-15.538zm.429-2.483c-.76 0-1.521.37-1.966 1.111l-9.707 16.18c-.915 1.523.182 3.472 1.965 3.472h19.416c1.783 0 2.879-1.949 1.965-3.472l-9.707-16.18c-.446-.741-1.205-1.111-1.966-1.111z"/></svg>',
        moveDown: '<svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24"><path d="M12.431,19.509c-0.195,0.323-0.662,0.323-0.857,0L2.205,3.964c-0.2-0.333,0.039-0.757,0.429-0.757l18.668,0.006 c0.385,0,0.629,0.422,0.428,0.758L12.431,19.509z M12.002,21.992c0.76,0,1.521-0.37,1.966-1.111l9.707-16.179 c0.915-1.523-0.183-3.473-1.965-3.473H2.294c-1.783,0-2.879,1.949-1.965,3.473l9.707,16.179 C10.482,21.622,11.242,21.992,12.002,21.992z"/></svg>',
        visible: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M15 12c0 1.654-1.346 3-3 3s-3-1.346-3-3 1.346-3 3-3 3 1.346 3 3zm9-.449s-4.252 8.449-11.985 8.449c-7.18 0-12.015-8.449-12.015-8.449s4.446-7.551 12.015-7.551c7.694 0 11.985 7.551 11.985 7.551zm-7 .449c0-2.757-2.243-5-5-5s-5 2.243-5 5 2.243 5 5 5 5-2.243 5-5z"/></svg>',
        hidden: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M11.885 14.988l3.104-3.098.011.11c0 1.654-1.346 3-3 3l-.115-.012zm8.048-8.032l-3.274 3.268c.212.554.341 1.149.341 1.776 0 2.757-2.243 5-5 5-.631 0-1.229-.13-1.785-.344l-2.377 2.372c1.276.588 2.671.972 4.177.972 7.733 0 11.985-8.449 11.985-8.449s-1.415-2.478-4.067-4.595zm1.431-3.536l-18.619 18.58-1.382-1.422 3.455-3.447c-3.022-2.45-4.818-5.58-4.818-5.58s4.446-7.551 12.015-7.551c1.825 0 3.456.426 4.886 1.075l3.081-3.075 1.382 1.42zm-13.751 10.922l1.519-1.515c-.077-.264-.132-.538-.132-.827 0-1.654 1.346-3 3-3 .291 0 .567.055.833.134l1.518-1.515c-.704-.382-1.496-.619-2.351-.619-2.757 0-5 2.243-5 5 0 .852.235 1.641.613 2.342z"/></svg>',
        enabledSpeaker: '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="25px" height="24px" viewBox="0 0 25 24" enable-background="new 0 0 25 24" xml:space="preserve"> <path d="M9.981,19.759c0,0.068-0.088,0.089-0.122,0.151c-0.013,0.021-0.07,0.045-0.088,0.064c-0.035,0.039-0.102,0.067-0.15,0.088 c-0.025,0.01-0.063,0.015-0.088,0.016c-0.025,0.004-0.06,0.003-0.084-0.001c-0.069-0.011-0.086-0.136-0.147-0.17L4.59,16.266H0.603 c-0.028,0-0.056,0.104-0.084,0.1c-0.027-0.01-0.053,0.035-0.077,0.021c-0.05-0.026-0.089-0.04-0.118-0.09 c-0.014-0.024-0.076-0.037-0.083-0.063c-0.007-0.026-0.062-0.041-0.062-0.07V6.845c0-0.028,0.055-0.057,0.062-0.084 c0.007-0.027,0.044-0.053,0.058-0.078C0.312,6.66,0.343,6.638,0.363,6.617c0.04-0.04,0.096-0.098,0.15-0.113 c0.026-0.007,0.062-0.04,0.09-0.04h3.988l4.708-3.505c0.022-0.013,0.044-0.014,0.067-0.024c0.065-0.028,0.086-0.014,0.156-0.017 C9.549,2.924,9.574,2.934,9.599,2.94c0.023,0.011,0.048,0.022,0.07,0.037C9.69,2.992,9.711,3.01,9.729,3.029 c0.036,0.039,0.146,0.087,0.158,0.138C9.892,3.193,9.979,3.22,9.979,3.246v16.513H9.981z"/> <path d="M11.871,19.104c-0.117,0-0.234-0.043-0.324-0.129c-0.184-0.182-0.188-0.478-0.01-0.662 c6.658-6.859,0.281-13.344,0.008-13.617c-0.186-0.182-0.186-0.477-0.004-0.66c0.182-0.183,0.477-0.184,0.66-0.002 c0.074,0.074,7.297,7.416,0.006,14.932C12.117,19.059,11.994,19.104,11.871,19.104z"/> <path d="M14.943,21.036c-0.094,0.096-0.215,0.144-0.336,0.144c-0.117,0-0.234-0.046-0.324-0.132 c-0.186-0.181-0.189-0.478-0.012-0.659c8.684-8.95,0.362-17.407,0.01-17.764c-0.188-0.182-0.188-0.477-0.004-0.66 c0.182-0.184,0.477-0.184,0.658-0.003C15.031,2.056,24.258,11.433,14.943,21.036z"/> </svg>',
        disabledSpeaker: '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="25px" height="24px" viewBox="0 0 25 24" enable-background="new 0 0 25 24" xml:space="preserve"> <path d="M9.979,3.246c0-0.026-0.087-0.053-0.092-0.079C9.875,3.116,9.765,3.068,9.729,3.029C9.711,3.01,9.69,2.992,9.669,2.977 C9.647,2.962,9.622,2.951,9.599,2.94c-0.025-0.006-0.05-0.016-0.077-0.022c-0.07,0.003-0.091-0.011-0.156,0.017 c-0.023,0.01-0.045,0.011-0.067,0.024L4.591,6.464H0.603c-0.028,0-0.064,0.033-0.09,0.04c-0.054,0.015-0.11,0.073-0.15,0.113 C0.343,6.638,0.312,6.66,0.299,6.683C0.285,6.708,0.248,6.734,0.241,6.761C0.234,6.788,0.179,6.817,0.179,6.845v9.317 c0,0.029,0.055,0.044,0.062,0.07c0.007,0.026,0.069,0.039,0.083,0.063c0.029,0.05,0.068,0.063,0.118,0.09 c0.024,0.015,0.05-0.03,0.077-0.021c0.028,0.004,0.056-0.1,0.084-0.1H4.59l1.396,1.079l3.993-4.638V3.246z"/> <path d="M9.302,19.907c0.061,0.034,0.078,0.159,0.147,0.17c0.024,0.004,0.059,0.005,0.084,0.001 c0.025-0.001,0.063-0.006,0.088-0.016c0.048-0.021,0.115-0.049,0.15-0.088c0.018-0.02,0.075-0.043,0.088-0.064 c0.034-0.063,0.122-0.083,0.122-0.151H9.979v-4.622l-2.738,3.178L9.302,19.907z"/> <path d="M14.483,7.478c-0.949-2.085-2.251-3.412-2.282-3.443c-0.184-0.182-0.479-0.181-0.66,0.002 c-0.182,0.183-0.182,0.478,0.004,0.66c0.121,0.121,1.444,1.467,2.297,3.525l0.35-0.406L14.483,7.478z"/> <path d="M14.394,10.011c0.475,2.369,0.058,5.299-2.856,8.301c-0.178,0.185-0.174,0.48,0.01,0.662 c0.09,0.086,0.207,0.129,0.324,0.129c0.123,0,0.246-0.045,0.336-0.138c3.443-3.549,3.648-7.058,2.899-9.783l-0.063,0.074 L14.394,10.011z"/> <path d="M16.937,4.629c-0.997-1.646-1.97-2.637-2.001-2.667c-0.182-0.181-0.477-0.181-0.658,0.003 c-0.185,0.183-0.185,0.478,0.004,0.66c0.116,0.117,1.094,1.115,2.045,2.714l0.392-0.455L16.937,4.629z"/> <path d="M17.113,6.853c1.516,3.375,2.169,8.372-2.842,13.536c-0.178,0.182-0.174,0.479,0.012,0.659 c0.09,0.086,0.207,0.132,0.324,0.132c0.121,0,0.242-0.048,0.336-0.144c5.503-5.673,4.534-11.267,2.8-14.915l-0.028,0.033 L17.113,6.853z"/> <polygon points="20.305,1.034 19.104,0 15.508,4.175 14.896,4.884 12.988,7.102 12.371,7.815 8.158,12.707 4.162,17.348 0.179,21.971 1.38,23.006 5.418,18.316 8.158,15.137 13.223,9.257 13.869,8.506 15.895,6.155 16.506,5.445 18.203,3.473 18.811,2.768 "/> </svg>',
        liveOn: '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:a="http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/" x="0px" y="0px" width="26px" height="15px" viewBox="-0.034668 -0.6616211 26 15" enable-background="new -0.034668 -0.6616211 26 15" xml:space="preserve"> <defs> </defs> <path fill="#C12337" d="M23.887207,0.0009766h-2.0361328L3.1806641,0H1.1430664 C0.5151367,0,0.0043945,0.2900391,0.0019531,0.6479492L0.0009766,12.2397461L0,13.4038086 c0.0009766,0.3574219,0.5117188,0.6494141,1.1420898,0.6494141l20.7070313,0.0019531h2.0371094 c0.6298828,0,1.1416016-0.2929688,1.1416016-0.6513672L25.0288086,0.652832 C25.0288086,0.2929688,24.5170898,0.0009766,23.887207,0.0009766z M7.340332,10.9155273H3.0019531V3.1391602h1.0146484v6.9326172 H7.340332V10.9155273z M9.4628906,10.9155273H8.4477539V3.1391602h1.0151367V10.9155273z M14.0317383,10.9155273h-1.1074219 l-2.5498047-7.7763672h1.0961914l1.2109375,3.8300781c0.3237305,1.0507813,0.612793,1.9960938,0.831543,2.9082031h0.0234375 c0.2197266-0.9013672,0.53125-1.8818359,0.8886719-2.8969727l1.3154297-3.8413086h1.0722656L14.0317383,10.9155273z M22.027832,10.9155273h-4.3867188V3.1391602h4.2128906v0.8422852h-3.1962891v2.4575195h3.0117188v0.8305664h-3.0117188v2.8041992 h3.3701172V10.9155273z"/> </svg>',
        liveOff: '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:a="http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/" x="0px" y="0px" width="26px" height="24px" viewBox="-0.034668 -0.8662109 26 24" enable-background="new -0.034668 -0.8662109 26 24" xml:space="preserve"> <defs> </defs> <path fill="#C12337" d="M6.9995117,15.390625H3.0019531V7.6142578h1.0146484v6.9326172H7.340332v0.4482422l1.1074219-1.2851563 V7.6142578h1.0151367V12.53125l1.828125-2.1225586l-0.9165039-2.7944336h1.0961914l0.5981445,1.8916016l4.3320313-5.0302734 L3.1806641,4.4750977H1.1430664c-0.6279297,0-1.1386719,0.2900391-1.1411133,0.6479492L0.0009766,16.7148438L0,17.8789063 c0.0009766,0.3574219,0.5117188,0.6494141,1.1420898,0.6494141H4.296875L6.9995117,15.390625z"/> <path fill="#C12337" d="M23.887207,4.4760742h-2.0361328h-3.3583984l-2.703125,3.1381836h1.0234375l-2.78125,7.7763672h-1.1074219 l-1.0566406-3.2226563l-2.4047852,2.7919922v0.4306641H9.0922852l-2.703125,3.1376953l15.4599609,0.0019531h2.0371094 c0.6298828,0,1.1416016-0.2929688,1.1416016-0.6513672l0.0009766-12.7509766 C25.0288086,4.7680664,24.5170898,4.4760742,23.887207,4.4760742z M22.027832,15.390625h-4.3867188V7.6142578h4.2128906V8.456543 h-3.1962891v2.4575195h3.0117188v0.8305664h-3.0117188v2.8041992h3.3701172V15.390625z"/> <path fill="#C12337" d="M13.5131836,14.3525391h0.0234375c0.2197266-0.9013672,0.53125-1.8818359,0.8886719-2.8969727 l1.2832031-3.7460938l-3.078125,3.5732422l0.0512695,0.1616211C13.0053711,12.4951172,13.2944336,13.4404297,13.5131836,14.3525391z "/> <polygon id="StreamsWebrtcCrossline_1_" points="22.6928711,1.0341797 21.4916992,0 2.5673828,21.9707031 3.7685547,23.0058594 "/> </svg>',
        disabledEnabledSpeaker: '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="25px" height="24px" viewBox="0 0 25 24" enable-background="new 0 0 25 24" xml:space="preserve"> <path d="M9.302,19.907c0.061,0.034,0.078,0.159,0.147,0.17c0.024,0.004,0.059,0.005,0.084,0.001 c0.025-0.001,0.063-0.006,0.088-0.016c0.048-0.021,0.115-0.049,0.15-0.088c0.018-0.02,0.075-0.043,0.088-0.064 c0.034-0.063,0.122-0.083,0.122-0.151H9.979v-4.622l-2.738,3.178L9.302,19.907z"/> <polygon class="StreamsWebrtcDisabledparts" points="5.986,17.345 7.241,18.314 9.979,15.137 9.979,12.707 "/> <path d="M9.979,3.246c0-0.026-0.087-0.053-0.092-0.079C9.875,3.116,9.765,3.068,9.729,3.029C9.711,3.01,9.69,2.992,9.669,2.977 C9.647,2.962,9.622,2.951,9.599,2.94c-0.025-0.006-0.05-0.016-0.077-0.022c-0.07,0.003-0.091-0.011-0.156,0.017 c-0.023,0.01-0.045,0.011-0.067,0.024L4.591,6.464H0.603c-0.028,0-0.064,0.033-0.09,0.04c-0.054,0.015-0.11,0.073-0.15,0.113 C0.343,6.638,0.312,6.66,0.299,6.683C0.285,6.708,0.248,6.734,0.241,6.761C0.234,6.788,0.179,6.817,0.179,6.845v9.317 c0,0.029,0.055,0.044,0.062,0.07c0.007,0.026,0.069,0.039,0.083,0.063c0.029,0.05,0.068,0.063,0.118,0.09 c0.024,0.015,0.05-0.03,0.077-0.021c0.028,0.004,0.056-0.1,0.084-0.1H4.59l1.396,1.079l3.993-4.638V3.246z"/> <g id="StreamsWebrtcWaves"> <path class="StreamsWebrtcWaves1" d="M14.483,7.478c-0.949-2.085-2.251-3.412-2.282-3.443c-0.184-0.182-0.479-0.181-0.66,0.002 c-0.182,0.183-0.182,0.478,0.004,0.66c0.121,0.121,1.444,1.467,2.297,3.525l0.35-0.406L14.483,7.478z"/> <path class="StreamsWebrtcWaves1" d="M14.394,10.011c0.475,2.369,0.058,5.299-2.856,8.301c-0.178,0.185-0.174,0.48,0.01,0.662 c0.09,0.086,0.207,0.129,0.324,0.129c0.123,0,0.246-0.045,0.336-0.138c3.443-3.549,3.648-7.058,2.899-9.783l-0.063,0.074 L14.394,10.011z"/> <path class="StreamsWebrtcWaves2" d="M16.937,4.629c-0.997-1.646-1.97-2.637-2.001-2.667c-0.182-0.181-0.477-0.181-0.658,0.003 c-0.185,0.183-0.185,0.478,0.004,0.66c0.116,0.117,1.094,1.115,2.045,2.714l0.392-0.455L16.937,4.629z"/> <path class="StreamsWebrtcWaves2" d="M17.113,6.853c1.516,3.375,2.169,8.372-2.842,13.536c-0.178,0.182-0.174,0.479,0.012,0.659 c0.09,0.086,0.207,0.132,0.324,0.132c0.121,0,0.242-0.048,0.336-0.144c5.503-5.673,4.534-11.267,2.8-14.915l-0.028,0.033 L17.113,6.853z"/> <path class="StreamsWebrtcWaves1 StreamsWebrtcDisabledparts" d="M14.191,7.815l-0.35,0.406c0.228,0.55,0.423,1.148,0.552,1.79l0.649-0.754l0.063-0.074 c-0.168-0.612-0.385-1.182-0.623-1.706L14.191,7.815z"/> <path class="StreamsWebrtcDisabledparts StreamsWebrtcWaves2" d="M16.718,4.884l-0.392,0.455c0.272,0.457,0.54,0.964,0.787,1.514l0.602-0.698l0.028-0.033 c-0.258-0.543-0.533-1.042-0.807-1.492L16.718,4.884z"/> </g> <polygon id="StreamsWebrtcCrossline" points="20.305,1.034 19.104,0 0.179,21.971 1.38,23.006 "/> </svg>',
        enabledMicrophone: '<svg width="5.3250041mm" height="6.8486948mm" viewBox="0 0 5.3250041 6.8486948" version="1.1" id="svg502" xml:space="preserve" inkscape:version="1.2.1 (9c6d41e, 2022-07-14)" sodipodi:docname="disabled_mic.svg" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg"><sodipodi:namedview id="namedview504" pagecolor="#ffffff" bordercolor="#000000" borderopacity="0.25" inkscape:showpageshadow="2" inkscape:pageopacity="0.0" inkscape:pagecheckerboard="0" inkscape:deskcolor="#d1d1d1" inkscape:document-units="mm" showgrid="false" inkscape:zoom="24.2312" inkscape:cx="-0.43332563" inkscape:cy="14.031497" inkscape:window-width="1920" inkscape:window-height="1029" inkscape:window-x="0" inkscape:window-y="27" inkscape:window-maximized="1" inkscape:current-layer="svg502" /><defs id="defs499" /><g inkscape:groupmode="layer" id="layer2" inkscape:label="Layer 2" transform="translate(0.02559968)" style="display:inline"><path d="m 84.259657,41.975451 c 0.0015,0.07894 0.06647,0.141484 0.145411,0.139982 0.04048,-7.58e-4 0.07458,-0.01762 0.100396,-0.04443 0.02581,-0.02682 0.04031,-0.06253 0.04058,-0.102012 -0.01952,-1.026205 -0.870338,-1.845253 -1.895513,-1.824736 -0.07894,0.0015 -0.141485,0.06647 -0.139983,0.145411 0.0015,0.07894 0.06647,0.141484 0.145412,0.139984 0.867335,-0.01548 1.587177,0.677474 1.603696,1.545803 z" id="path239-2" style="display:inline;stroke-width:0.14315" class="StreamsWebrtcMicIconWawe2" transform="translate(-79.823299,-40.143779)" /><path d="m 83.832255,42.12633 c 0.04048,-7.58e-4 0.07458,-0.01762 0.100395,-0.04443 0.02581,-0.02682 0.04032,-0.06253 0.04058,-0.102012 -0.01351,-0.710452 -0.602385,-1.277331 -1.312835,-1.263814 -0.07894,0.0015 -0.141483,0.06647 -0.139983,0.145411 0.0015,0.07894 0.06647,0.141484 0.145414,0.139983 0.552571,-0.01051 1.010465,0.430284 1.020978,0.982856 0.0015,0.08097 0.06651,0.143508 0.145449,0.142006 z" id="path241" style="stroke-width:0.14315" class="StreamsWebrtcMicIconWawe1" transform="translate(-79.823299,-40.143779)" /><path d="m 237.541,328.897 c 25.128,0 46.632,-8.946 64.523,-26.83 17.888,-17.884 26.833,-39.399 26.833,-64.525 V 91.365 c 0,-25.126 -8.938,-46.632 -26.833,-64.525 C 284.173,8.951 262.669,0 237.541,0 212.416,0 190.909,8.951 173.017,26.84 155.124,44.73 146.179,66.239 146.179,91.365 v 146.177 c 0,25.125 8.949,46.641 26.838,64.525 17.889,17.884 39.399,26.83 64.524,26.83 z" id="path375" transform="matrix(0.01221113,0,0,0.01221113,-0.29021299,1.047319)" inkscape:label="path375" /><path d="m 396.563,188.15 c -3.606,-3.617 -7.898,-5.426 -12.847,-5.426 -4.944,0 -9.226,1.809 -12.847,5.426 -3.613,3.616 -5.421,7.898 -5.421,12.845 v 36.547 c 0,35.214 -12.518,65.333 -37.548,90.362 -25.022,25.03 -55.145,37.545 -90.36,37.545 -35.214,0 -65.334,-12.515 -90.365,-37.545 -25.028,-25.022 -37.541,-55.147 -37.541,-90.362 v -36.547 c 0,-4.947 -1.809,-9.229 -5.424,-12.845 -3.617,-3.617 -7.895,-5.426 -12.847,-5.426 -4.952,0 -9.235,1.809 -12.85,5.426 -3.618,3.616 -5.426,7.898 -5.426,12.845 v 36.547 c 0,42.065 14.04,78.659 42.112,109.776 28.073,31.118 62.762,48.961 104.068,53.526 v 37.691 h -73.089 c -4.949,0 -9.231,1.811 -12.847,5.428 -3.617,3.614 -5.426,7.898 -5.426,12.847 0,4.941 1.809,9.233 5.426,12.847 3.616,3.614 7.898,5.428 12.847,5.428 h 182.719 c 4.948,0 9.236,-1.813 12.847,-5.428 3.621,-3.613 5.431,-7.905 5.431,-12.847 0,-4.948 -1.81,-9.232 -5.431,-12.847 -3.61,-3.617 -7.898,-5.428 -12.847,-5.428 h -73.08 v -37.691 c 41.299,-4.565 75.985,-22.408 104.061,-53.526 28.076,-31.117 42.12,-67.711 42.12,-109.776 v -36.547 c 0,-4.946 -1.813,-9.225 -5.435,-12.845 z" id="path377" transform="matrix(0.01221113,0,0,0.01221113,-0.29021299,1.047319)" /></g></svg>',
        disabledMicrophone: '<svg width="5.3250041mm" height="6.8486948mm" viewBox="0 0 5.3250041 6.8486948" version="1.1" id="svg502" xml:space="preserve" inkscape:version="1.2.1 (9c6d41e, 2022-07-14)" sodipodi:docname="disabled_mic.svg" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg"><sodipodi:namedview id="namedview504" pagecolor="#ffffff" bordercolor="#000000" borderopacity="0.25" inkscape:showpageshadow="2" inkscape:pageopacity="0.0" inkscape:pagecheckerboard="0" inkscape:deskcolor="#d1d1d1" inkscape:document-units="mm" showgrid="false" inkscape:zoom="24.2312" inkscape:cx="-0.43332563" inkscape:cy="14.031497" inkscape:window-width="1920" inkscape:window-height="1029" inkscape:window-x="0" inkscape:window-y="27" inkscape:window-maximized="1" inkscape:current-layer="svg502" /><defs id="defs499" /><g inkscape:label="Layer 1" inkscape:groupmode="layer" id="layer1" transform="translate(-79.802132,-40.143836)" style="display:inline"><path id="path239-2-9" style="display:inline;stroke-width:0.14315" class="StreamsWebrtcMicIconWawe2" d="M 2.9005981,0 C 2.8846674,-8.6953191e-5 2.8690742,1.9618652e-4 2.8530558,5.1676432e-4 2.7741159,0.00201676 2.7115107,0.06678662 2.7130127,0.14572754 c 0.0015,0.0789399 0.066269,0.14154313 0.1452108,0.14004313 0.6791554,-0.0121214 1.2677117,0.41009432 1.4991333,1.01079103 L 4.565096,1.0552327 C 4.2653668,0.43311249 3.630306,0.0039829 2.9005981,0 Z M 4.7175415,1.5208374 4.4612264,1.8184937 c 1.221e-4,0.00446 4.318e-4,0.00897 5.168e-4,0.013436 0.0015,0.07894 0.066787,0.1410284 0.1457275,0.1395264 0.04048,-7.58e-4 0.074436,-0.017632 0.1002523,-0.044442 0.02581,-0.02682 0.040554,-0.062321 0.040824,-0.1018026 C 4.746577,1.7214388 4.735837,1.6197193 4.7175415,1.5208374 Z M 3.751709,2.642216 1.903243,4.7878215 c 0.207074,0.1837261 0.4513688,0.2759521 0.7327718,0.2759521 0.306841,0 0.5695964,-0.1092449 0.7880656,-0.3276286 C 3.6425128,4.5177614 3.751709,4.254896 3.751709,3.9480794 Z M 1.6117879,5.1263021 1.3198161,5.4647827 c 0.30817,0.2717762 0.6725019,0.431023 1.0929565,0.4774902 v 0.4599203 h -0.892452 c -0.060433,0 -0.1124242,0.022495 -0.1565796,0.066663 -0.044168,0.044131 -0.066663,0.096146 -0.066663,0.1565796 0,0.060335 0.022495,0.1129654 0.066663,0.1570963 0.044155,0.044131 0.096146,0.066146 0.1565796,0.066146 H 3.751709 c 0.060421,0 0.1124852,-0.022003 0.1565796,-0.066146 0.044216,-0.044119 0.066663,-0.096749 0.066663,-0.1570963 0,-0.060421 -0.022446,-0.1124364 -0.066663,-0.1565796 C 3.8642066,6.4246878 3.8121413,6.4021932 3.751709,6.4021932 H 2.859257 V 5.9422729 C 3.363564,5.8865292 3.7871411,5.6685517 4.1299805,5.2885661 4.4728198,4.9085928 4.644161,4.4617401 4.644161,3.9480794 V 3.5015951 c 0,-0.060396 -0.021917,-0.1123754 -0.066146,-0.1565796 -0.044033,-0.044168 -0.096663,-0.066663 -0.1570963,-0.066663 -0.060372,0 -0.1123632,0.022495 -0.1565796,0.066663 -0.044119,0.044156 -0.066663,0.096172 -0.066663,0.1565796 v 0.4464843 c 0,0.4300024 -0.1527257,0.7976598 -0.45837,1.1032919 -0.3055462,0.3056443 -0.6732773,0.4583699 -1.1032918,0.4583699 -0.3933915,0 -0.7349131,-0.1276249 -1.0242264,-0.3834391 z M 1.3198161,5.4647827 c -0.8798774,-3.6431885 -0.4399387,-1.8215942 0,0 z M 1.0319784,5.1567912 1.3311849,4.8095256 C 1.1598178,4.5572928 1.074353,4.2700829 1.074353,3.9480794 V 3.5015951 c 0,-0.060408 -0.02252,-0.1124242 -0.066663,-0.1565796 -0.0441675,-0.044168 -0.0961101,-0.066663 -0.15657956,-0.066663 -0.0604694,0 -0.11295317,0.022495 -0.15709635,0.066663 -0.0441799,0.044156 -0.0661458,0.096172 -0.0661458,0.1565796 v 0.4464843 c 0,0.4554054 0.13465463,0.8583833 0.40411011,1.2087118 z M 1.6386597,4.4524414 3.7418905,2.01073 C 3.7111124,1.7684747 3.6054921,1.5565014 3.4240804,1.3751099 3.2056112,1.1566652 2.9428558,1.0474813 2.6360148,1.0474813 c -0.3068043,0 -0.5695843,0.1091839 -0.7880656,0.3276286 -0.2184936,0.2184568 -0.3276286,0.481249 -0.3276286,0.7880656 v 1.7849039 c 0,0.184067 0.039697,0.3520807 0.1183391,0.504362 z M 3.8891683,1.839681 4.1382487,1.5508097 C 3.9969597,0.98002029 3.4750777,0.56041034 2.8628743,0.57205811 c -0.07894,0.0015 -0.1415431,0.0667866 -0.1400431,0.14572753 0.0015,0.0789399 0.066267,0.14154413 0.1452108,0.14004314 C 3.4202676,0.84732534 3.878104,1.2875939 3.8891683,1.839681 Z" transform="translate(79.802132,40.143836)" sodipodi:nodetypes="scccccscccccccsccccssscccccscscsscscscccsscscsssscccccsscscsscccssscscccc" /><polygon class="StreamsWebrtcMicIconCrossline" points="20.305,1.034 19.104,0 0.179,21.971 1.38,23.006 " transform="matrix(0.26458333,0,0,0.26458333,79.754772,40.268055)" style="font-variation-settings:normal;display:inline;opacity:1;vector-effect:none;fill-opacity:1;stroke-width:1;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1;-inkscape-stroke:none;stop-color:#000000;stop-opacity:1" id="polygon2082" /></g></svg>',
        playIcon: '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="44px" height="50px" viewBox="-0.53 0 44 50" enable-background="new -0.53 0 44 50" xml:space="preserve"> <defs> </defs> <polygon points="0,0 43.143,24.91 0,49.82 "/> </svg>',
        pauseIcon: '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="44px" height="51px" viewBox="-0.53 -0.91 44 51" enable-background="new -0.53 -0.91 44 51" xml:space="preserve"> <defs> </defs> <rect width="16.173" height="50"/> <rect x="26.97" y="0.09" width="16.173" height="50"/> </svg>',
        reload: '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" xmlns:xlink="http://www.w3.org/1999/xlink" enable-background="new 0 0 512 512"> <g> <g> <path d="m146.2,86.1c68.3-43.8 155.5-41.9 221.2,1.1l-20.3,2.5c-11.2,1.4-19.1,11.6-17.8,22.8 1.3,10.3 10.1,17.9 20.2,17.9 0.8,0 72.4-8.8 72.4-8.8 5.4-0.7 10.3-3.4 13.6-7.7 3.3-4.3 4.8-9.7 4.1-15.1l-8.7-69.9c-1.4-11.2-11.7-19.2-22.8-17.7-11.2,1.4-19.1,11.6-17.7,22.8l2.7,21.3c-79.3-53.9-185.8-57-268.9-3.6-97.1,62.3-137.5,185.5-96.1,293 3.1,8.1 13.2,16.2 26.4,11.7 10.7-3.7 15.8-15.9 11.7-26.4-34.4-89.5-0.8-192 80-243.9z"/> <path d="m484,168.4c-3.1-8.1-13.2-16.2-26.4-11.7-10.7,3.7-15.8,15.9-11.7,26.4 34.5,89.5 0.8,192-80,243.9-68.3,43.8-155.5,41.9-221.2-1.1l20.3-2.5c11.2-1.4 19.1-11.6 17.8-22.8-1.3-10.3-10.1-17.9-20.2-17.9-0.8,0-72.4,8.8-72.4,8.8-5.4,0.7-10.3,3.4-13.6,7.7-3.3,4.3-4.8,9.7-4.1,15.1l8.7,69.9c1.4,11.2 11.7,19.2 22.8,17.7 11.2-1.4 19.1-11.6 17.7-22.8l-2.7-21.3c79.4,53.8 185.9,56.9 269.1,3.5 96.9-62.2 137.3-185.4 95.9-292.9z"/> </g> </g> </svg>',
        sourcesEnabledMic: '<svg width="5.0271811mm" height="5.8011966mm" viewBox="0 0 5.0271812 5.8011965" version="1.1" id="svg502" xml:space="preserve" inkscape:version="1.2.1 (9c6d41e, 2022-07-14)" sodipodi:docname="enabled_mic.svg" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg"><sodipodi:namedview id="namedview504" pagecolor="#ffffff" bordercolor="#000000" borderopacity="0.25" inkscape:showpageshadow="2" inkscape:pageopacity="0.0" inkscape:pagecheckerboard="0" inkscape:deskcolor="#d1d1d1" inkscape:document-units="mm" showgrid="false" inkscape:zoom="12.1156" inkscape:cx="21.831358" inkscape:cy="-0.5364984" inkscape:window-width="1920" inkscape:window-height="1056" inkscape:window-x="1920" inkscape:window-y="0" inkscape:window-maximized="1" inkscape:current-layer="layer2" /><defs id="defs499" /><g inkscape:groupmode="layer" id="layer2" inkscape:label="Layer 2" transform="translate(0.2122019,-0.75431366)" style="display:inline"><path id="path375" style="font-variation-settings:normal;display:inline;opacity:1;vector-effect:none;fill:#000000;fill-opacity:1;stroke-width:0.241944;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1;-inkscape-stroke:none;stop-color:#000000;stop-opacity:1" inkscape:label="path375" d="m 2.3835485,1.0473294 c -0.3068043,0 -0.5690675,0.1091839 -0.7875488,0.3276285 -0.2184935,0.2184569 -0.3281454,0.481249 -0.3281454,0.7880656 v 1.784904 c 0,0.3068044 0.1097007,0.569682 0.3281454,0.7880656 0.018172,0.018167 0.036509,0.035537 0.055294,0.052193 L 3.4992427,2.6425808 V 2.1630235 c 0,-0.3068166 -0.1091106,-0.569572 -0.3276286,-0.7880656 C 2.953145,1.1565133 2.6903895,1.0473294 2.3835485,1.0473294 Z M 3.4992427,3.2301419 1.9825394,4.9917914 c 0.1241043,0.047719 0.2576105,0.07183 0.4010091,0.07183 0.306841,0 0.5695965,-0.1092449 0.7880656,-0.3276286 C 3.3900466,4.5176095 3.4992427,4.2547441 3.4992427,3.9479275 Z M 1.6776484,5.3452582 1.3805089,5.6904568 C 1.6146071,5.8263862 1.8742235,5.9105041 2.1603063,5.942121 v 0.460437 h -0.892452 c -0.060433,0 -0.1124242,0.021978 -0.1565796,0.066146 -0.044168,0.044131 -0.066146,0.096146 -0.066146,0.1565796 0,0.060335 0.021978,0.1129654 0.066146,0.1570963 0.044155,0.044131 0.096147,0.066146 0.1565796,0.066146 h 2.2313884 c 0.060421,0 0.113002,-0.022003 0.1570963,-0.066146 0.044217,-0.044119 0.066146,-0.096749 0.066146,-0.1570963 0,-0.060421 -0.021929,-0.1124365 -0.066146,-0.1565796 C 3.6122571,6.4245359 3.559676,6.402558 3.4992427,6.402558 H 2.6067907 V 5.942121 C 3.1110976,5.8863773 3.5346748,5.6683998 3.8775141,5.2884142 4.2203534,4.9084408 4.3916946,4.4615882 4.3916946,3.9479275 V 3.5014431 c 0,-0.060396 -0.021917,-0.1123753 -0.066146,-0.1565796 -0.044033,-0.044168 -0.096664,-0.066146 -0.1570963,-0.066146 -0.060372,0 -0.1123632,0.021978 -0.1565796,0.066146 -0.044119,0.044156 -0.066146,0.096172 -0.066146,0.1565796 v 0.4464844 c 0,0.4300024 -0.1532424,0.7976597 -0.4588867,1.1032918 -0.3055471,0.3056443 -0.6732772,0.4588868 -1.1032918,0.4588868 -0.257637,0 -0.49291,-0.055127 -0.7058998,-0.1648479 z M 1.0678665,5.4651476 c -0.31040309,-2.7498752 -0.15520154,-1.3749376 0,0 z m 0,0 0.2919719,-0.3389974 C 1.3328391,5.1022852 1.3063501,5.0773118 1.2802567,5.0512193 0.97463678,4.7456727 0.82188671,4.3779421 0.82188671,3.9479275 V 3.5014431 c 0,-0.060408 -0.0220026,-0.1124241 -0.0661458,-0.1565796 -0.0441677,-0.044168 -0.0966269,-0.066146 -0.15709635,-0.066146 -0.0604694,0 -0.11295317,0.021978 -0.15709635,0.066146 -0.0441799,0.044156 -0.0661458,0.096172 -0.0661458,0.1565796 v 0.4464844 c 0,0.5136607 0.17139001,0.9605133 0.5141805,1.3404867 0.0571302,0.063327 0.11666579,0.1224111 0.17828359,0.1767334 z" sodipodi:nodetypes="sssssccsssccscscccccscscsscscscccsscscsscsccccccsscscsssc" transform="translate(0,-0.29301574)" /><g id="g867" transform="translate(0.81433722,0.29295158)"><path d="m 1.5692479,4.477502 c 0.3068413,0 0.5694294,-0.1092407 0.7878987,-0.3276246 C 2.5755793,3.9314937 2.6848079,3.6687712 2.6848079,3.3619543 V 1.576968 c 0,-0.306817 -0.1091431,-0.5694295 -0.3276613,-0.78792325 -0.2184693,-0.2184449 -0.4810574,-0.3277467 -0.7878987,-0.3277467 -0.3068046,0 -0.56942937,0.1093018 -0.78791097,0.3277467 C 0.56284323,1.0075018 0.45361463,1.270151 0.45361463,1.576968 v 1.7849863 c 0,0.3068047 0.1092774,0.5695394 0.3277223,0.7879231 0.218445,0.2183839 0.48110637,0.3276246 0.78791097,0.3276246 z" id="path375-3" inkscape:label="path375" style="display:inline;stroke-width:0.0122111" /><path d="m 3.5110313,2.7588222 c -0.044033,-0.044168 -0.096444,-0.066258 -0.1568764,-0.066258 -0.060372,0 -0.1126599,0.02209 -0.1568764,0.066258 -0.044119,0.044156 -0.066196,0.096444 -0.066196,0.156852 v 0.4462801 c 0,0.4300028 -0.152859,0.7977898 -0.4585036,1.1034221 C 2.3670315,4.771021 1.9991957,4.9238432 1.5691807,4.9238432 1.139178,4.9238432 0.77137883,4.771021 0.46572203,4.4653764 0.16010184,4.1598296 0.00730397,3.7919693 0.00730397,3.3619543 V 2.9156742 c 0,-0.060408 -0.0220899,-0.1126966 -0.0662332,-0.156852 -0.0441677,-0.044168 -0.0964069,-0.066258 -0.15687639,-0.066258 -0.0604695,0 -0.11276979,0.02209 -0.15691302,0.066258 -0.0441799,0.044156 -0.0662576,0.096444 -0.0662576,0.156852 v 0.4462801 c 0,0.5136611 0.17144426,0.9605152 0.5142351,1.3404889 0.34280297,0.379986 0.76639487,0.5978692 1.27078794,0.653613 V 5.8163059 H 0.45354753 c -0.060433,0 -0.112721,0.022114 -0.1568764,0.066282 -0.044168,0.044131 -0.066258,0.096443 -0.066258,0.1568763 0,0.060335 0.02209,0.1127454 0.066258,0.1568764 0.044155,0.044131 0.096444,0.066282 0.1568764,0.066282 H 2.6847529 c 0.060421,0 0.112782,-0.022139 0.1568764,-0.066282 0.044217,-0.044119 0.066319,-0.096529 0.066319,-0.1568764 0,-0.060421 -0.022102,-0.1127332 -0.066319,-0.1568763 C 2.7975473,5.83842 2.7451863,5.8163059 2.6847529,5.8163059 H 1.7923636 V 5.3560562 C 2.296671,5.3003124 2.7202263,5.0824292 3.063066,4.7024432 3.4059056,4.3224695 3.5773988,3.8756154 3.5773988,3.3619543 V 2.9156742 c 0,-0.060396 -0.022139,-0.1126478 -0.066368,-0.156852 z" id="path377" style="display:inline;stroke-width:0.0122111" /></g></g></svg>'
    }

    var _controlsToolIcons = []; 

    var ua = navigator.userAgent;
    var _isMobile = false;
    var _isiOS = false;
    var _isAndroid = false;
    var _isiOSCordova = false;
    var _isAndroidCordova = false;
    if (ua.indexOf('iPad') != -1 || ua.indexOf('iPhone') != -1 || ua.indexOf('iPod') != -1) _isiOS = true;
    if (ua.indexOf('Android') != -1) _isAndroid = true;
    if (ua.indexOf('Android') != -1 || ua.indexOf('iPhone') != -1) _isMobile = true;
    if (typeof cordova != 'undefined' && _isiOS) _isiOSCordova = true;
    if (typeof cordova != 'undefined' && _isAndroid) _isAndroidCordova = true;

    function copyToClipboard(el) {
        if(Q.info.platform === 'ios') {
            var oldContentEditable = el.contentEditable,
                oldReadOnly = el.readOnly,
                range = document.createRange();

            el.contentEditable = true;
            el.readOnly = false;
            range.selectNodeContents(el);

            var s = window.getSelection();
            s.removeAllRanges();
            s.addRange(range);

            el.setSelectionRange(0, 999999); // A big number, to cover anything that could be inside the element.

            el.contentEditable = oldContentEditable;
            el.readOnly = oldReadOnly;

            document.execCommand('copy');
            return;
        }
        var tempEl = document.createElement('textarea');
        tempEl.value = el.value || el.innerText;
        tempEl.setAttribute('readonly', '');
        tempEl.style.position = 'absolute';
        tempEl.style.left = '-9999px';
        document.body.appendChild(tempEl);
        var selected =
            document.getSelection().rangeCount > 0
                ? document.getSelection().getRangeAt(0)
                : false;
        tempEl.select();
        document.execCommand('copy');
        document.body.removeChild(tempEl);
        if (selected) {
            document.getSelection().removeAllRanges();
            document.getSelection().addRange(selected);
        }
    };

    /**
     * Streams/webrtc/control tool.
     * Users can chat with each other via WebRTC using Twilio or raw streams
     * @module Streams
     * @class Streams webrtc
     * @constructor
     * @param {Object} options
     *  Hash of possible options
     */
    Q.Tool.define("Streams/webrtc/livestreaming", function(options) {
            var tool = this;
            this.livestreamingEditor = null;

            /*if (!options.webRTClibraryInstance) {
                throw "Video room should be created";
            }*/

            _controlsToolIcons = tool.state.controlsTool.getIcons();

            //child tools
            tool.livestreamingEditor = null;
            tool.livestreamingCanvasComposerTool = null;
            tool.livestreamingRtmpSenderTool = null;
        },

        {
            managingScenes: true,
            managingVisualSources: true,
            managingAudioSources: true
        },

        {
            create: function() {
                if(this.livestreamingEditor != null) return this.livestreamingEditor;
                var tool = this;
                var _controlsTool = this.state.controlsTool;
                var _webrtcSignalingLib = this.state.webrtcSignalingLib;
                var _webrtcUserInterface = this.state.webrtcUserInterface;
                var desktopDialogEl = null;
                var mobileHorizontaldialogEl = null;
                var mobileVerticaldialogEl = null;
                var activeDialog = null;
                var isHidden = true;
                var dialogWidth = 996;

                var _dialogEl = null;
                var _previewEl = null;
                var _resizingElement = null;
                var _resizingElementTool = null;
                var _fileManagerTool = null;
                var _streamingCanvas = null;
                var _sourcesColumnEl = null;
                var _optionsColumnEl = null;


                var scenesInterfaceColumn = (function () {
                    var _scenesEl = null;
                    var _scenesList = [];
                    var _activeScene = null;

                    var SceneListItem = function (sceneInstance) {
                        var sceneListInstance = this;
                        this._title = sceneInstance.title;
                        this.itemEl = null;
                        this.sceneInstance = sceneInstance;
                        this.sourcesInterface = new SourcesInterface(this);
                        this.remove = function () {
                            var currentItem = this;
                            if (this.itemEl != null && this.itemEl.parentNode != null) this.itemEl.parentNode.removeChild(this.itemEl);
                            for (var i in _scenesList) {
                                if (_scenesList[i] == currentItem) {
                                    _scenesList.splice(i, 1);
                                    break;
                                }
                            }
                        };
                        this.isActive = function () {
                            var scenes = tool.livestreamingCanvasComposerTool.canvasComposer.getScenes();
                            for (let i in scenes) {
                                if (scenes[i] == this.sceneInstance) {
                                    return true;
                                }
                            }
                            return false;
                        };

                        var itemEl = document.createElement('DIV');
                        itemEl.className = 'live-editor-popup-scenes-item';
                        this.itemEl = itemEl;
                        this.itemEl.innerHTML = sceneInstance.title;

                        itemEl.addEventListener('click', function (e) {
                            selectScene(sceneListInstance);
                        })

                        sceneInstance.eventDispatcher.on('sourceAdded', function () {
                            sceneListInstance.sourcesInterface.update();
                        })

                        sceneInstance.eventDispatcher.on('sourceRemoved', function () {
                            sceneListInstance.sourcesInterface.update();
                        })

                        sceneInstance.eventDispatcher.on('sourceMoved', function () {
                            sceneListInstance.sourcesInterface.update();
                        })

                    }
                    Object.defineProperties(SceneListItem.prototype, {
                        'title': {
                            'set': function (val) {
                                this._title = val;
                                if (this.itemEl) this.itemEl.innerHTML = val;
                            },
                            'get': function (val) {
                                return this._title;
                            }
                        }
                    });

                    function addNewScene(name) {
                        console.log('addNewScene', name)
                        tool.livestreamingCanvasComposerTool.canvasComposer.createScene(name);
                        syncList();
                    }

                    function selectScene(sceneItem) {
                        console.log('selectScene', sceneItem, sceneItem.itemEl);
                        if (sceneItem.itemEl && !sceneItem.itemEl.classList.contains('live-editor-popup-scenes-item-active')) {
                            console.log('selectScene add class');
                            sceneItem.itemEl.classList.add('live-editor-popup-scenes-item-active');
                        }
                        var switchScene = _activeScene != sceneItem;
                        _activeScene = sceneItem;
                        let sources = _activeScene.sourcesInterface.visualSources.getSourcesList();
                        for(let s in sources) {
                            if(sources[s].resizingElement != null && sources[s].resizingElement.parentElement) {
                                sources[s].resizingElement.parentElement.removeChild(sources[s].resizingElement);
                            }
                        }
                        tool.livestreamingCanvasComposerTool.canvasComposer.selectScene(_activeScene.sceneInstance);
                        for (var i in _scenesList) {
                            if (_scenesList[i] == sceneItem) continue;
                            if (_scenesList[i].itemEl.classList.contains('live-editor-popup-scenes-item-active')) _scenesList[i].itemEl.classList.remove('live-editor-popup-scenes-item-active');
                        }

                        if(_resizingElement) _resizingElement.style.display = 'none';

                        if (_sourcesColumnEl) {
                            let sourceColAlreadyExists = _sourcesColumnEl.querySelector('.live-editor-popup-sources-inner');
                            if(sourceColAlreadyExists != null && sourceColAlreadyExists.parentElement) {
                                sourceColAlreadyExists.parentElement.removeChild(sourceColAlreadyExists);
                            }
                            
                            _sourcesColumnEl.appendChild(_activeScene.sourcesInterface.createSourcesCol());
                        }
                        _activeScene.sourcesInterface.update();
                        optionsColumn.update();
                    }

                    function moveSceneUp() {
                        console.log('moveUp');
                        tool.livestreamingCanvasComposerTool.canvasComposer.moveSceneUp(_activeScene.sceneInstance);

                        sortScenesList();
                    }

                    function moveSceneDown() {
                        console.log('moveSceneDown');
                        tool.livestreamingCanvasComposerTool.canvasComposer.moveSceneDown(_activeScene.sceneInstance);

                        sortScenesList();
                    }

                    function removeScene() {
                        console.log('removeScene', _activeScene);
                        if (_activeScene != null) {
                            let sceneToRemove = _activeScene;
                            let indexOfScreneToRemove;
                            let sceneToSwitchTo;
                            if (_scenesList.length > 1) {
                                for (let s in _scenesList) {
                                    if (_scenesList[s] == _activeScene) {
                                        indexOfScreneToRemove = s;
                                        break;
                                    }
                                }

                                if (_scenesList[indexOfScreneToRemove + 1] != null) {
                                    selectScene(_scenesList[indexOfScreneToRemove + 1]);
                                } else if (_scenesList[indexOfScreneToRemove - 1] != null) {
                                    selectScene(_scenesList[indexOfScreneToRemove - 1]);
                                }

                                tool.livestreamingCanvasComposerTool.canvasComposer.removeScene(sceneToRemove.sceneInstance);
                                syncList();
                            } else {
                                //at least once scene should exist
                            }

                        };
                    }

                    function addSceneItemToList(item) {
                        console.log('scenesInterface: addSceneItemToList', item, item.title)

                        if (item == null || _scenesEl == null) return;
                        _scenesList.push(item)
                        _scenesEl.appendChild(item.itemEl);
                    }

                    function sortScenesList() {
                        var listArr = _scenesList;
                        var listEl = _scenesEl;
                        var scenes = tool.livestreamingCanvasComposerTool.canvasComposer.getScenes();

                        console.log('sortList: scenes', scenes, listArr);

                        if (scenes.length !== listArr.length) {
                            return;
                        }
                        listArr.sort((a, b) => {
                            return scenes.findIndex(p => p === a.sceneInstance) - scenes.findIndex(p => p === b.sceneInstance);
                        });

                        console.log('sortList: listArr', listArr.map(el => { return el.itemEl.innerText }));
                        console.log('sortList: NOT sortedElements', Array.from(listEl.childNodes).map(el => { return el.innerText }))

                        listEl.innerHTML == '';
                        for (let e = 0; e < listArr.length; e++) {
                            listEl.appendChild(listArr[e].itemEl)
                        }

                    }

                    function syncList() {

                        console.log('scenes: syncList _scenesList', _scenesList.length);

                        for (let i = _scenesList.length - 1; i >= 0; i--) {
                            console.log('scenes: syncList _scenesList', _scenesList[i]);
                            if (_scenesList[i] == null) continue;

                            if (_scenesList[i].isActive() == false) {
                                console.log('scenes: syncList remove', _scenesList[i]);

                                _scenesList[i].remove();
                                continue;
                            }
                        }

                        var scenes = tool.livestreamingCanvasComposerTool.canvasComposer.getScenes();

                        console.log('scenesInterface: all', scenes);

                        for (let s in scenes) {
                            console.log('CONTROLS ADD SCENES', scenes[s])
                            console.log('CONTROLS ADD SOURCES', scenes[s].sources)
                            let sceneAlreadyExists = false;
                            for (let e in _scenesList) {
                                if (_scenesList[e].sceneInstance == scenes[s]) sceneAlreadyExists = true;
                            }
                            if (sceneAlreadyExists) continue;
                            console.log('scenesInterface: not exist')

                            var item = new SceneListItem(scenes[s])
                            addSceneItemToList(item);

                            if (_activeScene == null && s == 0) {
                                selectScene(item);
                            }

                        }
                        console.log('_scenesList', _scenesList)
                    }

                    window.sl = _scenesList;

                    var addNewScenePopup = (function () {
                        var _dialogEl = null;
                        var _isHidden = true;

                        console.log('addNewScenePopup')
                        var dialog = document.createElement('DIV');
                        dialog.className = 'live-editor-dialog-box live-editor-dialog-box-add-new-s live-editor-popup-add-scene live-editor-hidden';
                        _dialogEl = dialog;
                        var close = document.createElement('div');
                        close.className = 'live-editor-close-dialog-sign';
                        close.style.backgroundImage = 'url("' + Q.url("{{Q}}/img/close.png") + '"';
                        close.style.backgroundRepeat = 'no-repeat';
                        close.style.backgroundSize = 'cover';

                        var dialogTitle = document.createElement('H3');
                        dialogTitle.innerHTML = 'Add scene';
                        dialogTitle.className = 'live-editor-dialog-header Q_dialog_title';

                        var dialogInner = document.createElement('DIV');
                        dialogInner.className = 'live-editor-dialog-inner';
                        var boxContent = document.createElement('DIV');
                        boxContent.className = 'live-editor-popup-streaming-box live-editor-popup-box';

                        var sceneNameInputCon = document.createElement('DIV');
                        sceneNameInputCon.className = 'live-editor-dialog-name-con';
                        var sceneNameInputText = document.createElement('SPAN');
                        sceneNameInputText.className = 'live-editor-dialog-name-text';
                        sceneNameInputText.innerHTML = 'Please, enter name of scene';
                        var sceneNameInput = document.createElement('INPUT');
                        sceneNameInput.className = 'live-editor-dialog-name';
                        sceneNameInput.type = 'text';
                        sceneNameInput.placeholder = 'Enter name of scene';
                        sceneNameInput.name = 'nameOfScene';

                        var buttonsCon = document.createElement('DIV');
                        buttonsCon.className = 'live-editor-dialog-buttons';
                        var okButton = document.createElement('BUTTON');
                        okButton.className = 'live-editor-dialog-ok-btn';
                        okButton.innerHTML = 'OK';

                        sceneNameInputCon.appendChild(sceneNameInputText);
                        sceneNameInputCon.appendChild(sceneNameInput);
                        boxContent.appendChild(sceneNameInputCon);
                        buttonsCon.appendChild(okButton);
                        boxContent.appendChild(buttonsCon);
                        dialogInner.appendChild(dialogTitle);

                        dialog.appendChild(close);
                        dialogInner.appendChild(boxContent);
                        dialog.appendChild(dialogInner);

                        _webrtcUserInterface.roomsMediaContainer().appendChild(dialog);

                        setTimeout(function () {
                            Q.activate(
                                Q.Tool.setUpElement(
                                    dialog, // or pass an existing element
                                    "Q/resize",
                                    {
                                        move: true,
                                        activateOnElement: dialogTitle,
                                        resize: false,
                                        active: true,
                                        moveWithinArea: 'window',
                                    }
                                ),
                                {},
                                function () {

                                }
                            );
                        }, 3000)

                        var dialogWidth = 400;
                        dialog.style.width = dialogWidth + 'px';
                        console.log('dialogWidth', dialogWidth);
                        if (_isMobile) {
                            dialog.style.left = (window.innerWidth / 2) - (dialogWidth / 2) + 'px';
                            dialog.style.bottom = '10px';
                        } else {
                            dialog.style.left = (window.innerWidth / 2) - (dialogWidth / 2) + 'px';
                            dialog.style.top = (window.innerHeight / 2 - 100) + 'px';
                        }

                        close.addEventListener('click', function () {
                            hideDialog();
                        });

                        okButton.addEventListener('click', function () {
                            if (sceneNameInput.value != '') {
                                var val = sceneNameInput.value;
                                addNewScene(val);
                                hideDialog();
                                sceneNameInput.value = '';
                            }
                        });

                        function setDefaultSceneName() {
                            sceneNameInput.value = 'Scene ' + parseInt(_scenesList.length + 1)
                        }

                        function showDialog(e) {
                            sceneNameInput.value = '';
                            if (_dialogEl.classList.contains('live-editor-hidden')) {
                                _dialogEl.classList.remove('live-editor-hidden');
                                var _clientX = e.clientX;
                                var _clientY = e.clientY;

                                _isHidden = false;

                                if (_isMobile) {
                                    dialog.style.left = (window.innerWidth / 2) - (dialogWidth / 2) + 'px';
                                    dialog.style.top = '10px';
                                } else {
                                    dialog.style.left = (_clientX + 50) + 'px';
                                    dialog.style.top = (_clientY - 200) + 'px';
                                }
                                setDefaultSceneName();
                            }
                        }

                        function hideDialog() {
                            if (!_dialogEl.classList.contains('live-editor-hidden')) {
                                _dialogEl.classList.add('live-editor-hidden');
                                _isHidden = true;
                            }
                        }

                        function toggle(e) {
                            if (_isHidden) {
                                showDialog(e);
                            } else hideDialog(e);
                        }

                        return {
                            hideDialog: hideDialog,
                            showDialog: showDialog,
                            toggle: toggle
                        }
                    }())

                    function createScenesCol() {
                        var scenesColumn = document.createElement('DIV');
                        scenesColumn.className = 'live-editor-popup-scenes';
                        var scenesColumnBody = document.createElement('DIV');
                        scenesColumnBody.className = 'live-editor-popup-scenes-body';
                        var scenesColumnBodyInner = document.createElement('DIV');
                        scenesColumnBodyInner.className = 'live-editor-popup-scenes-body-inner';
                        scenesColumnBody.appendChild(scenesColumnBodyInner);

                        var scenesColumnControl = document.createElement('DIV');
                        scenesColumnControl.className = 'live-editor-popup-scenes-control';

                        var scenesColumnControlAddBtn = document.createElement('DIV');
                        scenesColumnControlAddBtn.className = 'live-editor-popup-scenes-control-btn live-editor-popup-scenes-control-btn-add';
                        if(!tool.state.managingScenes) scenesColumnControlAddBtn.classList.add('live-editor-inactive');
                        scenesColumnControlAddBtn.innerHTML = _streamingIcons.addItem;

                        scenesColumnControlAddBtn.addEventListener('click', function (event) {
                            addNewScenePopup.showDialog(event);
                        });

                        scenesColumnControl.appendChild(scenesColumnControlAddBtn);

                        var scenesColumnControlBtn = document.createElement('DIV');
                        scenesColumnControlBtn.className = 'live-editor-popup-scenes-control-btn live-editor-popup-scenes-control-btn-remove';
                        if(!tool.state.managingScenes) scenesColumnControlBtn.classList.add('live-editor-inactive');
                        scenesColumnControlBtn.innerHTML = _streamingIcons.removeItem;
                        scenesColumnControlBtn.addEventListener('click', function () {
                            removeScene();
                        })
                        scenesColumnControl.appendChild(scenesColumnControlBtn);

                        var scenesColumnControlBtn = document.createElement('DIV');
                        scenesColumnControlBtn.className = 'live-editor-popup-scenes-control-btn';
                        scenesColumnControlBtn.innerHTML = _streamingIcons.moveUp;
                        scenesColumnControlBtn.addEventListener('click', function () {
                            moveSceneUp();
                        })
                        scenesColumnControl.appendChild(scenesColumnControlBtn);
                        var scenesColumnControlBtn = document.createElement('DIV');
                        scenesColumnControlBtn.className = 'live-editor-popup-scenes-control-btn';
                        scenesColumnControlBtn.innerHTML = _streamingIcons.moveDown;
                        scenesColumnControlBtn.addEventListener('click', function () {
                            moveSceneDown();
                        })
                        scenesColumnControl.appendChild(scenesColumnControlBtn);

                        scenesColumnBody.appendChild(scenesColumnControl);
                        scenesColumn.appendChild(scenesColumnBody);
                        _scenesEl = scenesColumnBodyInner;
                        return scenesColumn;
                    }

                    function getActiveScene() {
                        return _activeScene;
                    }


                    return {
                        createScenesCol: createScenesCol,
                        syncList: syncList,
                        getActive: getActiveScene
                    }

                }())

                var scenesInterface = (function () {
                    var _scenesDropDownEl = null;
                    var _scenesList = [];
                    var _activeScene = null;

                    var SceneListItem = function (sceneInstance) {
                        var sceneListInstance = this;
                        this._title = sceneInstance.title;
                        this.itemEl = null;
                        this.sceneInstance = sceneInstance;
                        this.sourcesInterface = new SourcesInterface(this);
                        this.remove = function () {
                            var currentItem = this;
                            if (this.itemEl != null && this.itemEl.parentNode != null) this.itemEl.parentNode.removeChild(this.itemEl);
                            for (var i in _scenesList) {
                                if (_scenesList[i] == currentItem) {
                                    _scenesList.splice(i, 1);
                                    break;
                                }
                            }
                        };
                        this.isActive = function () {
                            var scenes = tool.livestreamingCanvasComposerTool.canvasComposer.getScenes();
                            for (let i in scenes) {
                                if (scenes[i] == this.sceneInstance) {
                                    return true;
                                }
                            }
                            return false;
                        };

                        var itemEl = document.createElement('OPTION');
                        itemEl.className = 'live-editor-popup-scenes-select-item';
                        itemEl.value = sceneInstance.id;
                        itemEl.innerHTML = sceneInstance.title;
                        this.itemEl = itemEl;

                        sceneInstance.eventDispatcher.on('sourceAdded', function () {
                            sceneListInstance.sourcesInterface.update();
                        })

                        sceneInstance.eventDispatcher.on('sourceRemoved', function () {
                            sceneListInstance.sourcesInterface.update();
                        })

                        sceneInstance.eventDispatcher.on('sourceMoved', function () {
                            sceneListInstance.sourcesInterface.update();
                        })

                    }
                    Object.defineProperties(SceneListItem.prototype, {
                        'title': {
                            'set': function (val) {
                                this._title = val;
                                if (this.itemEl) this.itemEl.innerHTML = val;
                            },
                            'get': function (val) {
                                return this._title;
                            }
                        }
                    });

                    function addNewScene(name) {
                        console.log('addNewScene', name)
                        tool.livestreamingCanvasComposerTool.canvasComposer.createScene(name);
                        syncList();
                    }

                    function selectScene(sceneIdOrObject) {
                        let sceneItem;
                        if(typeof sceneIdOrObject == 'string') {
                            sceneItem = _scenesList.filter(function(s){
                                return s.sceneInstance.id == sceneIdOrObject ? true : false;
                            })[0];
                        } else {
                            sceneItem = sceneIdOrObject;
                        }

                        if(!sceneItem) {
                            return;
                        }

                        if (sceneItem.itemEl) {
                            console.log('selectScene make selected');
                            sceneItem.itemEl.selected = true;
                            //_scenesDropDownEl.dispatchEvent(new Event('change'));
                        }
                        var switchScene = _activeScene != sceneItem;
                        _activeScene = sceneItem;
                        let sources = _activeScene.sourcesInterface.visualSources.getSourcesList();
                        for(let s in sources) {
                            if(sources[s].resizingElement != null && sources[s].resizingElement.parentElement) {
                                sources[s].resizingElement.parentElement.removeChild(sources[s].resizingElement);
                            }
                        }
                        tool.livestreamingCanvasComposerTool.canvasComposer.selectScene(_activeScene.sceneInstance);
                        for (var i in _scenesList) {
                            if (_scenesList[i] == sceneItem) continue;
                            //if (_scenesList[i].itemEl.classList.contains('live-editor-popup-scenes-item-active')) _scenesList[i].itemEl.classList.remove('live-editor-popup-scenes-item-active');
                        }

                        if(_resizingElement) _resizingElement.style.display = 'none';

                        if (_sourcesColumnEl) {
                            let sourceColAlreadyExists = _sourcesColumnEl.querySelector('.live-editor-popup-sources-inner');
                            if(sourceColAlreadyExists != null && sourceColAlreadyExists.parentElement) {
                                sourceColAlreadyExists.parentElement.removeChild(sourceColAlreadyExists);
                            }

                            _sourcesColumnEl.appendChild(_activeScene.sourcesInterface.createSourcesCol());
                        }
                        _activeScene.sourcesInterface.update();
                        optionsColumn.update();
                    }

                    function moveSceneUp() {
                        console.log('moveUp');
                        tool.livestreamingCanvasComposerTool.canvasComposer.moveSceneUp(_activeScene.sceneInstance);

                        sortScenesList();
                    }

                    function moveSceneDown() {
                        console.log('moveSceneDown');
                        tool.livestreamingCanvasComposerTool.canvasComposer.moveSceneDown(_activeScene.sceneInstance);

                        sortScenesList();
                    }

                    function removeScene() {
                        console.log('removeScene', _activeScene);
                        if (_activeScene != null) {
                            let sceneToRemove = _activeScene;
                            let indexOfScreneToRemove;
                            let sceneToSwitchTo;
                            if (_scenesList.length > 1) {
                                for (let s in _scenesList) {
                                    if (_scenesList[s] == _activeScene) {
                                        indexOfScreneToRemove = s;
                                        break;
                                    }
                                }

                                if (_scenesList[indexOfScreneToRemove + 1] != null) {
                                    selectScene(_scenesList[indexOfScreneToRemove + 1]);
                                } else if (_scenesList[indexOfScreneToRemove - 1] != null) {
                                    selectScene(_scenesList[indexOfScreneToRemove - 1]);
                                }

                                tool.livestreamingCanvasComposerTool.canvasComposer.removeScene(sceneToRemove.sceneInstance);
                                syncList();
                            } else {
                                //at least once scene should exist
                            }

                        };
                    }

                    function addSceneItemToList(item) {
                        console.log('scenesInterface: addSceneItemToList', item, item.title)

                        if (item == null || _scenesDropDownEl == null) return;
                        _scenesList.push(item)
                        _scenesDropDownEl.appendChild(item.itemEl);
                    }

                    function sortScenesList() {
                        var listArr = _scenesList;
                        var listEl = _scenesDropDownEl;
                        var scenes = tool.livestreamingCanvasComposerTool.canvasComposer.getScenes();

                        console.log('sortList: scenes', scenes, listArr);

                        if (scenes.length !== listArr.length) {
                            return;
                        }
                        listArr.sort((a, b) => {
                            return scenes.findIndex(p => p === a.sceneInstance) - scenes.findIndex(p => p === b.sceneInstance);
                        });

                        console.log('sortList: listArr', listArr.map(el => { return el.itemEl.innerText }));
                        console.log('sortList: NOT sortedElements', Array.from(listEl.childNodes).map(el => { return el.innerText }))

                        listEl.innerHTML == '';
                        for (let e = 0; e < listArr.length; e++) {
                            listEl.appendChild(listArr[e].itemEl)
                        }

                    }

                    function syncList() {

                        console.log('scenes: syncList _scenesList', _scenesList.length);

                        for (let i = _scenesList.length - 1; i >= 0; i--) {
                            console.log('scenes: syncList _scenesList', _scenesList[i]);
                            if (_scenesList[i] == null) continue;

                            if (_scenesList[i].isActive() == false) {
                                console.log('scenes: syncList remove', _scenesList[i]);

                                _scenesList[i].remove();
                                continue;
                            }
                        }

                        var scenes = tool.livestreamingCanvasComposerTool.canvasComposer.getScenes();

                        console.log('scenesInterface: all', scenes);

                        for (let s in scenes) {
                            console.log('CONTROLS ADD SCENES', scenes[s])
                            console.log('CONTROLS ADD SOURCES', scenes[s].sources)
                            let sceneAlreadyExists = false;
                            for (let e in _scenesList) {
                                if (_scenesList[e].sceneInstance == scenes[s]) sceneAlreadyExists = true;
                            }
                            if (sceneAlreadyExists) continue;
                            console.log('scenesInterface: not exist')

                            var item = new SceneListItem(scenes[s])
                            addSceneItemToList(item);

                            if (_activeScene == null && s == 0) {
                                selectScene(item);
                            }

                        }
                        console.log('_scenesList', _scenesList)
                    }

                    window.sl = _scenesList;

                    var addNewScenePopup = (function () {
                        var _dialogEl = null;
                        var _isHidden = true;

                        console.log('addNewScenePopup')
                        var dialog = document.createElement('DIV');
                        dialog.className = 'live-editor-dialog-box live-editor-dialog-box-add-new-s live-editor-popup-add-scene live-editor-hidden';
                        _dialogEl = dialog;
                        var close = document.createElement('div');
                        close.className = 'live-editor-close-dialog-sign';
                        close.style.backgroundImage = 'url("' + Q.url("{{Q}}/img/close.png") + '"';
                        close.style.backgroundRepeat = 'no-repeat';
                        close.style.backgroundSize = 'cover';

                        var dialogTitle = document.createElement('H3');
                        dialogTitle.innerHTML = 'Add scene';
                        dialogTitle.className = 'live-editor-dialog-header Q_dialog_title';

                        var dialogInner = document.createElement('DIV');
                        dialogInner.className = 'live-editor-dialog-inner';
                        var boxContent = document.createElement('DIV');
                        boxContent.className = 'live-editor-popup-streaming-box live-editor-popup-box';

                        var sceneNameInputCon = document.createElement('DIV');
                        sceneNameInputCon.className = 'live-editor-dialog-name-con';
                        var sceneNameInputText = document.createElement('SPAN');
                        sceneNameInputText.className = 'live-editor-dialog-name-text';
                        sceneNameInputText.innerHTML = 'Please, enter name of scene';
                        var sceneNameInput = document.createElement('INPUT');
                        sceneNameInput.className = 'live-editor-dialog-name';
                        sceneNameInput.type = 'text';
                        sceneNameInput.placeholder = 'Enter name of scene';
                        sceneNameInput.name = 'nameOfScene';

                        var buttonsCon = document.createElement('DIV');
                        buttonsCon.className = 'live-editor-dialog-buttons';
                        var okButton = document.createElement('BUTTON');
                        okButton.className = 'live-editor-dialog-ok-btn';
                        okButton.innerHTML = 'OK';

                        sceneNameInputCon.appendChild(sceneNameInputText);
                        sceneNameInputCon.appendChild(sceneNameInput);
                        boxContent.appendChild(sceneNameInputCon);
                        buttonsCon.appendChild(okButton);
                        boxContent.appendChild(buttonsCon);
                        dialogInner.appendChild(dialogTitle);

                        dialog.appendChild(close);
                        dialogInner.appendChild(boxContent);
                        dialog.appendChild(dialogInner);

                        _webrtcUserInterface.roomsMediaContainer().appendChild(dialog);

                        setTimeout(function () {
                            Q.activate(
                                Q.Tool.setUpElement(
                                    dialog, // or pass an existing element
                                    "Q/resize",
                                    {
                                        move: true,
                                        activateOnElement: dialogTitle,
                                        resize: false,
                                        active: true,
                                        moveWithinArea: 'window',
                                    }
                                ),
                                {},
                                function () {

                                }
                            );
                        }, 3000)

                        var dialogWidth = 400;
                        dialog.style.width = dialogWidth + 'px';
                        console.log('dialogWidth', dialogWidth);
                        if (_isMobile) {
                            dialog.style.left = (window.innerWidth / 2) - (dialogWidth / 2) + 'px';
                            dialog.style.bottom = '10px';
                        } else {
                            dialog.style.left = (window.innerWidth / 2) - (dialogWidth / 2) + 'px';
                            dialog.style.top = (window.innerHeight / 2 - 100) + 'px';
                        }

                        close.addEventListener('click', function () {
                            hideDialog();
                        });

                        okButton.addEventListener('click', function () {
                            if (sceneNameInput.value != '') {
                                var val = sceneNameInput.value;
                                addNewScene(val);
                                hideDialog();
                                sceneNameInput.value = '';
                            }
                        });

                        function setDefaultSceneName() {
                            sceneNameInput.value = 'Scene ' + parseInt(_scenesList.length + 1)
                        }

                        function showDialog(e) {
                            sceneNameInput.value = '';
                            if (_dialogEl.classList.contains('live-editor-hidden')) {
                                _dialogEl.classList.remove('live-editor-hidden');
                                var _clientX = e.clientX;
                                var _clientY = e.clientY;

                                _isHidden = false;

                                if (_isMobile) {
                                    dialog.style.left = (window.innerWidth / 2) - (dialogWidth / 2) + 'px';
                                    dialog.style.top = '10px';
                                } else {
                                    dialog.style.left = (_clientX + 50) + 'px';
                                    dialog.style.top = (_clientY - 200) + 'px';
                                }
                                setDefaultSceneName();
                            }
                        }

                        function hideDialog() {
                            if (!_dialogEl.classList.contains('live-editor-hidden')) {
                                _dialogEl.classList.add('live-editor-hidden');
                                _isHidden = true;
                            }
                        }

                        function toggle(e) {
                            if (_isHidden) {
                                showDialog(e);
                            } else hideDialog(e);
                        }

                        return {
                            hideDialog: hideDialog,
                            showDialog: showDialog,
                            toggle: toggle
                        }
                    }())
                    
                    function CustomSelect(element, options) {
                        var selectInstance = this;
                        this.originalSelect = element;
                        this.customSelectEl = null;
                        this.selectContainerEl = null;
                        this.closeButtonEl = null;
                        this.customSelectListEl = null;
                        this.optionsList = [];
                        this.spaceForArrow = 0;
                        this.isShown = false;

                        this.syncOptionsList = function () {
                            let originalSelect = selectInstance.originalSelect;
                            let optionsNumber = originalSelect.options.length;
                            console.log('syncOptionsList optionsNumber', originalSelect.options);
                            for (let j = 0; j < optionsNumber; j++) {
                                /*check if option already exists in custom select*/
                                let optionAlreadyExists = false;
                                for(let l in selectInstance.optionsList) {
                                    if(selectInstance.optionsList[l].originalOptionEl == originalSelect.options[j]) {
                                        optionAlreadyExists = true;
                                    }
                                }
                                console.log('syncOptionsList optionAlreadyExists', optionAlreadyExists);

                                if(optionAlreadyExists) continue;
                                /*for each option in the original select element,
                                create a new DIV that will act as an option item:*/
                                let optionElement = document.createElement("DIV");
                                optionElement.innerHTML = originalSelect.options[j].innerHTML;
                                optionElement.dataset.selectValue = originalSelect.options[j].value;
                                optionElement.addEventListener("click", selectOption);
                                selectInstance.customSelectListEl.appendChild(optionElement);
                                selectInstance.optionsList.push({
                                    originalOptionEl: originalSelect.options[j],
                                    customOptionEl: optionElement,
                                    value: originalSelect.options[j].value
                                });
                            }
                       
                            for (let i = 0; i < optionsNumber; i++) {
                                if (originalSelect.options[i].selected == true) {
                                    for(let c in selectInstance.optionsList) {
                                        if (originalSelect.options[i].value == selectInstance.optionsList[c].value) {
                                            selectOption.call(selectInstance.optionsList[c].customOptionEl);
                                        }
                                    }
                                    break;
                                }
                            }

                            function selectOption(e) {
                                /*when an item is clicked, update the original select box,
                                and the selected item:*/
                                let originalSelect = selectInstance.originalSelect;
                                let optionsNumber = originalSelect.options.length;
                                for (let i = 0; i < optionsNumber; i++) {
                                    if (originalSelect.options[i].value == this.dataset.selectValue) {
                                        originalSelect.selectedIndex = i;
                                        selectInstance.customSelectEl.innerHTML = this.innerHTML;
                                        let currentlySelectedOptions = selectInstance.customSelectListEl.getElementsByClassName('live-editor-custom-select-same-as-selected');
                                        let selectedOptionsNum = currentlySelectedOptions.length;
                                        for (k = 0; k < selectedOptionsNum; k++) {
                                            currentlySelectedOptions[k].classList.remove('live-editor-custom-select-same-as-selected');
                                        }
                                        if (!this.classList.contains('live-editor-custom-select-same-as-selected')) this.classList.add('live-editor-custom-select-same-as-selected');
                                        break;
                                    }
                                }
                                selectInstance.hide();
                            }
                        };
                        this.hide = function (e) {
                            if (e && (e.target.offsetParent != selectInstance.customSelectListEl || e.target == this.closeButtonEl) || e == null) {
                                if (selectInstance.customSelectListEl.parentElement) selectInstance.customSelectListEl.parentElement.removeChild(selectInstance.customSelectListEl);
            
                                togglePopupClassName('', false, false);
            
                                window.removeEventListener('click', selectInstance.hide);
                                selectInstance.customSelectEl.classList.remove("live-editor-custom-select-arrow-active");
                                selectInstance.isShown = false;
                            }
                        }
            
                        this.show = function (e) {        
                            selectInstance.customSelectListEl.style.top = '';
                            selectInstance.customSelectListEl.style.left = '';
                            selectInstance.customSelectListEl.style.maxHeight = '';
                            selectInstance.customSelectListEl.style.maxWidth = '';
                            togglePopupClassName('', false, false);
                           
                            let triggeringElementRect = selectInstance.customSelectEl.getBoundingClientRect();
            
                            selectInstance.customSelectListEl.style.position = 'fixed';
                            selectInstance.customSelectListEl.style.visibility = 'hidden';
                            selectInstance.customSelectListEl.style.top = triggeringElementRect.y + triggeringElementRect.height + selectInstance.spaceForArrow + 'px';
                            selectInstance.customSelectListEl.style.left = (triggeringElementRect.x + (triggeringElementRect.width / 2)) + 'px';
                            selectInstance.customSelectListEl.style.width = (triggeringElementRect.width) + 'px';
                            
                            document.body.appendChild(selectInstance.customSelectListEl);
            
                            let popupRect = selectInstance.customSelectListEl.getBoundingClientRect();
                            selectInstance.customSelectListEl.style.left = ((triggeringElementRect.x + (triggeringElementRect.width / 2)) - (popupRect.width / 2)) + 'px';
            
                            //if ther is no room below (bottom) of button, show dialog above if there is enough room
            
                            let spaceForArrow = selectInstance.spaceForArrow;
                            let roomBelowButton = window.innerHeight - (triggeringElementRect.y + triggeringElementRect.height);
                            let roomBelowStartOfButton = window.innerHeight - triggeringElementRect.y;
                            let roomBelowMidOfButton = window.innerHeight - (triggeringElementRect.y + (triggeringElementRect.height / 2));
                            let roomAboveButton = triggeringElementRect.y;
                            let roomAboveEndOfButton = triggeringElementRect.y + triggeringElementRect.height;
                            let roomAboveMidOfButton = triggeringElementRect.y + (triggeringElementRect.height / 2);
                            let roomToLeftOfButton = triggeringElementRect.x;
                            let roomToRightOfStartOfButton = (window.innerWidth - triggeringElementRect.x);
                            let roomToLeftOfMidButton = triggeringElementRect.x + (triggeringElementRect.x / 2);
                            let roomToRightOfButton = (window.innerWidth - (triggeringElementRect.x + triggeringElementRect.width));
                            let roomToRightOfMidButton = (window.innerWidth - (triggeringElementRect.x + (triggeringElementRect.width / 2)));
                            let roomToLeftOfEndOfButton = triggeringElementRect.x + triggeringElementRect.width;
                            let midYOfTriggeringElement = triggeringElementRect.y + triggeringElementRect.height / 2;
                            let midXOfTriggeringElement = triggeringElementRect.x + triggeringElementRect.width / 2;
            
                            if (roomBelowButton >= popupRect.height + spaceForArrow) {
                                //console.log('show 1');
                                if (roomToLeftOfMidButton >= (popupRect.width / 2) && roomToRightOfMidButton >= (popupRect.width / 2)) {
                                    //console.log('show 1.1');
                                    selectInstance.customSelectListEl.style.top = triggeringElementRect.y + triggeringElementRect.height + spaceForArrow + 'px';
                                    selectInstance.customSelectListEl.style.left = ((triggeringElementRect.x + (triggeringElementRect.width / 2)) - (popupRect.width / 2)) + 'px';
            
                                    togglePopupClassName('live-editor-custom-select-mid-below-position', false, false);
                                } else if (roomToRightOfStartOfButton >= popupRect.width) {
                                    //console.log('show 1.2');
                                    selectInstance.customSelectListEl.style.top = triggeringElementRect.y + triggeringElementRect.height + spaceForArrow + 'px';
                                    selectInstance.customSelectListEl.style.left = (triggeringElementRect.x) + 'px';
            
                                    togglePopupClassName('live-editor-custom-select-right-below-position', false, false);
                                } else if (roomToLeftOfEndOfButton >= popupRect.width) {
                                    //console.log('show 1.3');
                                    selectInstance.customSelectListEl.style.top = triggeringElementRect.y + triggeringElementRect.height + spaceForArrow + 'px';
                                    selectInstance.customSelectListEl.style.left = (triggeringElementRect.x + triggeringElementRect.width) - popupRect.width + 'px';
            
                                    togglePopupClassName('live-editor-custom-select-left-below-position', false, false);
                                } else if (popupRect.width <= window.innerWidth) {
                                    //console.log('show 1.4');
                                    selectInstance.customSelectListEl.style.top = triggeringElementRect.y + triggeringElementRect.height + spaceForArrow + 'px';
                                    selectInstance.customSelectListEl.style.left = (triggeringElementRect.x - roomToLeftOfButton) + 'px';
            
                                    togglePopupClassName('live-editor-custom-select-winmid-below-position', false, false);
                                } else {
                                    //console.log('show 1.5');
                                    selectInstance.customSelectListEl.style.top = triggeringElementRect.y + triggeringElementRect.height + spaceForArrow + 'px';
                                    selectInstance.customSelectListEl.style.left = '0px';
            
                                    togglePopupClassName('live-editor-custom-select-fullwidth-below-position', true, false);
                                }
                            } else if(roomAboveButton >= popupRect.height + spaceForArrow) {
                                //console.log('show 2');
                                if (roomToLeftOfMidButton >= (popupRect.width / 2) && roomToRightOfMidButton >= (popupRect.width / 2)) {
                                    //console.log('show 2.1');
                                    selectInstance.customSelectListEl.style.top = (triggeringElementRect.y - popupRect.height - spaceForArrow) + 'px';
                                    selectInstance.customSelectListEl.style.left = ((triggeringElementRect.x + (triggeringElementRect.width / 2)) - (popupRect.width / 2)) + 'px';
                                    togglePopupClassName('live-editor-custom-select-mid-above-position', false, false);
                                } else if (roomToRightOfStartOfButton >= popupRect.width) {
                                    //console.log('show 2.2');
                                    selectInstance.customSelectListEl.style.top = (triggeringElementRect.y - popupRect.height - spaceForArrow) + 'px';
                                    selectInstance.customSelectListEl.style.left = (triggeringElementRect.x) + 'px';
            
                                    togglePopupClassName('live-editor-custom-select-right-above-position', false, false);
                                } else if (roomToLeftOfEndOfButton >= popupRect.width) {
                                    //console.log('show 2.3');
                                    selectInstance.customSelectListEl.style.top = (triggeringElementRect.y - popupRect.height - spaceForArrow) + 'px';
                                    selectInstance.customSelectListEl.style.left = (triggeringElementRect.x + triggeringElementRect.width - popupRect.width) + 'px';
            
                                    togglePopupClassName('live-editor-custom-select-left-above-position', false, false);
                                } else if (window.innerWidth >= popupRect.width) {
                                    //console.log('show 2.4');;
                                    selectInstance.customSelectListEl.style.top = (triggeringElementRect.y - popupRect.height - spaceForArrow) + 'px';
                                    selectInstance.customSelectListEl.style.left = (triggeringElementRect.x - popupRect.width / 2) + 'px';
            
                                    togglePopupClassName('live-editor-custom-select-winmid-above-position', false, false);
                                } else {
                                    //console.log('show 2.5');
                                    selectInstance.customSelectListEl.style.top = (triggeringElementRect.y - popupRect.height - spaceForArrow) + 'px';
                                    selectInstance.customSelectListEl.style.left = '0px';
            
                                    togglePopupClassName('live-editor-custom-select-fullwidth-above-position', true, false);
                                }
                            } else if (Math.min(roomBelowMidOfButton, roomAboveMidOfButton) >= popupRect.height / 2) {
                                //console.log('show 3');
                                if (roomToRightOfButton >= popupRect.width + spaceForArrow) {
                                    //console.log('show 3.1');
                                    selectInstance.customSelectListEl.style.top = midYOfTriggeringElement - (popupRect.height / 2) + 'px';
                                    selectInstance.customSelectListEl.style.left = (triggeringElementRect.x + triggeringElementRect.width + spaceForArrow) + 'px';
            
                                    togglePopupClassName('live-editor-custom-select-right-mid-position', false, false);
                                } else if (roomToLeftOfButton >= popupRect.width + spaceForArrow) {
                                    //console.log('show 3.2');
                                    selectInstance.customSelectListEl.style.top = midYOfTriggeringElement - (popupRect.height / 2) + 'px';
                                    selectInstance.customSelectListEl.style.left = (triggeringElementRect.x - popupRect.width - spaceForArrow) + 'px';
            
                                    togglePopupClassName('live-editor-custom-select-left-mid-position', false, false);
                                } else {
                                    //console.log('show 3.3');
                                    selectInstance.customSelectListEl.style.top = midYOfTriggeringElement - (popupRect.height / 2) + 'px';
                                    selectInstance.customSelectListEl.style.left = '0px';
            
                                    togglePopupClassName('live-editor-custom-select-fullwidth-mid-position', true, false);
                                }
                            } else if (roomBelowStartOfButton >= popupRect.height) {
                                //console.log('show 4');
                                if (roomToRightOfButton >= popupRect.width + spaceForArrow) {
                                    //console.log('show 4.1');
                                    selectInstance.customSelectListEl.style.top = triggeringElementRect.y + 'px';
                                    selectInstance.customSelectListEl.style.left = (triggeringElementRect.x + triggeringElementRect.width + spaceForArrow) + 'px';
            
                                    togglePopupClassName('live-editor-custom-select-right-belowtop-position', false, false);
                                } else if (roomToLeftOfButton >= popupRect.width + spaceForArrow) {
                                    //console.log('show 4.2');
                                    selectInstance.customSelectListEl.style.top = (triggeringElementRect.y) + 'px';
                                    selectInstance.customSelectListEl.style.left = (triggeringElementRect.x - popupRect.width - spaceForArrow) + 'px';
            
                                    togglePopupClassName('live-editor-custom-select-left-belowtop-position', false, false);
                                } else {
                                    //console.log('show 4.3');
                                    selectInstance.customSelectListEl.style.top = (triggeringElementRect.y) + 'px';
                                    selectInstance.customSelectListEl.style.left = '0px';
            
                                    togglePopupClassName('live-editor-custom-select-fullwidth-belowtop-position', true, false);
                                }
                            } else if (roomAboveEndOfButton >= popupRect.height) {
                                //console.log('show 5');
                                if (roomToRightOfButton >= popupRect.width + spaceForArrow) {
                                    //console.log('show 5.1');
                                    selectInstance.customSelectListEl.style.top = (triggeringElementRect.y + triggeringElementRect.height - popupRect.height) + 'px';
                                    selectInstance.customSelectListEl.style.left = (triggeringElementRect.x + triggeringElementRect.width + spaceForArrow) + 'px';
            
                                    togglePopupClassName('live-editor-custom-select-right-abovebottom-position', false, false);
                                } else if (roomToLeftOfButton >= popupRect.width + spaceForArrow) {
                                    //console.log('show 5.2');
                                    selectInstance.customSelectListEl.style.top = (triggeringElementRect.y + triggeringElementRect.height - popupRect.height) + 'px';
                                    selectInstance.customSelectListEl.style.left = (triggeringElementRect.x - popupRect.width - spaceForArrow) + 'px';
            
                                    togglePopupClassName('live-editor-custom-select-left-abovebottom-position', false, false);
                                } else {
                                    //console.log('show 5.3');
                                    selectInstance.customSelectListEl.style.top = (triggeringElementRect.y + triggeringElementRect.height - popupRect.height) + 'px';
                                    selectInstance.customSelectListEl.style.left = '0px';
            
                                    togglePopupClassName('live-editor-custom-select-fullwidth-abovebottom-position', false, false);
                                }
                            } else if(popupRect.height + spaceForArrow < window.innerHeight) {
                                //console.log('show 6');
                                if (roomToRightOfButton >= popupRect.width + spaceForArrow) {
                                    //console.log('show 6.1');
                                    selectInstance.customSelectListEl.style.top = (window.innerHeight / 2) - (popupRect.height / 2) + 'px';
                                    selectInstance.customSelectListEl.style.left = (triggeringElementRect.x + triggeringElementRect.width + spaceForArrow) + 'px';
                                    togglePopupClassName('live-editor-custom-select-right-winmid-position', false, false);
            
                                } else if (roomToLeftOfButton >= popupRect.width + spaceForArrow) {
                                    //console.log('show 6.2');
            
                                    selectInstance.customSelectListEl.style.top = (window.innerHeight / 2) - (popupRect.height / 2) + 'px';
                                    selectInstance.customSelectListEl.style.left = (triggeringElementRect.x - spaceForArrow - popupRect.width) + 'px';
                                    togglePopupClassName('live-editor-custom-select-left-winmid-position', false, false);
                                } else if(popupRect.width <= window.innerWidth) {
                                    //console.log('show 6.3');
            
                                    selectInstance.customSelectListEl.style.top = (window.innerHeight / 2) - (popupRect.height / 2) + 'px';
                                    selectInstance.customSelectListEl.style.left = (triggeringElementRect.x - roomToLeftOfButton) + 'px';
                                    togglePopupClassName('live-editor-custom-select-winmid-winmid-position', false, false);
                                } else {
                                    //console.log('show 6.4');
            
                                    selectInstance.customSelectListEl.style.top = (window.innerHeight / 2) - (popupRect.height / 2) + 'px';
                                    selectInstance.customSelectListEl.style.left = '0px';
                                    togglePopupClassName('live-editor-custom-select-fullwidth-winmid-position', true, false);
                                }
                            } else {
                                //console.log('show 7');
                                if (roomToRightOfButton >= popupRect.width + spaceForArrow) {
                                    //console.log('show 7.1');
                                    selectInstance.customSelectListEl.style.top = '0px';
                                    selectInstance.customSelectListEl.style.left = (triggeringElementRect.x + triggeringElementRect.width + spaceForArrow) + 'px';
                                    togglePopupClassName('live-editor-custom-select-right-fullheight-position', false, false);
            
                                } else if (roomToLeftOfButton >= popupRect.width + spaceForArrow) {
                                    //console.log('show 7.2');
            
                                    selectInstance.customSelectListEl.style.top = '0px';
                                    selectInstance.customSelectListEl.style.left = (triggeringElementRect.x - spaceForArrow - popupRect.width) + 'px';
                                    togglePopupClassName('live-editor-custom-select-left-fullheight-position', false, false);
                                } else if(popupRect.width <= window.innerWidth) {
                                    //console.log('show 7.3');
            
                                    selectInstance.customSelectListEl.style.top = (window.innerHeight / 2) - (popupRect.height / 2) + 'px';
                                    selectInstance.customSelectListEl.style.left = (window.innerWidth / 2) - (popupRect.width / 2) + 'px';
                                    togglePopupClassName('live-editor-custom-select-winmid-fullheight-position', false, true);
                                } else {
                                    //console.log('show 7.4');
                                    selectInstance.customSelectListEl.style.top = '0px';
                                    selectInstance.customSelectListEl.style.left = '0px';
                                    togglePopupClassName('live-editor-custom-select-fullwidth-fullheight-position', true, true);
                                }
                            }
            
                            selectInstance.customSelectListEl.style.visibility = '';
            
                            window.addEventListener('click', selectInstance.hide);
            
                            if(!selectInstance.customSelectEl.classList.contains("live-editor-custom-select-arrow-active")) {
                                selectInstance.customSelectEl.classList.add("live-editor-custom-select-arrow-active");
                            }

                            selectInstance.isShown = true;
                        }
            
                        function togglePopupClassName(classNameToApply, addXScrollClass, addYScrollClass) {
                            let classes = [
                                'live-editor-custom-select-mid-below-position',
                                'live-editor-custom-select-right-below-position',
                                'live-editor-custom-select-left-below-position',
                                'live-editor-custom-select-winmid-below-position',
                                'live-editor-custom-select-fullwidth-below-position',
                                'live-editor-custom-select-mid-above-position',
                                'live-editor-custom-select-right-above-position',
                                'live-editor-custom-select-left-above-position',
                                'live-editor-custom-select-winmid-above-position',
                                'live-editor-custom-select-fullwidth-above-position',
                                'live-editor-custom-select-right-mid-position',
                                'live-editor-custom-select-left-mid-position',
                                'live-editor-custom-select-fullwidth-mid-position',
                                'live-editor-custom-select-right-belowtop-position',
                                'live-editor-custom-select-left-belowtop-position',
                                'live-editor-custom-select-mid-belowtop-position',
                                'live-editor-custom-select-fullwidth-belowtop-position',
                                'live-editor-custom-select-right-abovebottom-position',
                                'live-editor-custom-select-left-abovebottom-position',
                                'live-editor-custom-select-fullwidth-abovebottom-position',
                                'live-editor-custom-select-right-winmid-position',
                                'live-editor-custom-select-left-winmid-position',
                                'live-editor-custom-select-winmid-winmid-position',
                                'live-editor-custom-select-fullwidth-winmid-position',
                                'live-editor-custom-select-right-fullheight-position',
                                'live-editor-custom-select-left-fullheight-position',
                                'live-editor-custom-select-winmid-fullheight-position',
                                'live-editor-custom-select-fullwidth-fullheight-position',
                                'live-editor-custom-select-x-scroll',
                                'live-editor-custom-select-y-scroll',
                            ];
                            for (let i in classes) {
                                if (classes[i] == classNameToApply || (classes[i] == 'live-editor-custom-select-x-scroll' && addXScrollClass) || (classes[i] == 'live-editor-custom-select-y-scroll' && addYScrollClass)) {
                                    continue;
                                }
                                selectInstance.customSelectListEl.classList.remove(classes[i]);
                            }
            
                            if (classNameToApply && classNameToApply != '' && !selectInstance.customSelectListEl.classList.contains(classNameToApply)) {
                                selectInstance.customSelectListEl.classList.add(classNameToApply);
                            }
            
                            if (addXScrollClass) {
                                selectInstance.customSelectListEl.classList.add('live-editor-custom-select-x-scroll');
                            }
                            if (addYScrollClass) {
                                selectInstance.customSelectListEl.classList.add('live-editor-custom-select-y-scroll');
                            }
                        }
            
                        let selectParentDiv = selectInstance.selectContainerEl = document.createElement("DIV");
                        selectParentDiv.className = 'live-editor-custom-select';
                        if(!selectInstance.originalSelect.parentElement) {
                            console.warn('Select should have parent element.');
                            return;
                        }
                        selectInstance.originalSelect.parentElement.insertBefore(selectParentDiv, selectInstance.originalSelect);
                        selectParentDiv.appendChild(selectInstance.originalSelect);

                        /*for each element, create a new DIV that will act as the selected item:*/
                        let selectedOptionEl = selectInstance.customSelectEl = document.createElement("DIV");
                        selectedOptionEl.setAttribute("class", "live-editor-custom-select-selected");
                        selectedOptionEl.innerHTML = selectInstance.originalSelect.selectedIndex != -1 ? selectInstance.originalSelect.options[selectInstance.originalSelect.selectedIndex].innerHTML : '';
                        selectParentDiv.appendChild(selectedOptionEl);

                        /*for each element, create a new DIV that will contain the option list:*/
                        let optionsListEl = selectInstance.customSelectListEl = document.createElement("DIV");
                        optionsListEl.setAttribute("class", "live-editor-custom-select-items");

                        selectInstance.syncOptionsList();

                        selectedOptionEl.addEventListener("click", function (e) {
                            /*when the select box is clicked, close any other select boxes,
                            and open/close the current select box:*/
                            e.stopPropagation();
                            if(!selectInstance.isShown) {
                                closeAllSelect(this);
                                selectInstance.show();
                            } else {
                                selectInstance.hide(e);
                            }
                        });

                        const config = {attributes: true, childList: true,characterData:true, subtree:true};
                        const callback = function(mutationList, observer) {
                            for (const mutation of mutationList) {
                                if (mutation.type === 'childList') {
                                    selectInstance.syncOptionsList();
                                }
                            }
                        };

                        const observer = new MutationObserver(callback);
                        observer.observe(selectInstance.originalSelect, config);

                        function closeAllSelect(elmnt) {
                            let existingSelectsLists = document.querySelectorAll('.live-editor-custom-select-items');
                            let existingOpenedSelectsNum = existingSelectsLists.length;
                            let i;
                            for (i = 0; i < existingOpenedSelectsNum; i++) {
                                if (existingSelectsLists[i] && existingSelectsLists[i].parentElement) existingSelectsLists[i].parentElement.removeChild(existingSelectsLists[i]);
                            }

                            let existingSelects = document.querySelectorAll('.live-editor-custom-select-selected');
                            let existingSelectsNum = existingSelects.length;
                            let a;
                            for (a = 0; a < existingSelectsNum; a++) {
                                existingSelects[a].classList.remove('live-editor-custom-select-arrow-active');
                            }
                        }
                    }

                    function createScenesCol() {
                        var scenesColumn = document.createElement('DIV');
                        scenesColumn.className = 'live-editor-popup-scenes';
                        var scenesColumnBody = document.createElement('DIV');
                        scenesColumnBody.className = 'live-editor-popup-scenes-body';
                        var customSelectCon = document.createElement('DIV');
                        customSelectCon.className = 'llive-editor-popup-scenes-select-con';
                        var selectDropDown = document.createElement('SELECT');
                        selectDropDown.className = 'live-editor-popup-scenes-select';
                        customSelectCon.appendChild(selectDropDown);
                        scenesColumnBody.appendChild(customSelectCon);

                        var customSelect = new CustomSelect(selectDropDown);
                        selectDropDown.addEventListener('change', function (e) {
                            
                        })


                        var scenesColumnControl = document.createElement('DIV');
                        scenesColumnControl.className = 'live-editor-popup-scenes-control';
                        scenesColumnControl.style.position = 'relative';

                        var scenesColumnControlAddBtn = document.createElement('DIV');
                        scenesColumnControlAddBtn.className = 'live-editor-popup-scenes-control-btn live-editor-popup-scenes-control-btn-add';
                        if(!tool.state.managingScenes) scenesColumnControlAddBtn.classList.add('live-editor-inactive');
                        scenesColumnControlAddBtn.innerHTML = _streamingIcons.addItem;

                        scenesColumnControlAddBtn.addEventListener('click', function (event) {
                            addNewScenePopup.showDialog(event);
                        });

                        scenesColumnControl.appendChild(scenesColumnControlAddBtn);

                        var scenesColumnControlBtn = document.createElement('DIV');
                        scenesColumnControlBtn.className = 'live-editor-popup-scenes-control-btn live-editor-popup-scenes-control-btn-remove';
                        if(!tool.state.managingScenes) scenesColumnControlBtn.classList.add('live-editor-inactive');
                        scenesColumnControlBtn.innerHTML = _streamingIcons.removeItem;
                        scenesColumnControlBtn.addEventListener('click', function () {
                            removeScene();
                        })
                        scenesColumnControl.appendChild(scenesColumnControlBtn);

                        var scenesColumnControlBtn = document.createElement('DIV');
                        scenesColumnControlBtn.className = 'live-editor-popup-scenes-control-btn';
                        scenesColumnControlBtn.innerHTML = _streamingIcons.moveUp;
                        scenesColumnControlBtn.addEventListener('click', function () {
                            moveSceneUp();
                        })
                        scenesColumnControl.appendChild(scenesColumnControlBtn);
                        var scenesColumnControlBtn = document.createElement('DIV');
                        scenesColumnControlBtn.className = 'live-editor-popup-scenes-control-btn';
                        scenesColumnControlBtn.innerHTML = _streamingIcons.moveDown;
                        scenesColumnControlBtn.addEventListener('click', function () {
                            moveSceneDown();
                        })
                        scenesColumnControl.appendChild(scenesColumnControlBtn);

                        scenesColumnBody.appendChild(scenesColumnControl);
                        scenesColumn.appendChild(scenesColumnBody);
                        _scenesDropDownEl = selectDropDown;
                        return scenesColumn;
                    }

                    function getActiveScene() {
                        return _activeScene;
                    }


                    return {
                        createScenesCol: createScenesCol,
                        syncList: syncList,
                        getActive: getActiveScene
                    }

                }())

                var SourcesInterface = function (sceneListItem) {
                    var _id = Date.now().toString(36) + Math.random().toString(36).replace(/\./g, "");
                    var _scene = sceneListItem;
                    var _activeInterface = null;
                    var _visualList = [];
                    var _audioList = [];
                    var _selectedSource = null;
                    var _dialogBody = null;
                    var _sceneSourcesColumnEl = null;
                    var _sourcesTabs = null;
                    var _sourcesListEl = null;
                    var _visualSourcesEl = null;
                    var _visualSourcesListEl = null;
                    let _addVisualSourceDropUpMenuEl = null;
                    var _audioSourcesListEl = null;
                    var _audioSourcesEl = null;
                    var _globalMicIconEl = null;

                    var _videoTool = null;
                    var _audioTool = null;
                    var _videoPopup = null;

                    function initVideoTool() {        
                        Q.activate(
                            Q.Tool.setUpElement(
                                'DIV',
                                "Streams/webrtc/video",
                                {
                                    controlsTool: tool.state.controlsTool,
                                    webrtcSignalingLib: tool.state.webrtcSignalingLib,
                                    webrtcUserInterface: tool.state.webrtcUserInterface
                                }
                            ),
                            {},
                            onVideoInputsListCreated
                        );
        
                        function onVideoInputsListCreated() {
                            _videoTool = this;
                            _videoTool.loadCamerasList();
                        }
                    }
                    initVideoTool();

                    function initAudioTool() {        
                        Q.activate(
                            Q.Tool.setUpElement(
                                'DIV',
                                "Streams/webrtc/audio",
                                {
                                    controlsTool: tool.state.controlsTool,
                                    webrtcSignalingLib: tool.state.webrtcSignalingLib,
                                    webrtcUserInterface: tool.state.webrtcUserInterface
                                }
                            ),
                            {},
                            onAudioListCreated
                        );
        
                        function onAudioListCreated() {
                            _audioTool = this;
                            _audioTool.loadAudioOutputList();
                            _audioTool.loadAudioInputList();
                        }
                    }
                    initAudioTool();

                    var ListItem = function (name) {
                        this.active = true;
                        this.title = name != null ? name : null;
                        this.itemEl = null;
                        this.visibilityEl = null;
                        this._sourceInstance = null;
                    }

                    function sortList(type) {
                        var listArr, listEl, sources;

                        if(type == 'visual') {
                            listArr = _visualList;
                            listEl = _visualSourcesListEl;
                            sources = scenesInterface.getActive().sceneInstance.sources;
                        } else {
                            listArr = _audioList;
                            listEl = _audioSourcesListEl;
                            sources = scenesInterface.getActive().sceneInstance.audioSources;
                        }
                        console.log('sortList: sources', sources, listArr);

                        if(sources.length !== listArr.length) {
                            return;
                        }

                        listArr.sort((a, b) => {
                            return sources.findIndex(p => p === a.sourceInstance) - sources.findIndex(p => p === b.sourceInstance);
                        });

                        console.log('sortList: listArr', listArr.map(el => { return el.itemEl.innerText }));
                        console.log('sortList: NOT sortedElements', Array.from(listEl.childNodes).map(el => { return el.innerText }))

                        //listEl.innerHTML == '';
                        for (let e = 0; e < listArr.length; e++) {
                            listEl.appendChild(listArr[e].itemEl)
                        }
                        for(let i in listArr) {
                            console.log('source level for', i)
                            console.log('source level parentGroup', listArr[i].sourceInstance.parentGroup)

                            let level = 0;
                            let currentListItem = listArr[i].sourceInstance.parentGroup;
                            while (currentListItem) {
                                console.log('source level for f', currentListItem,  listArr[i].sourceInstance)

                                currentListItem = currentListItem.parentGroup ? currentListItem.parentGroup.parentGroup : null;
                                level++;
                            }
                            if(level != 0) listArr[i].itemEl.style.paddingLeft = 20*level + 'px';
                            console.log('source level', level)
                        }
                    }

                    var visualSources = (function () {
                        var VisualListItem = function (source) {
                            var sourceInstance = this;
                            this.listType = 'visual';
                            this._sourceInstance = source;
                            this._title = source.title ? source.title : (source.name != null ? source.name : source.sourceType);
                            this.remove = function () {
                                var currentitem = this;
                                if(this.itemEl != null && this.itemEl.parentNode != null) this.itemEl.parentNode.removeChild(this.itemEl);
                                for(var i in _visualList) {
                                    if(_visualList[i] == currentitem) {
                                        _visualList.splice(i, 1);
                                        break;
                                    }
                                }
                            };
                            this.isActive = function() {
                                console.log('isActive', this)
                                var sources = _scene.sceneInstance.sources;
                                console.log('isActive: sources', sources)

                                for(let s in sources) {

                                    if(sources[s] == sourceInstance._sourceInstance) {
                                        console.log('isActive active')

                                        return true;
                                    }
                                }
                                console.log('isActive inactive')

                                return false;
                            };
                            this.show = function() {
                                tool.livestreamingCanvasComposerTool.canvasComposer.videoComposer.showSource(this.sourceInstance);

                                //this.sourceInstance.active = true;
                                this.switchVisibilityIcon(true);
                                syncList();
                            };
                            this.hide = function() {
                                tool.livestreamingCanvasComposerTool.canvasComposer.videoComposer.hideSource(this.sourceInstance);
                                //this.sourceInstance.active = false;
                                this.switchVisibilityIcon(false);
                                syncList();
                            };
                            this.switchVisibilityIcon = function (visibility) {
                                if(visibility === true) {
                                    this.visibilityEl.innerHTML = _streamingIcons.visible;
                                } else if (visibility === false) {
                                    this.visibilityEl.innerHTML = _streamingIcons.hidden;
                                }
                            };
                            this.toggle = function() {
                                if(sourceInstance.sourceInstance.active == true) {
                                    sourceInstance.hide();
                                } else {
                                    sourceInstance.show();
                                }
                            };

                            this.unmute = function() {
                                console.log('mute')

                                sourceInstance.sourceInstance.audioSource.active = true;
                                if(this._sourceInstance.sourceType == 'webrtc' && this._sourceInstance.participant.isLocal) {
                                    _webrtcSignalingLib.localMediaControls.enableAudio();
                                } else {
                                    tool.livestreamingCanvasComposerTool.canvasComposer.audioComposer.unmuteSource(this._sourceInstance, false);
                                    this.switchAudioActivenessIcon(true);
                                    syncList();
                                }
                                
                            };
                            this.mute = function() {
                                console.log('mute')
                                sourceInstance.sourceInstance.audioSource.active = true;
                                if(this._sourceInstance.sourceType == 'webrtc' && this._sourceInstance.participant.isLocal) {
                                    _webrtcSignalingLib.localMediaControls.disableAudio();
                                } else {
                                    tool.livestreamingCanvasComposerTool.canvasComposer.audioComposer.muteSource(this._sourceInstance, false);
                                    this.switchAudioActivenessIcon(false);
                                }
                                
                                syncList();
                            };
                            this.switchAudioActivenessIcon = function (activeness) {
                                if(activeness === true) {
                                    this.audioActivnessEl.innerHTML = _streamingIcons.liveOn;
                                } else if (activeness === false) {
                                    this.audioActivnessEl.innerHTML = _streamingIcons.liveOff;
                                }
                            };
                            this.toggleAudio = function() {
                                if(sourceInstance.sourceInstance.audioSource.active == true) {
                                    sourceInstance.mute();
                                } else {
                                    sourceInstance.unmute();
                                }
                            };
                            this.params = {
                                _loop: _webrtcSignalingLib.getOptions().liveStreaming.loopVideo,
                                _localOutput:_webrtcSignalingLib.getOptions().liveStreaming.localOutput,

                                set loop(value) {this._loop = value;},
                                set localOutput(value) {this._localOutput = value;},
                                get localOutput() {return typeof this._localOutput == 'object' ? this._localOutput.checked : this._localOutput;},
                                get loop() {return typeof this._loop == 'object' ? this._loop.checked : this._loop;}
                            };
                            this.hoverTimeout = {};

                            var itemEl = document.createElement('DIV');
                            itemEl.className = 'live-editor-popup-sources-item';
                            var itemElText = document.createElement('DIV');
                            itemElText.innerHTML = this._title ? this._title : '';
                            itemElText.className = 'live-editor-popup-sources-item-text';
                            var itemElControl = document.createElement('DIV');
                            itemElControl.className = 'live-editor-popup-sources-item-control';

                            if (source.audioSource != null && !this._sourceInstance.participant.isLocal) {
                                var itemElControlAudioActivness = document.createElement('DIV');
                                itemElControlAudioActivness.className = 'live-editor-popup-sources-item-control-item';
                                itemElControlAudioActivness.innerHTML = _streamingIcons.liveOn;
                                itemElControl.appendChild(itemElControlAudioActivness);
                                itemElControlAudioActivness.addEventListener('click', this.toggleAudio)
                            }
                            if (source.sourceType == 'webrtc' && source.participant.isLocal && !source.screenSharing) {
                                var itemElControlLocalControls = document.createElement('DIV');
                                itemElControlLocalControls.className = 'live-editor-popup-sources-item-local-controls';
                                itemElControl.appendChild(itemElControlLocalControls);

                                if(!_webrtcUserInterface.getOptions().audioOnlyMode) {
                                    var cameraBtnCon = document.createElement('DIV');
                                    cameraBtnCon.className = 'live-editor-popup-sources-item-control-item live-editor-popup-sources-item-lc-camera';
                                    var cameraBtn = document.createElement('DIV');
                                    cameraBtn.className = 'live-editor-popup-sources-item-lc-btn';
                                    var cameraBtnIcon = document.createElement('DIV');
                                    cameraBtnIcon.className = 'live-editor-popup-sources-item-lc-icon';
                                    cameraBtnIcon.innerHTML = _controlsToolIcons.camera;
                                    cameraBtnCon.appendChild(cameraBtn);
                                    cameraBtnCon.appendChild(cameraBtnIcon);
                                    itemElControlLocalControls.appendChild(cameraBtnCon);

                                    if (!Q.info.useTouchEvents) {
                                        sourceInstance.videoSettingsPopup = new PopupDialog(cameraBtn, {
                                            content: _videoTool.videoinputListEl
                                        })
                                    }

                                    sourceInstance.cameraBtnIcon = cameraBtnIcon;
                                }
                                
                                var microphoneBtnCon = document.createElement('DIV');
                                microphoneBtnCon.className = 'live-editor-popup-sources-item-control-item live-editor-popup-sources-item-lc-mic';
                                var microphoneBtn = document.createElement('DIV');
                                microphoneBtn.className = 'live-editor-popup-sources-item-lc-btn';
                                var microphoneBtnIcon = document.createElement('DIV');
                                microphoneBtnIcon.className = 'live-editor-popup-sources-item-lc-icon';
                                microphoneBtnIcon.innerHTML = _controlsToolIcons.microphone;
                                //microphoneBtnIcon.innerHTML = _streamingIcons.sourcesEnabledMic;
                                microphoneBtnCon.appendChild(microphoneBtn);
                                microphoneBtnCon.appendChild(microphoneBtnIcon);
                                itemElControlLocalControls.appendChild(microphoneBtnCon);
                                if (!Q.info.useTouchEvents) {
                                    sourceInstance.audioSettingsPopup = new PopupDialog(microphoneBtn, {
                                        content: [_audioTool.audioOutputListEl, _audioTool.audioinputListEl]
                                    })
                                }
                                sourceInstance.microphoneBtnIcon = microphoneBtnIcon;
                                                
                            }
                        
                            var itemElControlVisibility = document.createElement('DIV');
                            itemElControlVisibility.className = 'live-editor-popup-sources-item-control-item live-editor-popup-sources-item-visibility';
                            itemElControlVisibility.innerHTML = _streamingIcons.visible;
                            itemElControl.appendChild(itemElControlVisibility);

                            itemEl.appendChild(itemElText);
                            itemEl.appendChild(itemElControl);
                            this.visibilityEl = itemElControlVisibility;
                            this.audioActivnessEl = itemElControlAudioActivness;
                            this.itemEl = itemEl;
                            this.titleEl = itemElText;
                            this.itemEl.addEventListener('click', function () {
                                console.log('sourceInstance.sourceInstance', sourceInstance.sourceInstance.sourceType);
                                selectSource(sourceInstance);

                                optionsColumn.update();
                            })

                            this.itemEl.addEventListener('contextmenu', function (e) {
                                /*e.preventDefault();
                                selectSource(sourceInstance);
                                optionsColumn.update();
                                contextMenu('visualSource').show(e);*/
                            })
                            
                            itemElControlVisibility.addEventListener('click', this.toggle)
                        }

                        VisualListItem.prototype = new ListItem();

                        Object.defineProperties(VisualListItem.prototype, {
                            'sourceInstance': {
                                'get': function() { 
                                    return this._sourceInstance;
                                }
                            }
                        });
                        Object.defineProperties(VisualListItem.prototype, {
                            'title': {
                                'set': function(val) { if(this.titleEl) this.titleEl.innerHTML = val; }
                            }
                        });

                        var AudioListItem = function (source) {
                            var sourceInstance = this;
                            this.listType = 'audio';
                            this._sourceInstance = source;
                            this._title = source.title ? source.title : (source.name != null ? source.name : source.sourceType);
                            this.remove = function () {
                                var currentitem = this;
                                if(this.itemEl != null && this.itemEl.parentNode != null) this.itemEl.parentNode.removeChild(this.itemEl);
                                for(var i in _visualList) {
                                    if(_visualList[i] == currentitem) {
                                        _visualList.splice(i, 1);
                                        break;
                                    }
                                }
                            };
                            this.isActive = function() {
                                console.log('isActive', this)
                                var currentitem = this;
                                var sources = _scene.sceneInstance.sources;
                                console.log('isActive active', sources)

                                for(let s in sources) {
                                    console.log('isActive for', sources[s], currentitem._sourceInstance)

                                    if(sources[s] == currentitem._sourceInstance) {
                                        console.log('isActive active')

                                        return true;
                                    }
                                }
                                console.log('isActive inactive')

                                return false;
                            };
                            this.unmute = function() {
                                console.log('mute')

                                this._sourceInstance.active = true;
                                if(this._sourceInstance.sourceType == 'webrtcaudio' && this._sourceInstance.participant.isLocal) {
                                    console.log('mute turn mic on')
                                    _webrtcSignalingLib.localMediaControls.enableAudio();
                                } else {
                                    tool.livestreamingCanvasComposerTool.canvasComposer.audioComposer.unmuteSource(this._sourceInstance, this._sourceInstance.sourceType == 'audio' ? true : false);
                                    this.switchAudioActivenessIcon(true);
                                    syncList();
                                }
                                
                            };
                            this.mute = function() {
                                console.log('mute')
                                this._sourceInstance.active = false;
                                if(this._sourceInstance.sourceType == 'webrtcaudio' && this._sourceInstance.participant.isLocal) {
                                    console.log('mute turn mic off')
                                    _webrtcSignalingLib.localMediaControls.disableAudio();
                                } else {
                                    tool.livestreamingCanvasComposerTool.canvasComposer.audioComposer.muteSource(this._sourceInstance, this._sourceInstance.sourceType == 'audio' ? true : false);
                                    this.switchAudioActivenessIcon(false);
                                }
                                
                                syncList();
                            };
                            this.switchAudioActivenessIcon = function (activeness) {
                                if(activeness === true) {
                                    this.audioActivnessEl.innerHTML = _streamingIcons.liveOn;
                                } else if (activeness === false) {
                                    this.audioActivnessEl.innerHTML = _streamingIcons.liveOff;
                                }
                            };
                            this.toggleAudio = function() {
                                if(sourceInstance._sourceInstance.active == true) {
                                    sourceInstance.mute();
                                } else {
                                    sourceInstance.unmute();
                                }
                            };
                            this.params = {
                                _loop: _webrtcSignalingLib.getOptions().liveStreaming.loopAudio,
                                _localOutput:_webrtcSignalingLib.getOptions().liveStreaming.localOutput,

                                set loop(value) {this._loop = value;},
                                set localOutput(value) {this._localOutput = value;},
                                get localOutput() {return typeof this._localOutput == 'object' ? this._localOutput.checked : this._localOutput;},
                                get loop() {return typeof this._loop == 'object' ? this._loop.checked : this._loop;}
                            };
                        
                            var itemEl = document.createElement('DIV');
                            itemEl.className = 'live-editor-popup-sources-item';
                            var itemElText = document.createElement('DIV');
                            itemElText.innerHTML = this._title ? this._title : '';
                            itemElText.className = 'live-editor-popup-sources-item-text';
                            var itemElControl = document.createElement('DIV');
                            itemElControl.className = 'live-editor-popup-sources-item-control';
                            var itemElAudioActiveness = document.createElement('DIV');
                            itemElAudioActiveness.className = 'live-editor-popup-sources-item-visibility';
                            itemElAudioActiveness.innerHTML = _streamingIcons.liveOn;
                            let sourceType = this._sourceInstance.sourceType;
                            console.log('AAAAAAAA', sourceType)
                            itemElControl.appendChild(itemElAudioActiveness);
                            
                            itemEl.appendChild(itemElText);
                            itemEl.appendChild(itemElControl);
                            this.audioActivnessEl = itemElAudioActiveness;
                            this.itemEl = itemEl;
                            this.titleEl = itemElText;
                            this.itemEl.addEventListener('click', function () {
                                console.log('sourceInstance.sourceInstance', sourceInstance.sourceInstance.sourceType);
                                selectSource(sourceInstance);

                                optionsColumn.update();
                            })
                            itemElAudioActiveness.addEventListener('click', this.toggleAudio)

                            this._sourceInstance.on('nameChanged', function (newName) {
                                console.log('nameChanged set', this._sourceInstance)
    
                                sourceInstance.title = newName;
                            })
                        }

                        AudioListItem.prototype = new ListItem();

                        Object.defineProperties(AudioListItem.prototype, {
                            'sourceInstance': {
                                'get': function() { 
                                    return this._sourceInstance;
                                }
                            }
                        });
                        Object.defineProperties(AudioListItem.prototype, {
                            'title': {
                                'set': function(val) { if(this.titleEl) this.titleEl.innerHTML = val; }
                            }
                        });

                        //if user turns his mic off on main controls, all his mic audio in livestream should be also turned off
                        if(_controlsTool != null && _webrtcSignalingLib != null) {
                            _webrtcSignalingLib.event.on('trackAdded', function (e) {
                                updateLocalControlsButtonsState();
                            });
                            _webrtcSignalingLib.event.on('cameraEnabled', function () {
                                updateLocalControlsButtonsState();
                            });
                            _webrtcSignalingLib.event.on('cameraDisabled', function () {
                                updateLocalControlsButtonsState();
                            });
                            _webrtcSignalingLib.event.on('cameraToggled', function () {
                                updateLocalControlsButtonsState();
                            });
                            _webrtcSignalingLib.event.on('micEnabled', function () {
                                updateLocalControlsButtonsState();
                            });
                            _webrtcSignalingLib.event.on('micDisabled', function () {
                                updateLocalControlsButtonsState();
                            });
                        }

                        function syncList() {
                            var sources = _scene.sceneInstance.sources;
                            console.log('visual: syncList _scene', _scene);
                            console.log('visual: syncList _visualList', _visualList.length);
                            console.log('visual: syncList sources', sources.length);
                            console.log('visual: syncList _id', _id);
                            try {
                                var err = (new Error);
                                console.log(err.stack);
                            } catch (e) {
            
                            }
                            for (let i = _visualList.length - 1; i >= 0; i--) {
                                console.log('visual: syncList _visualList', _visualList[i]);
                                if(_visualList[i] == null) continue;

                                if(_visualList[i].isActive() == false) {
                                    console.log('visual: syncList remove',  _visualList[i]);

                                    _visualList[i].remove();
                                    continue;
                                }
                                if(_visualList[i].listType == 'visual') {
                                    if(_visualList[i].sourceInstance.active === true) {
                                        _visualList[i].switchVisibilityIcon(true);
                                    } else if(_visualList[i].sourceInstance.active === false) {
                                        _visualList[i].switchVisibilityIcon(false);
                                    }
                                } else {
                                    if(_visualList[i].sourceInstance.active === true) {
                                        _visualList[i].switchAudioActivenessIcon(true);
                                    } else if(_visualList[i].sourceInstance.active === false) {
                                        _visualList[i].switchAudioActivenessIcon(false);
                                    }
                                }
                            }

                            for (let s in sources) {
                                if(sources[s].sourceType == 'webrtcrect' || sources[s].sourceType == 'webrtctext') continue;
                                let newSource = true;
                                for (let i in _visualList) {
                                    if(sources[s] == _visualList[i].sourceInstance) {
                                        newSource = false;
                                        break;
                                    }
                                }

                                if(newSource) {
                                    if ((sources[s].sourceType == 'group' && sources[s].groupType == 'webrtc') || sources[s].sourceType == 'webrtc' || sources[s].sourceType == 'video' || sources[s].sourceType == 'videoInput' || sources[s].sourceType == 'image') {
                                        var listItem = new VisualListItem(sources[s]);
                                        listItem.sourceInstance = sources[s];
                                        console.log('visual: syncList add', listItem);
                                        if (sources[s].active === true) {
                                            listItem.switchVisibilityIcon(true);
                                        } else if (sources[s].active === false) {
                                            listItem.switchVisibilityIcon(false);
                                        }
                                        addItem(listItem);
                                    } else if ((sources[s].sourceType == 'group' && sources[s].groupType == 'webrtcaudio') || sources[s].sourceType == 'webrtcaudio' || sources[s].sourceType == 'audio' || sources[s].sourceType == 'audioInput') {
                                        var listItem = new AudioListItem(sources[s]);
                                        console.log('audio: syncList add', listItem, listItem.sourceInstance);
                                        if (sources[s].active === true) {
                                            listItem.switchAudioActivenessIcon(true);
                                        } else if (sources[s].active === false) {
                                            listItem.switchAudioActivenessIcon(false);
                                        }
                                        addItem(listItem);
                                    }
                                }
                            }

                            sortList('visual');
                        }

                        function addItem(item) {
                            if(item == null || _visualSourcesListEl == null) return;
                            console.log('visual: addItem', item)
                            console.log('visual: addItem itemEl', item.itemEl)
                            _visualList.push(item)
                            console.log('visual: addItem element', _visualSourcesListEl)

                            _visualSourcesListEl.insertBefore(item.itemEl, _visualSourcesListEl.firstChild);
                            
                            if(item.sourceInstance.sourceType == 'webrtc' && item.sourceInstance.participant.isLocal) {
                                updateLocalControlsButtonsState();
                            }
                        }

                        function loadList(sourcesList) {
                            if(sourcesList == null) return;
                            console.log('loadList', sourcesList)
                            for(let s in sourcesList) {
                                console.log('loadList for', sourcesList[s])
                                if(sourcesList[s].sourceType == 'webrtc' || sourcesList[s].sourceType == 'video' || sourcesList[s].sourceType == 'videoInput' || sourcesList[s].sourceType == 'image') {
                                    var listItem = new VisualListItem(sourcesList[s].title);
                                    listItem.sourceInstance = sourcesList[s];
                                    addItem(listItem, _visualSourcesListEl);
                                } else if (sourcesList[s].sourceType == 'webrtcaudio' || sourcesList[s].sourceType == 'audio' || sourcesList[s].sourceType == 'audioInput') {
                                    var listItem = new AudioListItem(sourcesList[s]);
                                    addItem(listItem, _visualSourcesListEl);
                                }
                            }
                        }

                        function addWatermark(e, options) {
                            console.log('addWatermark');
                            if(options.type == 'image') {
                                if (typeof e == 'string') {
                                    var pathhInfo = e.split('/');
                                    var title = pathhInfo[pathhInfo.length - 1];

                                    var img = new Image();
                                    img.src = e;
                                    img.onload = function () {
                                        tool.livestreamingCanvasComposerTool.canvasComposer.videoComposer.addSource({
                                            sourceType: 'imageOverlay',
                                            imageInstance: img,
                                            position: options.position,
                                            opacity: options.opacity
                                        });
                                    };
                                } else {
                                    var tgt = e.target || window.event.srcElement,
                                        files = tgt.files;

                                    function loadImage(fileReader) {
                                        var img = new Image();
                                        img.src = fileReader.result;
                                        img.onload = function () {
                                            tool.livestreamingCanvasComposerTool.canvasComposer.videoComposer.addSource({
                                                sourceType: 'imageOverlay',
                                                title: files[0].name,
                                                imageInstance: img,
                                            });
                                        };

                                    }

                                    if (FileReader && files && files.length) {
                                        var fr = new FileReader();
                                        fr.onload = () => loadImage(fr);
                                        fr.readAsDataURL(files[0]);
                                    }
                                }
                            } else {

                            }
                        }

                        function addBackground(e, options) {
                            console.log('addBackground');
                            if(options.type == 'image') {
                                if (typeof e == 'string') {
                                    var img = new Image();
                                    img.src = e;
                                    img.onload = function () {
                                        tool.livestreamingCanvasComposerTool.canvasComposer.videoComposer.addSource({
                                            sourceType: 'imageBackground',
                                            imageInstance: img
                                        });
                                    };
                                } else {
                                    var tgt = e.target || window.event.srcElement,
                                        files = tgt.files;

                                    function loadImage(fileReader) {
                                        var img = new Image();
                                        img.src = fileReader.result;
                                        img.onload = function () {
                                            tool.livestreamingCanvasComposerTool.canvasComposer.videoComposer.addSource({
                                                sourceType: 'img',
                                                title: files[0].name,
                                                imageInstance: img,
                                            });
                                        };

                                    }

                                    if (FileReader && files && files.length) {
                                        var fr = new FileReader();
                                        fr.onload = () => loadImage(fr);
                                        fr.readAsDataURL(files[0]);
                                    }
                                }
                            } else {
                                if(typeof e == 'string') {

                                    var pathhInfo = e.split('/');
                                    var title = pathhInfo[pathhInfo.length - 1];
                                    tool.livestreamingCanvasComposerTool.canvasComposer.videoComposer.addSource({
                                        sourceType: 'videoBackground',
                                        title: title,
                                        url: e,
                                    });
                                } else {


                                }
                            }
                        }

                        function addVideoInputSource(e) {
                            console.log('addVideoInputSource', e);
                            tool.livestreamingCanvasComposerTool.canvasComposer.videoComposer.addSource({
                                sourceType: 'videoInput',
                                title: e.name,
                                mediaStreamInstance: e.stream,
                                originalSize: e.originalSize,
                                frameRate: e.frameRate,
                                screensharing: e.screensharing
                            });
                        }

                        function addImageSource(e) {
                            if(typeof e == 'string') {
                                var pathhInfo = e.split('/');
                                var title = pathhInfo[pathhInfo.length - 1];

                                var img = new Image();
                                img.src = e;
                                img.onload = function () {
                                    tool.livestreamingCanvasComposerTool.canvasComposer.videoComposer.addSource({
                                        sourceType: 'image',
                                        title: title,
                                        imageInstance: img,
                                    });
                                };
                            } else {
                                var tgt = e.target || window.event.srcElement,
                                    files = tgt.files;

                                function loadImage(fileReader) {
                                    var img = new Image();
                                    img.src = fileReader.result;
                                    img.onload = function () {
                                        tool.livestreamingCanvasComposerTool.canvasComposer.videoComposer.addSource({
                                            sourceType: 'image',
                                            title: files[0].name,
                                            imageInstance: img,
                                        });
                                    };

                                }

                                if (FileReader && files && files.length) {
                                    var fr = new FileReader();
                                    fr.onload = () => loadImage(fr);
                                    fr.readAsDataURL(files[0]);
                                }
                            }
                        }

                        function addVideoSource(e) {
                            if(typeof e == 'string') {

                                var pathhInfo = e.split('/');
                                var title = pathhInfo[pathhInfo.length - 1];
                                tool.livestreamingCanvasComposerTool.canvasComposer.videoComposer.addSource({
                                    sourceType: 'video',
                                    title: title,
                                    url: e,
                                });
                            } else {
                                var tgt = e.target || window.event.srcElement,
                                    files = tgt.files;

                                if (FileReader && files && files.length) {
                                    let file = files[0], mime = file.type;
                                    let reader = new  FileReader();
                                    reader.readAsArrayBuffer(file);
                                    reader.addEventListener('loadstart', loadStartHandler);
                                    reader.addEventListener('load', loadHandler);
                                    reader.addEventListener('loadend', loadEndHandler);
                                    reader.addEventListener('progress', updateProgress);
                                    reader.addEventListener('error', errorHandler);
                                    reader.addEventListener('abort', abortHandler);

                                    var loadProgressBar = new ProgressBar();
                                    loadProgressBar.show();

                                    function loadHandler(e) {
                                        // The file reader gives us an ArrayBuffer:
                                        let buffer = e.target.result;

                                        // We have to convert the buffer to a blob:
                                        let videoBlob = new Blob([new Uint8Array(buffer)], { type: mime });

                                        // The blob gives us a URL to the video file:
                                        let url = window.URL.createObjectURL(videoBlob);

                                        tool.livestreamingCanvasComposerTool.canvasComposer.videoComposer.addSource({
                                            sourceType: 'video',
                                            title: files[0].name,
                                            url: url,
                                        }, function () {
                                            loadProgressBar.updateTextStatus('loaded');
                                            loadProgressBar.hide();
                                        }, function (e) {
                                            loadProgressBar.updateTextStatus('<span style="color:#ff9f9f;">' + e.message + '</span>');
                                        });

                                        loadProgressBar.updateProgress(100);


                                    }

                                    function loadStartHandler(evt) {

                                    }

                                    function loadEndHandler(evt) {

                                    }

                                    function abortHandler(evt) {
                                        loadProgressBar.updateTextStatus('<span style="color:#ff9f9f;">File read cancelled</span>');
                                    }

                                    function errorHandler(evt) {
                                        console.log('errorHandler',  evt.target.error)

                                        switch (evt.target.error.code) {
                                            case evt.target.error.NOT_FOUND_ERR:
                                                loadProgressBar.updateTextStatus('<span style="color:#ff9f9f;">File Not Found!</span>');
                                                break;
                                            case evt.target.error.NOT_READABLE_ERR:
                                                loadProgressBar.updateTextStatus('<span style="color:#ff9f9f;">File is not readable</span>');
                                                break;
                                            case evt.target.error.ABORT_ERR:
                                                break; // noop
                                            default:
                                                loadProgressBar.updateTextStatus('<span style="color:#ff9f9f;">An error occurred reading this file.</span>');
                                        };
                                    }

                                    function updateProgress(evt) {
                                        // evt is an ProgressEvent.
                                        if (evt.lengthComputable) {
                                            var percentLoaded = Math.round((evt.loaded / evt.total) * 100);
                                            // Increase the progress bar length.
                                            if (percentLoaded < 100) {
                                                loadProgressBar.updateProgress(percentLoaded);
                                            }
                                        }
                                    }

                                    function ProgressBar() {
                                        var _progrssBarPopup = null;
                                        var _barProggressEl = null;
                                        var _progressText = null;
                                        var _isHidden = true;
                                        var _barWidth = 300;
                                        var _barheight = 100;

                                        console.log('createProgressBar')
                                        var dialog=document.createElement('DIV');
                                        dialog.className = 'live-editor-popup-progress-bar-popup';
                                        dialog.style.width = _barWidth + 'px';
                                        dialog.style.height = _barheight + 'px';
                                        _progrssBarPopup = dialog;

                                        var dialogInner=document.createElement('DIV');
                                        dialogInner.className = 'live-editor-popup-progress-bar-popup-inner';
                                        var boxContent=document.createElement('DIV');
                                        boxContent.className = 'live-editor-popup-streaming-box live-editor-popup-box';
                                        var boxContentText = _progressText = document.createElement('DIV');
                                        boxContentText.innerHTML = 'loading...';
                                        var progressBar = document.createElement('DIV');
                                        progressBar.className = 'live-editor-popup-progress-bar';
                                        var progressEl = _barProggressEl = document.createElement('SPAN');
                                        progressEl.className = 'live-editor-popup-progress-el';


                                        progressBar.appendChild(progressEl);
                                        boxContent.appendChild(boxContentText);
                                        boxContent.appendChild(progressBar);

                                        var close=document.createElement('div');
                                        close.className = 'live-editor-close-dialog-sign';
                                        close.innerHTML = '&#10005;';
                                        var popupinstance = this;
                                        close.addEventListener('click', function() {
                                            popupinstance.hide();
                                        });
                                        dialog.appendChild(close);

                                        dialogInner.appendChild(boxContent);
                                        dialog.appendChild(dialogInner);

                                        this.show = function() {
                                            var boxRect = activeDialog.dialogEl.getBoundingClientRect();
                                            var x = (boxRect.width / 2) - (_barWidth / 2);
                                            var y = (boxRect.height / 2) - (_barheight / 2);
                                            _progrssBarPopup.style.top = y + 'px';
                                            _progrssBarPopup.style.left = x + 'px';
                                            activeDialog.dialogEl.appendChild(_progrssBarPopup);
                                        }

                                        this.hide = function() {
                                            if(!activeDialog.dialogEl.contains(_progrssBarPopup)) return;
                                            activeDialog.dialogEl.removeChild(_progrssBarPopup);
                                        }

                                        this.updateProgress = function(percemt) {
                                            _barProggressEl.style.width = percemt + '%';
                                            _barProggressEl.innerHTML = percemt + '%';
                                        }

                                        this.updateTextStatus = function(text) {
                                            _progressText.innerHTML = text;
                                        }
                                    }

                                }

                            }
                        }

                        function addTeleconferenceSource(name) {
                            var webrtcGroup = tool.livestreamingCanvasComposerTool.canvasComposer.videoComposer.addSource({
                                sourceType: 'webrtcGroup',
                                title: name
                            });

                            tool.livestreamingCanvasComposerTool.canvasComposer.videoComposer.updateWebRTCLayout(webrtcGroup);

                        }


                        function addAudioSource(e) {
                            console.log('addAudioSource', e)
                            if(typeof e == 'string') {
                                var pathhInfo = e.split('/');
                                var title = pathhInfo[0] + '//.../' + pathhInfo[pathhInfo.length - 1];
                                tool.livestreamingCanvasComposerTool.canvasComposer.audioComposer.addSource({
                                    sourceType: 'audio',
                                    title: title,
                                    url: e,
                                });
                            } else {
                                var tgt = e.target || window.event.srcElement,
                                    files = tgt.files;
                                console.log('addAudioSource 2')

                                if (FileReader && files && files.length) {
                                    let file = files[0], mime = file.type;
                                    let reader = new  FileReader();
                                    reader.readAsArrayBuffer(file);
                                    reader.onload = function(e) {
                                        // The file reader gives us an ArrayBuffer:
                                        let buffer = e.target.result;

                                        // We have to convert the buffer to a blob:
                                        let audioBlob = new Blob([new Uint8Array(buffer)], { type: mime });
                                        console.log('addAudioSource onload', audioBlob)

                                        // The blob gives us a URL to the video file:
                                        let url = window.URL.createObjectURL(audioBlob);

                                        tool.livestreamingCanvasComposerTool.canvasComposer.audioComposer.addSource({
                                            sourceType: 'audio',
                                            title: files[0].name,
                                            url: url,
                                        });
                                    }

                                }

                            }
                        }

                        function addAudioInputSource(e) {
                            console.log('addAudioInputSource', e);
                            tool.livestreamingCanvasComposerTool.canvasComposer.audioComposer.addSource({
                                sourceType: 'audioInput',
                                title: e.name,
                                mediaStreamInstance: e.stream
                            });
                        }

                        function hideResizingElement() {
                            _resizingElement.style.display = 'none';
                        }
                        function showResizingElement() {
                            _resizingElement.style.display = '';
                        }

                        function selectSource(sourceItem) {
                            console.log('selectSource', _visualList)
                            console.log('selectSource sourceItem', sourceItem, sourceItem.itemEl, sourceItem.itemEl.classList.contains('live-editor-popup-sources-item-active'))
                            if(sourceItem.itemEl && !sourceItem.itemEl.classList.contains('live-editor-popup-sources-item-active')) {
                                console.log('selectSource select acitve source');

                                sourceItem.itemEl.classList.add('live-editor-popup-sources-item-active');
                            }
                            _selectedSource = sourceItem;
                            for(var i in _visualList) {
                                console.log('selectSource for', _visualList[i], _selectedSource)
                                if(_visualList[i] == _selectedSource) continue;
                                console.log('selectSource for --', sourceItem.itemEl, (sourceItem.itemEl).classList.contains('live-editor-popup-sources-item-active'))

                                if((_visualList[i].itemEl).classList.contains('live-editor-popup-sources-item-active')) {
                                    console.log('selectSource remove');

                                    (_visualList[i].itemEl).classList.remove('live-editor-popup-sources-item-active');
                                }
                            }

                            console.log('selectSource _selectedSource', _selectedSource)

                            var left = 0, top = 0;
                            if(_streamingCanvas != null) {
                                left = _streamingCanvas.offsetLeft;
                                top = _streamingCanvas.offsetTop;
                            }
                            var canvasSize = tool.livestreamingCanvasComposerTool.canvasComposer.videoComposer.getCanvasSize();
                            var prmtr1 = canvasSize.width * 2 + canvasSize.height * 2
                            var realcanvasSize = _streamingCanvas.getBoundingClientRect();
                            var prmtr2 = realcanvasSize.width * 2 + realcanvasSize.height * 2
                            var timesBigger = prmtr1 >= prmtr2 ? prmtr1 / prmtr2 : prmtr2 / prmtr1;
                            console.log('selectSource timesbigger', prmtr1, prmtr2, timesBigger)
                            if(_resizingElementTool != null) {
                                _resizingElementTool.state.onMoving.removeAllHandlers();
                                _resizingElementTool.state.onResizing.removeAllHandlers();
                            }
                            if(_selectedSource.sourceInstance.sourceType == 'group' && _selectedSource.sourceInstance.groupType == 'webrtc') {
                                var webrtcLayoutRect = _selectedSource.sourceInstance.rect;
                                console.log('selectSource if1')

                                showResizingElement();
                                _resizingElement.style.width = webrtcLayoutRect.width / timesBigger + 'px';
                                _resizingElement.style.height = webrtcLayoutRect.height / timesBigger+ 'px';
                                _resizingElement.style.top = top + webrtcLayoutRect.y / timesBigger + 'px';
                                _resizingElement.style.left = left + webrtcLayoutRect.x / timesBigger + 'px';
                                _resizingElement.style.border = '1px solid ' + _selectedSource.sourceInstance.color;
                                _resizingElementTool.state.onMoving.set(function (x, y) {
                                    _selectedSource.sourceInstance.rect.x = (x - left) * timesBigger;
                                    _selectedSource.sourceInstance.rect.y = (y - top)  * timesBigger;
                                });
                                _resizingElementTool.state.onResizing.set(function (width, height, x, y) {
                                    let currentRect = _selectedSource.sourceInstance.rect;
                                    _selectedSource.sourceInstance.rect.width = width != null ? width * timesBigger : currentRect.width;
                                    _selectedSource.sourceInstance.rect.height = height != null ? height * timesBigger : currentRect.height;
                                    _selectedSource.sourceInstance.rect.x = x != null ? (x - left) * timesBigger : currentRect.x;
                                    _selectedSource.sourceInstance.rect.y = y != null ? (y - top) * timesBigger : currentRect.y;
                                });
                            } else if(_selectedSource.sourceInstance.sourceType == 'webrtc') {  
                                hideResizingElement();
                            } else if(_selectedSource.sourceInstance.sourceType == 'image' || _selectedSource.sourceInstance.sourceType == 'video' || _selectedSource.sourceInstance.sourceType == 'videoInput') {
                                console.log('selectSource if2')
                                showResizingElement();
                                var sourceRect = _selectedSource.sourceInstance.rect;
                                console.log('selectSource sourceRect', sourceRect)
                                console.log('selectSource sourceRect 1', sourceRect.width,  sourceRect.height,  sourceRect.x,  sourceRect.y)

                                _resizingElement.style.width = sourceRect._width / timesBigger + 'px';
                                _resizingElement.style.height = sourceRect._height / timesBigger+ 'px';
                                _resizingElement.style.top = top + sourceRect._y / timesBigger + 'px';
                                _resizingElement.style.left = left + sourceRect._x / timesBigger + 'px';
                                _resizingElement.style.border = '1px solid ' + _selectedSource.sourceInstance.color;


                                _resizingElementTool.state.onMoving.set(function (x, y) {
                                    _selectedSource.sourceInstance.rect.x = (x - left) * timesBigger;
                                    _selectedSource.sourceInstance.rect.y = (y - top)  * timesBigger;
                                });

                                _resizingElementTool.state.onResizing.set(function (width, height, x, y) {
                                    if(width != null) _selectedSource.sourceInstance.rect.width = width * timesBigger;
                                    if(height != null) _selectedSource.sourceInstance.rect.height = height * timesBigger;
                                    if(x != null) _selectedSource.sourceInstance.rect.x = (x - left) * timesBigger;
                                    if(y != null) _selectedSource.sourceInstance.rect.y = (y - top) * timesBigger;
                                });

                            }

                        }

                        function moveForward() {
                            console.log('moveForward');
                            tool.livestreamingCanvasComposerTool.canvasComposer.videoComposer.moveSourceForward(_selectedSource.sourceInstance);

                            sortList('visual');
                            return false;
                        }

                        function moveBackward() {
                            console.log('moveBackward', _selectedSource);
                            tool.livestreamingCanvasComposerTool.canvasComposer.videoComposer.moveSourceBackward(_selectedSource.sourceInstance);

                            sortList('visual');
                            return false;
                        }

                        function getSelectedSource() {
                            return _selectedSource;
                        }

                        function removeSource() {
                            if(_selectedSource != null) {

                                if(_selectedSource.listType == 'visual') {
                                    tool.livestreamingCanvasComposerTool.canvasComposer.videoComposer.removeSource(_selectedSource.sourceInstance);
                                } else {
                                    tool.livestreamingCanvasComposerTool.canvasComposer.audioComposer.removeSource(_selectedSource.sourceInstance);
                                }
                                syncList();
                                _selectedSource = null;
                            };
                            var activeScene = scenesInterface.getActive();
                            activeScene.sourcesInterface.visualSources.hideResizingElement()
                            optionsColumn.update();
                        }

                        function createAddSourceMenu() {
                            var dropUp = _addVisualSourceDropUpMenuEl = document.createElement('DIV');
                            dropUp.className = 'live-editor-popup-sources-add-menu';

                            var conferenceItem = document.createElement('DIV');
                            conferenceItem.className = 'live-editor-popup-sources-add-menu-item live-editor-popup-sources-add-conference';
                            conferenceItem.dataset.menuName = 'add-conference';
                            var conferenceItemIcon = document.createElement('DIV');
                            conferenceItemIcon.className = 'live-editor-popup-sources-add-menu-icon';
                            var conferenceItemIconText = document.createElement('DIV');
                            conferenceItemIconText.className = 'live-editor-popup-sources-add-menu-text';
                            conferenceItemIconText.innerHTML = 'Teleconference';
                            conferenceItem.addEventListener('click', function (e) {
                                addTeleconferencePopup.showDialog(e);
                            })
                            conferenceItem.appendChild(conferenceItemIcon);
                            conferenceItem.appendChild(conferenceItemIconText);
                            dropUp.appendChild(conferenceItem);

                            var cameraItem = document.createElement('DIV');
                            cameraItem.className = 'live-editor-popup-sources-add-menu-item live-editor-popup-sources-add-camera';
                            cameraItem.dataset.menuName = 'add-camera';
                            var cameraItemIcon = document.createElement('DIV');
                            cameraItemIcon.className = 'live-editor-popup-sources-add-menu-icon';
                            var cameraItemIconText = document.createElement('DIV');
                            cameraItemIconText.className = 'live-editor-popup-sources-add-menu-text';
                            cameraItemIconText.innerHTML = 'Camera';
                            cameraItem.addEventListener('click', function (e) {
                                addCameraPopup.showDialog({
                                    onOk: function (e) {
                                        if (!e.stream) {
                                            alert('No media stream added');
                                            return;
                                        }
                                        if(e.sourceType == 'separate') {
                                            console.log('add camera source: separate', e);

                                            addVideoInputSource({
                                                name: e.name,
                                                stream: e.stream,
                                                originalSize: e.originalSize,
                                                frameRate: e.frameRate
                                            });
                                        } else {
                                            console.log('add camera source: webrtc');
                                            let videoTracks = e.stream.getVideoTracks();
                                            for (let t in videoTracks) {
                                                videoTracks[t].stop();
                                            }
                                            _webrtcSignalingLib.localMediaControls.toggleCameras({deviceId:e.deviceId});
                                        }
                                        
                                    },
                                    onClose: function () {
            
                                    }
                                });
                            })
                            cameraItem.appendChild(cameraItemIcon);
                            cameraItem.appendChild(cameraItemIconText);
                            dropUp.appendChild(cameraItem);

                            var imageItem = document.createElement('DIV');
                            imageItem.className = 'live-editor-popup-sources-add-menu-item live-editor-popup-sources-add-image';
                            imageItem.dataset.menuName = 'add-image';
                            var imageItemIcon = document.createElement('DIV');
                            imageItemIcon.className = 'live-editor-popup-sources-add-menu-icon';
                            var imageItemIconText = document.createElement('DIV');
                            imageItemIconText.className = 'live-editor-popup-sources-add-menu-text';
                            imageItemIconText.innerHTML = 'Image';
                            imageItem.addEventListener('click', function (e) {
                                addImagePopup.showDialog(e);
                            })
                            imageItem.appendChild(imageItemIcon);
                            imageItem.appendChild(imageItemIconText);
                            dropUp.appendChild(imageItem);

                            var videoItem = document.createElement('DIV');
                            videoItem.className = 'live-editor-popup-sources-add-menu-item';
                            cameraItem.dataset.menuName = 'add-video';
                            var videoItemIcon = document.createElement('DIV');
                            videoItemIcon.className = 'live-editor-popup-sources-add-menu-icon';
                            var videoItemIconText = document.createElement('DIV');
                            videoItemIconText.className = 'live-editor-popup-sources-add-menu-text';
                            videoItemIconText.innerHTML = 'Video';
                            videoItem.addEventListener('click', function (e) {
                                addVideoPopup.showDialog(e);
                            })
                            /*var videoItemInput = document.createElement('INPUT');
                                videoItemInput.className = 'live-editor-popup-sources-add-menu-file';
                                videoItemInput.type = 'file';
                                videoItemInput.name = 'fileVideoSource';
                                videoItemInput.addEventListener('change', function (e) {
                                    addVideoSource(e);
                                })*/
                            videoItem.appendChild(videoItemIcon);
                            videoItem.appendChild(videoItemIconText);
                            //videoItem.appendChild(videoItemInput);
                            dropUp.appendChild(videoItem);

                            var audioItem = document.createElement('DIV');
                            audioItem.className = 'live-editor-popup-sources-add-menu-item';
                            cameraItem.dataset.menuName = 'add-video';
                            var audioItemIcon = document.createElement('DIV');
                            audioItemIcon.className = 'live-editor-popup-sources-add-menu-icon';
                            var audioItemIconText = document.createElement('DIV');
                            audioItemIconText.className = 'live-editor-popup-sources-add-menu-text';
                            audioItemIconText.innerHTML = 'Audio';
                            audioItem.addEventListener('click', function (e) {
                                addAudioPopup.showDialog(e);
                            })
                            audioItem.appendChild(audioItemIcon);
                            audioItem.appendChild(audioItemIconText);
                            dropUp.appendChild(audioItem);

                            var micItem = document.createElement('DIV');
                            micItem.className = 'live-editor-popup-sources-add-menu-item live-editor-popup-sources-add-mic';
                            var micItemIcon = document.createElement('DIV');
                            micItemIcon.className = 'live-editor-popup-sources-add-menu-icon';
                            var micItemIconText = document.createElement('DIV');
                            micItemIconText.className = 'live-editor-popup-sources-add-menu-text';
                            micItemIconText.innerHTML = 'Audio Input';
                            micItem.addEventListener('click', function (e) {
                                addMicrophoneAudioPopup.showDialog({
                                    onOk: function (e) {
                                        console.log('addMicrophoneAudioPopup: ', e);

                                        if (!e.stream) {
                                            alert('No media stream added');
                                            return;
                                        }
                                        if(e.sourceType == 'separate') {
                                            addAudioInputSource({
                                                name: e.name,
                                                stream: e.stream
                                            });
                                        } else {
                                            console.log('add camera source: webrtc');
                                            let audioTracks = e.stream.getAudioTracks();
                                            for (let t in audioTracks) {
                                                audioTracks[t].stop();
                                            }
                                            _webrtcSignalingLib.localMediaControls.toggleAudioInputs({deviceId:e.deviceId});
                                        }
                                        
                                    },
                                    onClose: function () {
            
                                    }
                                });
                            })

                            micItem.appendChild(micItemIcon);
                            micItem.appendChild(micItemIconText);
                            dropUp.appendChild(micItem);

                            var savedMedia = document.createElement('DIV');
                            savedMedia.className = 'live-editor-popup-sources-add-menu-item';
                            savedMedia.dataset.menuName = 'add-saved';
                            var savedMediaIcon = document.createElement('DIV');
                            savedMediaIcon.className = 'live-editor-popup-sources-add-menu-icon';
                            var savedMediaIconText = document.createElement('DIV');
                            savedMediaIconText.className = 'live-editor-popup-sources-add-menu-text';
                            savedMediaIconText.innerHTML = 'Saved Media';
                            savedMedia.addEventListener('click', function (e) {
                                console.log('_fileManagerTool', _fileManagerTool)
                                if(!_fileManagerTool) return;

                                _fileManagerTool.showDialog();

                                _fileManagerTool.state.onSelect.set(function (stream) {
                                    console.log('Streams/fileManager onSelect', stream)
                                    if(stream.fields.attributes == '') {
                                        console.error('Q.file.url is missing')
                                        return;
                                    }
                                    var attributes = JSON.parse(stream.fields.attributes);
                                    var link = Q.url(attributes['Q.file.url']);
                                    console.log('Streams/fileManager attributes', link)
                                    if(stream.fields.type == 'Streams/video') {
                                        addVideoSource(link);
                                    } else if(stream.fields.type == 'Streams/image') {
                                        addImageSource(link);
                                    } else {
                                        alert('Wrong type of file')
                                    }

                                    _fileManagerTool.closeDialog();
                                }, 'importVisual')
                            })

                            savedMedia.appendChild(savedMediaIcon);
                            savedMedia.appendChild(savedMediaIconText);
                            dropUp.appendChild(savedMedia);

                            //_dialogEl.appendChild(dropUp);
                            return dropUp;
                        }

                        function checkIfOtherWebrtcVideoGroupExist() {
                            let sources = _scene.sceneInstance.sources;
                            let otherWebrtcGroupExist = false;
                            for(let i in sources) {
                                if(sources[i].sourceType == 'group' && sources[i].groupType == 'webrtc') {
                                    otherWebrtcGroupExist = true;
                                    break;
                                }
                            }
                            return otherWebrtcGroupExist;
                        }

                        function createVisualSourcesList() {
                            if(_visualSourcesEl != null) return _visualSourcesEl;
                            var dialogBody = document.createElement('DIV');
                            dialogBody.className = 'live-editor-popup-sources-visual-body';
                            var dialogBodyInner = document.createElement('DIV');
                            dialogBodyInner.className = 'live-editor-popup-sources-body-inner';
                            _visualSourcesEl = dialogBody;
                            _visualSourcesListEl = dialogBodyInner;

                            var sourcesColumnControl = document.createElement('DIV');
                            sourcesColumnControl.className = 'live-editor-popup-sources-control';

                            var dropUpMenu = createAddSourceMenu();

                            var sourcesColumnControlAddBtn = document.createElement('DIV');
                            sourcesColumnControlAddBtn.className = 'live-editor-popup-sources-control-btn live-editor-popup-sources-control-btn-add';
                            if(!tool.state.managingVisualSources) sourcesColumnControlAddBtn.classList.add('live-editor-inactive');
                            sourcesColumnControlAddBtn.innerHTML = _streamingIcons.addItem;
                            sourcesColumnControlAddBtn.appendChild(dropUpMenu);

                            sourcesColumnControlAddBtn.addEventListener('click', function() {
                                showDropUpMenu(dropUpMenu, sourcesColumnControlAddBtn);
                            });

                            sourcesColumnControl.appendChild(sourcesColumnControlAddBtn);

                            var sourcesColumnControlBtn = document.createElement('DIV');
                            sourcesColumnControlBtn.className = 'live-editor-popup-sources-control-btn live-editor-popup-sources-control-btn-remove';
                            if(!tool.state.managingVisualSources) sourcesColumnControlBtn.classList.add('live-editor-inactive');
                            sourcesColumnControlBtn.innerHTML = _streamingIcons.removeItem;
                            sourcesColumnControlBtn.addEventListener('click', function () {
                                removeSource();
                            })
                            sourcesColumnControl.appendChild(sourcesColumnControlBtn);
                            var sourcesColumnControlBtn = document.createElement('DIV');
                            sourcesColumnControlBtn.className = 'live-editor-popup-sources-control-btn';
                            sourcesColumnControlBtn.innerHTML = _streamingIcons.moveUp;
                            sourcesColumnControlBtn.addEventListener('click', function () {
                                moveForward();
                            })
                            sourcesColumnControl.appendChild(sourcesColumnControlBtn);
                            var sourcesColumnControlBtn = document.createElement('DIV');
                            sourcesColumnControlBtn.className = 'live-editor-popup-sources-control-btn';
                            sourcesColumnControlBtn.innerHTML = _streamingIcons.moveDown;
                            sourcesColumnControlBtn.addEventListener('click', function () {
                                moveBackward();
                            })
                            sourcesColumnControl.appendChild(sourcesColumnControlBtn);

                            var micIconCon = document.createElement('DIV');
                            micIconCon.className = 'live-editor-popup-sources-control-audio-btns';
                 
                            var micIconControls = document.createElement('DIV');
                            micIconControls.className = 'live-editor-popup-global-mic-controls';
                            var micIcon = _globalMicIconEl = document.createElement('DIV');
                            micIcon.className = 'live-editor-popup-mixer-volume-icon';
                            micIcon.innerHTML = _streamingIcons.disabledMicrophone;
                            micIconControls.appendChild(micIcon);
                            micIconCon.appendChild(micIconControls);
                            sourcesColumnControl.appendChild(micIconCon);

                            dialogBody.appendChild(dialogBodyInner)
                            dialogBody.appendChild(sourcesColumnControl)

                            let audioSettingsPopup = new PopupDialog(micIcon, {
                                content: [_audioTool.audioOutputListEl, _audioTool.audioinputListEl]
                            })

                            return dialogBody;
                        }

                        function getSourcesList() {
                            return _visualList;
                        }

                        var addVideoPopup = (function () {
                            var _dialogEl = null;
                            var _isHidden = true;

                            console.log('addVideoPopup')
                            var dialog=document.createElement('DIV');
                            dialog.className = 'live-editor-dialog-box live-editor-dialog-box-add-new-s live-editor-popup-add-video live-editor-hidden';
                            _dialogEl = dialog;
                            var dialogTitle=document.createElement('H3');
                            dialogTitle.innerHTML = 'Add video';
                            dialogTitle.className = 'live-editor-dialog-header Q_dialog_title';

                            var dialogInner=document.createElement('DIV');
                            dialogInner.className = 'live-editor-dialog-inner';
                            var boxContent=document.createElement('DIV');
                            boxContent.className = 'live-editor-popup-streaming-box live-editor-popup-box';
                            var boxContentText=document.createElement('DIV');
                            boxContentText.innerHTML = 'Please choose file from your computer or enter the link.';
                            var videoItemInput = document.createElement('INPUT');
                            videoItemInput.className = 'live-editor-popup-sources-add-menu-file';
                            videoItemInput.type = 'file';
                            videoItemInput.name = 'fileVideoSource';
                            videoItemInput.accept = 'video/mp4, video/*'
                            videoItemInput.addEventListener('change', function (e) {
                                addVideoSource(e);
                                hideDialog();
                            })

                            var boxContentText2=document.createElement('DIV');
                            boxContentText2.innerHTML = 'OR';
                            var imageItemLinkInput = document.createElement('INPUT');
                            imageItemLinkInput.className = 'live-editor-popup-sources-add-menu-file';
                            imageItemLinkInput.type = 'text';
                            imageItemLinkInput.placeholder = 'Enter the link';
                            imageItemLinkInput.name = 'fileImageLink';

                            boxContent.appendChild(boxContentText);
                            boxContent.appendChild(videoItemInput);
                            boxContent.appendChild(boxContentText2);
                            boxContent.appendChild(imageItemLinkInput);

                            var close=document.createElement('div');
                            close.className = 'live-editor-close-dialog-sign';
                            close.style.backgroundImage = 'url("' + Q.url("{{Q}}/img/close.png") + '"';
                            close.style.backgroundRepeat = 'no-repeat';
                            close.style.backgroundSize = 'cover';
                            close.addEventListener('click', function() {
                                if(imageItemLinkInput.value != '') {
                                    var val = imageItemLinkInput.value;
                                    addVideoSource(val);
                                    hideDialog();
                                    imageItemLinkInput.value = '';
                                }
                            });
                            dialogInner.appendChild(dialogTitle);

                            dialog.appendChild(close);
                            dialogInner.appendChild(boxContent);
                            dialog.appendChild(dialogInner);

                            _webrtcUserInterface.roomsMediaContainer().appendChild(dialog);
                            setTimeout(function () {
                                Q.activate(
                                    Q.Tool.setUpElement(
                                        dialog, // or pass an existing element
                                        "Q/resize",
                                        {
                                            move: true,
                                            activateOnElement: dialogTitle,
                                            resize: false,
                                            active: true,
                                            moveWithinArea: 'window',
                                        }
                                    ),
                                    {},
                                    function () {

                                    }
                                );
                            }, 3000)

                            var controlsRect = _controlsTool.controlBar.getBoundingClientRect();
                            var dialogWidth = 400;
                            dialog.style.width = dialogWidth + 'px';
                            console.log('dialogWidth', dialogWidth);
                            if(Q.info.isMobile) {
                                dialog.style.left = (window.innerWidth / 2) - (dialogWidth / 2) + 'px';
                                dialog.style.bottom = (controlsRect.height + 10) + 'px';
                            } else {
                                dialog.style.left = (window.innerWidth / 2) - (dialogWidth / 2) + 'px';
                                dialog.style.top = (window.innerHeight/ 2 - 100) + 'px';
                            }


                            close.addEventListener('click', function () {
                                hideDialog();
                            });

                            function showDialog(e) {
                                videoItemInput.value = '';
                                if(_dialogEl.classList.contains('live-editor-hidden')) {
                                    _dialogEl.classList.remove('live-editor-hidden');
                                    var _clientX = e.clientX;
                                    var _clientY = e.clientY;

                                    _isHidden = false;

                                    var controlsRect = _controlsTool.controlBar.getBoundingClientRect();
                                    if(Q.info.isMobile) {
                                        dialog.style.left = (window.innerWidth / 2) - (dialogWidth / 2) + 'px';
                                        dialog.style.top = (controlsRect.height + 10) + 'px';
                                    } else {
                                        dialog.style.left = (_clientX + 50) + 'px';
                                        dialog.style.top = (_clientY - 200) + 'px';
                                    }
                                }
                            }

                            function hideDialog() {
                                if(!_dialogEl.classList.contains('live-editor-hidden')){
                                    _dialogEl.classList.add('live-editor-hidden');
                                    _isHidden = true;
                                }
                            }

                            function toggle(e) {
                                if(_isHidden) {
                                    showDialog(e);
                                } else hideDialog(e);
                            }

                            return {
                                hideDialog: hideDialog,
                                showDialog: showDialog,
                                toggle: toggle
                            }
                        }())

                        var addImagePopup = (function () {
                            var _dialogEl = null;
                            var _isHidden = true;

                            console.log('addImagePopup')
                            var dialog=document.createElement('DIV');
                            dialog.className = 'live-editor-dialog-box live-editor-dialog-box-add-new-s live-editor-popup-add-image live-editor-hidden';
                            _dialogEl = dialog;
                            var dialogTitle=document.createElement('H3');
                            dialogTitle.innerHTML = 'Add image';
                            dialogTitle.className = 'live-editor-dialog-header Q_dialog_title';

                            var dialogInner=document.createElement('DIV');
                            dialogInner.className = 'live-editor-dialog-inner';
                            var boxContent=document.createElement('DIV');
                            boxContent.className = 'live-editor-popup-streaming-box live-editor-popup-box';
                            var boxContentText=document.createElement('DIV');
                            boxContentText.innerHTML = 'Please choose file from your computer or enter the link.';
                            var imageItemInput = document.createElement('INPUT');
                            imageItemInput.className = 'live-editor-popup-sources-add-menu-file';
                            imageItemInput.type = 'file';
                            imageItemInput.name = 'fileImageSource';
                            imageItemInput.accept = 'image/png, image/jpeg'
                            imageItemInput.addEventListener('change', function (e) {
                                addImageSource(e);
                                hideDialog();
                            })

                            var boxContentText2=document.createElement('DIV');
                            boxContentText2.innerHTML = 'OR';
                            var imageItemLinkInput = document.createElement('INPUT');
                            imageItemLinkInput.className = 'live-editor-popup-sources-add-menu-file';
                            imageItemLinkInput.type = 'text';
                            imageItemLinkInput.placeholder = 'Enter the link';
                            imageItemLinkInput.name = 'fileImageLink';

                            boxContent.appendChild(boxContentText);
                            boxContent.appendChild(imageItemInput);
                            boxContent.appendChild(boxContentText2);
                            boxContent.appendChild(imageItemLinkInput);

                            var close=document.createElement('div');
                            close.className = 'live-editor-close-dialog-sign';
                            close.style.backgroundImage = 'url("' + Q.url("{{Q}}/img/close.png") + '"';
                            close.style.backgroundRepeat = 'no-repeat';
                            close.style.backgroundSize = 'cover';
                            close.addEventListener('click', function() {
                                if(imageItemLinkInput.value != '') {
                                    var val = imageItemLinkInput.value;
                                    addImageSource(val);
                                    hideDialog();
                                    imageItemLinkInput.value = '';
                                }
                            });
                            dialogInner.appendChild(dialogTitle);

                            dialog.appendChild(close);
                            dialogInner.appendChild(boxContent);
                            dialog.appendChild(dialogInner);

                            _webrtcUserInterface.roomsMediaContainer().appendChild(dialog);
                            setTimeout(function () {
                                Q.activate(
                                    Q.Tool.setUpElement(
                                        dialog, // or pass an existing element
                                        "Q/resize",
                                        {
                                            move: true,
                                            activateOnElement: dialogTitle,
                                            resize: false,
                                            active: true,
                                            moveWithinArea: 'window',
                                        }
                                    ),
                                    {},
                                    function () {

                                    }
                                );
                            }, 3000)

                            var controlsRect = _controlsTool.controlBar.getBoundingClientRect();
                            var dialogWidth = 400;
                            dialog.style.width = dialogWidth + 'px';
                            console.log('dialogWidth', dialogWidth);
                            if(Q.info.isMobile) {
                                dialog.style.left = (window.innerWidth / 2) - (dialogWidth / 2) + 'px';
                                dialog.style.bottom = (controlsRect.height + 10) + 'px';
                            } else {
                                dialog.style.left = (window.innerWidth / 2) - (dialogWidth / 2) + 'px';
                                dialog.style.top = (window.innerHeight/ 2 - 100) + 'px';
                            }


                            close.addEventListener('click', function () {
                                hideDialog();
                            });

                            function showDialog(e) {
                                imageItemInput.value = '';
                                if(_dialogEl.classList.contains('live-editor-hidden')) {
                                    _dialogEl.classList.remove('live-editor-hidden');
                                    var _clientX = e.clientX;
                                    var _clientY = e.clientY;

                                    _isHidden = false;

                                    var controlsRect = _controlsTool.controlBar.getBoundingClientRect();
                                    if(Q.info.isMobile) {
                                        dialog.style.left = (window.innerWidth / 2) - (dialogWidth / 2) + 'px';
                                        dialog.style.top = (controlsRect.height + 10) + 'px';
                                    } else {
                                        dialog.style.left = (_clientX + 50) + 'px';
                                        dialog.style.top = (_clientY - 200) + 'px';
                                    }

                                }
                            }

                            function hideDialog() {
                                if(!_dialogEl.classList.contains('live-editor-hidden')){
                                    _dialogEl.classList.add('live-editor-hidden');
                                    _isHidden = true;
                                }
                            }

                            function toggle(e) {
                                if(_isHidden) {
                                    showDialog(e);
                                } else hideDialog(e);
                            }

                            return {
                                hideDialog: hideDialog,
                                showDialog: showDialog,
                                toggle: toggle
                            }
                        }())

                        var addCameraPopup = (function () {
                            var state = {
                                isHidden: true,
                                _mediaStream: null,
                                _source: null,
                                rawVideoInputDevices: [],
                                devicesList: [],
                                constraints: { audio: false, video: { width: { ideal: 4096 }, height: { ideal: 2160 } } },
                                set mediaStream(value) {
                                    this._mediaStream = value;
            
                                    if (_okButtonEl) {
                                        _okButtonEl.classList.remove('live-editor-button-inactive');
                                    }
                                },
                                get mediaStream() { return this._mediaStream; },
                                set source(source) {
                                    this.mediaStream = source.sourceInstance.mediaStream;
                                    this._source = source;
                                    if (_nameInputEl) {
                                        _nameInputEl.value = source.sourceInstance.name;
                                    }
                                },
                                get source() { return this._source; },
                            }
                            var options = null;
                            var _dialogueEl = null;
                            var _devicesListEl = null;
                            var _cameraPreviewParentEl = null;
                            var _previewVideoEl = null;
                            var _nameInputEl = null;
                            var _okButtonEl = null;
                            var _noticesEl = null;
            
                            console.log('addCameraPopup')
            
                            function setDefaultSourceName() {
                                let camerasNumber = 0;
                                for (let i in _visualList) {
                                    if (_visualList[i].sourceInstance.sourceType == 'videoInput') {
                                        camerasNumber++;
                                    }
                                }
                                sourceNameInput.value = 'Camera ' + (camerasNumber + 1);
            
                            }
            
                            function updateDevicesList() {
                                for (let l in state.devicesList) {
                                    if (state.devicesList[l].optionEl && state.devicesList[l].optionEl.parentElement) {
                                        state.devicesList[l].optionEl.parentElement.removeChild(state.devicesList[l].optionEl);
                                    }
                                }
                                state.devicesList = [];
                                for (let i in state.rawVideoInputDevices) {
                                    let device = state.rawVideoInputDevices[i];
                                    let option = document.createElement('OPTION');
                                    option.value = device.deviceId
                                    option.innerHTML = device.label
                                    _devicesListEl.appendChild(option);
                                    state.devicesList.push({
                                        optionEl: option,
                                        id: device.deviceId,
                                        label: device.label
                                    });
                                }
                            }
            
                            function updatePreview() {
                                if (_previewVideoEl != null) {
                                    _previewVideoEl.srcObject = state.mediaStream;
                                    _previewVideoEl.play();
                                    return;
                                }
                                var video = _previewVideoEl = document.createElement('VIDEO');
                                video.srcObject = state.mediaStream;
                                video.muted = true;
                                video.play();
                                _cameraPreviewParentEl.appendChild(video);
                            }
                            function getVideoInputAfterSelectedOptions() {
                                if (state.mediaStream != null && !options.source) {
                                    let tracks = state.mediaStream.getTracks();
                                    tracks.forEach(function (track) {
                                        track.stop();
                                    });
                                }
            
                                let selectedDeviceId = getSelectedCameraOption();
                                state.constraints.video.deviceId = { exact: selectedDeviceId };
        
                                delete state.constraints.video.width;
                                delete state.constraints.video.height;
            
                                delete state.constraints.video.frameRate;
            
                                console.log('getVideoInputAfterSelectedOptions', state.constraints.video);
                                return navigator.mediaDevices.getUserMedia(state.constraints)
                                    .then(function (mediaStream) {
                                        state.mediaStream = mediaStream;
                                    })
                                    .catch(onErrorHandler);
                            }
            
                            function updateSelectedOption() {
                                console.log('updateSelectedOption');
                                if (state.mediaStream) {
                                    let deviceId = state.mediaStream.getVideoTracks()[0].getSettings().deviceId;
                                    for (let i in state.devicesList) {
                                        if (state.devicesList[i].id == deviceId) {
                                            console.log('updateSelectedOption: selected');
                                            state.devicesList[i].optionEl.selected = true;
                                        }
                                    }
                                }
                            }
            
                            function getSelectedCameraOption() {
                                let selectedCameraId = _devicesListEl.value;
                                if (!selectedCameraId || selectedCameraId == '') {
                                    selectedCameraId = state.devicesList[0].id;
                                }
                                return selectedCameraId;
                            }
            
                            function loadInputDevicesAndGetStream() {
                                state.rawVideoInputDevices = [];
                                console.log('loadInputDevicesAndGetStream', state);
                                return navigator.mediaDevices.getUserMedia(state.constraints)
                                    .then(function (mediaStream) {
                                        state.mediaStream = mediaStream;
                                        console.log('loadInputDevicesAndGetStream 2', state, state.mediaStream);

                                        return navigator.mediaDevices.enumerateDevices()
                                            .then(function (devices) {
                                                devices.forEach(function (device) {
                                                    if (device.kind == 'videoinput') state.rawVideoInputDevices.push(device);
                                                });
                                            })
                                            .catch(onErrorHandler);
                                    })
                                    .catch(onErrorHandler);
            
            
                            }
            
                            function loadDialog() {
                                if (state.rawVideoInputDevices.length != 0) {
                                    if (options.source != null) {
                                        state.source = options.source;
                                        updatePreview();
                                        updateSelectedOption();
                                    } else {
                                        state.mediaStream = null;
                                        state._source = null;
                                        state.constraints = { audio: false, video: { width: { ideal: 4096 }, height: { ideal: 2160 } } };
                                        loadInputDevicesAndGetStream().then(function () {
                                            updateDevicesList();
                                            updatePreview();
                                            updateSelectedOption();
                                            setDefaultSourceName();
                                        })
                                    }
            
                                } else {
                                    //load dialogue first time
                                    return navigator.mediaDevices.enumerateDevices()
                                        .then(function (devices) {
                                            let videoInputDevices = 0;
                                            devices.forEach(function (device) {
                                                if (device.kind == 'videoinput') videoInputDevices++
                                            });
                                            if (videoInputDevices != 0) {
                                                loadInputDevicesAndGetStream().then(function () {
                                                    updateDevicesList();
                                                    updatePreview();
                                                    updateSelectedOption();
                                                    setDefaultSourceName();
                                                })
                                            } else {
                                                showNotice('No video input devices detected');
                                            }
                                        })
                                        .catch(onErrorHandler);
            
                                }
                            }
            
                            function showDialog(optns) {
                                options = optns;
                                if (_dialogueEl.classList.contains('live-editor-hidden')) {
                                    _dialogueEl.classList.remove('live-editor-hidden');
            
                                    state.isHidden = false;
            
                                    if (_isMobile) {
                                        //dialogue.style.left = (window.innerWidth / 2) - (dialogWidth / 2) + 'px';
                                        //dialogue.style.top = '10px';
                                    } else {
                                        dialogue.style.left = (window.innerWidth / 2) - (dialogWidth / 2) + 'px';
                                        dialogue.style.top = '20px';
                                    }
            
                                    loadDialog();
                                }
                            }
            
                            function onErrorHandler(error) {
                                console.log(error);
                                _noticesEl.innerHTML = error.message;
                            }
            
                            function showNotice(notice) {
                                _noticesEl.innerHTML = notice;
                            }
            
                            function hideDialog(okBtnClicked) {
                                console.log('okBtnClicked', okBtnClicked)
            
                                if (!okBtnClicked && state.mediaStream != null && !options.source) {
                                    console.log('tracks', state.mediaStream)
            
                                    let tracks = state.mediaStream.getTracks();
                                    console.log('tracks2', tracks)
            
                                    for (let t in tracks) {
                                        tracks[t].stop();
                                    }
                                }
                                if (!_dialogueEl.classList.contains('live-editor-hidden')) {
                                    _dialogueEl.classList.add('live-editor-hidden');
                                    state.isHidden = true;
                                }
                            }
            
                            var dialogue = document.createElement('DIV');
                            dialogue.className = 'live-editor-dialog-box live-editor-popup-add-media-input live-editor-popup-add-camera-input live-editor-hidden';
                            _dialogueEl = dialogue;
                            var close = document.createElement('div');
                            close.className = 'live-editor-close-dialog-sign';
                            close.style.backgroundImage = 'url("' + Q.url("{{Q}}/img/close.png") + '"';
                            close.style.backgroundRepeat = 'no-repeat';
                            close.style.backgroundSize = '40px';

                            var dialogTitle = document.createElement('H3');
                            dialogTitle.innerHTML = 'Add camera source';
                            dialogTitle.className = 'live-editor-dialog-header';
            
                            var dialogInner = document.createElement('DIV');
                            dialogInner.className = 'live-editor-dialog-inner';
                            var boxContent = document.createElement('DIV');
                            boxContent.className = 'live-editor-dialog-content';
                            var cameraPreviewBox = document.createElement('DIV');
                            cameraPreviewBox.className = 'live-editor-dialog-camera-preview';
                            var cameraPreviewInner = _cameraPreviewParentEl = document.createElement('DIV');
                            cameraPreviewInner.className = 'live-editor-dialog-camera-preview-inner';
                            var cameraPreviewNotices = _noticesEl = document.createElement('DIV');
                            cameraPreviewNotices.className = 'live-editor-dialog-notices';
            
                            var addSourceControls = document.createElement('DIV');
                            addSourceControls.className = 'live-editor-dialog-add-source-controls';
                            var addSourceControlsInner = document.createElement('DIV');
                            addSourceControlsInner.className = 'live-editor-dialog-add-source-controls-inner';
                            dialogInner.appendChild(dialogTitle);
                            dialogue.appendChild(close);
            
                            boxContent.appendChild(cameraPreviewBox);
                            cameraPreviewBox.appendChild(cameraPreviewNotices);
                            cameraPreviewBox.appendChild(cameraPreviewInner);
            
                            var videoInputDevicesCon = document.createElement('DIV');
                            videoInputDevicesCon.className = 'live-editor-dialog-add-source-controls-item live-editor-dialog-add-source-controls-devices';
                            var addSourceControlsDevicesCaption = document.createElement('DIV');
                            addSourceControlsDevicesCaption.className = 'live-editor-dialog-add-source-controls-caption';
                            addSourceControlsDevicesCaption.innerHTML = 'Devices ';
                            var addSourceControlsDevicesReload = document.createElement('DIV');
                            addSourceControlsDevicesReload.className = 'live-editor-dialog-add-source-controls-reload';
                            addSourceControlsDevicesReload.innerHTML = _streamingIcons.reload;
                            var videoInputDevicesListCon = document.createElement('DIV');
                            videoInputDevicesListCon.className = 'live-editor-dialog-add-source-controls-config live-editor-dialog-add-source-list-con';
                            var videoInputDevicesList = _devicesListEl = document.createElement('SELECT');
                            videoInputDevicesList.className = 'live-editor-dialog-add-source-devices-list';
                            var loadDevicesListBtn = document.createElement('BUTTON');
                            loadDevicesListBtn.innerHTML = 'Reload devices list';
                            loadDevicesListBtn.className = 'live-editor-dialog-add-source-load-list live-editor-button';
                            
                            addSourceControlsDevicesCaption.appendChild(addSourceControlsDevicesReload);
                            videoInputDevicesCon.appendChild(addSourceControlsDevicesCaption);
                            videoInputDevicesListCon.appendChild(videoInputDevicesList);
                            //videoInputDevicesListCon.appendChild(loadDevicesListBtn);
                            videoInputDevicesCon.appendChild(videoInputDevicesListCon);
                            addSourceControlsInner.appendChild(videoInputDevicesCon);
            
                            var sourceNameCon = document.createElement('DIV');
                            sourceNameCon.className = 'live-editor-dialog-add-source-controls-item live-editor-dialog-add-source-controls-name';
                            var sourceNameCaption = document.createElement('DIV');
                            sourceNameCaption.className = 'live-editor-dialog-add-source-controls-caption';
                            sourceNameCaption.innerHTML = 'Name';
                            var sourceNameInputCon = document.createElement('DIV');
                            sourceNameInputCon.className = 'live-editor-dialog-add-source-controls-config live-editor-dialog-add-source-name-con';
                            var sourceNameInput = _nameInputEl = document.createElement('INPUT');
                            sourceNameInput.className = 'live-editor-dialog-add-source-name-input';
                            sourceNameInput.type = 'text';
            
                            sourceNameCon.appendChild(sourceNameCaption);
                            sourceNameCon.appendChild(sourceNameInputCon);
                            sourceNameInputCon.appendChild(sourceNameInput);
                            addSourceControlsInner.appendChild(sourceNameCon);
            
                            var sourceTypeCon = document.createElement('DIV');
                            sourceTypeCon.className = 'live-editor-dialog-add-source-controls-item live-editor-dialog-add-source-controls-type';
                            var sourceTypeCaption = document.createElement('DIV');
                            sourceTypeCaption.className = 'live-editor-dialog-add-source-controls-caption';
                            sourceTypeCaption.innerHTML = '';
                            var sourceTypeInputCon = document.createElement('DIV');
                            sourceTypeInputCon.className = 'live-editor-dialog-add-source-controls-config live-editor-dialog-add-source-type-con';
                            var separateSourceTypeLabel = document.createElement('LABEL');
                            separateSourceTypeLabel.className = 'live-editor-dialog-add-source-type-label';
                            var separateSourceTypeInput = document.createElement('INPUT');
                            separateSourceTypeInput.className = 'live-editor-dialog-add-source-type-input';
                            separateSourceTypeInput.name = 'live-editor-video_input_type';
                            separateSourceTypeInput.type = 'radio';
                            separateSourceTypeInput.value = 'separate';
                            separateSourceTypeInput.checked = 'true';
                            var separateSourceTypeLabelText = document.createElement('SPAN');
                            separateSourceTypeLabelText.className = 'live-editor-dialog-add-source-type-label-text';
                            separateSourceTypeLabelText.innerHTML = 'Visible only in livestream';
                            var webrtcSourceTypeLabel = document.createElement('LABEL');
                            webrtcSourceTypeLabel.className = 'live-editor-dialog-add-source-type-label';
                            var webrtcSourceTypeInput = document.createElement('INPUT');
                            webrtcSourceTypeInput.className = 'live-editor-dialog-add-source-type-input';
                            webrtcSourceTypeInput.name = 'live-editor-video_input_type';
                            webrtcSourceTypeInput.type = 'radio';
                            webrtcSourceTypeInput.value = 'webrtc';
                            var webrtcSourceTypeLabelText = document.createElement('SPAN');
                            webrtcSourceTypeLabelText.className = 'live-editor-dialog-add-source-type-label-text';
                            webrtcSourceTypeLabelText.innerHTML = 'Visible to chat and in a livestream';

                            sourceTypeCon.appendChild(sourceTypeCaption);
                            sourceTypeCon.appendChild(sourceTypeInputCon);
                            sourceTypeInputCon.appendChild(separateSourceTypeLabel);
                            separateSourceTypeLabel.appendChild(separateSourceTypeInput);
                            separateSourceTypeLabel.appendChild(separateSourceTypeLabelText);
                            sourceTypeInputCon.appendChild(webrtcSourceTypeLabel);
                            webrtcSourceTypeLabel.appendChild(webrtcSourceTypeInput);
                            webrtcSourceTypeLabel.appendChild(webrtcSourceTypeLabelText);
                            addSourceControlsInner.appendChild(sourceTypeCon);
            
                            var dialogButtonsCon = document.createElement('DIV');
                            dialogButtonsCon.className = 'live-editor-dialog-add-source-buttons-con';
                            var okButton = _okButtonEl = document.createElement('BUTTON');
                            okButton.innerHTML = 'OK';
                            okButton.className = 'live-editor-dialog-add-source-ok-btn live-editor-button live-editor-button-inactive';
                            dialogButtonsCon.appendChild(okButton);
                            addSourceControls.appendChild(addSourceControlsInner);
                            addSourceControls.appendChild(dialogButtonsCon);
                            boxContent.appendChild(addSourceControls);
                            dialogInner.appendChild(boxContent);
                            dialogue.appendChild(dialogInner);
            
                            _webrtcUserInterface.roomsMediaContainer().appendChild(dialogue);
            
                            setTimeout(function () {
                                Q.activate(
                                    Q.Tool.setUpElement(
                                        dialogue, // or pass an existing element
                                        "Q/resize",
                                        {
                                            move: true,
                                            activateOnElement: dialogTitle,
                                            resize: false,
                                            active: true,
                                            moveWithinArea: 'window',
                                        }
                                    ),
                                    {},
                                    function () {

                                    }
                                );
                            }, 500);
            
                            var dialogWidth = 800;
                            if (!_isMobile) {
                                dialogue.style.width = dialogWidth + 'px';
                                dialogue.style.left = (window.innerWidth / 2) - (dialogWidth / 2) + 'px';
                                dialogue.style.top = (window.innerHeight / 2 - 100) + 'px';
                            }
            
                            _devicesListEl.addEventListener('change', function (e) {
                                getVideoInputAfterSelectedOptions().then(function () {
                                    updatePreview();
                                });
                            })
            
                            addSourceControlsDevicesReload.addEventListener('click', function (e) {
                                if (state.mediaStream != null && !options.source) {
                                    let tracks = state.mediaStream.getTracks();
                                    for (let t in tracks) {
                                        tracks[t].stop();
                                    }
                                }
                                loadDialog();
                            })
            
                            okButton.addEventListener('click', function (e) {
                                let width = 'default', height = 'default', frameRate = 'default';
                                if (state.constraints.video.width != null) {
                                    if (typeof state.constraints.video.width == 'object') {
                                        width = state.constraints.video.width.exact;
                                    } else {
                                        width = state.constraints.video.width;
                                    }
                                }
                                if (state.constraints.video.height != null) {
                                    if (typeof state.constraints.video.height == 'object') {
                                        height = state.constraints.video.height.exact;
                                    } else {
                                        height = state.constraints.video.height;
                                    }
                                }
                                if (state.constraints.video.frameRate != null) {
                                    if (typeof state.constraints.video.frameRate == 'object') {
                                        frameRate = state.constraints.video.frameRate.exact;
                                    } else {
                                        frameRate = state.constraints.video.frameRate;
                                    }
                                }
                                console.log('onok state', state.mediaStream);
                                if (options && options.onOk != null) {
                                    let selectedDeviceId = getSelectedCameraOption();

                                    options.onOk({
                                        stream: state.mediaStream,
                                        name: sourceNameInput.value,
                                        originalSize: { width: width, height: height },
                                        frameRate: frameRate,
                                        deviceId: selectedDeviceId,
                                        sourceType: separateSourceTypeInput.checked ? 'separate' : 'webrtc'
                                    });
                                }
                                hideDialog(true);
                            })
            
                            close.addEventListener('click', function () {
                                hideDialog();
                            });
            
                            return {
                                hideDialog: hideDialog,
                                showDialog: showDialog,
                            }
                        }())

                        var addTeleconferencePopup = (function () {
                            var _dialogEl = null;
                            var _isHidden = true;

                            console.log('addTeleconferencePopup')
                            var dialog=document.createElement('DIV');
                            dialog.className = 'live-editor-dialog-box live-editor-dialog-box-add-new-s live-editor-popup-add-tc live-editor-hidden';
                            _dialogEl = dialog;
                            var dialogTitle=document.createElement('H3');
                            dialogTitle.innerHTML = 'Add teleconference';
                            dialogTitle.className = 'live-editor-dialog-header Q_dialog_title';

                            var dialogInner=document.createElement('DIV');
                            dialogInner.className = 'live-editor-dialog-inner';
                            var boxContent=document.createElement('DIV');
                            boxContent.className = 'live-editor-popup-streaming-box live-editor-popup-box';

                            var sourceNameCon = document.createElement('DIV');
                            sourceNameCon.className = 'live-editor-popup-sources-add-source-name-con';
                            var sourceName = document.createElement('INPUT');
                            sourceName.className = 'live-editor-popup-sources-add-source-name';
                            sourceName.type = 'text';
                            sourceName.placeholder = 'Teleconference Source Name';
                            sourceName.value = 'Video Chat';
                            sourceName.name = 'sourceName';
                            sourceNameCon.appendChild(sourceName);

                            boxContent.appendChild(sourceNameCon);

                            var close=document.createElement('div');
                            close.className = 'live-editor-close-dialog-sign';
                            close.style.backgroundImage = 'url("' + Q.url("{{Q}}/img/apply.png") + '"';
                            close.style.backgroundRepeat = 'no-repeat';
                            close.style.backgroundSize = 'cover';
                            close.addEventListener('click', function() {
                                if(sourceName.value != '') {
                                    var val = sourceName.value;
                                    addTeleconferenceSource(val);
                                    hideDialog();
                                    sourceName.value = '';
                                }
                            });
                            dialogInner.appendChild(dialogTitle);

                            dialog.appendChild(close);
                            dialogInner.appendChild(boxContent);
                            dialog.appendChild(dialogInner);

                            _webrtcUserInterface.roomsMediaContainer().appendChild(dialog);
                            setTimeout(function () {
                                Q.activate(
                                    Q.Tool.setUpElement(
                                        dialog, // or pass an existing element
                                        "Q/resize",
                                        {
                                            move: true,
                                            activateOnElement: dialogTitle,
                                            resize: false,
                                            active: true,
                                            moveWithinArea: 'window',
                                        }
                                    ),
                                    {},
                                    function () {

                                    }
                                );
                            }, 3000)

                            var controlsRect = _controlsTool.controlBar.getBoundingClientRect();
                            var dialogWidth = 400;
                            dialog.style.width = dialogWidth + 'px';
                            console.log('dialogWidth', dialogWidth);
                            if(Q.info.isMobile) {
                                dialog.style.left = (window.innerWidth / 2) - (dialogWidth / 2) + 'px';
                                dialog.style.bottom = (controlsRect.height + 10) + 'px';
                            } else {
                                dialog.style.left = (window.innerWidth / 2) - (dialogWidth / 2) + 'px';
                                dialog.style.top = (window.innerHeight/ 2 - 100) + 'px';
                            }

                            close.addEventListener('click', function () {
                                hideDialog();
                            });

                            function showDialog(e) {
                                if(_dialogEl.classList.contains('live-editor-hidden')) {
                                    _dialogEl.classList.remove('live-editor-hidden');
                                    var _clientX = e.clientX;
                                    var _clientY = e.clientY;

                                    _isHidden = false;

                                    var controlsRect = _controlsTool.controlBar.getBoundingClientRect();
                                    if(Q.info.isMobile) {
                                        dialog.style.left = (window.innerWidth / 2) - (dialogWidth / 2) + 'px';
                                        dialog.style.top = (controlsRect.height + 10) + 'px';
                                    } else {
                                        dialog.style.left = (_clientX + 50) + 'px';
                                        dialog.style.top = (_clientY - 200) + 'px';
                                    }
                                }
                            }

                            function hideDialog() {
                                if(!_dialogEl.classList.contains('live-editor-hidden')){
                                    _dialogEl.classList.add('live-editor-hidden');
                                    _isHidden = true;
                                }
                            }

                            function toggle(e) {
                                if(_isHidden) {
                                    showDialog(e);
                                } else hideDialog(e);
                            }

                            return {
                                hideDialog: hideDialog,
                                showDialog: showDialog,
                                toggle: toggle
                            }
                        }())

                        var addAudioPopup = (function () {
                            var _dialogEl = null;
                            var _isHidden = true;

                            console.log('addVideoPopup')
                            var dialog=document.createElement('DIV');
                            dialog.className = 'live-editor-dialog-box live-editor-dialog-box-add-new-s live-editor-popup-add-audio live-editor-hidden';
                            _dialogEl = dialog;
                            var dialogTitle=document.createElement('H3');
                            dialogTitle.innerHTML = 'Add audio';
                            dialogTitle.className = 'live-editor-dialog-header Q_dialog_title';

                            var dialogInner=document.createElement('DIV');
                            dialogInner.className = 'live-editor-dialog-inner';
                            var boxContent=document.createElement('DIV');
                            boxContent.className = 'live-editor-popup-streaming-box live-editor-popup-box';
                            var boxContentText=document.createElement('DIV');
                            boxContentText.innerHTML = 'Please choose file from your computer or enter the link.';
                            var videoItemInput = document.createElement('INPUT');
                            videoItemInput.className = 'live-editor-popup-sources-add-menu-file';
                            videoItemInput.type = 'file';
                            videoItemInput.name = 'fileAudioSource';
                            videoItemInput.accept = 'audio/mp3, audio/*'
                            videoItemInput.addEventListener('change', function (e) {
                                addAudioSource(e);
                                hideDialog();
                            })

                            var boxContentText2=document.createElement('DIV');
                            boxContentText2.innerHTML = 'OR';
                            var imageItemLinkInput = document.createElement('INPUT');
                            imageItemLinkInput.className = 'live-editor-popup-sources-add-menu-file';
                            imageItemLinkInput.type = 'text';
                            imageItemLinkInput.placeholder = 'Enter the link';
                            imageItemLinkInput.name = 'fileImageLink';

                            boxContent.appendChild(boxContentText);
                            boxContent.appendChild(videoItemInput);
                            boxContent.appendChild(boxContentText2);
                            boxContent.appendChild(imageItemLinkInput);

                            var close=document.createElement('div');
                            close.className = 'live-editor-close-dialog-sign';
                            close.style.backgroundImage = 'url("' + Q.url("{{Q}}/img/close.png") + '"';
                            close.style.backgroundRepeat = 'no-repeat';
                            close.style.backgroundSize = 'cover';
                            close.addEventListener('click', function() {
                                /* if(imageItemLinkInput.value != '') {
                                        var val = imageItemLinkInput.value;
                                        addVideoSource(val);
                                        hideDialog();
                                        imageItemLinkInput.value = '';
                                    }*/
                            });
                            dialogInner.appendChild(dialogTitle);

                            dialog.appendChild(close);
                            dialogInner.appendChild(boxContent);
                            dialog.appendChild(dialogInner);

                            _webrtcUserInterface.roomsMediaContainer().appendChild(dialog);
                            setTimeout(function () {
                                Q.activate(
                                    Q.Tool.setUpElement(
                                        dialog, // or pass an existing element
                                        "Q/resize",
                                        {
                                            move: true,
                                            activateOnElement: dialogTitle,
                                            resize: false,
                                            active: true,
                                            moveWithinArea: 'window',
                                        }
                                    ),
                                    {},
                                    function () {

                                    }
                                );
                            }, 3000)

                            var controlsRect = _controlsTool.controlBar.getBoundingClientRect();
                            var dialogWidth = 400;
                            dialog.style.width = dialogWidth + 'px';
                            console.log('dialogWidth', dialogWidth);
                            if(Q.info.isMobile) {
                                dialog.style.left = (window.innerWidth / 2) - (dialogWidth / 2) + 'px';
                                dialog.style.bottom = (controlsRect.height + 10) + 'px';
                            } else {
                                dialog.style.left = (window.innerWidth / 2) - (dialogWidth / 2) + 'px';
                                dialog.style.top = (window.innerHeight/ 2 - 100) + 'px';
                            }


                            close.addEventListener('click', function () {
                                hideDialog();
                            });

                            function showDialog(e) {
                                videoItemInput.value = '';
                                if(_dialogEl.classList.contains('live-editor-hidden')) {
                                    _dialogEl.classList.remove('live-editor-hidden');
                                    var _clientX = e.clientX;
                                    var _clientY = e.clientY;

                                    _isHidden = false;

                                    var controlsRect = _controlsTool.controlBar.getBoundingClientRect();
                                    if(Q.info.isMobile) {
                                        dialog.style.left = (window.innerWidth / 2) - (dialogWidth / 2) + 'px';
                                        dialog.style.top = (controlsRect.height + 10) + 'px';
                                    } else {
                                        dialog.style.left = (_clientX + 50) + 'px';
                                        dialog.style.top = (_clientY - 200) + 'px';
                                    }
                                }
                            }

                            function hideDialog() {
                                if(!_dialogEl.classList.contains('live-editor-hidden')){
                                    _dialogEl.classList.add('live-editor-hidden');
                                    _isHidden = true;
                                }
                            }

                            function toggle(e) {
                                if(_isHidden) {
                                    showDialog(e);
                                } else hideDialog(e);
                            }

                            return {
                                hideDialog: hideDialog,
                                showDialog: showDialog,
                                toggle: toggle
                            }
                        }())

                        var addMicrophoneAudioPopup = (function () {
                            var state = {
                                isHidden: true,
                                _mediaStream: null,
                                _source: null,
                                rawAudioInputDevices: [],
                                devicesList: [],
                                constraints: { audio: true, video: false },
                                set mediaStream(value) {
                                    this._mediaStream = value;
            
                                    if (_okButtonEl) {
                                        _okButtonEl.classList.remove('live-editor-button-inactive');
                                    }
                                },
                                get mediaStream() { return this._mediaStream; },
                                set source(source) {
                                    this.mediaStream = source.sourceInstance.mediaStream;
                                    this._source = source;
                                    if (_nameInputEl) {
                                        _nameInputEl.value = source.sourceInstance.name;
                                    }
                                },
                                get source() { return this._source; },
                            }
                            var options = null;
                            var _dialogueEl = null;
                            var _devicesListEl = null;
                            var _nameInputEl = null;
                            var _okButtonEl = null;
                            var _noticesEl = null;
            
                            console.log('addMicrophoneAudioPopup')
            
                            function setDefaultSourceName() {
                                let micsNumber = 0;
                                for (let i in _visualList) {
                                    if (_visualList[i].sourceInstance.sourceType == 'audioInput') {
                                        micsNumber++;
                                    }
                                }
                                sourceNameInput.value = 'Audio Input ' + (micsNumber + 1);
            
                            }
            
                            function updateDevicesList() {
                                for (let l in state.devicesList) {
                                    if (state.devicesList[l].optionEl && state.devicesList[l].optionEl.parentElement) {
                                        state.devicesList[l].optionEl.parentElement.removeChild(state.devicesList[l].optionEl);
                                    }
                                }
                                state.devicesList = [];
                                for (let i in state.rawAudioInputDevices) {
                                    let device = state.rawAudioInputDevices[i];
                                    let option = document.createElement('OPTION');
                                    option.value = device.deviceId
                                    option.innerHTML = device.label
                                    _devicesListEl.appendChild(option);
                                    state.devicesList.push({
                                        optionEl: option,
                                        id: device.deviceId,
                                        label: device.label
                                    });
                                }
                            }
            
                            function getAudioInputAfterSelectedOptions() {
                                if (state.mediaStream != null && !options.source) {
                                    let tracks = state.mediaStream.getTracks();
                                    tracks.forEach(function (track) {
                                        track.stop();
                                    });
                                }
            
                                let selectedDeviceId = getSelectedMicOption();
                                state.constraints.video.deviceId = { exact: selectedDeviceId };
        
                                return navigator.mediaDevices.getUserMedia(state.constraints)
                                    .then(function (mediaStream) {
                                        state.mediaStream = mediaStream;
                                    })
                                    .catch(onErrorHandler);
                            }
            
                            function updateSelectedOption() {
                                console.log('updateSelectedOption');
                                if (state.mediaStream) {
                                    let deviceId = state.mediaStream.getAudioTracks()[0].getSettings().deviceId;
                                    for (let i in state.devicesList) {
                                        if (state.devicesList[i].id == deviceId) {
                                            console.log('updateSelectedOption: selected');
                                            state.devicesList[i].optionEl.selected = true;
                                        }
                                    }
                                }
                            }
            
                            function getSelectedMicOption() {
                                let selectedCameraId = _devicesListEl.value;
                                if (!selectedCameraId || selectedCameraId == '') {
                                    selectedCameraId = state.devicesList[0].id;
                                }
                                return selectedCameraId;
                            }
            
                            function loadInputDevicesAndGetStream() {
                                state.rawAudioInputDevices = [];
                                console.log('loadInputDevicesAndGetStream', state.constraints.video.frameRate);
                                return navigator.mediaDevices.getUserMedia(state.constraints)
                                    .then(function (mediaStream) {
                                        state.mediaStream = mediaStream;
                                        return navigator.mediaDevices.enumerateDevices()
                                            .then(function (devices) {
                                                devices.forEach(function (device) {
                                                    if (device.kind == 'audioinput') state.rawAudioInputDevices.push(device);
                                                });
                                            })
                                            .catch(onErrorHandler);
                                    })
                                    .catch(onErrorHandler);
            
            
                            }
            
                            function loadDialog() {
                                if (state.rawAudioInputDevices.length != 0) {
                                    if (options.source != null) {
                                        state.source = options.source;
                                        updateSelectedOption();
                                    } else {
                                        loadInputDevicesAndGetStream().then(function () {
                                            updateDevicesList();
                                            updateSelectedOption();
                                            setDefaultSourceName();
                                        })
                                    }
            
                                } else {
                                    //load dialogue first time
                                    return navigator.mediaDevices.enumerateDevices()
                                        .then(function (devices) {
                                            let videoInputDevices = 0;
                                            devices.forEach(function (device) {
                                                if (device.kind == 'videoinput') videoInputDevices++
                                            });
                                            if (videoInputDevices != 0) {
                                                loadInputDevicesAndGetStream().then(function () {
                                                    updateDevicesList();
                                                    updateSelectedOption();
                                                    setDefaultSourceName();
                                                })
                                            } else {
                                                showNotice('No video input devices detected');
                                            }
                                        })
                                        .catch(onErrorHandler);
            
                                }
                            }
            
                            function showDialog(optns) {
                                options = optns;
                                if (_dialogueEl.classList.contains('live-editor-hidden')) {
                                    _dialogueEl.classList.remove('live-editor-hidden');
            
                                    state.isHidden = false;
            
                                    if (!_isMobile) {
                                        dialogue.style.left = (window.innerWidth / 2) - (dialogWidth / 2) + 'px';
                                        dialogue.style.top = '20px';
                                    }
            
                                    loadDialog();
                                }
                            }
            
                            function onErrorHandler(error) {
                                console.log(error);
                                _noticesEl.innerHTML = error.message;
                            }
            
                            function showNotice(notice) {
                                _noticesEl.innerHTML = notice;
                            }
            
                            function hideDialog(okBtnClicked) {
                                console.log('okBtnClicked', okBtnClicked)
            
                                if (!okBtnClicked && state.mediaStream != null && !options.source) {
                                    console.log('tracks', state.mediaStream)
            
                                    let tracks = state.mediaStream.getTracks();
                                    console.log('tracks2', tracks)
            
                                    for (let t in tracks) {
                                        tracks[t].stop();
                                    }
                                }
                                if (!_dialogueEl.classList.contains('live-editor-hidden')) {
                                    _dialogueEl.classList.add('live-editor-hidden');
                                    state.isHidden = true;
                                }
            
                                state.mediaStream = null;
                                state._source = null;
                                state.constraints = { audio: true, video: false};
                            }
            
                            var dialogue = document.createElement('DIV');
                            dialogue.className = 'live-editor-dialog-box live-editor-popup-add-media-input live-editor-hidden';
                            _dialogueEl = dialogue;
                            var close = document.createElement('div');
                            close.className = 'live-editor-close-dialog-sign';
                            close.style.backgroundImage = 'url("' + Q.url("{{Q}}/img/close.png") + '"';
                            close.style.backgroundRepeat = 'no-repeat';
                            close.style.backgroundSize = '40px';

                            var dialogTitle = document.createElement('H3');
                            dialogTitle.innerHTML = 'Add audio input source';
                            dialogTitle.className = 'live-editor-dialog-header';
            
                            var dialogInner = document.createElement('DIV');
                            dialogInner.className = 'live-editor-dialog-inner';
                            var boxContent = document.createElement('DIV');
                            boxContent.className = 'live-editor-dialog-content';
            
                            var addSourceControls = document.createElement('DIV');
                            addSourceControls.className = 'live-editor-dialog-add-source-controls';
                            var addSourceControlsInner = document.createElement('DIV');
                            addSourceControlsInner.className = 'live-editor-dialog-add-source-controls-inner';
                            dialogInner.appendChild(dialogTitle);
                            dialogue.appendChild(close);
        
                            var audioInputDevicesCon = document.createElement('DIV');
                            audioInputDevicesCon.className = 'live-editor-dialog-add-source-controls-item live-editor-dialog-add-source-controls-devices';
                            var addSourceControlsDevicesCaption = document.createElement('DIV');
                            addSourceControlsDevicesCaption.className = 'live-editor-dialog-add-source-controls-caption';
                            addSourceControlsDevicesCaption.innerHTML = 'Devices ';
                            var addSourceControlsDevicesReload = document.createElement('DIV');
                            addSourceControlsDevicesReload.className = 'live-editor-dialog-add-source-controls-reload';
                            addSourceControlsDevicesReload.innerHTML = _streamingIcons.reload;
                            var audioInputDevicesListCon = document.createElement('DIV');
                            audioInputDevicesListCon.className = 'live-editor-dialog-add-source-controls-config live-editor-dialog-add-source-list-con';
                            var audioInputDevicesList = _devicesListEl = document.createElement('SELECT');
                            audioInputDevicesList.className = 'live-editor-dialog-add-source-devices-list';
                            var loadDevicesListBtn = document.createElement('BUTTON');
                            loadDevicesListBtn.innerHTML = 'Reload devices list';
                            loadDevicesListBtn.className = 'live-editor-dialog-add-source-load-list live-editor-button';
                            
                            addSourceControlsDevicesCaption.appendChild(addSourceControlsDevicesReload);
                            audioInputDevicesCon.appendChild(addSourceControlsDevicesCaption);
                            audioInputDevicesListCon.appendChild(audioInputDevicesList);
                            //audioInputDevicesListCon.appendChild(loadDevicesListBtn);
                            audioInputDevicesCon.appendChild(audioInputDevicesListCon);
                            addSourceControlsInner.appendChild(audioInputDevicesCon);
            
                            var sourceNameCon = document.createElement('DIV');
                            sourceNameCon.className = 'live-editor-dialog-add-source-controls-item live-editor-dialog-add-source-controls-name';
                            var sourceNameCaption = document.createElement('DIV');
                            sourceNameCaption.className = 'live-editor-dialog-add-source-controls-caption';
                            sourceNameCaption.innerHTML = 'Name';
                            var sourceNameInputCon = document.createElement('DIV');
                            sourceNameInputCon.className = 'live-editor-dialog-add-source-controls-config live-editor-dialog-add-source-name-con';
                            var sourceNameInput = _nameInputEl = document.createElement('INPUT');
                            sourceNameInput.className = 'live-editor-dialog-add-source-name-input';
                            sourceNameInput.type = 'text';
            
                            sourceNameCon.appendChild(sourceNameCaption);
                            sourceNameCon.appendChild(sourceNameInputCon);
                            sourceNameInputCon.appendChild(sourceNameInput);
                            addSourceControlsInner.appendChild(sourceNameCon);
            
                            var sourceTypeCon = document.createElement('DIV');
                            sourceTypeCon.className = 'live-editor-dialog-add-source-controls-item live-editor-dialog-add-source-controls-type';
                            var sourceTypeCaption = document.createElement('DIV');
                            sourceTypeCaption.className = 'live-editor-dialog-add-source-controls-caption';
                            sourceTypeCaption.innerHTML = '';
                            var sourceTypeInputCon = document.createElement('DIV');
                            sourceTypeInputCon.className = 'live-editor-dialog-add-source-controls-config live-editor-dialog-add-source-type-con';
                            var separateSourceTypeLabel = document.createElement('LABEL');
                            separateSourceTypeLabel.className = 'live-editor-dialog-add-source-type-label';
                            var separateSourceTypeInput = document.createElement('INPUT');
                            separateSourceTypeInput.className = 'live-editor-dialog-add-source-type-input';
                            separateSourceTypeInput.name = 'live-editor-audio_input_type';
                            separateSourceTypeInput.type = 'radio';
                            separateSourceTypeInput.value = 'separate';
                            separateSourceTypeInput.checked = 'true';
                            var separateSourceTypeLabelText = document.createElement('SPAN');
                            separateSourceTypeLabelText.className = 'live-editor-dialog-add-source-type-label-text';
                            separateSourceTypeLabelText.innerHTML = 'Only livestream viewers will hear this source';
                            var webrtcSourceTypeLabel = document.createElement('LABEL');
                            webrtcSourceTypeLabel.className = 'live-editor-dialog-add-source-type-label';
                            var webrtcSourceTypeInput = document.createElement('INPUT');
                            webrtcSourceTypeInput.className = 'live-editor-dialog-add-source-type-input';
                            webrtcSourceTypeInput.name = 'live-editor-audio_input_type';
                            webrtcSourceTypeInput.type = 'radio';
                            webrtcSourceTypeInput.value = 'webrtc';
                            var webrtcSourceTypeLabelText = document.createElement('SPAN');
                            webrtcSourceTypeLabelText.className = 'live-editor-dialog-add-source-type-label-text';
                            webrtcSourceTypeLabelText.innerHTML = 'Evryone will hear this source';

                            sourceTypeCon.appendChild(sourceTypeCaption);
                            sourceTypeCon.appendChild(sourceTypeInputCon);
                            sourceTypeInputCon.appendChild(separateSourceTypeLabel);
                            separateSourceTypeLabel.appendChild(separateSourceTypeInput);
                            separateSourceTypeLabel.appendChild(separateSourceTypeLabelText);
                            sourceTypeInputCon.appendChild(webrtcSourceTypeLabel);
                            webrtcSourceTypeLabel.appendChild(webrtcSourceTypeInput);
                            webrtcSourceTypeLabel.appendChild(webrtcSourceTypeLabelText);
                            addSourceControlsInner.appendChild(sourceTypeCon);
            
                            var dialogButtonsCon = document.createElement('DIV');
                            dialogButtonsCon.className = 'live-editor-dialog-add-source-buttons-con';
                            var okButton = _okButtonEl = document.createElement('BUTTON');
                            okButton.innerHTML = 'OK';
                            okButton.className = 'live-editor-dialog-add-source-ok-btn live-editor-button live-editor-button-inactive';
                            dialogButtonsCon.appendChild(okButton);
                            addSourceControls.appendChild(addSourceControlsInner);
                            boxContent.appendChild(addSourceControls);
                            boxContent.appendChild(dialogButtonsCon);
                            dialogInner.appendChild(boxContent);
                            dialogue.appendChild(dialogInner);
            
                            _webrtcUserInterface.roomsMediaContainer().appendChild(dialogue);
            
                            setTimeout(function () {
                                Q.activate(
                                    Q.Tool.setUpElement(
                                        dialogue, // or pass an existing element
                                        "Q/resize",
                                        {
                                            move: true,
                                            activateOnElement: dialogTitle,
                                            resize: false,
                                            active: true,
                                            moveWithinArea: 'window',
                                        }
                                    ),
                                    {},
                                    function () {

                                    }
                                );
                            }, 500);
            
                            var dialogWidth = 800;
                            dialogue.style.width = dialogWidth + 'px';
                            if (!_isMobile) {
                                dialogue.style.left = (window.innerWidth / 2) - (dialogWidth / 2) + 'px';
                                dialogue.style.top = (window.innerHeight / 2 - 100) + 'px';
                            } 
            
                            _devicesListEl.addEventListener('change', function (e) {
                                getAudioInputAfterSelectedOptions().then(function () {

                                });
                            })
            
                            addSourceControlsDevicesReload.addEventListener('click', function (e) {
                                if (state.mediaStream != null && !options.source) {
                                    let tracks = state.mediaStream.getTracks();
                                    for (let t in tracks) {
                                        tracks[t].stop();
                                    }
                                }
                                loadDialog();
                            })
            
                            okButton.addEventListener('click', function (e) {
                                if (options && options.onOk != null) {
                                    let selectedDeviceId = getSelectedMicOption();
                                    options.onOk({
                                        stream: state.mediaStream,
                                        name: sourceNameInput.value,
                                        deviceId: selectedDeviceId,
                                        sourceType: separateSourceTypeInput.checked ? 'separate' : 'webrtc'
                                    });
                                }
                                hideDialog(true);
                            })
            
                            close.addEventListener('click', function () {
                                hideDialog();
                            });
            
                            return {
                                hideDialog: hideDialog,
                                showDialog: showDialog,
                            }
                        }())  

                        var contextMenu = function (type) {
                            let _type = type
                            let _contextMenu = null

                            _contextMenu = document.createElement('DIV');
                            _contextMenu.className = 'live-editor-context-menu';

                            function loadContextItems() {
                                if (_type == 'visualSource') {
                                    var activeScene = scenesInterface.getActive();
                                    let selectedSource = activeScene.sourcesInterface.visualSources.getSelectedSource();
                                    if (selectedSource.sourceInstance.sourceType == 'videoInput' && !selectedSource.sourceInstance.isScreensharing) {
                                        let preferencesItem = document.createElement('DIV');
                                        preferencesItem.className = 'live-editor-context-item';
                                        preferencesItem.innerHTML = 'Preferences';
                                        _contextMenu.appendChild(preferencesItem);
                                        preferencesItem.addEventListener('click', function () {
                                            addCameraPopup.showDialog({
                                                source: selectedSource,
                                                onOk: function (e) {
                                                    if (!e.stream) {
                                                        alert('No media stream added');
                                                    }

                                                    if(e.sourceType == 'separate') {
                                                        selectedSource.sourceInstance.update({
                                                            stream: e.stream,
                                                            name: e.name,
                                                            originalSize: e.originalSize,
                                                            frameRate: e.frameRate
                                                        });
                                                    } else {
                                                        console.log('add camera source: webrtc');
                                                        let videoTracks = e.stream.getVideoTracks();
                                                        for (let t in videoTracks) {
                                                            videoTracks[t].stop();
                                                        }
                                                        activeScene.sourcesInterface.visualSources.removeSource();
                                                        _webrtcSignalingLib.localMediaControls.toggleCameras({deviceId:e.deviceId});
                                                    }

                                                    
                                                },
                                                onClose: function () {

                                                }
                                            });
                                        });
                                    } else if (selectedSource.sourceInstance.sourceType == 'videoInput' && selectedSource.sourceInstance.isScreensharing) {
                                        let preferencesItem = document.createElement('DIV');
                                        preferencesItem.className = 'live-editor-context-item';
                                        preferencesItem.innerHTML = 'Preferences';
                                        _contextMenu.appendChild(preferencesItem);
                                        preferencesItem.addEventListener('click', function () {
                                            addScreensharingInputPopup.showDialog({
                                                source: selectedSource,
                                                onOk: function (e) {
                                                    if (!e.stream) {
                                                        alert('No media stream added');
                                                    }
                                                    selectedSource.sourceInstance.update({
                                                        stream: e.stream,
                                                        name: e.name
                                                    });
                                                },
                                                onClose: function () {

                                                }
                                            });
                                        });
                                    } else if (selectedSource.sourceInstance.sourceType == 'video') {
                                        let preferencesItem = document.createElement('DIV');
                                        preferencesItem.className = 'live-editor-context-item';
                                        preferencesItem.innerHTML = 'Preferences';
                                        _contextMenu.appendChild(preferencesItem);
                                        preferencesItem.addEventListener('click', function () {
                                            filtersPopup(selectedSource);
                                        });
                                    }

                                }
                            }

                            function hide(e) {
                                if (e.target.offsetParent != _contextMenu) {
                                    if (_contextMenu.parentElement) _contextMenu.parentElement.removeChild(_contextMenu);
                                    window.removeEventListener('click', hide);
                                }
                            }

                            function show(e) {
                                existingContextMenu = document.querySelector('.live-editor-context-menu');
                                if (existingContextMenu && existingContextMenu.parentElement) existingContextMenu.parentElement.removeChild(existingContextMenu);
                                let clientX = e.clientX;
                                let clientY = e.clientY;
                                _contextMenu.style.top = clientY + 'px';
                                _contextMenu.style.left = clientX + 'px';

                                loadContextItems();

                                document.body.appendChild(_contextMenu);

                                window.addEventListener('click', hide);
                            }

                            return {
                                show: show
                            }
                        }

                        return {
                            syncList: syncList,
                            loadList: loadList,
                            hideResizingElement: hideResizingElement,
                            moveForward: moveForward,
                            moveBackward: moveBackward,
                            removeSource: removeSource,
                            addVideoInputSource: addVideoInputSource,
                            addImageSource: addImageSource,
                            addWatermark: addWatermark,
                            addBackground: addBackground,
                            addVideoSource: addVideoSource,
                            getSelectedSource: getSelectedSource,
                            getSourcesList: getSourcesList,
                            checkIfOtherWebrtcVideoGroupExist: checkIfOtherWebrtcVideoGroupExist,
                            createOrGet: createVisualSourcesList
                        }
                    }())

                    function showVisualSources() {
                        _sourcesListEl.innerHTML = '';
                        _sourcesListEl.appendChild(visualSources.createOrGet());
                        visualSources.syncList();
                    }

                    /*function tabHandler(e) {
                        var tabEl = e.currentTarget;
                        console.log('tabHandler tabEl', tabEl)

                        var tabName = tabEl.dataset.tab;
                        if(!tabName) return;
                        if(tabName == 'visual') {
                            _activeInterface = visualSources;
                            showVisualSources();
                        } else if(tabName == 'audio') {

                        }

                        for(let e in _sourcesTabs.children) {
                            if(typeof _sourcesTabs.children[e] != 'object') continue;
                            console.log('tabHandler', _sourcesTabs.children[e])
                            if(_sourcesTabs.children[e] == tabEl) {
                                if(!_sourcesTabs.children[e].classList.contains('live-editor-popup-sources-title-tab-active')) {
                                    _sourcesTabs.children[e].classList.add('live-editor-popup-sources-title-tab-active');
                                }
                                continue;
                            }
                            if(_sourcesTabs.children[e].classList.contains('live-editor-popup-sources-title-tab-active')) {
                                _sourcesTabs.children[e].classList.remove('live-editor-popup-sources-title-tab-active');
                            }
                        }
                    }*/

                    function createSourcesCol() {
                        if(_sceneSourcesColumnEl != null) return _sceneSourcesColumnEl;
                        
                        var sourcesColumnInner = document.createElement('DIV');
                        sourcesColumnInner.className = 'live-editor-popup-sources-inner';
                        
                        var sourcesColumnBody = document.createElement('DIV');
                        sourcesColumnBody.className = 'live-editor-popup-sources-body';
                        sourcesColumnInner.appendChild(sourcesColumnBody);
                        _sourcesListEl = sourcesColumnBody;

                        _sourcesListEl.appendChild(visualSources.createOrGet());
                        _activeInterface = visualSources;

                        _sceneSourcesColumnEl = sourcesColumnInner;
                        return sourcesColumnInner;
                    }

                    function update() {
                        visualSources.syncList();

                        let videoChatGroupExists = visualSources.checkIfOtherWebrtcVideoGroupExist();

                        var children = _addVisualSourceDropUpMenuEl.children;
                        for (var i = 0; i < children.length; i++) {
                            var menuItem = children[i];
                            if(menuItem.dataset.menuName != null && menuItem.dataset.menuName == 'add-conference' && videoChatGroupExists){
                                menuItem.style.opacity = 0.5;
                                menuItem.style.pointerEvents = 'none';
                            } else {
                                menuItem.style.opacity = '';
                                menuItem.style.pointerEvents = 'auto';
                            }
                            // Do stuff
                        }
                    }

                    function updateLocalControlsButtonsState() {
                        console.log('updateLocalControlsButtonsState');

                        for(let i in _visualList) {
                            if (_visualList[i]._sourceInstance.sourceType != 'webrtc' || !_visualList[i]._sourceInstance.participant.isLocal) continue;
                            if(!_visualList[i].cameraBtnIcon || !_visualList[i].microphoneBtnIcon) continue;
                            let listItemInstance = _visualList[i];
                            var localParticipant = _webrtcSignalingLib.localParticipant();
                            var localMediaControls = _webrtcSignalingLib.localMediaControls;

                            var enabledVideoTracks = localParticipant.tracks.filter(function (t) {
                                return t.kind == 'video' && t.mediaStreamTrack != null && t.mediaStreamTrack.enabled;
                            }).length;

                            if (_webrtcUserInterface.getOptions().audioOnlyMode) {
                                console.log('updateLocalControlsButtonsState v1');
                                listItemInstance.cameraBtnIcon.innerHTML = _controlsToolIcons.moreOptions;
                            } else if (enabledVideoTracks == 0 && _webrtcSignalingLib.localParticipant().videoStream == null) {
                                console.log('updateLocalControlsButtonsState v2');
                                listItemInstance.cameraBtnIcon.innerHTML = _controlsToolIcons.disabledCamera;
                            } else if (!localMediaControls.cameraIsEnabled()) {
                                console.log('updateLocalControlsButtonsState v3');
                                listItemInstance.cameraBtnIcon.innerHTML = _controlsToolIcons.disabledCamera;
                            } else if (localMediaControls.cameraIsEnabled()) {
                                console.log('updateLocalControlsButtonsState v4');
                                listItemInstance.cameraBtnIcon.innerHTML = _controlsToolIcons.camera;
                            }

                            var enabledAudioTracks = localParticipant.tracks.filter(function (t) {
                                return t.kind == 'audio' && t.mediaStreamTrack != null && t.mediaStreamTrack.enabled;
                            }).length;

                            if (enabledAudioTracks == 0 && _webrtcSignalingLib.localParticipant().audioStream == null) {
                                console.log('updateLocalControlsButtonsState a1');
                                listItemInstance.microphoneBtnIcon.innerHTML = _controlsToolIcons.disabledMicrophone;
                            } else if (!localMediaControls.micIsEnabled()) {
                                console.log('updateLocalControlsButtonsState a2');
                                listItemInstance.microphoneBtnIcon.innerHTML = _controlsToolIcons.disabledMicrophone;
                            } else if (localMediaControls.micIsEnabled()) {
                                console.log('updateLocalControlsButtonsState a3');
                                listItemInstance.microphoneBtnIcon.innerHTML = _controlsToolIcons.microphone;
                            }
                        }

                        updateGlobalMicIcon();
                    }

                    function updateGlobalMicIcon() {
                        var localParticipant = _webrtcSignalingLib.localParticipant();
                        var localMediaControls = _webrtcSignalingLib.localMediaControls;
                        var enabledAudioTracks = localParticipant.tracks.filter(function (t) {
                            return t.kind == 'audio' && t.mediaStreamTrack != null && t.mediaStreamTrack.enabled;
                        }).length;

                        if (enabledAudioTracks == 0 && _webrtcSignalingLib.localParticipant().audioStream == null) {
                            console.log('updateGlobalMicIcon a1');
                            _globalMicIconEl.innerHTML = _streamingIcons.disabledMicrophone;
                        } else if (!localMediaControls.micIsEnabled()) {
                            console.log('updateGlobalMicIcon a2');
                            _globalMicIconEl.innerHTML = _streamingIcons.disabledMicrophone;
                        } else if (localMediaControls.micIsEnabled()) {
                            console.log('updateGlobalMicIcon a3');
                            _globalMicIconEl.innerHTML = _streamingIcons.enabledMicrophone;
                        }
                    }

                    function getSelectedSource() {
                        return _selectedSource;
                    }

                    return {
                        createSourcesCol: createSourcesCol,
                        update: update,
                        updateLocalControlsButtonsState: updateLocalControlsButtonsState,
                        getSelectedSource: getSelectedSource,
                        visualSources: visualSources
                    }

                }

                var optionsColumn = (function () {
                    var _activeView = null;

                    function hideActiveView() {
                        console.log('optionsColumn: hideActiveView', _activeView)
                        if(_activeView != null) {
                            _activeView.hide();
                        }
                    }

                    function createMediaControls(source) {
                        console.log('createMediaControls',  source.params);

                        var mediaElement = source.sourceInstance.audioInstance || source.sourceInstance.videoInstance;

                        var dialogControlsBody = document.createElement('DIV');
                        dialogControlsBody.className = 'live-editor-popup-options-params-mediacontrols';

                        var seektimeCon = document.createElement('DIV');
                        seektimeCon.className = 'live-editor-popup-options-params-seekbar-con';
                        var seektimeEl = document.createElement('DIV');
                        seektimeEl.className = 'live-editor-popup-options-params-seekbar';
                        var seektimeProgress = document.createElement('span');
                        seektimeProgress.className = 'live-editor-popup-options-params-seekbar-btn';
                        seektimeEl.appendChild(seektimeProgress);
                        seektimeCon.appendChild(seektimeEl);
                        dialogControlsBody.appendChild(seektimeCon);

                        var audioControlsCon = document.createElement('DIV');
                        audioControlsCon.className = 'live-editor-popup-options-params-controls-con';
                        var playPauseCon = document.createElement('DIV');
                        playPauseCon.className = 'live-editor-popup-options-params-controls-con';
                        var playPauseInner = document.createElement('DIV');
                        playPauseInner.className = 'live-editor-popup-options-params-controls-inner';
                        var playPauseBtn = document.createElement('DIV');
                        playPauseBtn.className = 'live-editor-popup-options-params-controls-btn';
                        playPauseBtn.innerHTML = mediaElement.paused ? _streamingIcons.playIcon : _streamingIcons.pauseIcon;
                        playPauseInner.appendChild(playPauseBtn);
                        playPauseCon.appendChild(playPauseInner);
                        audioControlsCon.appendChild(playPauseCon);


                        var volumeCon = document.createElement('DIV');
                        volumeCon.className = 'live-editor-popup-options-params-controls-volume-con';
                        var volumeIcon = document.createElement('DIV');
                        volumeIcon.className = 'live-editor-popup-options-params-controls-volume-icon'
                        volumeIcon.innerHTML = _streamingIcons.disabledEnabledSpeaker;
                        var volumeSliderCon = document.createElement('DIV');
                        volumeSliderCon.className = 'live-editor-popup-options-params-volume-slider-con';
                        var volume = document.createElement('DIV');
                        volume.className = 'live-editor-popup-options-params-controls-volume'
                        var volumeSlider = document.createElement('SPAN');
                        volumeSlider.className = 'live-editor-popup-options-params-controls-volume-slider';
                        volumeSlider.style.width = source.sourceInstance.gainNode.gain.value * 100 + '%';
                        volume.appendChild(volumeSlider);
                        volumeSliderCon.appendChild(volume);
                        volumeCon.appendChild(volumeIcon);
                        volumeCon.appendChild(volumeSliderCon);
                        audioControlsCon.appendChild(volumeCon);

                        var audioTimeCon = document.createElement('DIV');
                        audioTimeCon.className = 'live-editor-popup-options-params-audio-time-con';
                        var audioTimeInner = document.createElement('DIV');
                        audioTimeInner.className = 'live-editor-popup-options-params-audio-time-inner';
                        var audioTimeCurrent = document.createElement('SPAN');
                        audioTimeCurrent.className = 'live-editor-popup-options-params-audio-time-cur';
                        var audioTimeSpliter = document.createElement('SPAN');
                        audioTimeSpliter.className = 'live-editor-popup-options-params-audio-time-split';
                        audioTimeSpliter.innerHTML = '/';
                        var audioTimeDuration = document.createElement('SPAN');
                        audioTimeDuration.className = 'live-editor-popup-options-params-audio-time-dur';
                        audioTimeInner.appendChild(audioTimeCurrent);
                        audioTimeInner.appendChild(audioTimeSpliter);
                        audioTimeInner.appendChild(audioTimeDuration);
                        audioTimeCon.appendChild(audioTimeInner);
                        audioControlsCon.appendChild(audioTimeCon);


                        var loopAndLocalPlayCon = document.createElement('DIV');
                        loopAndLocalPlayCon.className = 'live-editor-popup-options-params-loopplay-con';
                        var loopAudioCon = document.createElement('DIV');
                        loopAudioCon.className = 'live-editor-popup-options-params-loopaudio-con';
                        var loopAudioLabel = document.createElement('LABEL');
                        loopAudioLabel.className = 'live-editor-popup-options-params-looplabel';
                        var loopPlayCheckbox = document.createElement('INPUT');
                        loopPlayCheckbox.type = 'checkbox';
                        loopPlayCheckbox.name = 'loopAudio';
                        loopPlayCheckbox.checked = source.params.loop;
                        var loopPlayCheckboxText = document.createTextNode('Loop');
                        loopAudioLabel.appendChild(loopPlayCheckbox);
                        loopAudioLabel.appendChild(loopPlayCheckboxText);
                        loopAudioCon.appendChild(loopAudioLabel);
                        loopAndLocalPlayCon.appendChild(loopAudioCon);

                        var PlayLocallyCon = document.createElement('DIV');
                        PlayLocallyCon.className = 'live-editor-popup-options-params-playlocally-con';
                        var playLocallyLabel = document.createElement('LABEL');
                        playLocallyLabel.className = 'live-editor-popup-options-params-playlocally-label';
                        var playLocallyCheckbox = document.createElement('INPUT');
                        playLocallyCheckbox.type = 'checkbox';
                        playLocallyCheckbox.name = 'loopAudio';
                        playLocallyCheckbox.checked = source.params.localOutput;
                        var playLocCheckboxText = document.createTextNode('Local output');
                        playLocallyLabel.appendChild(playLocallyCheckbox);
                        playLocallyLabel.appendChild(playLocCheckboxText);
                        PlayLocallyCon.appendChild(playLocallyLabel);
                        loopAndLocalPlayCon.appendChild(PlayLocallyCon);

                        dialogControlsBody.appendChild(audioControlsCon);
                        dialogControlsBody.appendChild(loopAndLocalPlayCon);

                        seektimeCon.addEventListener('mouseenter', function(){
                            if(!seektimeProgress.classList.contains("live-editor-popup-options-seekbar-hover")) {
                                seektimeProgress.classList.add("live-editor-popup-options-seekbar-hover");
                            }
                        })
                        seektimeCon.addEventListener('mouseleave', function(){
                            if(seektimeProgress.classList.contains("live-editor-popup-options-seekbar-hover")) {
                                seektimeProgress.classList.remove("live-editor-popup-options-seekbar-hover");
                            }
                        })

                        function getOffsetLeft(elem) {
                            var offsetLeft = 0;
                            do {
                                if ( !isNaN( elem.offsetLeft ) )
                                {
                                    offsetLeft += elem.offsetLeft;
                                }
                            } while( elem = elem.offsetParent );
                            return offsetLeft;
                        }

                        mediaElement.addEventListener('timeupdate', function () {
                            var percentage = ( mediaElement.currentTime / mediaElement.duration ) * 100;
                            seektimeProgress.style.width = percentage+'%';
                            updateSeekTime();
                        })
                        function updateSeekTime(){
                            var nt = mediaElement.currentTime * (100 / mediaElement.duration);
                            var curmins = Math.floor(mediaElement.currentTime / 60);
                            var cursecs = Math.floor(mediaElement.currentTime - curmins * 60);
                            var durmins = Math.floor(mediaElement.duration / 60);
                            var dursecs = Math.floor(mediaElement.duration - durmins * 60);
                            if(cursecs < 10){ cursecs = "0"+cursecs; }
                            if(dursecs < 10){ dursecs = "0"+dursecs; }
                            //if(curmins < 10){ curmins = "0"+curmins; }
                            //if(durmins < 10){ durmins = "0"+durmins; }
                            audioTimeCurrent.innerHTML = curmins+":"+cursecs;
                            audioTimeDuration.innerHTML = durmins+":"+dursecs;
                        }

                        function dragTimeSlider(e) {
                            var offsetLeft = getOffsetLeft(seektimeEl)
                            var left = (e.pageX - offsetLeft);

                            var totalWidth = seektimeEl.offsetWidth;
                            var percentage = ( left / totalWidth );
                            var timeToSet = mediaElement.duration * percentage;
                            mediaElement.currentTime = timeToSet;
                        }
                        seektimeEl.addEventListener("mousedown", function(){
                            console.log('mousedown')

                            window.addEventListener('mousemove', dragTimeSlider)

                            function removeListener() {
                                window.removeEventListener('mousemove', dragTimeSlider)
                                window.removeEventListener('mouseup', removeListener)
                            }
                            window.addEventListener('mouseup', removeListener)
                        });


                        seektimeEl.addEventListener("mouseup", function(e){
                            var offsetLeft = getOffsetLeft(seektimeEl)
                            var left = (e.pageX - offsetLeft);
                            var totalWidth = seektimeEl.offsetWidth;
                            var percentage = ( left / totalWidth );
                            var timeToSet = mediaElement.duration * percentage;
                            mediaElement.currentTime = timeToSet;
                        });

                        playPauseBtn.addEventListener("click", function(e){
                            console.log('mediaElement', mediaElement)
                            if(mediaElement.paused){
                                mediaElement.play();
                                playPauseBtn.innerHTML = _streamingIcons.pauseIcon;
                            } else {
                                mediaElement.pause();
                                playPauseBtn.innerHTML = _streamingIcons.playIcon;
                            }
                        });

                        if(mediaElement.muted) {
                            volumeSlider.style.width = '0%';
                        }

                        source.sourceInstance.on('volumeChanged', function () {
                            console.log('volumeChanged', source.sourceInstance.gainNode.gain.value)
                            var percentage = source.sourceInstance.gainNode.gain.value * 100;
                            volumeSlider.style.width = percentage + '%';
                            updateVolumeIcons(source.sourceInstance.gainNode.gain.value);
                        })

                        mediaElement.addEventListener('pause', function (e) {
                            console.log('mediaElement pause', mediaElement)
                        })

                        mediaElement.addEventListener('play', function (e) {
                            console.log('mediaElement play', mediaElement)
                        })

                        function dragVolumeSlider(e) {
                            var offsetLeft = getOffsetLeft(volume)
                            var left = (e.pageX - offsetLeft);
                            if (Math.sign(left) == -1) {
                                left = 0;
                            }
                            var totalWidth = volume.offsetWidth;

                            if (left > totalWidth) {
                                left = totalWidth;
                            }
                            var volumeToSet = (left / totalWidth);
                            source.sourceInstance.setVolume(volumeToSet);
                        }

                        function updateVolumeIcons(volumeToSet) {
                            console.log('updateVolumeIcons', volumeToSet, mediaElement.muted)
                            var waves = volumeIcon.querySelector('#StreamsWebrtcWaves');
                            var disabledWaves = volumeIcon.querySelectorAll('.StreamsWebrtcDisabledparts.StreamsWebrtcWaves1 .StreamsWebrtcDisabledparts.StreamsWebrtcWaves2');
                            var secondWaveParts = volumeIcon.querySelectorAll('.StreamsWebrtcWaves2');
                            var disabledPartOfSpeaker = volumeIcon.querySelector('polygon.StreamsWebrtcDisabledparts');
                            var crossline = volumeIcon.querySelector('#StreamsWebrtcCrossline');

                            function toggleSecondWave(value) {
                                for (let i = 0; i < secondWaveParts.length; ++i) {
                                    secondWaveParts[i].style.opacity = value;
                                }
                            }
                            function toggleDisabledIcon(value) {
                                for (let i = 0; i < disabledWaves.length; ++i) {
                                    disabledWaves[i].style.opacity = (value === 1 ? 0 : 1);
                                }
                                disabledPartOfSpeaker.style.opacity = (value === 1 ? 0 : 1);
                                crossline.style.opacity = (value === 1 ? 1 : 0);
                            }

                            if(volumeToSet <= 0.5 && volumeToSet > 0 && !mediaElement.muted) {
                                console.log('updateVolumeIcons 1');
                                toggleDisabledIcon(0);
                                toggleSecondWave(0);
                            } else if (volumeToSet > 0.5 && !mediaElement.muted) {
                                console.log('updateVolumeIcons 2');
                                toggleDisabledIcon(0);
                                toggleSecondWave(1);
                            } else {
                                console.log('updateVolumeIcons 3');
                                toggleSecondWave(1);
                                toggleDisabledIcon(1);
                            }
                        }
                        updateVolumeIcons(mediaElement.muted ? 0 : source.sourceInstance.gainNode.gain.value)

                        source.sourceInstance.on('volumeChanged', function () {
                            var percentage = source.sourceInstance.gainNode.gain.value * 100;
                            volumeSlider.style.width = percentage + '%';
                            updateVolumeIcons(source.sourceInstance.gainNode.gain.value);
                        })

                        volumeIcon.addEventListener("click", function () {
                            console.log('speaker', mediaElement.volume, mediaElement.muted)

                            if (!source.sourceInstance.gainNode) return;
                            if (source.sourceInstance.gainNode.gain.value == 0 || mediaElement.muted) {
                                console.log('speaker 1', source.params.lastVolumeValue)

                                if (mediaElement.muted) mediaElement.muted = false;
                                source.sourceInstance.setVolume(source.params.lastVolumeValue != null ? source.params.lastVolumeValue : 1);
                            } else {
                                source.params.lastVolumeValue = source.sourceInstance.gainNode.gain.value;
                                source.sourceInstance.setVolume(0);
                            }
                        });


                        volume.addEventListener("mousedown", function(){
                            window.addEventListener('mousemove', dragVolumeSlider)

                            function removeListener() {
                                window.removeEventListener('mousemove', dragVolumeSlider)
                                window.removeEventListener('mouseup', removeListener)
                            }
                            window.addEventListener('mouseup', removeListener)
                        });


                        volume.addEventListener("click", dragVolumeSlider);

                        loopPlayCheckbox.addEventListener("click", function (e) {
                            if(this.checked) {
                                (source.sourceInstance.audioInstance || source.sourceInstance.videoInstance).loop = true;
                            } else {
                                (source.sourceInstance.audioInstance || source.sourceInstance.videoInstance).loop = false;
                            }
                        });

                        playLocallyCheckbox.addEventListener("click", function (e) {
                            if(this.checked) {
                                tool.livestreamingCanvasComposerTool.canvasComposer.audioComposer.unmuteSourceLocally(source.sourceInstance);
                            } else {
                                tool.livestreamingCanvasComposerTool.canvasComposer.audioComposer.muteSourceLocally(source.sourceInstance);
                            }
                        });


                        source.params.loop = loopPlayCheckbox;
                        source.params.localOutput = playLocallyCheckbox;

                        return dialogControlsBody;
                    }

                    var canvasLayoutOptions = (function () {
                        let _selectedSource = null;
                        var _dialogEl = null;
                        var _layoutTabs = null;
                        var _activeTabName = null;
                        var _dialogBody = null;
                        var _generatedLayoutsListDialogs = {};
                        var _generatedLayoutsParamsDialogs = {};

                        function LayoutListItem(name) {
                            var listInstance = this;
                            this.active = true;
                            this.title = name != null ? name : null;
                            this.itemEl = null;
                            this.key = null;
                            this.handler = function () {

                            }
                            this.isActive = function() {

                            };
                            this.turnOn = function() {

                            };
                            this.turnOff = function() {

                            };

                            var itemEl = document.createElement('DIV');
                            itemEl.className = 'live-editor-canvas-popup-list-item';
                            var itemElText = document.createElement('DIV');
                            itemElText.innerHTML = name ? name : '';
                            itemElText.className = 'live-editor-canvas-popup-list-text';
                            itemEl.appendChild(itemElText);
                            this.itemEl = itemEl;
                            this.itemEl.addEventListener('click', function () {
                                selectLayout(listInstance)
                            })
                        }

                        function selectLayout(layoutItem) {
                            console.log('selectLayout', layoutItem)
                            let layoutList;
                            if(_generatedLayoutsListDialogs[_selectedSource.sourceInstance.id] != null) {
                                layoutList = _generatedLayoutsListDialogs[_selectedSource.sourceInstance.id].layoutList;
                            } else {
                                return;
                            }
                            if(typeof layoutItem == 'string') {
                                for(let i in layoutList) {
                                    if(layoutList[i].key == layoutItem) {
                                        layoutItem = layoutList[i];
                                    }
                                }
                            }

                            if(layoutItem.itemEl && !layoutItem.itemEl.classList.contains('live-editor-canvas-popup-list-item-active')) {
                                (layoutItem.itemEl).classList.add('live-editor-canvas-popup-list-item-active');
                            }

                            _generatedLayoutsListDialogs[_selectedSource.sourceInstance.id].selectedLayout = layoutItem;
                            for(let i in layoutList) {
                                if(layoutList[i] == layoutItem) continue;
                                console.log('selectLayout for --', layoutItem.itemEl, (layoutItem.itemEl).classList.contains('live-editor-canvas-popup-list-item-active'))

                                if((layoutList[i].itemEl).classList.contains('live-editor-canvas-popup-list-item-active')) {
                                    console.log('selectLayout remove');
                                    (layoutList[i].itemEl).classList.remove('live-editor-canvas-popup-list-item-active');
                                }
                            }

                            tool.livestreamingCanvasComposerTool.canvasComposer.videoComposer.updateWebRTCLayout(_selectedSource.sourceInstance, layoutItem.key);
                        }

                        function createLayoutList() {
                            if(_generatedLayoutsListDialogs[_selectedSource.sourceInstance.id] != null) {
                                return _generatedLayoutsListDialogs[_selectedSource.sourceInstance.id].dialog;
                            }
                            var dialogBodyInner = document.createElement('DIV');
                            dialogBodyInner.className = 'live-editor-popup-options-body-inner live-editor-popup-options-layouts-body';

                            let layoutList = [];
                            var tiledLayout = new LayoutListItem('Tiled');
                            tiledLayout.key = 'tiledStreamingLayout';
                            layoutList.push(tiledLayout);
                            dialogBodyInner.appendChild(tiledLayout.itemEl);

                            var fullScreenLayout = new LayoutListItem('Screen sharing');
                            fullScreenLayout.key = 'screenSharing';
                            layoutList.push(fullScreenLayout);
                            dialogBodyInner.appendChild(fullScreenLayout.itemEl);

                            var sideScreensharing = new LayoutListItem('Side screen sharing');
                            sideScreensharing.key = 'sideScreenSharing';
                            layoutList.push(sideScreensharing);
                            dialogBodyInner.appendChild(sideScreensharing.itemEl);

                            var audioOnlyLayout = new LayoutListItem('Audio only');
                            audioOnlyLayout.key = 'audioOnly';
                            layoutList.push(audioOnlyLayout);
                            dialogBodyInner.appendChild(audioOnlyLayout.itemEl);

                            var audioScreenLayout = new LayoutListItem('Audio only + screen sharing');
                            audioScreenLayout.key = 'audioScreenSharing';
                            layoutList.push(audioScreenLayout);
                            dialogBodyInner.appendChild(audioScreenLayout.itemEl);


                            _generatedLayoutsListDialogs[_selectedSource.sourceInstance.id] = {
                                dialog: dialogBodyInner,
                                layoutList: layoutList
                            };

                            return dialogBodyInner;
                        }

                        function createParamsList() {
                            let selectedLayout = 'tiledStreamingLayout';
                            if(_generatedLayoutsListDialogs[_selectedSource.sourceInstance.id] != null && _generatedLayoutsListDialogs[_selectedSource.sourceInstance.id].selectedLayout != null) {
                                selectedLayout = _generatedLayoutsListDialogs[_selectedSource.sourceInstance.id].selectedLayout.key;
                            }
                            console.log('createParamsList', selectedLayout)
                            if(_generatedLayoutsParamsDialogs[_selectedSource.sourceInstance.id] != null && _generatedLayoutsParamsDialogs[_selectedSource.sourceInstance.id][selectedLayout] != null) {
                                return _generatedLayoutsParamsDialogs[_selectedSource.sourceInstance.id][selectedLayout];
                            }
                            var dialogBodyInner = document.createElement('DIV');
                            dialogBodyInner.className = 'live-editor-popup-options-body-inner live-editor-popup-options-params-body';

                            if (selectedLayout == 'tiledStreamingLayout') {
                                var marginsCon = document.createElement('DIV');
                                marginsCon.className = 'live-editor-popup-options-params-margins';
                                var marginsInput = document.createElement('INPUT');
                                marginsInput.type = 'number';
                                marginsInput.id = 'layoutMargins';
                                marginsInput.name = 'layoutMargins';
                                marginsInput.value = _selectedSource.sourceInstance.params.tiledLayoutMargins;
                                var marginsInputLabel = document.createElement('Label');
                                marginsInputLabel.appendChild(document.createTextNode("Layout margins:"));
                                marginsCon.appendChild(marginsInputLabel);
                                marginsCon.appendChild(marginsInput);
                                dialogBodyInner.appendChild(marginsCon);

                                marginsInput.addEventListener('input', function () {
                                    _selectedSource.sourceInstance.params.tiledLayoutMargins = marginsInput.value;
                                    updateWebrtcRect();
                                })
                            }

                            var webrtcLayoutRect = _selectedSource.sourceInstance.rect;

                            //size
                            var sizeAndPositionCon = document.createElement('DIV');
                            sizeAndPositionCon.className = 'live-editor-popup-options-params-size-pos';

                            var sizeCon = document.createElement('DIV');
                            sizeCon.className = 'live-editor-popup-options-params-size';
                            sizeAndPositionCon.appendChild(sizeCon);

                            var sizeWidthCon = document.createElement('DIV');
                            sizeWidthCon.className = 'live-editor-popup-options-params-size-width';
                            sizeCon.appendChild(sizeWidthCon);
                            var widthText = document.createElement('SPAN');
                            widthText.innerHTML = 'Width: ';
                            sizeWidthCon.appendChild(widthText);
                            var width = document.createElement('INPUT');
                            width.type = 'text';
                            width.value = webrtcLayoutRect.width;
                            sizeWidthCon.appendChild(width);

                            var sizeHeightCon = document.createElement('DIV');
                            sizeHeightCon.className = 'live-editor-popup-options-params-size-height';
                            sizeCon.appendChild(sizeHeightCon);
                            var heightText = document.createElement('SPAN');
                            heightText.innerHTML = 'Height: ';
                            sizeHeightCon.appendChild(heightText);
                            var height = document.createElement('INPUT');
                            height.type = 'text';
                            height.value = webrtcLayoutRect.height;
                            sizeHeightCon.appendChild(height);


                            //position
                            var positionCon = document.createElement('DIV');
                            positionCon.className = 'live-editor-popup-options-params-position';
                            sizeAndPositionCon.appendChild(positionCon);

                            var topPositionCon = document.createElement('DIV');
                            topPositionCon.className = 'live-editor-popup-options-params-position-top';
                            positionCon.appendChild(topPositionCon);
                            var topText = document.createElement('SPAN');
                            topText.innerHTML = 'Top: ';
                            topPositionCon.appendChild(topText);
                            var topPos = document.createElement('INPUT');
                            topPos.type = 'text';
                            topPos.value = webrtcLayoutRect.y;
                            topPositionCon.appendChild(topPos);

                            var leftPositionCon = document.createElement('DIV');
                            leftPositionCon.className = 'live-editor-popup-options-params-position-left';
                            positionCon.appendChild(leftPositionCon);
                            var leftText = document.createElement('SPAN');
                            leftText.innerHTML = 'Left: ';
                            leftPositionCon.appendChild(leftText);
                            var leftPos = document.createElement('INPUT');
                            leftPos.type = 'text';
                            leftPos.value = webrtcLayoutRect.x;
                            leftPositionCon.appendChild(leftPos);

                            var audioBgCon = document.createElement('DIV');
                            audioBgCon.className = 'live-editor-popup-options-params-position-audio-bg'
                            var audioBg = document.createElement('INPUT');
                            audioBg.type = 'color';
                            audioBg.id = 'audioBgColor';
                            audioBg.name = 'audioBgColor';
                            audioBg.value = _selectedSource.sourceInstance.params.audioLayoutBgColor;
                            var removeBg = document.createElement('DIV');
                            removeBg.className = 'live-editor-popup-options-params-position-audio-res'
                            removeBg.innerHTML = '&#10060;'
                            audioBgCon.appendChild(document.createTextNode("Layout background color: "));
                            audioBgCon.appendChild(audioBg);
                            audioBgCon.appendChild(removeBg);
                           
                            dialogBodyInner.appendChild(sizeAndPositionCon);
                            dialogBodyInner.appendChild(audioBgCon);

                            _layoutParamsEl = dialogBodyInner;

                            audioBg.addEventListener('input', function () {
                                _selectedSource.sourceInstance.params.audioLayoutBgColor = audioBg.value;
                            })

                            removeBg.addEventListener('click', function () {
                                _selectedSource.sourceInstance.params.audioLayoutBgColor = 'rgba(0, 0, 0, 0)';
                            })

                            function updateWebrtcRect (e) {
                                _selectedSource.sourceInstance.rect.width = width.value;
                                _selectedSource.sourceInstance.rect.height = height.value;
                                _selectedSource.sourceInstance.rect.x = leftPos.value;
                                _selectedSource.sourceInstance.rect.y = topPos.value;
                                //tool.livestreamingCanvasComposerTool.canvasComposer.videoComposer.setWebrtcLayoutRect(layoutWidth, layoutHeight, x, y);
                            }
                            width.addEventListener('blur', updateWebrtcRect);
                            height.addEventListener('blur', updateWebrtcRect);
                            topPos.addEventListener('blur', updateWebrtcRect);
                            leftPos.addEventListener('blur', updateWebrtcRect);

                            _selectedSource.sourceInstance.eventDispatcher.on('rectChanged', function () {
                                width.value = webrtcLayoutRect._width;
                                height.value = webrtcLayoutRect._height;
                                leftPos.value = webrtcLayoutRect._x;
                                topPos.value = webrtcLayoutRect._y;
                            });
                           
                            if(_generatedLayoutsParamsDialogs[_selectedSource.sourceInstance.id] == null) {
                                _generatedLayoutsParamsDialogs[_selectedSource.sourceInstance.id] = {};
                            }
                            _generatedLayoutsParamsDialogs[_selectedSource.sourceInstance.id][selectedLayout] = dialogBodyInner;

                            return dialogBodyInner;
                        }

                        function showLayoutList() {
                            _dialogBody.innerHTML = '';
                            _dialogBody.appendChild(createLayoutList());
                        }

                        function showLayoutParams() {
                            console.log('showLayoutParams')

                            _dialogBody.innerHTML = '';
                            _dialogBody.appendChild(createParamsList());
                        }

                        function showDialog(source) {
                            _selectedSource = source;
                            console.log('showDialog', _selectedSource.sourceInstance.id)
                            hideActiveView();
                            if(_activeTabName == 'layouts' || _activeTabName == null) {
                                showLayoutList();
                            } else if(_activeTabName == 'params') {
                                showLayoutParams();
                            }

                            if(!_generatedLayoutsListDialogs[_selectedSource.sourceInstance.id] || !_generatedLayoutsListDialogs[_selectedSource.sourceInstance.id].selectedLayout) {
                                selectLayout(_selectedSource.sourceInstance.params.defaultLayout);
                            }
                           
                            _optionsColumnEl.appendChild(_dialogEl);
                            _activeView = this;
                        }

                        function hideDialog() {
                            console.log('hideDialog', _dialogEl, _dialogEl != null, _dialogEl.parentElement != null, _dialogEl.parentElement)

                            if(_dialogEl != null && _dialogEl.parentElement != null) {
                                console.log('hideDialog remove')

                                _dialogEl.parentNode.removeChild(_dialogEl);
                            }
                        }

                        function tabHandler(e) {
                            var tabEl = e.currentTarget;
                            console.log('tabHandler tabEl', tabEl)

                            var tabName = tabEl.dataset.tab;
                            if(!tabName) return;
                            if(tabName == 'layouts') {
                                showLayoutList();
                                _activeTabName = 'layouts';
                            } else if(tabName == 'params') {
                                showLayoutParams();
                                _activeTabName = 'params';
                            }

                            for(let e in _layoutTabs.children) {
                                if(typeof _layoutTabs.children[e] != 'object') continue;
                                console.log('tabHandler', _layoutTabs.children[e])
                                if(_layoutTabs.children[e] == tabEl) {
                                    if(!_layoutTabs.children[e].classList.contains('live-editor-popup-options-title-tab-active')) {
                                        _layoutTabs.children[e].classList.add('live-editor-popup-options-title-tab-active');
                                    }
                                    continue;
                                }
                                if(_layoutTabs.children[e].classList.contains('live-editor-popup-options-title-tab-active')) {
                                    _layoutTabs.children[e].classList.remove('live-editor-popup-options-title-tab-active');
                                }
                            }
                        }

                        console.log('addImagePopup')
                        _dialogEl = document.createElement('DIV');
                        _dialogEl.className = 'live-editor-popup-options-dialog';
                        var dialogTitle = document.createElement('DIV');
                        dialogTitle.className = 'live-editor-popup-options-title';
                        var dialogTitleInner = _layoutTabs = document.createElement('DIV');
                        dialogTitleInner.className = 'live-editor-popup-options-title-inner';

                        var layoutsTab = document.createElement('DIV');
                        layoutsTab.className = 'live-editor-popup-options-title-tab live-editor-popup-options-title-tab-active';
                        layoutsTab.dataset.tab = 'layouts';
                        var layoutsTabInner = document.createElement('DIV');
                        layoutsTabInner.className = 'live-editor-popup-options-title-tab-inner';
                        layoutsTabInner.innerHTML = 'Layouts';
                        layoutsTab.appendChild(layoutsTabInner);
                        dialogTitleInner.appendChild(layoutsTab);
                        var paramsTab = document.createElement('DIV');
                        paramsTab.className = 'live-editor-popup-options-title-tab';
                        paramsTab.dataset.tab = 'params';
                        var paramsTabInner = document.createElement('DIV');
                        paramsTabInner.className = 'live-editor-popup-options-title-tab-inner';
                        paramsTabInner.innerHTML = 'Params';
                        paramsTab.appendChild(paramsTabInner);
                        dialogTitleInner.appendChild(paramsTab);
                        dialogTitle.appendChild(dialogTitleInner);
                        _dialogEl.appendChild(dialogTitle);
                        var dialogBody = _dialogBody = document.createElement('DIV');
                        dialogBody.className = 'live-editor-popup-options-body';

                        //dialogBody.appendChild(createLayoutList());
                        _dialogEl.appendChild(dialogBody);

                        layoutsTab.addEventListener('click', tabHandler);
                        paramsTab.addEventListener('click', tabHandler);

                        return {
                            hide: hideDialog,
                            show: showDialog,
                            showLayoutList: showLayoutList,
                            showLayoutParams: showLayoutParams,
                        }
                    }())

                    var webrtcParticipantOptions = (function (source) {
                        var _dialogEl = null;
                        var _optionsTabs = null;
                        var _dialogBody = null;
                        var _layoutParamsEl = null;
                        var _selectedSource = null;
                        var _generatedDialogs = [];

                        function createParamsList() {

                            console.log('createParamsList', _selectedSource.sourceInstance)
                            for(let d in _generatedDialogs) {
                                if(_generatedDialogs[d].source == _selectedSource) {
                                    return _generatedDialogs[d].dialog;
                                }
                            }

                            var dialogBodyInner = document.createElement('DIV');
                            dialogBodyInner.className = 'live-editor-popup-options-body-inner live-editor-popup-options-params-body';

                            //size
                            var descriptionCon = document.createElement('DIV');
                            descriptionCon.className = 'live-editor-popup-options-params-webrtc-desc';

                            var descriptionInner = document.createElement('DIV');
                            descriptionInner.className = 'live-editor-popup-options-params-webrtc-desc-inner';
                            descriptionCon.appendChild(descriptionInner);

                            var displayVideoCon = document.createElement('DIV');
                            var displayVideoTitle = document.createElement('DIV');
                            displayVideoTitle.innerHTML = "Display video:";
                            displayVideoCon.appendChild(displayVideoTitle);
                            var coverFit = document.createElement('INPUT');
                            coverFit.type = 'radio';
                            coverFit.id = 'coverFit';
                            coverFit.name = 'displayVideo';
                            coverFit.value = 'cover';
                            coverFit.checked = _selectedSource.sourceInstance.params.displayVideo == 'cover' ? true : false;
                            var coverFitLabel = document.createElement('Label');
                            coverFitLabel.appendChild(coverFit);
                            coverFitLabel.appendChild(document.createTextNode("Cover"));
                            displayVideoCon.appendChild(coverFitLabel);
                            
                            var containFit = document.createElement('INPUT');
                            containFit.type = 'radio';
                            containFit.id = 'containFit';
                            containFit.name = 'displayVideo';
                            containFit.value = 'contain';
                            containFit.checked = _selectedSource.sourceInstance.params.displayVideo == 'contain' ? true : false;
                            var containFitLabel = document.createElement('Label');
                            containFitLabel.appendChild(containFit);
                            containFitLabel.appendChild(document.createTextNode("Contain"));
                            displayVideoCon.appendChild(containFitLabel);

                            dialogBodyInner.appendChild(displayVideoCon);

                            var showNameCon = document.createElement('DIV');
                            var showName = document.createElement('INPUT');
                            showName.type = 'checkbox';
                            showName.id = 'showNames';
                            showName.name = 'showNames';
                            showName.checked = false;
                            var showNameLabel = document.createElement('Label');
                            showNameLabel.appendChild(showName);
                            showNameLabel.appendChild(document.createTextNode("Show participants' name"));
                            showNameCon.appendChild(showNameLabel);

                            var showBorderCon = document.createElement('DIV');
                            var showBorder = document.createElement('INPUT');
                            showBorder.type = 'checkbox';
                            showBorder.id = 'showBorder';
                            showBorder.name = 'showBorder';
                            showBorder.checked = false;
                            var ShowBorderLabel = document.createElement('Label');
                            ShowBorderLabel.appendChild(showBorder);
                            ShowBorderLabel.appendChild(document.createTextNode("Show borders"));
                            showBorderCon.appendChild(ShowBorderLabel);

                            var descNameCon = document.createElement('DIV');
                            descNameCon.className = 'live-editor-popup-options-params-webrtc-desc-name';
                            descriptionInner.appendChild(descNameCon);
                            var nameText = document.createElement('SPAN');
                            nameText.innerHTML = 'Name: ';
                            descNameCon.appendChild(nameText);
                            var nameInput = document.createElement('INPUT');
                            nameInput.type = 'text';
                            nameInput.value = _selectedSource.sourceInstance.participant.username;
                            descNameCon.appendChild(nameInput);

                            var descCaptionCon = document.createElement('DIV');
                            descCaptionCon.className = 'live-editor-popup-options-params-webrtc-desc-caption';
                            descriptionInner.appendChild(descCaptionCon);
                            var captionText = document.createElement('SPAN');
                            captionText.innerHTML = 'Caption: ';
                            descCaptionCon.appendChild(captionText);
                            var captionInput = document.createElement('INPUT');
                            captionInput.type = 'text';
                            captionInput.value = _selectedSource.sourceInstance.caption;
                            descCaptionCon.appendChild(captionInput);

                            var bgColorCon = document.createElement('DIV');
                            bgColorCon.className = 'live-editor-popup-options-params-captionbg'
                            var bgColorInput = document.createElement('INPUT');
                            bgColorInput.type = 'color';
                            bgColorInput.id = 'captionBgColor';
                            bgColorInput.name = 'captionBgColor';
                            bgColorInput.value = _selectedSource.sourceInstance.params.captionBgColor;
                            var removeBg = document.createElement('DIV');
                            removeBg.className = 'live-editor-popup-options-params-captionbg-rem'
                            removeBg.innerHTML = '&#10060;'
                            bgColorCon.appendChild(document.createTextNode("Caption background color: "));
                            bgColorCon.appendChild(bgColorInput);
                            bgColorCon.appendChild(removeBg);

                            var fontColorCon = document.createElement('DIV');
                            fontColorCon.className = 'live-editor-popup-options-params-font-color'
                            var fontColorInput = document.createElement('INPUT');
                            fontColorInput.type = 'color';
                            fontColorInput.id = 'captionFontColor';
                            fontColorInput.name = 'captionFontColor';
                            fontColorInput.value = _selectedSource.sourceInstance.params.captionFontColor;
                            var removeColor = document.createElement('DIV');
                            removeColor.className = 'live-editor-popup-options-params-font-color-rem'
                            removeColor.innerHTML = '&#10060;'
                            fontColorCon.appendChild(document.createTextNode("Caption font color: "));
                            fontColorCon.appendChild(fontColorInput);
                            fontColorCon.appendChild(removeColor);

                            dialogBodyInner.appendChild(showNameCon);
                            dialogBodyInner.appendChild(showBorderCon);
                            dialogBodyInner.appendChild(descriptionCon);
                            dialogBodyInner.appendChild(bgColorCon);
                            dialogBodyInner.appendChild(fontColorCon);

                            _layoutParamsEl = dialogBodyInner;

                            function displayVideoHandler() {
                               let checkedValue = coverFit.checked ? 'cover' : 'contain';
                               _selectedSource.sourceInstance.params.displayVideo = checkedValue;
                            }

                            coverFit.addEventListener('click', displayVideoHandler);
                            containFit.addEventListener('click', displayVideoHandler);

                            showName.addEventListener('change', function () {
                                if( showName.checked) {
                                    tool.livestreamingCanvasComposerTool.canvasComposer.videoComposer.displayName(_selectedSource.sourceInstance);
                                } else {
                                    tool.livestreamingCanvasComposerTool.canvasComposer.videoComposer.hideName(_selectedSource.sourceInstance);

                                }
                            })
                            showBorder.addEventListener('change', function () {
                                if( showBorder.checked) {
                                    tool.livestreamingCanvasComposerTool.canvasComposer.videoComposer.displayBorder(_selectedSource.sourceInstance.participant);
                                } else {
                                    tool.livestreamingCanvasComposerTool.canvasComposer.videoComposer.hideBorder(_selectedSource.sourceInstance.participant);

                                }
                            })
                            nameInput.addEventListener('blur', function () {
                                _selectedSource.sourceInstance.name = nameInput.value.toUpperCase();
                            })
                            captionInput.addEventListener('blur', function () {
                                _selectedSource.sourceInstance.caption = captionInput.value;

                            })
                            bgColorInput.addEventListener('input', function () {
                                _selectedSource.sourceInstance.params.captionBgColor = bgColorInput.value;
                            })
                            removeBg.addEventListener('click', function () {
                                _selectedSource.sourceInstance.params.captionBgColor = bgColorInput.value = 'rgba(0, 0, 0, 0)';
                            })
                            fontColorInput.addEventListener('input', function () {
                                _selectedSource.sourceInstance.params.captionFontColor = fontColorInput.value;
                            })

                            removeColor.addEventListener('click', function () {
                                _selectedSource.sourceInstance.params.captionFontColor = fontColorInput.value = 'rgba(0, 0, 0, 0)';
                            })

                            /*_selectedSource.sourceInstance.on('rectChanged', function () {
                        width.value = _selectedSource.sourceInstance.rect._width;
                        height.value = _selectedSource.sourceInstance.rect._height;
                        leftPos.value = _selectedSource.sourceInstance.rect._x;
                        topPos.value = _selectedSource.sourceInstance.rect._y;
                    });*/

                            _generatedDialogs.push({
                                source: _selectedSource,
                                dialog:  dialogBodyInner
                            })
                            return dialogBodyInner;
                        }

                        function showParams() {
                            _dialogBody.innerHTML = '';
                            _dialogBody.appendChild(createParamsList());
                        }

                        function showDialog(source) {
                            _selectedSource = source;
                            console.log('showDialog', this, _activeView)
                            hideActiveView();
                            showParams();
                            _optionsColumnEl.appendChild(_dialogEl);
                            _activeView = this;
                        }

                        function hideDialog() {
                            console.log('hideDialog', _dialogEl)

                            if(_dialogEl && _dialogEl.parentNode != null) {
                                _dialogEl.parentNode.removeChild(_dialogEl);
                            }
                        }

                        function tabHandler(e) {
                            var tabEl = e.currentTarget;
                            console.log('tabHandler tabEl', tabEl)

                            var tabName = tabEl.dataset.tab;
                            if(!tabName) return;
                            if(tabName == 'params') {
                                showParams();
                            }

                            for(let e in _optionsTabs.children) {
                                if(typeof _optionsTabs.children[e] != 'object') continue;
                                console.log('tabHandler', _optionsTabs.children[e])
                                if(_optionsTabs.children[e] == tabEl) {
                                    if(!_optionsTabs.children[e].classList.contains('live-editor-popup-options-title-tab-active')) {
                                        _optionsTabs.children[e].classList.add('live-editor-popup-options-title-tab-active');
                                    }
                                    continue;
                                }
                                if(_optionsTabs.children[e].classList.contains('live-editor-popup-options-title-tab-active')) {
                                    _optionsTabs.children[e].classList.remove('live-editor-popup-options-title-tab-active');
                                }
                            }
                        }

                        console.log('addImagePopup')
                        _dialogEl = document.createElement('DIV');
                        _dialogEl.className = 'live-editor-popup-options-dialog';
                        var dialogTitle = document.createElement('DIV');
                        dialogTitle.className = 'live-editor-popup-options-title';
                        var dialogTitleInner = _optionsTabs = document.createElement('DIV');
                        dialogTitleInner.className = 'live-editor-popup-options-title-inner';

                        var paramsTab = document.createElement('DIV');
                        paramsTab.className = 'live-editor-popup-options-title-tab live-editor-popup-options-title-tab-active';
                        paramsTab.dataset.tab = 'params';
                        var paramsTabInner = document.createElement('DIV');
                        paramsTabInner.className = 'live-editor-popup-options-title-tab-inner';
                        paramsTabInner.innerHTML = 'Params';
                        paramsTab.appendChild(paramsTabInner);
                        dialogTitleInner.appendChild(paramsTab);
                        dialogTitle.appendChild(dialogTitleInner);
                        _dialogEl.appendChild(dialogTitle);
                        var dialogBody = _dialogBody = document.createElement('DIV');
                        dialogBody.className = 'live-editor-popup-options-body';

                        //dialogBody.appendChild(createParamsList());
                        _dialogEl.appendChild(dialogBody);

                        paramsTab.addEventListener('click', tabHandler);

                        return {
                            hide: hideDialog,
                            show: showDialog,
                            showParams: showParams
                        }
                    }())

                    var imageSourceOptions = (function (source) {
                        var _dialogEl = null;
                        var _optionsTabs = null;
                        var _dialogBody = null;
                        var _layoutParamsEl = null;
                        var _selectedSource = null;
                        var _generatedDialogs = [];

                        function createParamsList() {

                            for(let d in _generatedDialogs) {
                                if(_generatedDialogs[d].source == _selectedSource) {
                                    return _generatedDialogs[d].dialog;
                                }
                            }

                            var dialogBodyInner = document.createElement('DIV');
                            dialogBodyInner.className = 'live-editor-popup-options-body-inner live-editor-popup-options-params-body';

                            var keepRatioCon = document.createElement('DIV');
                            var keepRatio = document.createElement('INPUT');
                            keepRatio.type = 'checkbox';
                            keepRatio.id = 'live-editor-popup-options-keep-ratio';
                            keepRatio.name = 'keepRatio';
                            keepRatio.checked = true;
                            var keepRatioLabel = document.createElement('Label');
                            keepRatioLabel.appendChild(keepRatio);
                            keepRatioLabel.appendChild(document.createTextNode("Keep ratio"));
                            keepRatioCon.appendChild(keepRatioLabel);

                            //size
                            var sizeAndPositionCon = document.createElement('DIV');
                            sizeAndPositionCon.className = 'live-editor-popup-options-params-size-pos';

                            var sizeCon = document.createElement('DIV');
                            sizeCon.className = 'live-editor-popup-options-params-size';
                            sizeAndPositionCon.appendChild(sizeCon);

                            var sizeWidthCon = document.createElement('DIV');
                            sizeWidthCon.className = 'live-editor-popup-options-params-size-width';
                            sizeCon.appendChild(sizeWidthCon);
                            var widthText = document.createElement('SPAN');
                            widthText.innerHTML = 'Width: ';
                            sizeWidthCon.appendChild(widthText);
                            var width = document.createElement('INPUT');
                            width.type = 'text';
                            width.value = _selectedSource.sourceInstance.rect._width;
                            sizeWidthCon.appendChild(width);

                            var sizeHeightCon = document.createElement('DIV');
                            sizeHeightCon.className = 'live-editor-popup-options-params-size-height';
                            sizeCon.appendChild(sizeHeightCon);
                            var heightText = document.createElement('SPAN');
                            heightText.innerHTML = 'Height: ';
                            sizeHeightCon.appendChild(heightText);
                            var height = document.createElement('INPUT');
                            height.type = 'text';
                            height.value = _selectedSource.sourceInstance.rect._height;
                            sizeHeightCon.appendChild(height);


                            //position
                            var positionCon = document.createElement('DIV');
                            positionCon.className = 'live-editor-popup-options-params-position';
                            sizeAndPositionCon.appendChild(positionCon);

                            var topPositionCon = document.createElement('DIV');
                            topPositionCon.className = 'live-editor-popup-options-params-position-top';
                            positionCon.appendChild(topPositionCon);
                            var topText = document.createElement('SPAN');
                            topText.innerHTML = 'Top: ';
                            topPositionCon.appendChild(topText);
                            var topPos = document.createElement('INPUT');
                            topPos.type = 'text';
                            topPos.value = _selectedSource.sourceInstance.rect._y;
                            topPositionCon.appendChild(topPos);

                            var leftPositionCon = document.createElement('DIV');
                            leftPositionCon.className = 'live-editor-popup-options-params-position-left';
                            positionCon.appendChild(leftPositionCon);
                            var leftText = document.createElement('SPAN');
                            leftText.innerHTML = 'Left: ';
                            leftPositionCon.appendChild(leftText);
                            var leftPos = document.createElement('INPUT');
                            leftPos.type = 'text';
                            leftPos.value = _selectedSource.sourceInstance.rect._x;
                            leftPositionCon.appendChild(leftPos);


                            dialogBodyInner.appendChild(keepRatioCon);
                            dialogBodyInner.appendChild(sizeAndPositionCon);

                            _layoutParamsEl = dialogBodyInner;

                            function updateSourceRect () {
                                var canvasSize = tool.livestreamingCanvasComposerTool.canvasComposer.videoComposer.getCanvasSize();
                                var keepAspectRatio = keepRatio.checked;
                                var currentWidth = _selectedSource.sourceInstance.rect._width;
                                var currentHeight = _selectedSource.sourceInstance.rect._height;
                                var w = parseFloat(width.value);
                                var h = parseFloat(height.value);
                                var x = parseFloat(leftPos.value);
                                var y = parseFloat(topPos.value);

                                var ratio = currentWidth / currentHeight;

                                console.log('updateSourceRect width', w, currentWidth)
                                console.log('updateSourceRect height', h, currentHeight)
                                console.log('updateSourceRect ratio', ratio)

                                var resWidth, resHeight;
                                if(keepAspectRatio) {
                                    if (w != currentWidth) {
                                        resWidth = w;
                                        resHeight = parseInt(resWidth / ratio);
                                        height.value = resHeight;
                                        console.log('updateSourceRect 1 resHeight', resHeight)
                                    } else if (h != currentHeight) {

                                        resHeight = h;
                                        resWidth = parseInt(resHeight * ratio);
                                        width.value = resWidth;
                                        console.log('updateSourceRect 2 resWidth', resWidth)

                                    } else {
                                        console.log('updateSourceRect 3')
                                        resWidth = currentWidth;
                                        resHeight = currentHeight;
                                    }
                                } else {
                                    if (w != currentWidth) {
                                        resWidth = w;
                                        resHeight = h;
                                    } else if (h != currentHeight) {
                                        resHeight = h;
                                        resWidth = w;
                                    } else {
                                        resWidth = currentWidth;
                                        resHeight = currentHeight;
                                    }
                                }

                                _selectedSource.sourceInstance.updateRect(resWidth, resHeight, x, y)
                            }
                            width.addEventListener('blur', updateSourceRect)
                            height.addEventListener('blur', updateSourceRect)
                            topPos.addEventListener('blur', updateSourceRect)
                            leftPos.addEventListener('blur', updateSourceRect)
                            _selectedSource.sourceInstance.on('rectChanged', function () {
                                width.value = _selectedSource.sourceInstance.rect._width;
                                height.value = _selectedSource.sourceInstance.rect._height;
                                leftPos.value = _selectedSource.sourceInstance.rect._x;
                                topPos.value = _selectedSource.sourceInstance.rect._y;
                            });

                            _generatedDialogs.push({
                                source: _selectedSource,
                                dialog:  dialogBodyInner
                            })
                            return dialogBodyInner;
                        }

                        function showParams() {
                            _dialogBody.innerHTML = '';
                            _dialogBody.appendChild(createParamsList());
                        }

                        function showDialog(source) {
                            _selectedSource = source;
                            console.log('showDialog', this, _activeView)
                            hideActiveView();
                            showParams();
                            _optionsColumnEl.appendChild(_dialogEl);
                            _activeView = this;
                        }

                        function hideDialog() {
                            console.log('hideDialog', _dialogEl)

                            if(_dialogEl && _dialogEl.parentNode != null) {
                                _dialogEl.parentNode.removeChild(_dialogEl);
                            }
                        }

                        function tabHandler(e) {
                            var tabEl = e.currentTarget;
                            console.log('tabHandler tabEl', tabEl)

                            var tabName = tabEl.dataset.tab;
                            if(!tabName) return;
                            if(tabName == 'params') {
                                showParams();
                            }

                            for(let e in _optionsTabs.children) {
                                if(typeof _optionsTabs.children[e] != 'object') continue;
                                console.log('tabHandler', _optionsTabs.children[e])
                                if(_optionsTabs.children[e] == tabEl) {
                                    if(!_optionsTabs.children[e].classList.contains('live-editor-popup-options-title-tab-active')) {
                                        _optionsTabs.children[e].classList.add('live-editor-popup-options-title-tab-active');
                                    }
                                    continue;
                                }
                                if(_optionsTabs.children[e].classList.contains('live-editor-popup-options-title-tab-active')) {
                                    _optionsTabs.children[e].classList.remove('live-editor-popup-options-title-tab-active');
                                }
                            }
                        }

                        console.log('addImagePopup')
                        _dialogEl = document.createElement('DIV');
                        _dialogEl.className = 'live-editor-popup-options-dialog';
                        var dialogTitle = document.createElement('DIV');
                        dialogTitle.className = 'live-editor-popup-options-title';
                        var dialogTitleInner = _optionsTabs = document.createElement('DIV');
                        dialogTitleInner.className = 'live-editor-popup-options-title-inner';

                        var paramsTab = document.createElement('DIV');
                        paramsTab.className = 'live-editor-popup-options-title-tab live-editor-popup-options-title-tab-active';
                        paramsTab.dataset.tab = 'params';
                        var paramsTabInner = document.createElement('DIV');
                        paramsTabInner.className = 'live-editor-popup-options-title-tab-inner';
                        paramsTabInner.innerHTML = 'Params';
                        paramsTab.appendChild(paramsTabInner);
                        dialogTitleInner.appendChild(paramsTab);
                        dialogTitle.appendChild(dialogTitleInner);
                        _dialogEl.appendChild(dialogTitle);
                        var dialogBody = _dialogBody = document.createElement('DIV');
                        dialogBody.className = 'live-editor-popup-options-body';

                        //dialogBody.appendChild(createParamsList());
                        _dialogEl.appendChild(dialogBody);

                        paramsTab.addEventListener('click', tabHandler);

                        return {
                            hide: hideDialog,
                            show: showDialog,
                            showParams: showParams
                        }
                    }())

                    var videoSourceOptions = (function (source) {
                        var _dialogEl = null;
                        var _optionsTabs = null;
                        var _dialogBody = null;
                        var _layoutParamsEl = null;
                        var _selectedSource = null;
                        var _generatedDialogs = [];

                        function createParamsList() {

                            for(let d in _generatedDialogs) {
                                if(_generatedDialogs[d].source == _selectedSource) {
                                    return _generatedDialogs[d].dialog;
                                }
                            }

                            var dialogBodyInner = document.createElement('DIV');
                            dialogBodyInner.className = 'live-editor-popup-options-body-inner live-editor-popup-options-params-body';

                            var mediaControlsEl = createMediaControls(_selectedSource);

                            var keepRatioCon = document.createElement('DIV');
                            var keepRatio = document.createElement('INPUT');
                            keepRatio.type = 'checkbox';
                            keepRatio.id = 'live-editor-popup-options-keep-ratio';
                            keepRatio.name = 'keepRatio';
                            keepRatio.checked = true;
                            var keepRatioLabel = document.createElement('Label');
                            keepRatioLabel.appendChild(keepRatio);
                            keepRatioLabel.appendChild(document.createTextNode("Keep ratio"));
                            keepRatioCon.appendChild(keepRatioLabel);

                            //size
                            var sizeAndPositionCon = document.createElement('DIV');
                            sizeAndPositionCon.className = 'live-editor-popup-options-params-size-pos';

                            var sizeCon = document.createElement('DIV');
                            sizeCon.className = 'live-editor-popup-options-params-size';
                            sizeAndPositionCon.appendChild(sizeCon);

                            var sizeWidthCon = document.createElement('DIV');
                            sizeWidthCon.className = 'live-editor-popup-options-params-size-width';
                            sizeCon.appendChild(sizeWidthCon);
                            var widthText = document.createElement('SPAN');
                            widthText.innerHTML = 'Width: ';
                            sizeWidthCon.appendChild(widthText);
                            var width = document.createElement('INPUT');
                            width.type = 'text';
                            width.value = _selectedSource.sourceInstance.rect._width;
                            sizeWidthCon.appendChild(width);

                            var sizeHeightCon = document.createElement('DIV');
                            sizeHeightCon.className = 'live-editor-popup-options-params-size-height';
                            sizeCon.appendChild(sizeHeightCon);
                            var heightText = document.createElement('SPAN');
                            heightText.innerHTML = 'Height: ';
                            sizeHeightCon.appendChild(heightText);
                            var height = document.createElement('INPUT');
                            height.type = 'text';
                            height.value = _selectedSource.sourceInstance.rect._height;
                            sizeHeightCon.appendChild(height);


                            //position
                            var positionCon = document.createElement('DIV');
                            positionCon.className = 'live-editor-popup-options-params-position';
                            sizeAndPositionCon.appendChild(positionCon);

                            var topPositionCon = document.createElement('DIV');
                            topPositionCon.className = 'live-editor-popup-options-params-position-top';
                            positionCon.appendChild(topPositionCon);
                            var topText = document.createElement('SPAN');
                            topText.innerHTML = 'Top: ';
                            topPositionCon.appendChild(topText);
                            var topPos = document.createElement('INPUT');
                            topPos.type = 'text';
                            topPos.value = _selectedSource.sourceInstance.rect._y;
                            topPositionCon.appendChild(topPos);

                            var leftPositionCon = document.createElement('DIV');
                            leftPositionCon.className = 'live-editor-popup-options-params-position-left';
                            positionCon.appendChild(leftPositionCon);
                            var leftText = document.createElement('SPAN');
                            leftText.innerHTML = 'Left: ';
                            leftPositionCon.appendChild(leftText);
                            var leftPos = document.createElement('INPUT');
                            leftPos.type = 'text';
                            leftPos.value = _selectedSource.sourceInstance.rect._x;
                            leftPositionCon.appendChild(leftPos);


                            dialogBodyInner.appendChild(mediaControlsEl);
                            dialogBodyInner.appendChild(keepRatioCon);
                            dialogBodyInner.appendChild(sizeAndPositionCon);

                            _layoutParamsEl = dialogBodyInner;

                            function updateSourceRect () {
                                var canvasSize = tool.livestreamingCanvasComposerTool.canvasComposer.videoComposer.getCanvasSize();
                                var keepAspectRatio = keepRatio.checked;
                                var currentWidth = _selectedSource.sourceInstance.rect._width;
                                var currentHeight = _selectedSource.sourceInstance.rect._height;
                                var w = parseFloat(width.value);
                                var h = parseFloat(height.value);
                                var x = parseFloat(leftPos.value);
                                var y = parseFloat(topPos.value);

                                var ratio = currentWidth / currentHeight;

                                console.log('updateSourceRect width', w, currentWidth)
                                console.log('updateSourceRect height', h, currentHeight)
                                console.log('updateSourceRect ratio', ratio)

                                var resWidth, resHeight;
                                if(keepAspectRatio) {
                                    if (w != currentWidth) {
                                        resWidth = w;
                                        resHeight = parseInt(resWidth / ratio);
                                        height.value = resHeight;
                                        console.log('updateSourceRect 1 resHeight', resHeight)
                                    } else if (h != currentHeight) {

                                        resHeight = h;
                                        resWidth = parseInt(resHeight * ratio);
                                        width.value = resWidth;
                                        console.log('updateSourceRect 2 resWidth', resWidth)

                                    } else {
                                        console.log('updateSourceRect 3')
                                        resWidth = currentWidth;
                                        resHeight = currentHeight;
                                    }
                                } else {
                                    if (w != currentWidth) {
                                        resWidth = w;
                                        resHeight = h;
                                    } else if (h != currentHeight) {
                                        resHeight = h;
                                        resWidth = w;
                                    } else {
                                        resWidth = currentWidth;
                                        resHeight = currentHeight;
                                    }
                                }

                                _selectedSource.sourceInstance.updateRect(resWidth, resHeight, x, y)
                            }
                            width.addEventListener('blur', updateSourceRect)
                            height.addEventListener('blur', updateSourceRect)
                            topPos.addEventListener('blur', updateSourceRect)
                            leftPos.addEventListener('blur', updateSourceRect)
                            _selectedSource.sourceInstance.on('rectChanged', function () {
                                width.value = _selectedSource.sourceInstance.rect._width;
                                height.value = _selectedSource.sourceInstance.rect._height;
                                leftPos.value = _selectedSource.sourceInstance.rect._x;
                                topPos.value = _selectedSource.sourceInstance.rect._y;
                            });

                            _generatedDialogs.push({
                                source: _selectedSource,
                                dialog:  dialogBodyInner
                            })
                            return dialogBodyInner;
                        }

                        function showParams() {
                            _dialogBody.innerHTML = '';
                            _dialogBody.appendChild(createParamsList());
                        }

                        function showDialog(source) {
                            _selectedSource = source;
                            console.log('showDialog', this, _activeView)
                            hideActiveView();
                            showParams();
                            _optionsColumnEl.appendChild(_dialogEl);
                            _activeView = this;
                        }

                        function hideDialog() {
                            console.log('hideDialog', _dialogEl)

                            if(_dialogEl && _dialogEl.parentNode != null) {
                                _dialogEl.parentNode.removeChild(_dialogEl);
                            }
                        }

                        function tabHandler(e) {
                            var tabEl = e.currentTarget;
                            console.log('tabHandler tabEl', tabEl)

                            var tabName = tabEl.dataset.tab;
                            if(!tabName) return;
                            if(tabName == 'params') {
                                showParams();
                            }

                            for(let e in _optionsTabs.children) {
                                if(typeof _optionsTabs.children[e] != 'object') continue;
                                console.log('tabHandler', _optionsTabs.children[e])
                                if(_optionsTabs.children[e] == tabEl) {
                                    if(!_optionsTabs.children[e].classList.contains('live-editor-popup-options-title-tab-active')) {
                                        _optionsTabs.children[e].classList.add('live-editor-popup-options-title-tab-active');
                                    }
                                    continue;
                                }
                                if(_optionsTabs.children[e].classList.contains('live-editor-popup-options-title-tab-active')) {
                                    _optionsTabs.children[e].classList.remove('live-editor-popup-options-title-tab-active');
                                }
                            }
                        }

                        console.log('addImagePopup')
                        _dialogEl = document.createElement('DIV');
                        _dialogEl.className = 'live-editor-popup-options-dialog';
                        var dialogTitle = document.createElement('DIV');
                        dialogTitle.className = 'live-editor-popup-options-title';
                        var dialogTitleInner = _optionsTabs = document.createElement('DIV');
                        dialogTitleInner.className = 'live-editor-popup-options-title-inner';

                        var paramsTab = document.createElement('DIV');
                        paramsTab.className = 'live-editor-popup-options-title-tab live-editor-popup-options-title-tab-active';
                        paramsTab.dataset.tab = 'params';
                        var paramsTabInner = document.createElement('DIV');
                        paramsTabInner.className = 'live-editor-popup-options-title-tab-inner';
                        paramsTabInner.innerHTML = 'Params';
                        paramsTab.appendChild(paramsTabInner);
                        dialogTitleInner.appendChild(paramsTab);
                        dialogTitle.appendChild(dialogTitleInner);
                        _dialogEl.appendChild(dialogTitle);
                        var dialogBody = _dialogBody = document.createElement('DIV');
                        dialogBody.className = 'live-editor-popup-options-body';

                        //dialogBody.appendChild(createParamsList());
                        _dialogEl.appendChild(dialogBody);

                        paramsTab.addEventListener('click', tabHandler);

                        return {
                            hide: hideDialog,
                            show: showDialog,
                            showParams: showParams
                        }
                    }())

                    var audioSourceOptions = (function (source) {
                        var _dialogEl = null;
                        var _optionsTabs = null;
                        var _dialogBody = null;
                        var _layoutParamsEl = null;
                        var _selectedSource = null;
                        var _generatedDialogs = [];

                        function createParamsList() {
                            console.log('audioSourceOptions: createParamsList',  _selectedSource.params);
                            for(let d in _generatedDialogs) {
                                if(_generatedDialogs[d].source == _selectedSource) {
                                    return _generatedDialogs[d].dialog;
                                }
                            }

                            var paramsBody = document.createElement('DIV')
                            paramsBody.className = 'live-editor-popup-options-body-inner live-editor-popup-options-params-body';

                            var mediaControlsEl = createMediaControls(_selectedSource);
                            paramsBody.appendChild(mediaControlsEl);

                            _generatedDialogs.push({
                                source: _selectedSource,
                                dialog:  paramsBody,
                            })
                            return paramsBody;
                        }

                        function showParams() {
                            console.log('showParams', this, _activeView)

                            _dialogBody.innerHTML = '';
                            _dialogBody.appendChild(createParamsList());
                        }

                        function showDialog(source) {
                            _selectedSource = source;
                            console.log('audioSourceOptions: showDialog', this, _activeView)
                            hideActiveView();
                            showParams();
                            _optionsColumnEl.appendChild(_dialogEl);
                            _activeView = this;
                        }

                        function hideDialog() {
                            console.log('audioSourceOptions: hideDialog', _dialogEl)

                            if(_dialogEl && _dialogEl.parentNode != null) {
                                _dialogEl.parentNode.removeChild(_dialogEl);
                            }
                        }

                        function tabHandler(e) {
                            var tabEl = e.currentTarget;
                            console.log('tabHandler tabEl', tabEl)

                            var tabName = tabEl.dataset.tab;
                            if(!tabName) return;
                            if(tabName == 'params') {
                                showParams();
                            }

                            for(let e in _optionsTabs.children) {
                                if(typeof _optionsTabs.children[e] != 'object') continue;
                                console.log('tabHandler', _optionsTabs.children[e])
                                if(_optionsTabs.children[e] == tabEl) {
                                    if(!_optionsTabs.children[e].classList.contains('live-editor-popup-options-title-tab-active')) {
                                        _optionsTabs.children[e].classList.add('live-editor-popup-options-title-tab-active');
                                    }
                                    continue;
                                }
                                if(_optionsTabs.children[e].classList.contains('live-editor-popup-options-title-tab-active')) {
                                    _optionsTabs.children[e].classList.remove('live-editor-popup-options-title-tab-active');
                                }
                            }
                        }

                        console.log('audioSourceOptions pupup')
                        _dialogEl = document.createElement('DIV');
                        _dialogEl.className = 'live-editor-popup-options-dialog';
                        var dialogTitle = document.createElement('DIV');
                        dialogTitle.className = 'live-editor-popup-options-title';
                        var dialogTitleInner = _optionsTabs = document.createElement('DIV');
                        dialogTitleInner.className = 'live-editor-popup-options-title-inner';

                        var paramsTab = document.createElement('DIV');
                        paramsTab.className = 'live-editor-popup-options-title-tab live-editor-popup-options-title-tab-active';
                        paramsTab.dataset.tab = 'params';
                        var paramsTabInner = document.createElement('DIV');
                        paramsTabInner.className = 'live-editor-popup-options-title-tab-inner';
                        paramsTabInner.innerHTML = 'Params';
                        paramsTab.appendChild(paramsTabInner);
                        dialogTitleInner.appendChild(paramsTab);
                        dialogTitle.appendChild(dialogTitleInner);
                        _dialogEl.appendChild(dialogTitle);
                        var dialogBody = _dialogBody = document.createElement('DIV');
                        dialogBody.className = 'live-editor-popup-options-body';

                        //dialogBody.appendChild(createParamsList());
                        _dialogEl.appendChild(dialogBody);

                        paramsTab.addEventListener('click', tabHandler);

                        return {
                            hide: hideDialog,
                            show: showDialog,
                            showParams: showParams
                        }
                    }())

                    var webrtcAudioSourceOptions = (function (source) {
                        var _dialogEl = null;
                        var _optionsTabs = null;
                        var _dialogBody = null;
                        var _selectedSource = null;
                        var _generatedDialogs = [];

                        function createParamsList() {
                            console.log('audioSourceOptions: createParamsList',  _selectedSource.params);
                            for(let d in _generatedDialogs) {
                                if(_generatedDialogs[d].source == _selectedSource) {
                                    return _generatedDialogs[d].dialog;
                                }
                            }

                            var paramsBody = document.createElement('DIV')
                            paramsBody.className = 'live-editor-popup-options-body-inner live-editor-popup-options-params-body';

                            var mediaControlsEl = createMediaControls(_selectedSource);
                            paramsBody.appendChild(mediaControlsEl);

                            _generatedDialogs.push({
                                source: _selectedSource,
                                dialog:  paramsBody,
                            })
                            return paramsBody;
                        }

                        function showParams() {
                            console.log('showParams', this, _activeView)

                            _dialogBody.innerHTML = '';
                            _dialogBody.appendChild(createParamsList());
                        }

                        function showDialog(source) {
                            _selectedSource = source;
                            console.log('audioSourceOptions: showDialog', this, _activeView)
                            hideActiveView();
                            showParams();
                            _optionsColumnEl.appendChild(_dialogEl);
                            _activeView = this;
                        }

                        function hideDialog() {
                            console.log('audioSourceOptions: hideDialog', _dialogEl)

                            if(_dialogEl && _dialogEl.parentNode != null) {
                                _dialogEl.parentNode.removeChild(_dialogEl);
                            }
                        }

                        function tabHandler(e) {
                            var tabEl = e.currentTarget;
                            console.log('tabHandler tabEl', tabEl)

                            var tabName = tabEl.dataset.tab;
                            if(!tabName) return;
                            if(tabName == 'params') {
                                showParams();
                            }

                            for(let e in _optionsTabs.children) {
                                if(typeof _optionsTabs.children[e] != 'object') continue;
                                console.log('tabHandler', _optionsTabs.children[e])
                                if(_optionsTabs.children[e] == tabEl) {
                                    if(!_optionsTabs.children[e].classList.contains('live-editor-popup-options-title-tab-active')) {
                                        _optionsTabs.children[e].classList.add('live-editor-popup-options-title-tab-active');
                                    }
                                    continue;
                                }
                                if(_optionsTabs.children[e].classList.contains('live-editor-popup-options-title-tab-active')) {
                                    _optionsTabs.children[e].classList.remove('live-editor-popup-options-title-tab-active');
                                }
                            }
                        }

                        console.log('audioSourceOptions pupup')
                        _dialogEl = document.createElement('DIV');
                        _dialogEl.className = 'live-editor-popup-options-dialog';
                        var dialogTitle = document.createElement('DIV');
                        dialogTitle.className = 'live-editor-popup-options-title';
                        var dialogTitleInner = _optionsTabs = document.createElement('DIV');
                        dialogTitleInner.className = 'live-editor-popup-options-title-inner';

                        var paramsTab = document.createElement('DIV');
                        paramsTab.className = 'live-editor-popup-options-title-tab live-editor-popup-options-title-tab-active';
                        paramsTab.dataset.tab = 'params';
                        var paramsTabInner = document.createElement('DIV');
                        paramsTabInner.className = 'live-editor-popup-options-title-tab-inner';
                        paramsTabInner.innerHTML = 'Params';
                        paramsTab.appendChild(paramsTabInner);
                        dialogTitleInner.appendChild(paramsTab);
                        dialogTitle.appendChild(dialogTitleInner);
                        _dialogEl.appendChild(dialogTitle);
                        var dialogBody = _dialogBody = document.createElement('DIV');
                        dialogBody.className = 'live-editor-popup-options-body';

                        //dialogBody.appendChild(createParamsList());
                        _dialogEl.appendChild(dialogBody);

                        paramsTab.addEventListener('click', tabHandler);

                        return {
                            hide: hideDialog,
                            show: showDialog,
                            showParams: showParams
                        }
                    }())

                    function update() {
                        var activeScene = scenesInterface.getActive();
                        var selectedSource = activeScene.sourcesInterface.getSelectedSource();
                        console.log('optionsColumn.update', selectedSource);

                        if (selectedSource != null) {
                            let sceneIsInactive = true;
                            let activeSceneSources = activeScene.sceneInstance.sources;
                            for (let i in activeSceneSources) {
                                if (activeSceneSources[i] == selectedSource.sourceInstance) {
                                    sceneIsInactive = false;
                                    break;
                                }                                
                            }
                            if(sceneIsInactive) {
                                optionsColumn.hideActiveView();
                                return;
                            }
                        }

                        if(selectedSource && selectedSource.listType != 'audio' && selectedSource.sourceInstance.sourceType == 'group' && selectedSource.sourceInstance.groupType == 'webrtc') {
                            optionsColumn.canvasLayoutOptions.show(selectedSource);
                        } else if(selectedSource && selectedSource.listType != 'audio' && selectedSource.sourceInstance.sourceType == 'webrtc') {
                            optionsColumn.webrtcParticipantOptions.show(selectedSource);
                        } else if(selectedSource && selectedSource.sourceInstance.sourceType == 'image') {
                            optionsColumn.imageSourceOptions.show(selectedSource);
                        } else if(selectedSource && selectedSource.sourceInstance.sourceType == 'video') {
                            optionsColumn.videoSourceOptions.show(selectedSource);
                        } else if(selectedSource && selectedSource.sourceInstance.sourceType == 'audio' && selectedSource.sourceInstance.sourceType != 'webrtc') {
                            optionsColumn.audioSourceOptions.show(selectedSource);
                        } else if(selectedSource && selectedSource.listType == 'audio' && selectedSource.sourceInstance.sourceType == 'webrtcaudio') {
                            //optionsColumn.webrtcAudioSourceOptions.show(selectedSource);
                        } else {
                            optionsColumn.hideActiveView();
                        }
                    }

                    return {
                        canvasLayoutOptions: canvasLayoutOptions,
                        webrtcParticipantOptions: webrtcParticipantOptions,
                        imageSourceOptions: imageSourceOptions,
                        videoSourceOptions: videoSourceOptions,
                        audioSourceOptions: audioSourceOptions,
                        webrtcAudioSourceOptions: webrtcAudioSourceOptions,
                        hideActiveView: hideActiveView,
                        update: update
                    }
                }())

                var globalMicAudioInterface = (function () {
                    var _audioTool;
                    var _globalMicIcon;
                    var _globalMicSource;

                    _globalMicSource = tool.livestreamingCanvasComposerTool.canvasComposer.audioComposer.addGlobalAudioSource({
                        title: 'Microphone'
                    });

                    let localAudioTracks = _webrtcSignalingLib.localParticipant().audioTracks(true);
        
                        if(localAudioTracks[0] != null && localAudioTracks[0].stream != null) {
                            console.log('localAudioTracks[0].stream', localAudioTracks[0].stream)
                            _globalMicSource.addStream(localAudioTracks[0].stream);
                        }

                        _webrtcSignalingLib.event.on('trackAdded', function (e) {
                            if(!e.participant.isLocal || e.track.kind != 'audio') return;
                            _globalMicSource.addStream(e.track.stream);
                        });
                        
                   
                    function createControlsButtons() {
                    
                    }

                    return {
                        createControlsButtons: createControlsButtons
                    }
                }());

                function showDropUpMenu(dropUpMenu, buttonThatOpensDropUpMenu) {

                    function hideOnClick(e) {
                        if (!(buttonThatOpensDropUpMenu.contains(e.target) || e.target.matches('.live-editor-popup-sources-add-menu'))
                            && dropUpMenu.classList.contains('live-editor-popup-sources-add-menu-show')) {
                            dropUpMenu.classList.remove('live-editor-popup-sources-add-menu-show');
                            window.removeEventListener('click', hideOnClick)
                            e.preventDefault();
                            e.stopPropagation();
                        }
                    }
                    console.log('background', dropUpMenu)
                    if (dropUpMenu.classList.contains('live-editor-popup-sources-add-menu-show')) {
                        console.log('background 2')
                        dropUpMenu.classList.remove('live-editor-popup-sources-add-menu-show');
                    } else {
                        console.log('background 3')

                        dropUpMenu.classList.add('live-editor-popup-sources-add-menu-show');
                        window.addEventListener('mousedown', hideOnClick)

                        let openDropUpBtnRect = buttonThatOpensDropUpMenu.getBoundingClientRect();
                        let dropUpRect = dropUpMenu.getBoundingClientRect();
                        if(Q.info.isMobile) {
                            if(dropUpRect.height < openDropUpBtnRect.top) {
                                dropUpMenu.style.top = (openDropUpBtnRect.top - dropUpRect.height) + 'px';
                            } else if(dropUpRect.height > openDropUpBtnRect.top) {
                                if(dropUpRect.height <= window.innerHeight) {
                                    dropUpMenu.style.top = (openDropUpBtnRect.top - (dropUpRect.height - (dropUpRect.height - openDropUpBtnRect.top))) + 'px';
                                } else {
                                    dropUpMenu.style.maxHeight = '100vh';
                                    dropUpMenu.style.overflowY = 'scroll';
                                    dropUpMenu.style.top = '0px';
                                }
                            }
                            dropUpMenu.style.left = (openDropUpBtnRect.left + openDropUpBtnRect.width) + 'px';

                        } else {
                            dropUpMenu.style.left = (openDropUpBtnRect.left + openDropUpBtnRect.width) + 'px';
                            dropUpMenu.style.top = (openDropUpBtnRect.top - dropUpRect.height) + 'px';
                        }
                    }
                }

                function updateWebrtcSignalingLibInstance(newWebrtcSignalingInstance) {
                    _webrtcSignalingLib = newWebrtcSignalingInstance;
                }

                function PopupDialog(element, options) {
                    var pupupInstance = this;
                    this.element = element;
                    this.content = options.content;
                    this.closeButtonEl = null;
                    this.popupDialogEl = null;
                    this.hoverTimeout = null;
                    this.hide = function (e) {
                        if (e.target.offsetParent != pupupInstance.popupDialogEl || e.target == this.closeButtonEl) {
                            if (pupupInstance.popupDialogEl.parentElement) pupupInstance.popupDialogEl.parentElement.removeChild(pupupInstance.popupDialogEl);
        
                            togglePopupClassName('', false, false);
        
                            window.removeEventListener('click', pupupInstance.hide);
                        }
                    }
        
                    this.show = function (e) {        
                        pupupInstance.popupDialogEl.style.top = '';
                        pupupInstance.popupDialogEl.style.left = '';
                        pupupInstance.popupDialogEl.style.maxHeight = '';
                        pupupInstance.popupDialogEl.style.maxWidth = '';
                        togglePopupClassName('', false, false);
                        let existingPopupDialog = document.querySelector('.live-editor-popup-dialog');
                        if (existingPopupDialog && existingPopupDialog.parentElement) existingPopupDialog.parentElement.removeChild(existingPopupDialog);
        
                        let triggeringElementRect = pupupInstance.element.getBoundingClientRect();
        
                        pupupInstance.popupDialogEl.style.position = 'fixed';
                        pupupInstance.popupDialogEl.style.visibility = 'hidden';
                        pupupInstance.popupDialogEl.style.top = triggeringElementRect.y + triggeringElementRect.height + 20 + 'px';
                        pupupInstance.popupDialogEl.style.left = (triggeringElementRect.x + (triggeringElementRect.width / 2)) + 'px';
                      
                        if(pupupInstance.content instanceof Array) {
                            for(let i in pupupInstance.content) {
                                pupupInstance.popupDialogEl.appendChild(pupupInstance.content[i])
                            }
                        } else {
                            pupupInstance.popupDialogEl.appendChild(pupupInstance.content)
                        }
                        
                        document.body.appendChild(pupupInstance.popupDialogEl);
        
                        let popupRect = pupupInstance.popupDialogEl.getBoundingClientRect();
                        pupupInstance.popupDialogEl.style.left = ((triggeringElementRect.x + (triggeringElementRect.width / 2)) - (popupRect.width / 2)) + 'px';
        
                        //if ther is no room below (bottom) of button, show dialog above if there is enough room
        
                        let roomBelowButton = window.innerHeight - (triggeringElementRect.y + triggeringElementRect.height);
                        let roomBelowStartOfButton = window.innerHeight - triggeringElementRect.y;
                        let roomBelowMidOfButton = window.innerHeight - (triggeringElementRect.y + (triggeringElementRect.height / 2));
                        let roomAboveButton = triggeringElementRect.y;
                        let roomAboveEndOfButton = triggeringElementRect.y + triggeringElementRect.height;
                        let roomAboveMidOfButton = triggeringElementRect.y + (triggeringElementRect.height / 2);
                        let roomToLeftOfButton = triggeringElementRect.x;
                        let roomToRightOfStartOfButton = (window.innerWidth - triggeringElementRect.x);
                        let roomToLeftOfMidButton = triggeringElementRect.x + (triggeringElementRect.x / 2);
                        let roomToRightOfButton = (window.innerWidth - (triggeringElementRect.x + triggeringElementRect.width));
                        let roomToRightOfMidButton = (window.innerWidth - (triggeringElementRect.x + (triggeringElementRect.width / 2)));
                        let roomToLeftOfEndOfButton = triggeringElementRect.x + triggeringElementRect.width;
                        let midYOfTriggeringElement = triggeringElementRect.y + triggeringElementRect.height / 2;
                        let midXOfTriggeringElement = triggeringElementRect.x + triggeringElementRect.width / 2;
        
                        if (roomBelowButton >= popupRect.height + 20) {
                            //console.log('show 1');
                            if (roomToLeftOfMidButton >= (popupRect.width / 2) && roomToRightOfMidButton >= (popupRect.width / 2)) {
                                //console.log('show 1.1');
                                pupupInstance.popupDialogEl.style.top = triggeringElementRect.y + triggeringElementRect.height + 20 + 'px';
                                pupupInstance.popupDialogEl.style.left = ((triggeringElementRect.x + (triggeringElementRect.width / 2)) - (popupRect.width / 2)) + 'px';
        
                                togglePopupClassName('live-editor-popup-dialog-mid-below-position', false, false);
                            } else if (roomToRightOfStartOfButton >= popupRect.width) {
                                //console.log('show 1.2');
                                pupupInstance.popupDialogEl.style.top = triggeringElementRect.y + triggeringElementRect.height + 20 + 'px';
                                pupupInstance.popupDialogEl.style.left = (triggeringElementRect.x) + 'px';
        
                                togglePopupClassName('live-editor-popup-dialog-right-below-position', false, false);
                            } else if (roomToLeftOfEndOfButton >= popupRect.width) {
                                //console.log('show 1.3');
                                pupupInstance.popupDialogEl.style.top = triggeringElementRect.y + triggeringElementRect.height + 20 + 'px';
                                pupupInstance.popupDialogEl.style.left = (triggeringElementRect.x + triggeringElementRect.width) - popupRect.width + 'px';
        
                                togglePopupClassName('live-editor-popup-dialog-left-below-position', false, false);
                            } else if (popupRect.width <= window.innerWidth) {
                                //console.log('show 1.4');
                                pupupInstance.popupDialogEl.style.top = triggeringElementRect.y + triggeringElementRect.height + 20 + 'px';
                                pupupInstance.popupDialogEl.style.left = (triggeringElementRect.x - roomToLeftOfButton) + 'px';
        
                                togglePopupClassName('live-editor-popup-dialog-winmid-below-position', false, false);
                            } else {
                                //console.log('show 1.5');
                                pupupInstance.popupDialogEl.style.top = triggeringElementRect.y + triggeringElementRect.height + 20 + 'px';
                                pupupInstance.popupDialogEl.style.left = '0px';
        
                                togglePopupClassName('live-editor-popup-dialog-fullwidth-below-position', true, false);
                            }
                        } else if(roomAboveButton >= popupRect.height + 20) {
                            //console.log('show 2');
                            if (roomToLeftOfMidButton >= (popupRect.width / 2) && roomToRightOfMidButton >= (popupRect.width / 2)) {
                                //console.log('show 2.1');
                                pupupInstance.popupDialogEl.style.top = (triggeringElementRect.y - popupRect.height - 20) + 'px';
                                pupupInstance.popupDialogEl.style.left = ((triggeringElementRect.x + (triggeringElementRect.width / 2)) - (popupRect.width / 2)) + 'px';
                                togglePopupClassName('live-editor-popup-dialog-mid-above-position', false, false);
                            } else if (roomToRightOfStartOfButton >= popupRect.width) {
                                //console.log('show 2.2');
                                pupupInstance.popupDialogEl.style.top = (triggeringElementRect.y - popupRect.height - 20) + 'px';
                                pupupInstance.popupDialogEl.style.left = (triggeringElementRect.x) + 'px';
        
                                togglePopupClassName('live-editor-popup-dialog-right-above-position', false, false);
                            } else if (roomToLeftOfEndOfButton >= popupRect.width) {
                                //console.log('show 2.3');
                                pupupInstance.popupDialogEl.style.top = (triggeringElementRect.y - popupRect.height - 20) + 'px';
                                pupupInstance.popupDialogEl.style.left = (triggeringElementRect.x + triggeringElementRect.width - popupRect.width) + 'px';
        
                                togglePopupClassName('live-editor-popup-dialog-left-above-position', false, false);
                            } else if (window.innerWidth >= popupRect.width) {
                                //console.log('show 2.4');;
                                pupupInstance.popupDialogEl.style.top = (triggeringElementRect.y - popupRect.height - 20) + 'px';
                                pupupInstance.popupDialogEl.style.left = (triggeringElementRect.x - popupRect.width / 2) + 'px';
        
                                togglePopupClassName('live-editor-popup-dialog-winmid-above-position', false, false);
                            } else {
                                //console.log('show 2.5');
                                pupupInstance.popupDialogEl.style.top = (triggeringElementRect.y - popupRect.height - 20) + 'px';
                                pupupInstance.popupDialogEl.style.left = '0px';
        
                                togglePopupClassName('live-editor-popup-dialog-fullwidth-above-position', true, false);
                            }
                        } else if (Math.min(roomBelowMidOfButton, roomAboveMidOfButton) >= popupRect.height / 2) {
                            //console.log('show 3');
                            if (roomToRightOfButton >= popupRect.width + 20) {
                                //console.log('show 3.1');
                                pupupInstance.popupDialogEl.style.top = midYOfTriggeringElement - (popupRect.height / 2) + 'px';
                                pupupInstance.popupDialogEl.style.left = (triggeringElementRect.x + triggeringElementRect.width + 20) + 'px';
        
                                togglePopupClassName('live-editor-popup-dialog-right-mid-position', false, false);
                            } else if (roomToLeftOfButton >= popupRect.width + 20) {
                                //console.log('show 3.2');
                                pupupInstance.popupDialogEl.style.top = midYOfTriggeringElement - (popupRect.height / 2) + 'px';
                                pupupInstance.popupDialogEl.style.left = (triggeringElementRect.x - popupRect.width - 20) + 'px';
        
                                togglePopupClassName('live-editor-popup-dialog-left-mid-position', false, false);
                            } else {
                                //console.log('show 3.3');
                                pupupInstance.popupDialogEl.style.top = midYOfTriggeringElement - (popupRect.height / 2) + 'px';
                                pupupInstance.popupDialogEl.style.left = '0px';
        
                                togglePopupClassName('live-editor-popup-dialog-fullwidth-mid-position', true, false);
                            }
                        } else if (roomBelowStartOfButton >= popupRect.height) {
                            //console.log('show 4');
                            if (roomToRightOfButton >= popupRect.width + 20) {
                                //console.log('show 4.1');
                                pupupInstance.popupDialogEl.style.top = triggeringElementRect.y + 'px';
                                pupupInstance.popupDialogEl.style.left = (triggeringElementRect.x + triggeringElementRect.width + 20) + 'px';
        
                                togglePopupClassName('live-editor-popup-dialog-right-belowtop-position', false, false);
                            } else if (roomToLeftOfButton >= popupRect.width + 20) {
                                //console.log('show 4.2');
                                pupupInstance.popupDialogEl.style.top = (triggeringElementRect.y) + 'px';
                                pupupInstance.popupDialogEl.style.left = (triggeringElementRect.x - popupRect.width - 20) + 'px';
        
                                togglePopupClassName('live-editor-popup-dialog-left-belowtop-position', false, false);
                            } else {
                                //console.log('show 4.3');
                                pupupInstance.popupDialogEl.style.top = (triggeringElementRect.y) + 'px';
                                pupupInstance.popupDialogEl.style.left = '0px';
        
                                togglePopupClassName('live-editor-popup-dialog-fullwidth-belowtop-position', true, false);
                            }
                        } else if (roomAboveEndOfButton >= popupRect.height) {
                            //console.log('show 5');
                            if (roomToRightOfButton >= popupRect.width + 20) {
                                //console.log('show 5.1');
                                pupupInstance.popupDialogEl.style.top = (triggeringElementRect.y + triggeringElementRect.height - popupRect.height) + 'px';
                                pupupInstance.popupDialogEl.style.left = (triggeringElementRect.x + triggeringElementRect.width + 20) + 'px';
        
                                togglePopupClassName('live-editor-popup-dialog-right-abovebottom-position', false, false);
                            } else if (roomToLeftOfButton >= popupRect.width + 20) {
                                //console.log('show 5.2');
                                pupupInstance.popupDialogEl.style.top = (triggeringElementRect.y + triggeringElementRect.height - popupRect.height) + 'px';
                                pupupInstance.popupDialogEl.style.left = (triggeringElementRect.x - popupRect.width - 20) + 'px';
        
                                togglePopupClassName('live-editor-popup-dialog-left-abovebottom-position', false, false);
                            } else {
                                //console.log('show 5.3');
                                pupupInstance.popupDialogEl.style.top = (triggeringElementRect.y + triggeringElementRect.height - popupRect.height) + 'px';
                                pupupInstance.popupDialogEl.style.left = '0px';
        
                                togglePopupClassName('live-editor-popup-dialog-fullwidth-abovebottom-position', false, false);
                            }
                        } else if(popupRect.height + 20 < window.innerHeight) {
                            //console.log('show 6');
                            if (roomToRightOfButton >= popupRect.width + 20) {
                                //console.log('show 6.1');
                                pupupInstance.popupDialogEl.style.top = (window.innerHeight / 2) - (popupRect.height / 2) + 'px';
                                pupupInstance.popupDialogEl.style.left = (triggeringElementRect.x + triggeringElementRect.width + 20) + 'px';
                                togglePopupClassName('live-editor-popup-dialog-right-winmid-position', false, false);
        
                            } else if (roomToLeftOfButton >= popupRect.width + 20) {
                                //console.log('show 6.2');
        
                                pupupInstance.popupDialogEl.style.top = (window.innerHeight / 2) - (popupRect.height / 2) + 'px';
                                pupupInstance.popupDialogEl.style.left = (triggeringElementRect.x - 20 - popupRect.width) + 'px';
                                togglePopupClassName('live-editor-popup-dialog-left-winmid-position', false, false);
                            } else if(popupRect.width <= window.innerWidth) {
                                //console.log('show 6.3');
        
                                pupupInstance.popupDialogEl.style.top = (window.innerHeight / 2) - (popupRect.height / 2) + 'px';
                                pupupInstance.popupDialogEl.style.left = (triggeringElementRect.x - roomToLeftOfButton) + 'px';
                                togglePopupClassName('live-editor-popup-dialog-winmid-winmid-position', false, false);
                            } else {
                                //console.log('show 6.4');
        
                                pupupInstance.popupDialogEl.style.top = (window.innerHeight / 2) - (popupRect.height / 2) + 'px';
                                pupupInstance.popupDialogEl.style.left = '0px';
                                togglePopupClassName('live-editor-popup-dialog-fullwidth-winmid-position', true, false);
                            }
                        } else {
                            //console.log('show 7');
                            if (roomToRightOfButton >= popupRect.width + 20) {
                                //console.log('show 7.1');
                                pupupInstance.popupDialogEl.style.top = '0px';
                                pupupInstance.popupDialogEl.style.left = (triggeringElementRect.x + triggeringElementRect.width + 20) + 'px';
                                togglePopupClassName('live-editor-popup-dialog-right-fullheight-position', false, false);
        
                            } else if (roomToLeftOfButton >= popupRect.width + 20) {
                                //console.log('show 7.2');
        
                                pupupInstance.popupDialogEl.style.top = '0px';
                                pupupInstance.popupDialogEl.style.left = (triggeringElementRect.x - 20 - popupRect.width) + 'px';
                                togglePopupClassName('live-editor-popup-dialog-left-fullheight-position', false, false);
                            } else if(popupRect.width <= window.innerWidth) {
                                //console.log('show 7.3');
        
                                pupupInstance.popupDialogEl.style.top = (window.innerHeight / 2) - (popupRect.height / 2) + 'px';
                                pupupInstance.popupDialogEl.style.left = (window.innerWidth / 2) - (popupRect.width / 2) + 'px';
                                togglePopupClassName('live-editor-popup-dialog-winmid-fullheight-position', false, true);
                            } else {
                                //console.log('show 7.4');
                                pupupInstance.popupDialogEl.style.top = '0px';
                                pupupInstance.popupDialogEl.style.left = '0px';
                                togglePopupClassName('live-editor-popup-dialog-fullwidth-fullheight-position', true, true);
                            }
                        }
        
                        pupupInstance.popupDialogEl.style.visibility = '';
        
                        window.addEventListener('click', pupupInstance.hide);
        
        
                    }
        
                    function togglePopupClassName(classNameToApply, addXScrollClass, addYScrollClass) {
                        let classes = [
                            'live-editor-popup-dialog-mid-below-position',
                            'live-editor-popup-dialog-right-below-position',
                            'live-editor-popup-dialog-left-below-position',
                            'live-editor-popup-dialog-winmid-below-position',
                            'live-editor-popup-dialog-fullwidth-below-position',
                            'live-editor-popup-dialog-mid-above-position',
                            'live-editor-popup-dialog-right-above-position',
                            'live-editor-popup-dialog-left-above-position',
                            'live-editor-popup-dialog-winmid-above-position',
                            'live-editor-popup-dialog-fullwidth-above-position',
                            'live-editor-popup-dialog-right-mid-position',
                            'live-editor-popup-dialog-left-mid-position',
                            'live-editor-popup-dialog-fullwidth-mid-position',
                            'live-editor-popup-dialog-right-belowtop-position',
                            'live-editor-popup-dialog-left-belowtop-position',
                            'live-editor-popup-dialog-mid-belowtop-position',
                            'live-editor-popup-dialog-fullwidth-belowtop-position',
                            'live-editor-popup-dialog-right-abovebottom-position',
                            'live-editor-popup-dialog-left-abovebottom-position',
                            'live-editor-popup-dialog-fullwidth-abovebottom-position',
                            'live-editor-popup-dialog-right-winmid-position',
                            'live-editor-popup-dialog-left-winmid-position',
                            'live-editor-popup-dialog-winmid-winmid-position',
                            'live-editor-popup-dialog-fullwidth-winmid-position',
                            'live-editor-popup-dialog-right-fullheight-position',
                            'live-editor-popup-dialog-left-fullheight-position',
                            'live-editor-popup-dialog-winmid-fullheight-position',
                            'live-editor-popup-dialog-fullwidth-fullheight-position',
                            'live-editor-popup-dialog-x-scroll',
                            'live-editor-popup-dialog-y-scroll',
                        ];
                        for (let i in classes) {
                            if (classes[i] == classNameToApply || (classes[i] == 'live-editor-popup-dialog-x-scroll' && addXScrollClass) || (classes[i] == 'live-editor-popup-dialog-y-scroll' && addYScrollClass)) {
                                continue;
                            }
                            pupupInstance.popupDialogEl.classList.remove(classes[i]);
                        }
        
                        if (classNameToApply && classNameToApply != '' && !pupupInstance.popupDialogEl.classList.contains(classNameToApply)) {
                            pupupInstance.popupDialogEl.classList.add(classNameToApply);
                        }
        
                        if (addXScrollClass) {
                            pupupInstance.popupDialogEl.classList.add('live-editor-popup-dialog-x-scroll');
                        }
                        if (addYScrollClass) {
                            pupupInstance.popupDialogEl.classList.add('live-editor-popup-dialog-y-scroll');
                        }
                    }
        
                    this.popupDialogEl = document.createElement('DIV');
                    this.popupDialogEl.className = 'live-editor-popup-dialog';
                    this.closeButtonEl = document.createElement('DIV');
                    this.closeButtonEl.className = 'live-editor-close-sign';
                    this.popupDialogEl.appendChild(this.closeButtonEl);
        
                    this.closeButtonEl.addEventListener('click', function (e) {
                        pupupInstance.hide(e);
                    });
                    this.element.addEventListener('mouseenter', function (e) {
                        removeHoverTimerIfExists();
                        pupupInstance.show(e);
                    });
        
                    this.element.addEventListener('mouseleave', function (e) {
                        /*if (e.target == e.currentTarget || e.currentTarget.contains(e.eventTarget)) {
                            e.stopPropagation();
                            e.preventDefault();
                        }*/
        
                        pupupInstance.hoverTimeout = setTimeout(function () {
                            pupupInstance.hide(e);
                        }, 600)
                    });
        
                    this.popupDialogEl.addEventListener('mouseenter', function (e) {
                        removeHoverTimerIfExists();
                    })
                    this.popupDialogEl.addEventListener('mouseleave', function (e) {
                        pupupInstance.hoverTimeout = setTimeout(function () {
                            pupupInstance.hide(e);
                        }, 600)
        
                    });
        
                    function removeHoverTimerIfExists() {
                        if (pupupInstance.hoverTimeout != null) {
                            clearTimeout(pupupInstance.hoverTimeout);
                            pupupInstance.hoverTimeout = null;
                        }
                    }
                }

                function EventSystem() {

                    var events = {};

                    var CustomEvent = function (eventName) {

                        this.eventName = eventName;
                        this.callbacks = [];

                        this.registerCallback = function (callback) {
                            this.callbacks.push(callback);
                        }

                        this.unregisterCallback = function (callback) {
                            const index = this.callbacks.indexOf(callback);
                            if (index > -1) {
                                this.callbacks.splice(index, 1);
                            }
                        }

                        this.fire = function (data) {
                            const callbacks = this.callbacks.slice(0);
                            callbacks.forEach((callback) => {
                                callback(data);
                            });
                        }
                    }

                    var dispatch = function (eventName, data) {
                        const event = events[eventName];
                        if (event) {
                            event.fire(data);
                        }
                    }

                    var on = function (eventName, callback) {
                        let event = events[eventName];
                        if (!event) {
                            event = new CustomEvent(eventName);
                            events[eventName] = event;
                        }
                        event.registerCallback(callback);
                    }

                    var off = function (eventName, callback) {
                        const event = events[eventName];
                        if (event && event.callbacks.indexOf(callback) > -1) {
                            event.unregisterCallback(callback);
                            if (event.callbacks.length === 0) {
                                delete events[eventName];
                            }
                        }
                    }

                    var destroy = function () {
                        events = {};
                    }

                    return {
                        dispatch: dispatch,
                        on: on,
                        off: off,
                        destroy: destroy
                    }
                }

                function generateId() {
                    return Date.now().toString(36) + Math.random().toString(36).replace(/\./g, "");
                }

                function createPopup() {
                    console.log('createPopup 00', scenesInterface)
                    var dialog=document.createElement('DIV');
                    dialog.className = 'live-editor-dialog-box live-editor-dialog_advanced_streaming live-editor-hidden';
                    _dialogEl = dialog;
                    var dialogTitle=document.createElement('H3');
                    dialogTitle.innerHTML = Q.getObject("webrtc.streamingSettings.title", _controlsTool.text);
                    dialogTitle.className = 'live-editor-dialog-header Q_dialog_title';

                    var dialogInner=document.createElement('DIV');
                    dialogInner.className = 'live-editor-dialog-inner';
                    var boxContent=document.createElement('DIV');
                    boxContent.className = 'live-editor-popup-streaming-box live-editor-popup-box';

                    var streamingControls=document.createElement('DIV');
                    streamingControls.className = 'live-editor-popup-streaming-controls';

                    var scenesColumn = scenesInterface.createScenesCol();

                    var sourcesColumn = document.createElement('DIV');
                    sourcesColumn.className = 'live-editor-popup-sources';
                    _sourcesColumnEl = sourcesColumn;

                    var optionsColumn = document.createElement('DIV');
                    optionsColumn.className = 'live-editor-popup-options';
                    _optionsColumnEl = optionsColumn;

                    //_audioMixerColumnEl = globalMicAudioInterface.createControlsButtons();

                    streamingControls.appendChild(scenesColumn);
                    streamingControls.appendChild(sourcesColumn);
                    streamingControls.appendChild(optionsColumn);
                    //streamingControls.appendChild(_audioMixerColumnEl);
                    boxContent.appendChild(streamingControls);
                    
                    var previewBox = document.createElement('DIV');
                    previewBox.className = 'live-editor-popup-preview';
                    var previewBoxBody = document.createElement('DIV');
                    previewBoxBody.className = 'live-editor-popup-preview-body';
                    var previewBoxBodyInner = document.createElement('DIV');
                    previewBoxBodyInner.className = 'live-editor-popup-preview-body-inner';
                    var sourceResizingEl = _resizingElement = document.createElement('DIV');
                    sourceResizingEl.className = 'live-editor-popup-preview-resizing';

                    var previewButtons = document.createElement('DIV');
                    previewButtons.className = 'live-editor-popup-preview-buttons';
                    var startRecordingBtn = document.createElement('BUTTON');
                    startRecordingBtn.type = 'button';
                    startRecordingBtn.className = 'Q_button';
                    startRecordingBtn.innerHTML = Q.getObject("webrtc.settingsPopup.start", _controlsTool.text);

                    //previewButtons.appendChild(startRecordingBtn);
                    previewBoxBodyInner.appendChild(sourceResizingEl);
                    //previewBoxBody.appendChild(previewButtons);
                    previewBoxBody.appendChild(previewBoxBodyInner);
                    previewBox.appendChild(previewBoxBody);
                    boxContent.appendChild(previewBox);

                    var close=document.createElement('div');
                    close.className = 'live-editor-close-dialog-sign';
                    close.style.backgroundImage = 'url("' + Q.url("{{Q}}/img/close.png") + '"';
                    close.style.backgroundRepeat = 'no-repeat';
                    close.style.backgroundSize = 'cover';
                    close.style.animation = 'none';


                   
                    dialogInner.appendChild(dialogTitle);
                    dialogInner.appendChild(boxContent);

                    dialog.appendChild(close);
                    dialog.appendChild(dialogInner);

                    Q.activate(
                        Q.Tool.setUpElement(
                            _resizingElement,
                            "Q/resize",
                            {
                                move: true,
                                resize: true,
                                active: true,
                                //elementPosition: 'fixed',
                                showResizeHandles: true,
                                moveWithinArea: 'parent',
                                allowOverresizing: true,
                                negativeMoving: true,
                                onMoving: function () {

                                }
                            }
                        ),
                        {},
                        function () {
                            _resizingElementTool = this;
                            _resizingElement.style.display = 'none';
                        }
                    );

                    _webrtcUserInterface.roomsMediaContainer().appendChild(dialog);
                    Q.activate(
                        Q.Tool.setUpElement(
                            dialog,
                            "Q/resize",
                            {
                                move: true,
                                elementPosition: 'fixed',
                                activateOnElement: dialogTitle,
                                keepInitialSize: true,
                                resize: false,
                                active: true,
                                moveWithinArea: 'window',
                            }
                        ),
                        {},
                        function () {

                        }
                    );

                    Q.activate(
                        Q.Tool.setUpElement(
                            _dialogEl,
                            "Streams/fileManager",
                            {

                            }
                        ),
                        {},
                        function (toolEl) {
                            _fileManagerTool = Q.Tool.from(_dialogEl, "Streams/fileManager");
                        }
                    )

                    var controlsRect = _controlsTool.controlBar.getBoundingClientRect();
                    var dialogWidth = 996;
                    dialog.style.width = dialogWidth + 'px';
                    dialog.style.height = (dialogWidth / 1.4) + 'px';
                    console.log('dialogWidth', dialogWidth);
                    if(Q.info.isMobile) {
                        //dialog.style.left = (window.innerWidth / 2) - (dialogWidth / 2) + 'px';
                        //dialog.style.bottom = (controlsRect.height + 10) + 'px';
                    } else {
                        //dialog.style.left = (window.innerWidth / 2) - (dialogWidth / 2) + 'px';
                        //dialog.style.top = '100px';
                    }


                    close.addEventListener('click', function () {
                        hide()
                    });

                    tool.advancedStreamingDialog = boxContent;

                    return {
                        dialogEl: dialog,
                        previewBoxEl: previewBoxBodyInner
                    }
                }

                function createPopupHorizontalMobile() {
                    console.log('createPopupHorizontalMobile 00', scenesInterface)
                    var dialog=document.createElement('DIV');
                    dialog.className = 'live-editor-dialog-box live-editor-dialog_advanced_streaming live-editor-hidden Q_orientHorizontally';
                    _dialogEl = dialog;
                    var dialogTitle=document.createElement('H3');
                    dialogTitle.innerHTML = 'Livestream Manager';
                    dialogTitle.className = 'live-editor-dialog-header Q_dialog_title';

                    var dialogInner=document.createElement('DIV');
                    dialogInner.className = 'live-editor-dialog-inner';
                    var boxContent=document.createElement('DIV');
                    boxContent.className = 'live-editor-popup-streaming-box live-editor-popup-box';

                    var previewBox = document.createElement('DIV');
                    previewBox.className = 'live-editor-popup-preview';
                    var previewBoxBody = document.createElement('DIV');
                    previewBoxBody.className = 'live-editor-popup-preview-body';
                    var previewBoxBodyInner = document.createElement('DIV');
                    previewBoxBodyInner.className = 'live-editor-popup-preview-body-inner';
                    var sourceResizingEl = _resizingElement = document.createElement('DIV');
                    sourceResizingEl.className = 'live-editor-popup-preview-resizing';


                    var previewButtons = document.createElement('DIV');
                    previewButtons.className = 'live-editor-popup-preview-buttons';
                    var startRecordingBtn = document.createElement('BUTTON');
                    startRecordingBtn.type = 'button';
                    startRecordingBtn.className = 'Q_button';
                    startRecordingBtn.innerHTML = Q.getObject("webrtc.settingsPopup.start", _controlsTool.text);

                    previewButtons.appendChild(startRecordingBtn);

                    previewBoxBodyInner.appendChild(sourceResizingEl);
                    previewBoxBody.appendChild(previewBoxBodyInner);
                    //previewBoxBody.appendChild(previewButtons);
                    previewBox.appendChild(previewBoxBody);
                    boxContent.appendChild(previewBox);


                    var streamingControls=document.createElement('DIV');
                    streamingControls.className = 'live-editor-popup-streaming-controls';

                    var scenesColumn = scenesInterface.createScenesCol();

                    var sourcesColumn = document.createElement('DIV');
                    sourcesColumn.className = 'live-editor-popup-sources';
                    _sourcesColumnEl = sourcesColumn;

                    var scrollerBtn = document.createElement('DIV')
                    scrollerBtn.className = 'live-editor-popup-streaming-controls-scroller';
                    sourcesColumn.appendChild(scrollerBtn);

                    var optionsColumn = document.createElement('DIV');
                    optionsColumn.className = 'live-editor-popup-options';
                    _optionsColumnEl = optionsColumn;

                    var audioMixerColumn = document.createElement('DIV');
                    audioMixerColumn.className = 'live-editor-popup-audio-mixer';
                    _audioMixerColumnEl = optionsColumn;

                    //streamingControls.appendChild(scenesColumn);
                    streamingControls.appendChild(sourcesColumn);
                    streamingControls.appendChild(optionsColumn);
                    streamingControls.appendChild(audioMixerColumn);

                    var close=document.createElement('div');
                    close.className = 'live-editor-close-dialog-sign';
                    close.innerHTML = '';
                    close.style.animation = 'none';


                    boxContent.appendChild(streamingControls);
                    dialogInner.appendChild(dialogTitle);
                    dialogInner.appendChild(boxContent);

                    dialog.appendChild(close);
                    dialog.appendChild(dialogInner);


                    startRecordingBtn.addEventListener('click', function () {
                        if(!recordingCon.classList.contains('Q_working')) recordingCon.classList.add('Q_working');

                        _webrtcSignalingLib.mediaManager.localRecorder.startRecording(function (liveInfo) {
                            if(recordingCon.classList.contains('Q_working')) recordingCon.classList.remove('Q_working');
                            recordingTextLabel.innerHTML = Q.getObject("webrtc.settingsPopup.recordingInProgress", _controlsTool.text);
                            recordingSettings.style.display = 'none';
                            activeRecordingSection.style.display = 'block';
                        });
                    })
                    /*stopRecordingBtn.addEventListener('click', function () {
                            if(!recordingCon.classList.contains('Q_working')) recordingCon.classList.add('Q_working');

                            _webrtcSignalingLib.mediaManager.localRecorder.stopRecording(function () {
                                if(recordingCon.classList.contains('Q_working')) recordingCon.classList.remove('Q_working');
                                recordingTextLabel.innerHTML = Q.getObject("webrtc.settingsPopup.startRecording", _controlsTool.text);
                                activeRecordingSection.style.display = 'none';
                                recordingSettings.style.display = 'block';
                            });
                        })*/

                    scrollerBtn.addEventListener('click', function () {
                        let leftPos = optionsColumn.offsetLeft;
                        if(streamingControls.scrollLeft >= leftPos / 2) {
                            streamingControls.scrollLeft = 0;
                        } else {
                            streamingControls.scrollLeft = leftPos;
                        }
                    })

                    streamingControls.addEventListener('scroll', function () {
                        if(streamingControls.scrollLeft >= optionsColumn.offsetLeft / 2) {
                            if(!scrollerBtn.classList.contains('live-editor-popup-streaming-scroller-back')) {
                                scrollerBtn.classList.add('live-editor-popup-streaming-scroller-back')
                            }
                        } else {
                            scrollerBtn.classList.remove('live-editor-popup-streaming-scroller-back')
                        }
                    });

                    Q.activate(
                        Q.Tool.setUpElement(
                            _resizingElement,
                            "Q/resize",
                            {
                                move: true,
                                resize: true,
                                active: true,
                                //elementPosition: 'fixed',
                                showResizeHandles: true,
                                moveWithinArea: 'parent',
                                allowOverresizing: true,
                                negativeMoving: true,
                                onMoving: function () {

                                }
                            }
                        ),
                        {},
                        function () {
                            _resizingElementTool = this;
                        }
                    );

                    _webrtcUserInterface.roomsMediaContainer().appendChild(dialog);
                    setTimeout(function () {
                        Q.activate(
                            Q.Tool.setUpElement(
                                dialog,
                                "Q/resize",
                                {
                                    move: true,
                                    elementPosition: 'fixed',
                                    activateOnElement: dialogTitle,
                                    resize: false,
                                    active: true,
                                    moveWithinArea: 'window',
                                }
                            ),
                            {},
                            function () {

                            }
                        );
                    }, 3000)

                    var controlsRect = _controlsTool.controlBar.getBoundingClientRect();
                    var dialogWidth = 996;
                    dialog.style.width = dialogWidth + 'px';
                    console.log('dialogWidth', dialogWidth);
                    if(Q.info.isMobile) {
                        //dialog.style.left = (window.innerWidth / 2) - (dialogWidth / 2) + 'px';
                        //dialog.style.bottom = (controlsRect.height + 10) + 'px';
                    } else {
                        dialog.style.left = (window.innerWidth / 2) - (dialogWidth / 2) + 'px';
                        dialog.style.top = '100px';
                    }



                    close.addEventListener('click', function () {
                        hide()
                    });

                    tool.advancedStreamingDialog = boxContent;

                    return {
                        dialogEl: dialog,
                        previewBoxEl: previewBoxBodyInner
                    }
                }

                function hide() {
                    if(activeDialog == null) return;
                    if(!activeDialog.dialogEl.classList.contains('live-editor-hidden')){
                        activeDialog.dialogEl.classList.add('live-editor-hidden');
                        isHidden = true;
                        var streamingCanvas = document.querySelector('.live-editor-video-stream-canvas');
                        if(streamingCanvas != null) {
                            streamingCanvas.style.position = 'absolute';
                            streamingCanvas.style.top = '-999999999px';
                            streamingCanvas.style.left = '0';
                            document.body.appendChild(streamingCanvas);
                        }

                        if(! tool.livestreamingRtmpSenderTool.rtmpSender.isStreaming()) {
                            tool.livestreamingCanvasComposerTool.canvasComposer.videoComposer.stop();
                        }
                    }
                    _controlsTool.show();
                }

                function showHorizontalRequired() {
                    var horizontalRequiredCon = document.createElement('DIV')
                    horizontalRequiredCon.className = 'Q_webrtc_orientHorizontally Q_orientHorizontally Q_floatAboveDocument';
                    horizontalRequiredCon.style.zIndex = '9999999999999999999999999999999999999999';
                    document.body.appendChild(horizontalRequiredCon);
                }

                function hideHorizontalRequired() {
                    var horizontalRequiredCon = document.querySelector('.Q_webrtc_orientHorizontally');
                    if(horizontalRequiredCon && horizontalRequiredCon.parentNode != null) horizontalRequiredCon.parentNode.removeChild(horizontalRequiredCon) ;
                }

                function show() {
                    var dialog, previewBox;
                    if(Q.info.isMobile){
                        if(window.innerWidth > window.innerHeight) {
                            console.log('show horizontal')
                            if(mobileHorizontaldialogEl == null) {
                                mobileHorizontaldialogEl = createPopupHorizontalMobile();
                            }

                            dialog = mobileHorizontaldialogEl.dialogEl;
                            previewBox = mobileHorizontaldialogEl.previewBoxEl;
                            activeDialog = mobileHorizontaldialogEl;
                            function resizeHandler() {
                                setTimeout(function () {
                                    if(!dialog.classList.contains('live-editor-hidden') && window.innerWidth < window.innerHeight) {
                                        hide();
                                        show();
                                    }
                                }, 1600)
                                window.removeEventListener('resize', resizeHandler);

                            }
                            window.addEventListener('resize', resizeHandler);


                        } else {
                            console.log('show vertical')

                            showHorizontalRequired();

                            function resizeHandler() {
                                setTimeout(show, 1600)
                                hideHorizontalRequired();
                                window.removeEventListener('resize', resizeHandler);
                            }
                            window.addEventListener('resize', resizeHandler);
                            if(typeof screen != 'undefined' && screen.orientation != null) {
                                screen.orientation.addEventListener("change", resizeHandler);
                            }
                        }

                        if(mobileHorizontaldialogEl == null) return;
                    } else {
                        if(desktopDialogEl == null) {
                            desktopDialogEl = createPopup();
                        }

                        dialog = desktopDialogEl.dialogEl;
                        previewBox = desktopDialogEl.previewBoxEl;
                        activeDialog = desktopDialogEl;
                        if(desktopDialogEl == null) return;
                    }



                    if(dialog && dialog.classList.contains('live-editor-hidden')) {
                        tool.livestreamingCanvasComposerTool.canvasComposer.videoComposer.compositeVideosAndDraw();

                        dialog.classList.remove('live-editor-hidden');
                        isHidden = false;

                        var controlsRect = _controlsTool.controlBar.getBoundingClientRect();
                        if(Q.info.isMobile) {

                            dialog.style.position = 'fixed';
                            dialog.style.width = '100%';
                            dialog.style.height = '100%';
                            dialog.style.maxWidth = 'none';
                            dialog.style.top = '0';
                            dialog.style.left = '0';
                            //dialog.style.left = (window.innerWidth / 2) - (dialogWidth / 2) + 'px';
                            //dialog.style.bottom = (controlsRect.height + 10) + 'px';
                        } else {
                            var winWidth = window.innerWidth;
                            if(winWidth > dialogWidth) {
                                dialog.style.left = (winWidth / 2) - (dialogWidth / 2) + 'px';
                            } else {
                                let left = (winWidth / 100 * 2) / 2;
                                dialog.style.left = left + 'px';
                            }
                            //dialog.style.bottom = (controlsRect.height + 10) + 'px';

                        }

                        var streamingCanvas = _streamingCanvas = document.querySelector('.live-editor-video-stream-canvas');
                        if(streamingCanvas != null) {
                            streamingCanvas.style.position = '';
                            streamingCanvas.style.top = '';
                            streamingCanvas.style.left = '';
                            previewBox.appendChild(streamingCanvas);
                        }

                        scenesInterface.syncList();
                      
                        if(Q.info.isMobile) {
                            _controlsTool.hide();
                        } else {
                            var dialogRect = dialog.getBoundingClientRect();
                            var controlsRect = _controlsTool.element.firstChild.getBoundingClientRect();
                            if(dialogRect.bottom > controlsRect.top) {
                                _controlsTool.hide();
                            }
                        }
                    }
                }

                return {
                    updateWebrtcSignalingLibInstance: updateWebrtcSignalingLibInstance,
                    hide: hide,
                    show: show,
                    toggle: function () {
                        if(isHidden) {
                            this.show();
                        } else this.hide();
                    },

                    scenesInterface: scenesInterface
                }
            },
            get: function () {
                var tool = this;
                return new Promise(function(resolve, reject) {
                    if (tool.livestreamingEditor != null) {
                        resolve(tool.livestreamingEditor);
                    } else {
                        Q.activate(
                            Q.Tool.setUpElement(
                                "div", // or pass an existing element
                                "Streams/webrtc/livestreaming/canvasComposer",
                                {
                                    webrtcSignalingLib: tool.state.webrtcSignalingLib,
                                    webrtcUserInterface: tool.state.webrtcUserInterface,
                                }
                            ),
                            {},
                            function (rtmpSenderTool, rtmpSenderTool2) {
                                console.log('rtmpSenderTool', rtmpSenderTool, rtmpSenderTool2, this)
                                
                                tool.livestreamingCanvasComposerTool = this;

                                Q.activate(
                                    Q.Tool.setUpElement(
                                        "div", // or pass an existing element
                                        "Streams/webrtc/livestreaming/rtmpSender",
                                        {
                                            canvasComposerTool: tool.livestreamingCanvasComposerTool,
                                            webrtcSignalingLib: tool.state.webrtcSignalingLib,
                                            webrtcUserInterface: tool.state.webrtcUserInterface,
                                        }
                                    ),
                                    {},
                                    function () {
                                        tool.livestreamingRtmpSenderTool = this;
                                        Q.addStylesheet('{{Streams}}/css/tools/livestreamingEditor.css?ts=' + performance.now(), function () {
                                            tool.livestreamingEditor = tool.create();
                                            resolve(tool.livestreamingEditor);
                                        });
                                    }
                                );
                            }
                        );

                        
                    }
                  });
                
            },
            refresh: function() {
                var tool = this;
                tool.livestreamingEditor.updateWebrtcSignalingLibInstance(tool.state.webrtcSignalingLib);

                tool.livestreamingCanvasComposerTool.state.webrtcSignalingLib = tool.state.webrtcSignalingLib;
                tool.livestreamingCanvasComposerTool.refresh();

                tool.livestreamingRtmpSenderTool.state.webrtcSignalingLib = tool.state.webrtcSignalingLib;
                tool.livestreamingRtmpSenderTool.refresh();
            }
        }

    );

})(window.jQuery, window);