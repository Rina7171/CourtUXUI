export const manifest = {
  screens: {
    scr_rhikrq: { name: "Home", route: "/", position: { "x": 160, "y": 5780 } },
    scr_eesg1b: { name: "Public Cases", route: "/cases", position: { "x": 160, "y": 1820 } },
    scr_4wjb9c: { name: "Case Detail", route: "/cases/1", position: { "x": 1560, "y": 1820 } },
    scr_sbcbmr: { name: "Public Hearings", route: "/hearings", position: { "x": 160, "y": 3800 } },
    scr_7cu12l: { name: "Hearing Detail", route: "/hearings/1", position: { "x": 1560, "y": 3800 } },
    scr_y2npi8: { name: "Search Results", route: "/search?q=2024", position: { "x": 1560, "y": 5780 } },
    scr_y6rhaf: { name: "Court · Login", route: "/court/login" },
    scr_7ch8ec: { name: "Court · Dashboard", route: "/court", position: { "x": 160, "y": 7760 } },
    scr_k8wnti: { name: "Court · Cases", route: "/court/cases", position: { "x": 1560, "y": 7760 } },
    scr_l90rdk: { name: "Court · New Case", route: "/court/cases/new", position: { "x": 2960, "y": 7760 } },
    scr_3b0o7y: { name: "Court · Case Detail", route: "/court/cases/1", position: { "x": 4360, "y": 7760 } },
    scr_curhxh: { name: "Court · Hearings", route: "/court/hearings", position: { "x": 5760, "y": 7760 } },
    scr_36ajif: { name: "Court · Hearing Detail", route: "/court/hearings/h1", position: { "x": 7160, "y": 7760 } },
    scr_gq7a2i: { name: "Court · Participants", route: "/court/participants", position: { "x": 8560, "y": 7760 } },
    scr_k6fph4: { name: "Court · Participant Profile", route: "/court/participants/p1", position: { "x": 9960, "y": 7760 } },
    scr_sdf35c: { name: "Court · Lawyers & Judges", route: "/court/lawyers-judges", position: { "x": 11360, "y": 7760 } },
    scr_xzw7ww: { name: "Court · Dispositions", route: "/court/dispositions", position: { "x": 12760, "y": 7760 } },
    scr_nws0nc: { name: "Court · Greffiers", route: "/court/greffiers", position: { "x": 14160, "y": 7760 } },
    scr_tx849d: { name: "Court · Greffier Profile", route: "/court/greffiers/g2", position: { "x": 15560, "y": 7760 } }
  },
  sections: {
    sec_iqhirx: { name: "Cases flow", x: 0, y: 1600, width: 2920, height: 1180 },
    sec_kcum4t: { name: "Hearings flow", x: 0, y: 3580, width: 2920, height: 1180 },
    sec_k0oqyr: { name: "Home & Search", x: 0, y: 5560, width: 2920, height: 1180 },
    sec_n1md9k: { name: "Court Admin", x: 0, y: 7540, width: 16920, height: 1180 }
  },
  layers: [
  { kind: "section", id: "sec_iqhirx", children: [
    { kind: "screen", id: "scr_eesg1b" },
    { kind: "screen", id: "scr_4wjb9c" }]
  },
  { kind: "section", id: "sec_kcum4t", children: [
    { kind: "screen", id: "scr_sbcbmr" },
    { kind: "screen", id: "scr_7cu12l" }]
  },
  { kind: "screen", id: "scr_y6rhaf" },
  { kind: "section", id: "sec_k0oqyr", children: [
    { kind: "screen", id: "scr_rhikrq" },
    { kind: "screen", id: "scr_y2npi8" }]
  },
  { kind: "section", id: "sec_n1md9k", children: [
    { kind: "screen", id: "scr_7ch8ec" },
    { kind: "screen", id: "scr_k8wnti" },
    { kind: "screen", id: "scr_l90rdk" },
    { kind: "screen", id: "scr_3b0o7y" },
    { kind: "screen", id: "scr_curhxh" },
    { kind: "screen", id: "scr_36ajif" },
    { kind: "screen", id: "scr_gq7a2i" },
    { kind: "screen", id: "scr_k6fph4" },
    { kind: "screen", id: "scr_sdf35c" },
    { kind: "screen", id: "scr_xzw7ww" },
    { kind: "screen", id: "scr_nws0nc" },
    { kind: "screen", id: "scr_tx849d" }]
  }]

};