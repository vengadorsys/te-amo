/* Datos extraídos de la «Guía de Sesiones Anatomoclínicas: HTA, DM2 y Depresión».
   Documento de estudio, no de prescripción. */

const ENF = { hta: "HTA", dm2: "Diabetes tipo 2", dep: "Depresión" };

/* ---------- FAMILIAS ---------- */
const FAMILIAS = [
  // ===== HTA =====
  {
    id: "ieca", nombre: "IECA", enf: "hta", sufijo: "-pril",
    completo: "Inhibidores de la enzima convertidora de angiotensina",
    alias: ["ieca", "inhibidor de la eca", "inhibidores de la eca", "inhibidor de la enzima convertidora de angiotensina", "inhibidores de la enzima convertidora de angiotensina"],
    mecanismo: "Bloquean la ECA → ↓ angiotensina II y aldosterona → vasodilatación y ↓ volumen. También ↑ bradicinina. Protegen riñón (↓ albuminuria) y corazón.",
    mecCorto: "Bloquean la enzima convertidora de angiotensina (y ↑ bradicinina)",
    adversos: "Tos seca (por bradicinina), angioedema, hiperpotasemia, ↑ creatinina inicial.",
    contra: "Embarazo (teratógenos), angioedema previo, estenosis bilateral de arteria renal, K⁺ alto. Nunca combinar con ARA II."
  },
  {
    id: "ara2", nombre: "ARA II", enf: "hta", sufijo: "-sartán",
    completo: "Antagonistas del receptor de angiotensina II",
    alias: ["ara ii", "ara 2", "ara2", "araii", "ara", "sartanes", "antagonista del receptor de angiotensina", "antagonistas del receptor de angiotensina ii", "antagonista del receptor de angiotensina ii", "bloqueador del receptor de angiotensina"],
    mecanismo: "Bloquean el receptor AT1 de angiotensina II. Mismo beneficio que IECA, sin tos porque no tocan la bradicinina.",
    mecCorto: "Bloquean el receptor AT1 de angiotensina II (sin tocar la bradicinina)",
    adversos: "Hiperpotasemia, ↑ creatinina. Losartán ↓ ácido úrico.",
    contra: "Embarazo. Nunca combinar IECA + ARA II (más hiperK y daño renal sin beneficio)."
  },
  {
    id: "arni", nombre: "ARNI", enf: "hta", sufijo: "sacubitrilo/valsartán",
    completo: "Inhibidor de neprilisina + ARA II",
    alias: ["arni", "inhibidor de neprilisina", "inhibidor de neprilisina y receptor de angiotensina", "inra"],
    mecanismo: "Sacubitrilo inhibe la neprilisina (↑ péptidos natriuréticos) y valsartán bloquea el receptor AT1. Pilar en IC con FE reducida.",
    mecCorto: "Inhibe la neprilisina + bloquea el receptor AT1",
    adversos: "Hipotensión, hiperpotasemia, angioedema.",
    contra: "Esperar 36 h tras suspender un IECA (riesgo de angioedema). Embarazo."
  },
  {
    id: "dhp", nombre: "Calcioantagonista DHP", enf: "hta", sufijo: "-dipino",
    completo: "Calcioantagonista dihidropiridínico",
    alias: ["calcioantagonista dhp", "dhp", "dihidropiridina", "dihidropiridinas", "dihidropiridinico", "calcioantagonista dihidropiridinico", "bloqueador de canales de calcio dhp", "bcc dhp", "antagonista del calcio dhp", "calcioantagonistas dhp"],
    mecanismo: "Bloquean canales de calcio tipo L en arteriolas → vasodilatación.",
    mecCorto: "Bloquean canales de Ca²⁺ tipo L en las arteriolas → vasodilatación",
    adversos: "Edema maleolar, cefalea, rubor, taquicardia refleja (nifedipino de liberación inmediata).",
    contra: "Evitar nifedipino de acción corta. El edema no responde a diurético."
  },
  {
    id: "nodhp", nombre: "Calcioantagonista no DHP", enf: "hta", sufijo: "verapamilo, diltiazem (excepción: no terminan en -dipino)",
    completo: "Calcioantagonista no dihidropiridínico",
    alias: ["calcioantagonista no dhp", "no dhp", "nodhp", "no dihidropiridinico", "calcioantagonista no dihidropiridinico", "bloqueador de canales de calcio no dhp", "bcc no dhp", "calcioantagonistas no dhp"],
    mecanismo: "Actúan en el corazón: ↓ frecuencia y conducción AV.",
    mecCorto: "Bloquean canales de Ca²⁺ en el corazón → ↓ frecuencia y conducción AV",
    adversos: "Bradicardia, bloqueo AV, estreñimiento (verapamilo).",
    contra: "IC con FE reducida, bloqueo AV, bradicardia; no combinar con BB."
  },
  {
    id: "tiazida", nombre: "Diurético tiazídico", enf: "hta", sufijo: "-tiazida, -talidona, indapamida",
    completo: "Diurético tiazídico o «tipo tiazida»",
    alias: ["tiazida", "tiazidas", "diuretico tiazidico", "diureticos tiazidicos", "tipo tiazida", "diuretico tipo tiazida", "tiazidico"],
    mecanismo: "Bloquean el cotransportador Na-Cl del túbulo distal → natriuresis y luego vasodilatación.",
    mecCorto: "Bloquean el cotransportador Na-Cl del túbulo distal",
    adversos: "HipoK, hipoNa, hiperuricemia (gota), hiperglucemia, hiperlipidemia, hipercalcemia («hipo-hipo, hiper-hiper-hiper-hiper»).",
    contra: "Gota activa. Precaución en ancianos (hiponatremia)."
  },
  {
    id: "asa", nombre: "Diurético de asa", enf: "hta", sufijo: "furosemida",
    completo: "Diurético de asa",
    alias: ["diuretico de asa", "de asa", "asa", "diureticos de asa"],
    mecanismo: "Bloquean el cotransportador Na-K-2Cl del asa de Henle → diuresis potente.",
    mecCorto: "Bloquean el cotransportador Na-K-2Cl del asa de Henle",
    adversos: "HipoK, hiperuricemia, depleción de volumen.",
    contra: "En HTA se reserva para ERC avanzada o edema."
  },
  {
    id: "arm", nombre: "Antagonista de aldosterona (ARM)", enf: "hta", sufijo: "espironolactona, eplerenona",
    completo: "Antagonistas del receptor mineralocorticoide",
    alias: ["arm", "antagonista de aldosterona", "antagonistas de aldosterona", "antimineralocorticoide", "antagonista del receptor mineralocorticoide", "ahorrador de potasio", "diuretico ahorrador de potasio"],
    mecanismo: "Bloquean el receptor de aldosterona → eliminan Na y retienen K.",
    mecCorto: "Bloquean el receptor de aldosterona → eliminan Na⁺ y retienen K⁺",
    adversos: "Hiperpotasemia, ginecomastia (espironolactona).",
    contra: "K⁺ alto, ERC avanzada. Uso: HTA resistente, IC, hiperaldosteronismo."
  },
  {
    id: "bb", nombre: "Betabloqueador", enf: "hta", sufijo: "-olol, -ilol",
    completo: "Betabloqueadores (BB)",
    alias: ["bb", "betabloqueador", "betabloqueadores", "beta bloqueador", "betabloqueante", "bloqueador beta", "beta bloqueadores"],
    mecanismo: "Bloquean receptores β1 → ↓ frecuencia, contractilidad y renina. Carvedilol y labetalol también bloquean α1.",
    mecCorto: "Bloquean receptores β1 → ↓ frecuencia, contractilidad y renina",
    adversos: "Bradicardia, fatiga, broncoespasmo (no selectivos), enmascaran la hipoglucemia (taquicardia, temblor).",
    contra: "Asma (sobre todo propranolol), bloqueo AV. No son 1.ª línea sin indicación."
  },
  {
    id: "alfa", nombre: "Bloqueador α1", enf: "hta", sufijo: "-azosina",
    completo: "Bloqueadores alfa-1",
    alias: ["bloqueador a1", "bloqueador alfa 1", "bloqueador alfa1", "alfa bloqueador", "alfabloqueador", "bloqueador alfa", "alfa 1", "a1", "α1", "bloqueador α1", "alfa-bloqueador"],
    mecanismo: "Bloquean receptores α1 → vasodilatan y relajan el músculo liso prostático.",
    mecCorto: "Bloquean receptores α1 → vasodilatan y relajan la próstata",
    adversos: "Hipotensión ortostática (sobre todo la primera dosis).",
    contra: "No como monoterapia para la PA; útiles si además hay hiperplasia prostática."
  },
  {
    id: "central", nombre: "Antihipertensivo central", enf: "hta", sufijo: "metildopa, clonidina",
    completo: "Simpaticolíticos centrales (agonistas α2)",
    alias: ["central", "antihipertensivo central", "simpaticolitico central", "agonista alfa 2", "agonista a2", "agonista α2", "accion central"],
    mecanismo: "Estimulan receptores α2 centrales → ↓ salida simpática.",
    mecCorto: "Agonistas α2 centrales → ↓ tono simpático",
    adversos: "Clonidina: HTA de rebote al suspender. Sedación, boca seca.",
    contra: "Metildopa se reserva sobre todo para embarazo. No suspender clonidina bruscamente."
  },
  {
    id: "vasodil", nombre: "Vasodilatador directo", enf: "hta", sufijo: "hidralazina",
    completo: "Vasodilatador arteriolar directo",
    alias: ["vasodilatador", "vasodilatador directo", "vasodilatador arteriolar", "vasodilatador arteriolar directo"],
    mecanismo: "Relaja directamente el músculo liso arteriolar.",
    mecCorto: "Vasodilatador arteriolar directo",
    adversos: "Taquicardia refleja, lupus inducido por fármacos.",
    contra: "Se reserva sobre todo para embarazo; suele combinarse con BB por la taquicardia refleja."
  },

  // ===== DM2 =====
  {
    id: "biguanida", nombre: "Biguanida", enf: "dm2", sufijo: "metformina",
    completo: "Biguanida",
    alias: ["biguanida", "biguanidas"],
    mecanismo: "↓ producción hepática de glucosa (activa AMPK) y mejora la sensibilidad a la insulina.",
    mecCorto: "↓ producción hepática de glucosa (activa AMPK)",
    adversos: "Molestias GI (diarrea), déficit de vitamina B12, acidosis láctica (rara).",
    contra: "No usar con eTFG <30; no iniciar con 30–45. Suspender temporalmente con contraste yodado si eTFG baja.",
    ventajas: "No causa hipoglucemia sola, peso neutro o ↓, barata."
  },
  {
    id: "isglt2", nombre: "iSGLT2", enf: "dm2", sufijo: "-gliflozina",
    completo: "Inhibidores del cotransportador sodio-glucosa 2",
    alias: ["isglt2", "isglt 2", "i sglt2", "inhibidor sglt2", "inhibidores sglt2", "inhibidor de sglt2", "inhibidores del cotransportador sodio glucosa 2", "inhibidor del cotransportador sodio glucosa 2", "gliflozinas", "sglt2"],
    mecanismo: "Bloquean la reabsorción renal de glucosa en el túbulo proximal → glucosuria.",
    mecCorto: "Bloquean la reabsorción renal de glucosa (SGLT2) → glucosuria",
    adversos: "Infecciones genitales micóticas, depleción de volumen, cetoacidosis euglucémica.",
    contra: "Suspender antes de cirugía o ayuno prolongado. Precaución con infecciones genitourinarias recurrentes.",
    ventajas: "↓ hospitalización por IC, ↓ progresión de ERC, ↓ eventos CV, ↓ peso y PA."
  },
  {
    id: "aglp1", nombre: "aGLP-1", enf: "dm2", sufijo: "-glutida, -enatida (tirzepatida: doble GIP/GLP-1)",
    completo: "Agonistas del receptor de GLP-1 (y doble agonista GIP/GLP-1)",
    alias: ["aglp1", "aglp-1", "aglp 1", "glp1", "glp-1", "agonista glp1", "agonistas glp1", "agonista de glp1", "agonista del receptor de glp1", "agonistas del receptor de glp1", "incretinomimetico", "agonista glp 1", "doble agonista", "agonista gip glp1"],
    mecanismo: "Imitan las incretinas: ↑ insulina dependiente de glucosa, ↓ glucagón, retrasan el vaciamiento gástrico, ↑ saciedad.",
    mecCorto: "Imitan la incretina GLP-1: ↑ insulina dependiente de glucosa, ↓ glucagón, ↑ saciedad",
    adversos: "Náusea, vómito; pancreatitis (rara).",
    contra: "Antecedente de cáncer medular de tiroides o MEN 2. No combinar con iDPP-4.",
    ventajas: "Gran ↓ de peso, ↓ eventos CV, protección renal; preferidos con eTFG <30."
  },
  {
    id: "idpp4", nombre: "iDPP-4", enf: "dm2", sufijo: "-gliptina",
    completo: "Inhibidores de la dipeptidil peptidasa 4",
    alias: ["idpp4", "idpp-4", "idpp 4", "dpp4", "dpp-4", "inhibidor dpp4", "inhibidores dpp4", "inhibidor de dpp4", "inhibidor de la dipeptidil peptidasa 4", "inhibidores de la dipeptidil peptidasa 4", "gliptinas"],
    mecanismo: "Impiden la degradación de las incretinas propias (GLP-1, GIP).",
    mecCorto: "Impiden la degradación de las incretinas propias",
    adversos: "Efecto modesto. Saxagliptina (y alogliptina) ↑ hospitalización por IC.",
    contra: "No combinar con aGLP-1. Evitar saxagliptina en IC.",
    ventajas: "Orales, bien tolerados, sin hipoglucemia ni aumento de peso. Linagliptina sin ajuste renal."
  },
  {
    id: "su", nombre: "Sulfonilurea", enf: "dm2", sufijo: "gli- / gly- (sin otra terminación)",
    completo: "Sulfonilureas (SU)",
    alias: ["sulfonilurea", "sulfonilureas", "su"],
    mecanismo: "Cierran los canales de K⁺-ATP de la célula β → secreción de insulina sin importar la glucosa.",
    mecCorto: "Cierran canales de K⁺-ATP de la célula β → secretan insulina sin importar la glucosa",
    adversos: "Hipoglucemia (sobre todo glibenclamida, de vida larga) y ↑ peso.",
    contra: "Evitar en ancianos y ERC (sobre todo glibenclamida).",
    ventajas: "Potentes y baratas."
  },
  {
    id: "meglitinida", nombre: "Meglitinida", enf: "dm2", sufijo: "-glinida",
    completo: "Meglitinidas (secretagogos de acción corta)",
    alias: ["meglitinida", "meglitinidas", "glinida", "glinidas", "secretagogo de accion corta"],
    mecanismo: "Secretagogo de insulina de acción corta (cierran canales K⁺-ATP, efecto breve).",
    mecCorto: "Secretagogo de insulina de acción corta (antes de cada comida)",
    adversos: "Hipoglucemia (menor que SU), ↑ peso.",
    contra: "Si se salta la comida, se salta la dosis."
  },
  {
    id: "tzd", nombre: "Tiazolidinediona (TZD)", enf: "dm2", sufijo: "-glitazona",
    completo: "Tiazolidinedionas (glitazonas)",
    alias: ["tzd", "tiazolidinediona", "tiazolidinedionas", "glitazona", "glitazonas"],
    mecanismo: "Activan PPAR-γ → ↑ sensibilidad a insulina en músculo, grasa e hígado.",
    mecCorto: "Activan PPAR-γ → ↑ sensibilidad a la insulina",
    adversos: "Retención de líquidos, edema, IC, ↑ peso, fracturas.",
    contra: "Contraindicada en insuficiencia cardiaca.",
    ventajas: "Sin hipoglucemia; útil en hígado graso (MASLD)."
  },
  {
    id: "aglucosidasa", nombre: "Inhibidor de α-glucosidasa", enf: "dm2", sufijo: "acarbosa",
    completo: "Inhibidores de alfa-glucosidasa",
    alias: ["inhibidor de alfa glucosidasa", "inhibidor de a glucosidasa", "inhibidor de α glucosidasa", "alfa glucosidasa", "inhibidores de alfa glucosidasa"],
    mecanismo: "Retrasan la absorción intestinal de carbohidratos.",
    mecCorto: "Retrasan la absorción intestinal de carbohidratos",
    adversos: "Flatulencia, molestias GI.",
    contra: "Si hay hipoglucemia (con otro fármaco), tratar con glucosa pura, no con azúcar de mesa.",
    ventajas: "No causa hipoglucemia."
  },
  {
    id: "insulina", nombre: "Insulina", enf: "dm2", sufijo: "insulina (basal / prandial)",
    completo: "Insulinas",
    alias: ["insulina", "insulinas"],
    mecanismo: "Reemplaza la hormona que falta.",
    mecCorto: "Reemplaza la hormona que falta",
    adversos: "Hipoglucemia, ↑ peso; requiere educación y monitoreo.",
    contra: "Iniciar si A1c ≥10 %, glucosa ≥300, síntomas catabólicos, embarazo o falla de otros fármacos.",
    ventajas: "La más potente; sin techo de dosis. De elección en embarazo."
  },

  // ===== DEPRESIÓN =====
  {
    id: "isrs", nombre: "ISRS", enf: "dep", sufijo: "-oxetina, -alopram, sertralina, paroxetina",
    completo: "Inhibidores selectivos de la recaptura de serotonina",
    alias: ["isrs", "inhibidor selectivo de la recaptura de serotonina", "inhibidores selectivos de la recaptura de serotonina", "inhibidor selectivo de recaptura de serotonina", "ssri"],
    mecanismo: "Bloquean el transportador de recaptura de serotonina (SERT).",
    mecCorto: "Bloquean el transportador de recaptura de serotonina (SERT)",
    adversos: "Náusea, disfunción sexual, insomnio o ansiedad iniciales, hiponatremia (SIADH, ancianos), ↑ sangrado con AINE/anticoagulantes.",
    contra: "Primera línea. Citalopram alarga QT. Paroxetina: discontinuación y riesgo fetal. Fluoxetina: vida media larga, inhibe CYP2D6. Nunca con IMAO."
  },
  {
    id: "irsn", nombre: "IRSN", enf: "dep", sufijo: "venlafaxina, desvenlafaxina, duloxetina (trampa: duloxetina NO es ISRS)",
    completo: "Inhibidores de la recaptura de serotonina y noradrenalina",
    alias: ["irsn", "inhibidor de la recaptura de serotonina y noradrenalina", "inhibidores de la recaptura de serotonina y noradrenalina", "snri", "dual"],
    mecanismo: "Bloquean la recaptura de serotonina (5-HT) y noradrenalina (NA).",
    mecCorto: "Bloquean la recaptura de serotonina y noradrenalina",
    adversos: "Como ISRS + ↑ PA (venlafaxina, dependiente de dosis), sudoración, discontinuación intensa.",
    contra: "Cuidado en HTA no controlada. Duloxetina: dolor neuropático diabético, fibromialgia."
  },
  {
    id: "irnd", nombre: "IRND (bupropión)", enf: "dep", sufijo: "bupropión",
    completo: "Inhibidor de la recaptura de noradrenalina y dopamina",
    alias: ["irnd", "ndri", "inhibidor de la recaptura de noradrenalina y dopamina", "bupropion"],
    mecanismo: "Inhibe la recaptura de NA y DA; no toca la serotonina.",
    mecCorto: "Inhibe la recaptura de noradrenalina y dopamina (no toca serotonina)",
    adversos: "Insomnio, ansiedad, ↓ umbral convulsivo.",
    contra: "Contraindicado en epilepsia, anorexia y bulimia. Ventaja: sin disfunción sexual ni ↑ peso; ayuda a dejar de fumar."
  },
  {
    id: "nassa", nombre: "NaSSA (mirtazapina)", enf: "dep", sufijo: "mirtazapina",
    completo: "Antidepresivo noradrenérgico y serotoninérgico específico",
    alias: ["nassa", "noradrenergico y serotoninergico especifico", "antidepresivo noradrenergico y serotoninergico especifico", "mirtazapina", "antagonista alfa 2"],
    mecanismo: "Bloquea autorreceptores α2 (↑ NA y 5-HT) y receptores 5-HT2/5-HT3 y H1.",
    mecCorto: "Bloquea autorreceptores α2, 5-HT2/5-HT3 y H1",
    adversos: "Sedación, ↑ apetito y peso.",
    contra: "Útil con insomnio, poco apetito o ancianos delgados; mala opción en DM2 con obesidad."
  },
  {
    id: "sari", nombre: "SARI (trazodona)", enf: "dep", sufijo: "trazodona",
    completo: "Antagonista de serotonina e inhibidor de la recaptura",
    alias: ["sari", "antagonista de serotonina e inhibidor de la recaptura", "antagonista 5ht2", "trazodona"],
    mecanismo: "Antagonista 5-HT2 e inhibidor débil de la recaptura de serotonina.",
    mecCorto: "Antagonista 5-HT2 + inhibidor débil de recaptura",
    adversos: "Sedación, ortostatismo, priapismo (raro).",
    contra: "Se usa a dosis bajas como hipnótico."
  },
  {
    id: "multimodal", nombre: "Antidepresivo multimodal", enf: "dep", sufijo: "vortioxetina",
    completo: "Modulador multimodal de serotonina",
    alias: ["multimodal", "antidepresivo multimodal", "modulador multimodal", "modulador multimodal de serotonina", "atipico"],
    mecanismo: "Inhibe la recaptura de serotonina y modula varios receptores 5-HT.",
    mecCorto: "Inhibe SERT y modula varios receptores de serotonina",
    adversos: "Náusea.",
    contra: "Antidepresivo atípico de una toma al día."
  },
  {
    id: "atc", nombre: "Antidepresivo tricíclico (ATC)", enf: "dep", sufijo: "-triptilina, -pramina",
    completo: "Antidepresivos tricíclicos",
    alias: ["atc", "triciclico", "triciclicos", "antidepresivo triciclico", "antidepresivos triciclicos", "tca"],
    mecanismo: "Inhiben la recaptura de 5-HT y NA y además bloquean receptores muscarínicos, H1, α1 y canales de Na⁺.",
    mecCorto: "Inhiben recaptura de 5-HT y NA + bloquean muscarínicos, H1, α1 y canales de Na⁺",
    adversos: "Anticolinérgicos (boca seca, estreñimiento, retención urinaria, confusión), ortostatismo, sedación, ↑ peso, QRS ancho y arritmias.",
    contra: "Letales en sobredosis. Evitar en cardiopatía, ancianos, glaucoma de ángulo cerrado, HPB, riesgo suicida."
  },
  {
    id: "imao", nombre: "IMAO", enf: "dep", sufijo: "fenelzina, tranilcipromina, selegilina",
    completo: "Inhibidores de la monoaminooxidasa",
    alias: ["imao", "inhibidor de la monoaminooxidasa", "inhibidores de la monoaminooxidasa", "inhibidor de la mao", "maoi"],
    mecanismo: "Inhiben la monoaminooxidasa (enzima que degrada las monoaminas).",
    mecCorto: "Inhiben la monoaminooxidasa (enzima que degrada monoaminas)",
    adversos: "Crisis hipertensiva con tiramina (quesos madurados, embutidos, vino), síndrome serotoninérgico con otros serotoninérgicos.",
    contra: "Reservados para casos resistentes. Lavado al cambiar desde/hacia ISRS (≈2 semanas; ≈5 con fluoxetina)."
  },
  {
    id: "potenciador", nombre: "Potenciador", enf: "dep", sufijo: "litio, aripiprazol, quetiapina, esketamina",
    completo: "Potenciadores (estabilizador del ánimo, antipsicóticos atípicos)",
    alias: ["potenciador", "potenciadores", "potenciacion", "estabilizador del animo", "antipsicotico atipico", "antipsicotico"],
    mecanismo: "Diversos: se agregan al antidepresivo en depresión resistente o con síntomas psicóticos.",
    mecCorto: "Se agregan al antidepresivo en depresión resistente o psicótica",
    adversos: "Antipsicóticos atípicos: ↑ peso, glucosa y lípidos. Litio: toxicidad (medir niveles, riñón y tiroides).",
    contra: "Litio + tiazida, IECA, ARA II o AINE → ↑ niveles de litio."
  }
];

/* ---------- FÁRMACOS ---------- */
// fam: id de familia · ini/max: dosis · nota: dato clave
const FARMACOS = [
  // IECA
  { n: "Enalapril", fam: "ieca", ini: "5 mg/día (2.5 mg en ancianos o con diurético)", max: "40 mg/día", nota: "1–2 tomas. Dosis para memorizar: 5 → 40 mg." },
  { n: "Captopril", fam: "ieca", ini: "12.5–25 mg c/8–12 h", max: "150 mg/día", nota: "2–3 tomas; corta duración." },
  { n: "Lisinopril", fam: "ieca", ini: "10 mg/día (5 mg con diurético)", max: "40 mg/día", nota: "1 toma." },
  { n: "Ramipril", fam: "ieca", ini: "2.5 mg/día", max: "20 mg/día", nota: "1–2 tomas." },
  // ARA II
  { n: "Losartán", fam: "ara2", ini: "50 mg/día (25 mg si hay depleción de volumen)", max: "100 mg/día", nota: "Uricosúrico: ↓ ácido úrico → bueno en gota." },
  { n: "Valsartán", fam: "ara2", ini: "80 mg/día", max: "320 mg/día", nota: "1 toma." },
  { n: "Telmisartán", fam: "ara2", ini: "20–40 mg/día", max: "80 mg/día", nota: "1 toma." },
  { n: "Irbesartán", fam: "ara2", ini: "150 mg/día", max: "300 mg/día", nota: "1 toma." },
  { n: "Candesartán", fam: "ara2", ini: "8 mg/día", max: "32 mg/día", nota: "1 toma." },
  // ARNI
  { n: "Sacubitrilo/valsartán", fam: "arni", ini: "24/26–49/51 mg c/12 h", max: "97/103 mg c/12 h", nota: "IC con FE reducida. Esperar 36 h tras suspender un IECA." },
  // DHP
  { n: "Amlodipino", fam: "dhp", ini: "5 mg/día (2.5 mg en ancianos)", max: "10 mg/día", nota: "Edema maleolar típico. Dosis para memorizar: 5 → 10 mg." },
  { n: "Nifedipino", fam: "dhp", ini: "LP: 30 mg/día", max: "90 mg/día", nota: "Usar la de liberación prolongada; nunca la inmediata en HTA crónica. Seguro en embarazo (LP)." },
  { n: "Felodipino", fam: "dhp", ini: "2.5–5 mg/día", max: "10 mg/día", nota: "1 toma." },
  // no DHP
  { n: "Verapamilo", fam: "nodhp", ini: "LP: 120–180 mg/día", max: "360 mg/día", nota: "Estreñimiento. No combinar con BB; evitar en IC con FE reducida." },
  { n: "Diltiazem", fam: "nodhp", ini: "LP: 120–180 mg/día", max: "360 mg/día", nota: "Control de frecuencia en FA. Evitar en IC con FE reducida." },
  // Tiazidas
  { n: "Hidroclorotiazida", fam: "tiazida", ini: "12.5 mg/día", max: "25 mg/día (hasta 50 mg en algunas guías)", nota: "1 toma en la mañana." },
  { n: "Clortalidona", fam: "tiazida", ini: "12.5 mg/día", max: "25 mg/día", nota: "Preferida (con indapamida) a dosis bajas en DM2." },
  { n: "Indapamida", fam: "tiazida", ini: "1.25 mg/día (LP 1.5 mg)", max: "2.5 mg/día", nota: "«Tipo tiazida» aunque no termina en -tiazida." },
  // Asa
  { n: "Furosemida", fam: "asa", ini: "20 mg c/12 h", max: "80 mg/día (en HTA)", nota: "Reservar para ERC avanzada o edema." },
  // ARM
  { n: "Espironolactona", fam: "arm", ini: "12.5–25 mg/día", max: "50 mg/día en HTA resistente (100 mg en hiperaldosteronismo)", nota: "4.º fármaco en HTA resistente. Ginecomastia. Vigilar K⁺ y creatinina." },
  { n: "Eplerenona", fam: "arm", ini: "50 mg/día", max: "100 mg/día", nota: "Sin ginecomastia (más selectiva)." },
  // BB
  { n: "Metoprolol", fam: "bb", ini: "Tartrato 50 mg c/12 h (succinato LP 25–50 mg/día)", max: "200 mg/día", nota: "Cardioselectivo. Succinato: pilar en IC con FE reducida." },
  { n: "Bisoprolol", fam: "bb", ini: "2.5–5 mg/día (1.25 mg en IC)", max: "10 mg/día", nota: "Cardioselectivo; pilar en IC." },
  { n: "Carvedilol", fam: "bb", ini: "6.25 mg c/12 h (3.125 mg c/12 h en IC)", max: "25 mg c/12 h (50 mg c/12 h si >85 kg en IC)", nota: "También bloquea α1. Con alimentos." },
  { n: "Atenolol", fam: "bb", ini: "25–50 mg/día", max: "100 mg/día", nota: "Ajustar en ERC." },
  { n: "Propranolol", fam: "bb", ini: "40 mg c/12 h", max: "320 mg/día", nota: "No selectivo: evitar en asma. Útil en migraña, temblor esencial, hipertiroidismo." },
  { n: "Labetalol", fam: "bb", ini: "100 mg c/12 h", max: "2400 mg/día", nota: "Bloquea β y α1. De elección en embarazo; IV en emergencia hipertensiva." },
  // α1
  { n: "Doxazosina", fam: "alfa", ini: "1 mg/día (al acostarse)", max: "16 mg/día", nota: "Primera dosis puede causar hipotensión ortostática. HTA + HPB." },
  { n: "Prazosina", fam: "alfa", ini: "1 mg c/8–12 h", max: "20 mg/día", nota: "2–3 tomas." },
  { n: "Terazosina", fam: "alfa", ini: "—", max: "—", nota: "Bloqueador α1 (-azosina); útil con HPB." },
  // Central
  { n: "Metildopa", fam: "central", ini: "250 mg c/8–12 h", max: "3 g/día", nota: "Clásico del embarazo." },
  { n: "Clonidina", fam: "central", ini: "0.1 mg c/12 h", max: "0.6 mg/día", nota: "No suspender bruscamente: HTA de rebote." },
  // Vasodilatador
  { n: "Hidralazina", fam: "vasodil", ini: "10–25 mg c/6–8 h", max: "200 mg/día", nota: "Embarazo. Taquicardia refleja y lupus inducido." },

  // Biguanida
  { n: "Metformina", fam: "biguanida", ini: "500 mg 1–2 veces/día (o 850 mg/día) con alimentos", max: "2550 mg/día (LP: 2000 mg/día)", nota: "eTFG 30–45: máx. 1000 mg/día y no iniciar; <30: contraindicada. Vigilar B12." },
  // SU
  { n: "Glibenclamida", fam: "su", ini: "2.5–5 mg/día", max: "20 mg/día", nota: "Vida media larga: la que más hipoglucemia da. Evitar en ancianos y ERC." },
  { n: "Glimepirida", fam: "su", ini: "1–2 mg/día", max: "8 mg/día", nota: "1 toma con el desayuno." },
  { n: "Gliclazida", fam: "su", ini: "LM: 30 mg/día", max: "120 mg/día", nota: "1 toma con el desayuno. Opción de bajo costo." },
  { n: "Glipizida", fam: "su", ini: "5 mg/día", max: "40 mg/día", nota: "1–2 tomas antes de comer." },
  // Meglitinida
  { n: "Repaglinida", fam: "meglitinida", ini: "0.5–1 mg antes de cada comida", max: "16 mg/día (4 mg por comida)", nota: "Si se salta la comida, se salta la dosis." },
  { n: "Nateglinida", fam: "meglitinida", ini: "—", max: "—", nota: "Meglitinida (-glinida)." },
  // TZD
  { n: "Pioglitazona", fam: "tzd", ini: "15–30 mg/día", max: "45 mg/día", nota: "Contraindicada en IC. Útil en hígado graso." },
  // iDPP-4
  { n: "Sitagliptina", fam: "idpp4", ini: "100 mg/día", max: "100 mg/día (dosis fija)", nota: "eTFG 30–44: 50 mg; <30: 25 mg." },
  { n: "Linagliptina", fam: "idpp4", ini: "5 mg/día", max: "5 mg/día (dosis fija)", nota: "Sin ajuste renal. Buena en anciano frágil." },
  { n: "Vildagliptina", fam: "idpp4", ini: "50 mg 1–2 veces/día", max: "100 mg/día", nota: "Ajustar en ERC." },
  { n: "Saxagliptina", fam: "idpp4", ini: "5 mg/día", max: "5 mg/día", nota: "↑ hospitalización por IC: evitar en IC. eTFG <45: 2.5 mg." },
  // iSGLT2
  { n: "Empagliflozina", fam: "isglt2", ini: "10 mg/día", max: "25 mg/día", nota: "En IC/ERC se usa 10 mg." },
  { n: "Dapagliflozina", fam: "isglt2", ini: "10 mg/día", max: "10 mg/día", nota: "Misma dosis para IC y ERC." },
  { n: "Canagliflozina", fam: "isglt2", ini: "100 mg/día", max: "300 mg/día", nota: "300 mg sólo con eTFG ≥60." },
  // aGLP-1
  { n: "Semaglutida", fam: "aglp1", ini: "SC 0.25 mg/semana por 4 semanas", max: "2 mg/semana en DM2 (2.4 mg en obesidad)", nota: "Subir 0.5 → 1 → 2 mg cada ≥4 semanas; existe presentación oral." },
  { n: "Liraglutida", fam: "aglp1", ini: "SC 0.6 mg/día por 1 semana", max: "1.8 mg/día en DM2 (3 mg en obesidad)", nota: "Subir 0.6 mg cada semana." },
  { n: "Dulaglutida", fam: "aglp1", ini: "SC 0.75 mg/semana", max: "4.5 mg/semana", nota: "Subir cada ≥4 semanas." },
  { n: "Exenatida", fam: "aglp1", ini: "SC 5 µg c/12 h", max: "10 µg c/12 h", nota: "Antes de desayuno y cena." },
  { n: "Tirzepatida", fam: "aglp1", ini: "SC 2.5 mg/semana por 4 semanas", max: "15 mg/semana", nota: "Doble agonista GIP/GLP-1. Mayor pérdida de peso." },
  // Otros DM2
  { n: "Acarbosa", fam: "aglucosidasa", ini: "25 mg c/8 h con el primer bocado", max: "100 mg c/8 h (50 mg c/8 h si ≤60 kg)", nota: "Hipoglucemia (por otro fármaco) se trata con glucosa pura." },
  // Insulinas
  { n: "Insulina glargina", fam: "insulina", ini: "10 U/día o 0.1–0.2 U/kg/día", max: "Sin dosis máxima fija", nota: "Basal larga, sin pico (≈20–24 h). Subir 2 U cada 3 días." },
  { n: "Insulina degludec", fam: "insulina", ini: "10 U/día o 0.1–0.2 U/kg/día", max: "Sin dosis máxima fija", nota: "Basal ultralarga (≈42 h)." },
  { n: "Insulina NPH", fam: "insulina", ini: "10 U/día o 0.1–0.2 U/kg/día", max: "Sin dosis máxima fija", nota: "Intermedia: inicio 1–2 h, pico 4–10 h, dura 10–16 h." },
  { n: "Insulina lispro", fam: "insulina", ini: "4 U o 10 % de la basal antes de la comida principal", max: "Según glucosa", nota: "Ultrarrápida: inicio 10–15 min, pico 1–2 h, dura 3–5 h." },
  { n: "Insulina aspart", fam: "insulina", ini: "4 U o 10 % de la basal antes de la comida principal", max: "Según glucosa", nota: "Ultrarrápida (análogo prandial)." },
  { n: "Insulina regular", fam: "insulina", ini: "4 U o 10 % de la basal antes de la comida principal", max: "Según glucosa", nota: "Rápida humana: inicio 30–60 min, pico 2–4 h, dura 5–8 h." },

  // ISRS
  { n: "Sertralina", fam: "isrs", ini: "50 mg/día (25 mg si hay ansiedad)", max: "200 mg/día", nota: "De elección en cardiopatía, embarazo/lactancia y polifarmacia." },
  { n: "Escitalopram", fam: "isrs", ini: "10 mg/día (5 mg en ancianos)", max: "20 mg/día (10 mg en >65 años)", nota: "Primera línea; pocas interacciones." },
  { n: "Citalopram", fam: "isrs", ini: "20 mg/día", max: "40 mg/día (20 mg en >60 años)", nota: "Límite por prolongación del QT." },
  { n: "Fluoxetina", fam: "isrs", ini: "20 mg/día (en la mañana)", max: "80 mg/día", nota: "Vida media larga: mal apego, adolescentes. Inhibe CYP2D6." },
  { n: "Paroxetina", fam: "isrs", ini: "20 mg/día", max: "50 mg/día (40 mg en ancianos)", nota: "Más discontinuación y riesgo fetal (malformaciones cardiacas). Retirar muy lento." },
  { n: "Fluvoxamina", fam: "isrs", ini: "50 mg/día (en la noche)", max: "300 mg/día", nota: "Muchas interacciones (CYP)." },
  // IRSN
  { n: "Venlafaxina", fam: "irsn", ini: "LP: 37.5–75 mg/día", max: "225 mg/día ambulatorio", nota: "↑ PA dependiente de dosis. Discontinuación intensa." },
  { n: "Desvenlafaxina", fam: "irsn", ini: "50 mg/día", max: "50 mg/día habitual", nota: "Dosis mayores no dan más beneficio." },
  { n: "Duloxetina", fam: "irsn", ini: "30 mg/día por 1 semana → 60 mg", max: "120 mg/día (60 mg suele bastar)", nota: "Trampa: termina en -oxetina pero es IRSN. Dolor neuropático diabético, fibromialgia." },
  // Atípicos
  { n: "Bupropión", fam: "irnd", ini: "XL 150 mg/día (en la mañana)", max: "450 mg/día (SR 400 mg/día)", nota: "Sin disfunción sexual; cesación tabáquica. ↓ umbral convulsivo." },
  { n: "Mirtazapina", fam: "nassa", ini: "15 mg en la noche", max: "45 mg/día", nota: "Seda y ↑ apetito. Paradoja: a dosis bajas seda más." },
  { n: "Trazodona", fam: "sari", ini: "150 mg/día divididos (hipnótico: 25–50 mg)", max: "400 mg/día ambulatorio", nota: "Hipnótico a dosis bajas. Priapismo (raro)." },
  { n: "Vortioxetina", fam: "multimodal", ini: "10 mg/día (5 mg si mala tolerancia)", max: "20 mg/día", nota: "1 toma." },
  // ATC
  { n: "Amitriptilina", fam: "atc", ini: "25–50 mg en la noche", max: "150 mg/día ambulatorio", nota: "Dolor neuropático/migraña: 10–25 mg. Muy anticolinérgica." },
  { n: "Nortriptilina", fam: "atc", ini: "25 mg/día", max: "150 mg/día", nota: "Menos anticolinérgica que amitriptilina." },
  { n: "Imipramina", fam: "atc", ini: "25–75 mg/día", max: "200 mg/día ambulatorio", nota: "Tricíclico clásico (-pramina)." },
  { n: "Clomipramina", fam: "atc", ini: "25 mg/día", max: "250 mg/día", nota: "Útil en TOC." },
  // IMAO
  { n: "Fenelzina", fam: "imao", ini: "15 mg c/8 h", max: "90 mg/día", nota: "Dieta sin tiramina." },
  { n: "Tranilcipromina", fam: "imao", ini: "10 mg c/12 h", max: "60 mg/día", nota: "Dieta sin tiramina." },
  { n: "Selegilina", fam: "imao", ini: "—", max: "—", nota: "IMAO." },
  // Potenciadores
  { n: "Aripiprazol", fam: "potenciador", ini: "2–5 mg/día", max: "15 mg/día", nota: "Antipsicótico atípico agregado al antidepresivo." },
  { n: "Quetiapina", fam: "potenciador", ini: "—", max: "—", nota: "Antipsicótico atípico: ↑ peso, glucosa y lípidos." },
  { n: "Litio", fam: "potenciador", ini: "Según niveles séricos", max: "Nivel objetivo ≈0.6–1.0 mEq/L", nota: "Medir litio, función renal y tiroidea. Tiazida/IECA/ARA II/AINE ↑ niveles." }
];

/* ---------- ELEGIR SEGÚN EL PACIENTE ----------
   mejor: respuesta correcta para «¿qué es mejor dar?»
   noMejor: opciones incorrectas (seguras) para esa pregunta
   evitar: respuesta correcta para «¿qué evitas?» (si existe)
   noEvitar: opciones que NO hay que evitar (distractores para «¿qué evitas?») */
const ELEGIR = [
  // HTA
  { enf: "hta", cond: "diabetes con albuminuria (ERC)", mejor: "IECA o ARA II", noMejor: ["Clortalidona sola", "Amlodipino solo", "Doxazosina", "IECA + ARA II juntos"], evitar: "Combinar IECA + ARA II", noEvitar: ["Losartán", "Enalapril", "Amlodipino"], por: "IECA/ARA II bajan la presión intraglomerular → ↓ albuminuria y progresión renal. Combinarlos da más hiperK y daño renal sin beneficio." },
  { enf: "hta", cond: "insuficiencia cardiaca con FE reducida", mejor: "IECA/ARA II o sacubitrilo-valsartán + BB + ARM + iSGLT2", noMejor: ["Verapamilo", "Diltiazem", "Doxazosina", "Pioglitazona"], evitar: "Verapamilo o diltiazem", noEvitar: ["Carvedilol", "Espironolactona", "Sacubitrilo/valsartán"], por: "Esos cuatro pilares reducen mortalidad; los no DHP deprimen la contractilidad." },
  { enf: "hta", cond: "infarto previo o angina", mejor: "Betabloqueador + IECA", noMejor: ["Nifedipino de acción corta", "Hidralazina sola", "Doxazosina sola", "Clonidina"], evitar: "Nifedipino de acción corta", noEvitar: ["Metoprolol", "Enalapril", "Bisoprolol"], por: "BB ↓ consumo de O₂ y arritmias; IECA evita el remodelado. El nifedipino corto da taquicardia refleja." },
  { enf: "hta", cond: "embarazo (22 semanas)", mejor: "Labetalol, nifedipino LP o metildopa", noMejor: ["Enalapril", "Losartán", "Espironolactona", "Valsartán"], evitar: "IECA o ARA II", noEvitar: ["Labetalol", "Metildopa", "Nifedipino LP"], por: "IECA/ARA II causan daño renal fetal (oligohidramnios) y malformaciones." },
  { enf: "hta", cond: "gota o hiperuricemia", mejor: "Losartán o calcioantagonista", noMejor: ["Hidroclorotiazida", "Clortalidona", "Furosemida", "Indapamida"], evitar: "Tiazidas y diuréticos de asa", noEvitar: ["Losartán", "Amlodipino", "Telmisartán"], por: "Las tiazidas ↑ ácido úrico; losartán es uricosúrico." },
  { enf: "hta", cond: "asma", mejor: "IECA/ARA II o calcioantagonista", noMejor: ["Propranolol", "Carvedilol", "Labetalol", "Nadolol"], evitar: "Betabloqueador no selectivo (propranolol)", noEvitar: ["Amlodipino", "Losartán", "Enalapril"], por: "Bloquear β2 produce broncoespasmo." },
  { enf: "hta", cond: "hiperplasia prostática benigna (ya con A + C)", mejor: "Añadir doxazosina (α-bloqueador)", noMejor: ["Añadir verapamilo", "Añadir propranolol", "Doxazosina como monoterapia", "Añadir clonidina"], evitar: "α-bloqueador como monoterapia", noEvitar: ["Añadir doxazosina a su esquema", "Amlodipino", "Losartán"], por: "El α1 relaja el músculo liso prostático, pero no es 1.ª línea para la PA." },
  { enf: "hta", cond: "tos seca persistente con enalapril", mejor: "Cambiar a ARA II (losartán)", noMejor: ["Cambiar a captopril", "Cambiar a lisinopril", "Agregar antitusivo y seguir igual", "Agregar ramipril"], evitar: "Cambiar a otro IECA", noEvitar: ["Cambiar a losartán", "Cambiar a valsartán", "Cambiar a amlodipino"], por: "La tos es efecto de clase (bradicinina); los ARA II no la elevan." },
  { enf: "hta", cond: "hiperpotasemia (K⁺ 5.9)", mejor: "Calcioantagonista o tiazida", noMejor: ["Espironolactona", "Enalapril", "Losartán", "Eplerenona"], evitar: "IECA, ARA II o ARM", noEvitar: ["Amlodipino", "Clortalidona", "Hidroclorotiazida"], por: "IECA, ARA II y ARM retienen K⁺." },
  { enf: "hta", cond: "estenosis bilateral de arteria renal", mejor: "Calcioantagonista o tiazida", noMejor: ["Enalapril", "Losartán", "Captopril", "Valsartán"], evitar: "IECA o ARA II", noEvitar: ["Amlodipino", "Clortalidona", "Nifedipino LP"], por: "En estenosis bilateral, bloquear el SRAA provoca falla renal aguda." },
  { enf: "hta", cond: "bradicardia (FC 48) o bloqueo AV", mejor: "DHP, IECA/ARA II o tiazida", noMejor: ["Metoprolol", "Verapamilo", "Diltiazem", "Bisoprolol"], evitar: "Betabloqueador, verapamilo o diltiazem", noEvitar: ["Amlodipino", "Losartán", "Clortalidona"], por: "BB, verapamilo y diltiazem frenan el nodo AV." },
  { enf: "hta", cond: "fibrilación auricular con respuesta ventricular rápida", mejor: "Betabloqueador o calcioantagonista no DHP", noMejor: ["Amlodipino", "Hidralazina", "Doxazosina", "Clortalidona"], por: "Controlan la frecuencia ventricular." },
  { enf: "hta", cond: "osteoporosis", mejor: "Tiazida", noMejor: ["Furosemida", "Doxazosina", "Clonidina", "Hidralazina"], por: "Las tiazidas retienen calcio." },
  { enf: "hta", cond: "migraña o temblor esencial", mejor: "Propranolol", noMejor: ["Amlodipino", "Hidralazina", "Doxazosina", "Clortalidona"], por: "Aprovecha un beneficio extra del BB." },
  { enf: "hta", cond: "afrodescendiente sin ERC ni IC", mejor: "Tiazida o calcioantagonista", noMejor: ["IECA en monoterapia", "Betabloqueador en monoterapia", "Doxazosina sola", "Clonidina sola"], evitar: "IECA en monoterapia", noEvitar: ["Clortalidona", "Amlodipino", "Hidroclorotiazida"], por: "Responden menos al bloqueo del SRAA solo (AHA/ACC)." },
  { enf: "hta", cond: "HTA resistente (A + C + D a dosis óptima)", mejor: "Añadir espironolactona", noMejor: ["Añadir losartán al IECA", "Cambiar a captopril", "Añadir nifedipino de acción corta", "Suspender el diurético"], por: "El hiperaldosteronismo oculto es frecuente; buscar causas secundarias." },
  // DM2
  { enf: "dm2", cond: "antecedente de infarto (ECV aterosclerótica)", mejor: "aGLP-1 con beneficio CV o iSGLT2", noMejor: ["Glibenclamida", "Acarbosa", "Repaglinida", "Saxagliptina"], por: "Reducen eventos cardiovasculares mayores, independientemente de la A1c." },
  { enf: "dm2", cond: "insuficiencia cardiaca", mejor: "iSGLT2 (empagliflozina, dapagliflozina)", noMejor: ["Pioglitazona", "Saxagliptina", "Glibenclamida", "Acarbosa"], evitar: "Pioglitazona o saxagliptina", noEvitar: ["Empagliflozina", "Dapagliflozina", "Metformina"], por: "iSGLT2 ↓ hospitalizaciones; la TZD retiene líquido y saxagliptina ↑ hospitalización por IC." },
  { enf: "dm2", cond: "ERC con albuminuria (eTFG 50)", mejor: "iSGLT2 + IECA/ARA II", noMejor: ["Glibenclamida", "Pioglitazona", "Acarbosa", "Repaglinida"], evitar: "Glibenclamida", noEvitar: ["Dapagliflozina", "Linagliptina", "Losartán"], por: "iSGLT2 protege el riñón; glibenclamida se acumula → hipoglucemia." },
  { enf: "dm2", cond: "eTFG de 25 mL/min", mejor: "aGLP-1", noMejor: ["Metformina", "Glibenclamida", "Canagliflozina 300 mg", "Acarbosa"], evitar: "Metformina", noEvitar: ["Semaglutida", "Linagliptina", "Insulina basal"], por: "Metformina contraindicada con eTFG <30; aGLP-1 preferidos con eTFG <30 (ADA 2026)." },
  { enf: "dm2", cond: "obesidad (IMC 36) y meta de bajar peso", mejor: "Semaglutida o tirzepatida", noMejor: ["Glibenclamida", "Insulina NPH", "Pioglitazona", "Glimepirida"], evitar: "Sulfonilurea, insulina o pioglitazona", noEvitar: ["Semaglutida", "Tirzepatida", "Empagliflozina"], por: "Mayor pérdida de peso entre antidiabéticos; SU, insulina y TZD suben de peso." },
  { enf: "dm2", cond: "anciano frágil con caídas por hipoglucemia", mejor: "iDPP-4 (linagliptina) y metas laxas", noMejor: ["Glibenclamida", "Insulina en esquema intensivo", "Glimepirida a dosis máxima", "Repaglinida"], evitar: "Glibenclamida", noEvitar: ["Linagliptina", "Sitagliptina", "Metformina"], por: "La hipoglucemia causa caídas, arritmias y deterioro cognitivo." },
  { enf: "dm2", cond: "A1c 11.5 %, glucosa 380 y pérdida de peso con cetosis", mejor: "Insulina", noMejor: ["Sitagliptina", "Acarbosa", "Pioglitazona", "Sólo dieta y ejercicio"], por: "Hay déficit de insulina y glucotoxicidad." },
  { enf: "dm2", cond: "hígado graso (MASLD)", mejor: "Pioglitazona o aGLP-1", noMejor: ["Glibenclamida", "Acarbosa", "Repaglinida", "Insulina NPH"], por: "Ambas mejoran la grasa hepática." },
  { enf: "dm2", cond: "antecedente de cáncer medular de tiroides", mejor: "Otra familia (p. ej., iSGLT2 o iDPP-4)", noMejor: ["Semaglutida", "Liraglutida", "Tirzepatida", "Dulaglutida"], evitar: "aGLP-1 o tirzepatida", noEvitar: ["Empagliflozina", "Linagliptina", "Metformina"], por: "Contraindicación por tumores de células C en modelos animales." },
  { enf: "dm2", cond: "candidiasis genital recurrente", mejor: "Otra familia distinta de iSGLT2", noMejor: ["Empagliflozina", "Dapagliflozina", "Canagliflozina", "Subir dosis de empagliflozina"], evitar: "iSGLT2", noEvitar: ["Metformina", "Linagliptina", "Semaglutida"], por: "La glucosuria favorece las infecciones micóticas." },
  { enf: "dm2", cond: "cirugía programada la próxima semana", mejor: "Suspender el iSGLT2 días antes", noMejor: ["Suspender la linagliptina", "Subir la dosis de dapagliflozina", "Cambiar a glibenclamida", "Suspender la insulina basal por completo"], por: "Riesgo de cetoacidosis euglucémica." },
  { enf: "dm2", cond: "tomografía con contraste yodado y eTFG baja", mejor: "Suspender metformina temporalmente", noMejor: ["Suspender linagliptina", "Subir metformina", "Agregar glibenclamida", "Suspender la insulina"], por: "Si el contraste daña el riñón, la metformina se acumula → acidosis láctica." },
  { enf: "dm2", cond: "neuropatía tras años de metformina", mejor: "Medir vitamina B12", noMejor: ["Medir ácido úrico", "Suspender insulina", "Medir TSH sólo", "Agregar glibenclamida"], por: "La metformina reduce la absorción de B12; el déficit imita o empeora la neuropatía." },
  { enf: "dm2", cond: "embarazo", mejor: "Insulina", noMejor: ["Semaglutida", "Glibenclamida", "Empagliflozina", "Sitagliptina"], por: "Mejor evidencia de seguridad fetal." },
  { enf: "dm2", cond: "recursos limitados", mejor: "Metformina + sulfonilurea (gliclazida) o insulina humana", noMejor: ["Tirzepatida", "Semaglutida", "Empagliflozina + dulaglutida", "Liraglutida"], por: "Eficaces y de bajo costo." },
  // Depresión
  { enf: "dep", cond: "primer episodio de depresión moderada sin particularidades", mejor: "ISRS: sertralina o escitalopram", noMejor: ["Amitriptilina", "Fenelzina", "Litio", "Tranilcipromina"], por: "Buena eficacia, tolerancia y seguridad en sobredosis." },
  { enf: "dep", cond: "infarto reciente", mejor: "Sertralina", noMejor: ["Amitriptilina", "Imipramina", "Citalopram 60 mg", "Nortriptilina"], evitar: "Tricíclicos", noEvitar: ["Sertralina", "Escitalopram", "Mirtazapina"], por: "Sertralina tiene evidencia de seguridad post-IAM; los ATC son arritmogénicos." },
  { enf: "dep", cond: "disfunción sexual por ISRS", mejor: "Bupropión", noMejor: ["Paroxetina", "Fluoxetina", "Citalopram", "Venlafaxina"], evitar: "Paroxetina", noEvitar: ["Bupropión", "Mirtazapina", "Vortioxetina"], por: "Bupropión no actúa sobre serotonina." },
  { enf: "dep", cond: "tabaquismo intenso", mejor: "Bupropión", noMejor: ["Paroxetina", "Amitriptilina", "Fenelzina", "Trazodona"], por: "Doble beneficio: ánimo y cesación tabáquica." },
  { enf: "dep", cond: "insomnio, poco apetito y pérdida de peso (anciano)", mejor: "Mirtazapina", noMejor: ["Bupropión", "Fluoxetina", "Venlafaxina", "Amitriptilina"], evitar: "Bupropión", noEvitar: ["Mirtazapina", "Sertralina", "Escitalopram"], por: "Mirtazapina seda y ↑ apetito; bupropión empeora el insomnio." },
  { enf: "dep", cond: "dolor neuropático diabético", mejor: "Duloxetina", noMejor: ["Escitalopram", "Bupropión", "Fenelzina", "Trazodona"], por: "La NA modula las vías descendentes del dolor (alternativa: amitriptilina)." },
  { enf: "dep", cond: "epilepsia", mejor: "ISRS", noMejor: ["Bupropión", "Amitriptilina a dosis altas", "Fenelzina", "Clomipramina"], evitar: "Bupropión", noEvitar: ["Sertralina", "Escitalopram", "Mirtazapina"], por: "Bupropión baja el umbral convulsivo." },
  { enf: "dep", cond: "bulimia o anorexia", mejor: "ISRS", noMejor: ["Bupropión", "Fenelzina", "Amitriptilina", "Tranilcipromina"], evitar: "Bupropión", noEvitar: ["Sertralina", "Fluoxetina", "Escitalopram"], por: "Bupropión baja el umbral convulsivo (contraindicado en TCA)." },
  { enf: "dep", cond: "embarazo o lactancia", mejor: "Sertralina", noMejor: ["Paroxetina", "Fenelzina", "Litio", "Amitriptilina"], evitar: "Paroxetina", noEvitar: ["Sertralina", "Escitalopram", "Fluoxetina"], por: "Paroxetina se asocia a malformaciones cardiacas." },
  { enf: "dep", cond: "edad de 17 años", mejor: "Fluoxetina + psicoterapia con vigilancia estrecha", noMejor: ["Amitriptilina", "Fenelzina", "Paroxetina", "Litio sin antidepresivo"], por: "Advertencia por posible ↑ de ideación suicida al inicio en <25 años." },
  { enf: "dep", cond: "riesgo suicida", mejor: "ISRS en cantidades limitadas y referir", noMejor: ["Amitriptilina", "Fenelzina", "Imipramina", "Tranilcipromina"], evitar: "Tricíclicos e IMAO", noEvitar: ["Sertralina", "Escitalopram", "Fluoxetina"], por: "Los ATC son letales en sobredosis." },
  { enf: "dep", cond: "polifarmacia", mejor: "Sertralina o escitalopram", noMejor: ["Fluoxetina", "Paroxetina", "Fluvoxamina", "Fenelzina"], evitar: "Fluoxetina, paroxetina o fluvoxamina", noEvitar: ["Sertralina", "Escitalopram", "Mirtazapina"], por: "Fluoxetina, paroxetina y fluvoxamina inhiben fuertemente enzimas CYP." },
  { enf: "dep", cond: "HTA no controlada", mejor: "ISRS o mirtazapina", noMejor: ["Venlafaxina", "Fenelzina", "Tranilcipromina", "Venlafaxina a dosis alta"], evitar: "Venlafaxina", noEvitar: ["Sertralina", "Escitalopram", "Mirtazapina"], por: "Venlafaxina puede subir la PA." },
  { enf: "dep", cond: "mal apego (olvida dosis)", mejor: "Fluoxetina", noMejor: ["Paroxetina", "Venlafaxina", "Fenelzina", "Trazodona"], evitar: "Paroxetina o venlafaxina", noEvitar: ["Fluoxetina", "Sertralina", "Escitalopram"], por: "Vida media larga = menos síntomas de discontinuación." },
  { enf: "dep", cond: "antecedente de episodio maniaco", mejor: "Estabilizador del ánimo y referir", noMejor: ["ISRS en monoterapia", "IRSN en monoterapia", "Tricíclico en monoterapia", "Bupropión en monoterapia"], evitar: "Antidepresivo en monoterapia", noEvitar: ["Estabilizador del ánimo", "Referir a psiquiatría", "Psicoterapia"], por: "Un antidepresivo solo puede provocar viraje a manía." },
  { enf: "dep", cond: "depresión con alucinaciones (síntomas psicóticos)", mejor: "Antidepresivo + antipsicótico o TEC", noMejor: ["ISRS solo", "Sólo psicoterapia", "Bupropión solo", "Trazodona sola"], por: "La depresión psicótica responde mal a monoterapia." }
];

/* ---------- EFECTOS ADVERSOS CARACTERÍSTICOS (para casos generados) ----------
   fams: familias que pueden causarlo (no se usarán como distractores) */
const ADVERSOS = [
  { ae: "tos seca persistente sin fiebre", fams: ["ieca"], exp: "Los IECA impiden degradar la bradicinina → se acumula en la vía aérea → tos." },
  { ae: "edema de labios y lengua (angioedema)", fams: ["ieca", "arni"], exp: "Angioedema por bradicinina: típico de IECA. Contraindica volver a usarlos." },
  { ae: "edema maleolar que no mejora con diurético", fams: ["dhp", "tzd", "vasodil"], exp: "Los DHP dilatan la arteriola (no la vénula) → ↑ presión capilar → edema que no responde a diurético." },
  { ae: "crisis de gota (hiperuricemia)", fams: ["tiazida", "asa"], exp: "Las tiazidas reducen la excreción de ácido úrico." },
  { ae: "ginecomastia", fams: ["arm"], exp: "La espironolactona tiene efecto antiandrogénico (la eplerenona no)." },
  { ae: "broncoespasmo (sibilancias); tiene asma", fams: ["bb"], exp: "Bloquear β2 produce broncoconstricción (sobre todo propranolol, no selectivo)." },
  { ae: "estreñimiento y FC de 50 lpm", fams: ["nodhp", "bb", "central"], exp: "El verapamilo causa estreñimiento y bradicardia." },
  { ae: "desmayo al levantarse tras la primera dosis", fams: ["alfa", "sari", "atc", "central", "imao", "vasodil"], exp: "Hipotensión ortostática de primera dosis: típica de α1 (-azosina)." },
  { ae: "PA de 210/120 al suspender bruscamente su antihipertensivo", fams: ["central", "bb"], exp: "La clonidina produce HTA de rebote al suspenderse bruscamente." },
  { ae: "artralgias, eritema malar y ANA positivos", fams: ["vasodil"], exp: "La hidralazina puede causar lupus inducido por fármacos." },
  { ae: "diarrea y, años después, déficit de vitamina B12", fams: ["biguanida"], exp: "La metformina causa molestias GI y reduce la absorción de B12." },
  { ae: "candidiasis vulvovaginal recurrente", fams: ["isglt2"], exp: "La glucosuria de los iSGLT2 favorece infecciones genitales micóticas." },
  { ae: "cetoacidosis con glucosa de 160 mg/dL tras una cirugía", fams: ["isglt2"], exp: "Cetoacidosis euglucémica por iSGLT2 (suspender antes de cirugía o ayuno)." },
  { ae: "náusea, vómito y saciedad temprana", fams: ["aglp1", "biguanida", "isrs", "multimodal"], exp: "Los aGLP-1 retrasan el vaciamiento gástrico; por eso se titulan lento." },
  { ae: "hipoglucemia nocturna y caídas (anciano)", fams: ["su", "insulina", "meglitinida"], exp: "Las sulfonilureas secretan insulina sin depender de la glucosa; glibenclamida dura mucho." },
  { ae: "edema, aumento de peso e insuficiencia cardiaca descompensada", fams: ["tzd", "dhp"], exp: "La pioglitazona retiene sodio y agua → precipita IC." },
  { ae: "flatulencia intensa tras las comidas", fams: ["aglucosidasa", "biguanida"], exp: "La acarbosa deja carbohidratos sin absorber que fermentan en el colon." },
  { ae: "disfunción sexual (anorgasmia)", fams: ["isrs", "irsn", "atc", "imao", "multimodal", "bb", "tiazida", "central", "arm"], exp: "El exceso de serotonina causa disfunción sexual (ISRS)." },
  { ae: "aumento de la PA dependiente de dosis", fams: ["irsn", "imao", "irnd"], exp: "La venlafaxina ↑ PA por su efecto noradrenérgico a dosis altas." },
  { ae: "crisis convulsiva sin antecedente de epilepsia", fams: ["irnd", "atc"], exp: "El bupropión reduce el umbral convulsivo (dosis dependiente)." },
  { ae: "aumento marcado de apetito y peso con somnolencia", fams: ["nassa", "atc", "potenciador"], exp: "La mirtazapina bloquea H1 → sedación y ↑ apetito." },
  { ae: "priapismo", fams: ["sari"], exp: "La trazodona puede causar priapismo (raro) por bloqueo α1." },
  { ae: "boca seca, retención urinaria y confusión (anciano)", fams: ["atc"], exp: "Los ATC bloquean receptores muscarínicos (efectos anticolinérgicos)." },
  { ae: "QRS ancho y arritmia tras ingerir varias tabletas", fams: ["atc"], exp: "Los ATC bloquean canales de Na⁺ cardiacos: letales en sobredosis." },
  { ae: "cefalea intensa y PA 220/130 tras comer queso madurado", fams: ["imao"], exp: "El IMAO no degrada la tiramina → libera noradrenalina → crisis hipertensiva." },
  { ae: "hiponatremia (Na⁺ 126) en un anciano", fams: ["isrs", "tiazida", "irsn", "multimodal", "asa", "arm", "atc", "nassa", "sari"], exp: "ISRS → SIADH; se suma a tiazidas en ancianos." },
  { ae: "QT prolongado en el ECG con dosis de 60 mg", fams: ["isrs", "atc", "irsn", "sari", "multimodal"], exp: "El citalopram alarga el QT (máximo 40 mg; 20 mg en >60 años)." }
];
// fármaco «representativo» para cada adverso (el que se menciona en la explicación)
const ADVERSO_FARMACO = {
  "tos seca persistente sin fiebre": ["Enalapril", "Captopril", "Lisinopril", "Ramipril"],
  "edema de labios y lengua (angioedema)": ["Enalapril", "Lisinopril", "Captopril"],
  "edema maleolar que no mejora con diurético": ["Amlodipino", "Nifedipino", "Felodipino"],
  "crisis de gota (hiperuricemia)": ["Hidroclorotiazida", "Clortalidona"],
  "ginecomastia": ["Espironolactona"],
  "broncoespasmo (sibilancias); tiene asma": ["Propranolol"],
  "estreñimiento y FC de 50 lpm": ["Verapamilo"],
  "desmayo al levantarse tras la primera dosis": ["Doxazosina", "Prazosina"],
  "PA de 210/120 al suspender bruscamente su antihipertensivo": ["Clonidina"],
  "artralgias, eritema malar y ANA positivos": ["Hidralazina"],
  "diarrea y, años después, déficit de vitamina B12": ["Metformina"],
  "candidiasis vulvovaginal recurrente": ["Empagliflozina", "Dapagliflozina", "Canagliflozina"],
  "cetoacidosis con glucosa de 160 mg/dL tras una cirugía": ["Empagliflozina", "Dapagliflozina"],
  "náusea, vómito y saciedad temprana": ["Semaglutida", "Liraglutida", "Dulaglutida"],
  "hipoglucemia nocturna y caídas (anciano)": ["Glibenclamida"],
  "edema, aumento de peso e insuficiencia cardiaca descompensada": ["Pioglitazona"],
  "flatulencia intensa tras las comidas": ["Acarbosa"],
  "disfunción sexual (anorgasmia)": ["Sertralina", "Paroxetina", "Escitalopram"],
  "aumento de la PA dependiente de dosis": ["Venlafaxina"],
  "crisis convulsiva sin antecedente de epilepsia": ["Bupropión"],
  "aumento marcado de apetito y peso con somnolencia": ["Mirtazapina"],
  "priapismo": ["Trazodona"],
  "boca seca, retención urinaria y confusión (anciano)": ["Amitriptilina"],
  "QRS ancho y arritmia tras ingerir varias tabletas": ["Amitriptilina", "Imipramina"],
  "cefalea intensa y PA 220/130 tras comer queso madurado": ["Fenelzina", "Tranilcipromina"],
  "hiponatremia (Na⁺ 126) en un anciano": ["Sertralina", "Escitalopram"],
  "QT prolongado en el ECG con dosis de 60 mg": ["Citalopram"]
};

/* ---------- CASOS FIJOS (minicasos y preguntas del documento + interacciones) ---------- */
const CASOS_FIJOS = [
  { enf: "hta", t: "Mujer de 58 años con DM2, PA 146/92 y albuminuria de 250 mg/g. ¿Qué familia antihipertensiva es de elección?", ops: ["IECA o ARA II", "Diurético tiazídico solo", "Betabloqueador", "Bloqueador α1"], ok: 0, exp: "Diabetes con albuminuria: IECA/ARA II bajan la presión intraglomerular y frenan la progresión renal. Tiene alto riesgo, así que se inicia de inmediato y, según la GPC, con terapia doble (IECA/ARA II + amlodipino). Se puede agregar iSGLT2. Nunca IECA + ARA II." },
  { enf: "hta", t: "Hombre de 62 años con HTA tratado con enalapril; desde hace 3 semanas tiene tos seca persistente sin fiebre. ¿Qué haces?", ops: ["Cambiar a captopril", "Cambiar a losartán", "Agregar dextrometorfano", "Agregar amlodipino y seguir con enalapril"], ok: 1, exp: "La tos es por bradicinina, efecto de toda la familia IECA; cambiar a otro IECA no la resuelve. Los ARA II no elevan la bradicinina." },
  { enf: "hta", t: "Mujer de 30 años, embarazo de 22 semanas, PA 150/100 en dos tomas, sin datos de alarma. Toma losartán desde antes del embarazo. ¿Qué cambias?", ops: ["Nada, losartán es seguro", "Cambiar a enalapril", "Suspender losartán y dar labetalol o nifedipino LP", "Agregar espironolactona"], ok: 2, exp: "IECA y ARA II están contraindicados en el embarazo (toxicidad renal fetal, oligohidramnios, malformaciones). Opciones: labetalol, nifedipino LP o metildopa." },
  { enf: "dm2", t: "Hombre de 67 años con DM2 (A1c 8.1 %), infarto hace un año e IC con FE de 35 %. Toma metformina. ¿Qué agregas?", ops: ["Pioglitazona", "Saxagliptina", "Empagliflozina", "Glibenclamida"], ok: 2, exp: "iSGLT2: reduce hospitalización por IC y muerte CV y además baja la glucosa. Evitar pioglitazona (retiene líquido) y saxagliptina. Un aGLP-1 también podría sumarse." },
  { enf: "dm2", t: "Mujer de 45 años con DM2, IMC 36 kg/m², A1c 7.9 % con metformina, sin ECV. Su prioridad es bajar de peso. ¿Qué agregas?", ops: ["Glimepirida", "Insulina NPH", "Pioglitazona", "Semaglutida o tirzepatida"], ok: 3, exp: "aGLP-1 (semaglutida) o tirzepatida logran la mayor reducción de peso sin hipoglucemia por sí mismos. SU, insulina y pioglitazona suben de peso." },
  { enf: "dm2", t: "Hombre de 82 años, frágil, vive solo, DM2 con A1c 7.6 % tratado con glibenclamida; dos caídas por «mareos» en la mañana. ¿Qué cambias?", ops: ["Subir la glibenclamida", "Suspender glibenclamida y cambiar a linagliptina con meta de A1c ≈<8 %", "Agregar insulina rápida", "Cambiar a glimepirida a dosis máxima"], ok: 1, exp: "Hipoglucemia por glibenclamida (vida media larga, peor en ancianos y con función renal baja). Relajar meta y usar opción sin hipoglucemia: linagliptina (sin ajuste renal)." },
  { enf: "dm2", t: "Hombre de 50 años con debut de DM2: glucosa 380 mg/dL, A1c 11.5 %, bajó 8 kg en dos meses, cetonas urinarias leves. ¿Con qué inicias?", ops: ["Metformina sola", "Sitagliptina", "Insulina", "Acarbosa"], ok: 2, exp: "A1c >10 %, glucosa ≥300, pérdida de peso y cetosis = déficit de insulina y glucotoxicidad → insulina." },
  { enf: "dep", t: "Mujer de 40 años con depresión moderada, buena respuesta a sertralina, pero refiere disfunción sexual y piensa suspenderla. ¿Qué opción tienes?", ops: ["Cambiar a paroxetina", "Cambiar a bupropión o añadirlo", "Suspender bruscamente", "Cambiar a citalopram"], ok: 1, exp: "Bupropión no actúa sobre serotonina → no causa disfunción sexual. Alternativa: mirtazapina. No suspender bruscamente (síndrome de discontinuación)." },
  { enf: "mix", t: "Hombre de 74 años con depresión, insomnio, pérdida de 6 kg por falta de apetito y HTA controlada con hidroclorotiazida. ¿Qué antidepresivo eliges y qué vigilas?", ops: ["Bupropión; vigilar glucosa", "Mirtazapina; vigilar sodio", "Amitriptilina; vigilar potasio", "Venlafaxina; vigilar calcio"], ok: 1, exp: "Mirtazapina seda y ↑ apetito. Vigilar sodio: anciano con tiazida (si fuera ISRS, el riesgo de hiponatremia se sumaría). Evitar ATC por efectos anticolinérgicos y caídas." },
  { enf: "mix", t: "Hombre de 55 años con DM2, depresión y dolor urente en ambos pies por neuropatía diabética. ¿Qué antidepresivo cubre mejor sus problemas?", ops: ["Duloxetina", "Escitalopram", "Fenelzina", "Trazodona"], ok: 0, exp: "Duloxetina (IRSN) trata depresión y dolor neuropático diabético. Si la prioridad fuera dejar de fumar: bupropión (pero no sirve para el dolor). Amitriptilina cubre ambos con más efectos adversos." },
  { enf: "hta", t: "¿Qué efecto adverso se explica por el aumento de bradicinina?", ops: ["Hiperpotasemia con losartán", "Tos seca con enalapril", "Edema maleolar con amlodipino", "Hiperuricemia con clortalidona"], ok: 1, exp: "La ECA también degrada bradicinina; al inhibirla, se acumula en la vía aérea → tos." },
  { enf: "hta", t: "Paciente con gota e HTA. ¿Cuál es la peor elección?", ops: ["Losartán", "Amlodipino", "Hidroclorotiazida", "Telmisartán"], ok: 2, exp: "Las tiazidas reducen la excreción de ácido úrico y desencadenan crisis gotosas. Losartán incluso lo baja." },
  { enf: "dm2", t: "¿Qué antidiabético está contraindicado en insuficiencia cardiaca?", ops: ["Empagliflozina", "Pioglitazona", "Metformina", "Linagliptina"], ok: 1, exp: "La pioglitazona retiene sodio y agua y precipita IC. La empagliflozina es justamente de elección en IC." },
  { enf: "dm2", t: "¿Cuál causa hipoglucemia con más frecuencia en monoterapia?", ops: ["Metformina", "Sitagliptina", "Glibenclamida", "Dapagliflozina"], ok: 2, exp: "La glibenclamida secreta insulina sin depender de la glucosa y dura mucho. Metformina, iDPP-4 e iSGLT2 no causan hipoglucemia solos." },
  { enf: "dm2", t: "Antes de una cirugía programada, ¿qué antidiabético se suspende días antes por riesgo de cetoacidosis euglucémica?", ops: ["Linagliptina", "Empagliflozina", "Insulina glargina", "Pioglitazona"], ok: 1, exp: "Los iSGLT2 pueden causar cetoacidosis con glucosa casi normal, sobre todo en ayuno o estrés quirúrgico." },
  { enf: "dep", t: "Paciente con epilepsia y depresión. ¿Qué antidepresivo debes evitar?", ops: ["Sertralina", "Escitalopram", "Bupropión", "Mirtazapina"], ok: 2, exp: "El bupropión reduce el umbral convulsivo." },
  { enf: "dep", t: "¿Por qué un ATC es mala opción en un paciente con riesgo suicida?", ops: ["Tarda más en hacer efecto", "Es letal en sobredosis por arritmias", "Causa disfunción sexual", "No sirve en depresión grave"], ok: 1, exp: "Bloquean canales de sodio cardiacos → QRS ancho, arritmias ventriculares y muerte con pocas tabletas." },
  { enf: "dep", t: "Paciente que toma fenelzina come queso madurado y presenta cefalea intensa y PA 220/130. ¿Qué ocurrió?", ops: ["Síndrome serotoninérgico", "Síndrome de discontinuación", "Crisis hipertensiva por tiramina", "Síndrome neuroléptico maligno"], ok: 2, exp: "El IMAO impide degradar la tiramina de la dieta, que libera noradrenalina → crisis hipertensiva. El serotoninérgico cursa con clonus e hiperreflexia." },
  { enf: "dm2", t: "¿Cuál es la dosis máxima habitual de metformina de liberación inmediata?", ops: ["1000 mg/día", "1700 mg/día", "2550 mg/día", "4000 mg/día"], ok: 2, exp: "2550 mg/día (850 mg c/8 h). La LP llega a 2000 mg/día. Se inicia con 500–850 mg/día." },
  { enf: "dep", t: "¿Cuál es la dosis inicial y máxima habitual de sertralina en un adulto?", ops: ["10 → 20 mg/día", "20 → 80 mg/día", "50 → 200 mg/día", "100 → 400 mg/día"], ok: 2, exp: "Sertralina 50 → 200 mg/día. 10 → 20 es escitalopram y 20 → 80 es fluoxetina." },
  { enf: "dep", t: "Paciente con fluoxetina al que le agregan tramadol. Presenta agitación, fiebre, diaforesis, diarrea, clonus e hiperreflexia. ¿Diagnóstico y antídoto?", ops: ["Síndrome de discontinuación; reiniciar el ISRS", "Síndrome serotoninérgico; suspender y dar ciproheptadina", "Crisis por tiramina; dar labetalol", "Síndrome neuroléptico maligno; dar dantroleno"], ok: 1, exp: "Tríada: alteración mental + hiperactividad autonómica + anomalías neuromusculares (clonus). Suspender y antídoto ciproheptadina." },
  { enf: "dep", t: "Paciente suspende de golpe la paroxetina y refiere mareo, «toques eléctricos», irritabilidad y síntomas gripales. ¿Qué tiene?", ops: ["Síndrome serotoninérgico", "Síndrome de discontinuación", "Recaída de depresión psicótica", "Hiponatremia"], ok: 1, exp: "Retiro brusco (sobre todo paroxetina y venlafaxina). Se previene retirando poco a poco." },
  { enf: "mix", t: "Anciana de 78 años con HTA tratada con clortalidona inicia sertralina. A las 3 semanas presenta confusión. ¿Qué laboratorio pides primero?", ops: ["Sodio sérico", "Ácido úrico", "Vitamina B12", "Perfil tiroideo"], ok: 0, exp: "Tiazida + ISRS en anciano = hiponatremia (se suman dos mecanismos). Medir sodio y considerar otra familia antihipertensiva." },
  { enf: "mix", t: "Paciente con DM2 en insulina al que se le agrega propranolol. ¿Qué riesgo existe?", ops: ["Hiperglucemia grave", "Enmascara y prolonga la hipoglucemia", "Cetoacidosis euglucémica", "Acidosis láctica"], ok: 1, exp: "Los BB enmascaran síntomas adrenérgicos de hipoglucemia (taquicardia, temblor); la sudoración persiste. Preferir BB cardioselectivo." },
  { enf: "mix", t: "Paciente con trastorno bipolar en litio inicia hidroclorotiazida por HTA. ¿Qué esperas?", ops: ["↓ niveles de litio", "↑ niveles de litio → toxicidad", "Hiperpotasemia", "Sin interacción"], ok: 1, exp: "Litio + tiazida, IECA, ARA II o AINE → ↑ litio → toxicidad. Evitar o medir litio de cerca." },
  { enf: "mix", t: "Hombre con DM2, IMC 34 y depresión. ¿Qué antidepresivo conviene EVITAR por su efecto metabólico?", ops: ["Sertralina", "Bupropión", "Mirtazapina", "Escitalopram"], ok: 2, exp: "Mirtazapina (y ATC) ↑ apetito y peso → peor control glucémico. Preferir ISRS o bupropión." },
  { enf: "mix", t: "Paciente con HTA no controlada (162/98) y depresión moderada. ¿Qué antidepresivo evitas?", ops: ["Sertralina", "Mirtazapina", "Venlafaxina", "Escitalopram"], ok: 2, exp: "Venlafaxina ↑ PA dependiente de dosis. Elegir ISRS o mirtazapina." },
  { enf: "mix", t: "Paciente con depresión en sertralina toma además ácido acetilsalicílico y warfarina. ¿Qué riesgo vigilas?", ops: ["Hipoglucemia", "Sangrado", "Hiperpotasemia", "Convulsiones"], ok: 1, exp: "ISRS + AAS/anticoagulante → ↑ sangrado. Considerar protección gástrica." },
  { enf: "hta", t: "Paciente con PA 230/130, cefalea, confusión y vómito (encefalopatía hipertensiva). ¿Qué haces?", ops: ["Captopril sublingual y alta", "Hospitalizar y dar fármaco IV (labetalol, nicardipino)", "Nifedipino de acción corta oral", "Ajustar su tratamiento oral y cita en 1 mes"], ok: 1, exp: "Emergencia hipertensiva (PA muy alta + daño agudo de órgano) → hospital y fármaco IV." },
  { enf: "dm2", t: "Paciente con glucosa de 55 mg/dL, consciente, en tratamiento con acarbosa + glibenclamida. ¿Cómo la tratas?", ops: ["Azúcar de mesa (sacarosa)", "Glucosa pura 15 g y medir a los 15 min", "Insulina rápida", "Esperar a la siguiente comida"], ok: 1, exp: "Regla 15–15. Con acarbosa la sacarosa no se absorbe bien: usar glucosa pura." },
  { enf: "dep", t: "¿A partir de cuándo puedes decir que un antidepresivo «no funcionó»?", ops: ["A los 3 días", "A la semana", "Tras 4–6 semanas a dosis adecuada", "Tras 6 meses"], ok: 2, exp: "El ánimo mejora en 2–4 semanas por adaptaciones lentas (desensibilización 5-HT1A, BDNF). Se evalúa a las 4–6 semanas a dosis terapéutica." },
  { enf: "dep", t: "Tras la remisión de un primer episodio depresivo, ¿cuánto tiempo mantienes el antidepresivo?", ops: ["Suspender al mejorar", "1 mes", "Al menos 6–12 meses", "De por vida siempre"], ok: 2, exp: "Mantener al menos 6–12 meses para evitar recaídas (más si hubo episodios repetidos). Suspender gradualmente." },
  { enf: "hta", t: "Paciente que pasará de enalapril a sacubitrilo/valsartán por IC. ¿Qué precaución?", ops: ["Darlos juntos una semana", "Esperar 36 h tras suspender el IECA", "Suspender también el BB", "No hay precaución"], ok: 1, exp: "IECA + neprilisina inhibida = mucho riesgo de angioedema. Esperar 36 h." }
];

/* ---------- TABLAS PARA LLENAR ----------
   Cada celda: texto (respuesta) · alt: otras respuestas válidas · fijo: no se pide
   tipo: "num" (rango numérico) · "txt" (nombre) · "con" (conector y / y/o) */
const T = (v, o = {}) => ({ v, tipo: "num", ...o });
const N = (v, alt = [], o = {}) => ({ v, tipo: "txt", alt, ...o });
const Y = (v) => ({ v, tipo: "con" });

const TABLAS = [
  {
    id: "hta", nombre: "HTA (GPC)", enf: "hta",
    titulo: "Clasificación de la PA según la GPC mexicana (IMSS), en mmHg",
    nota: "Se diagnostica HTA con ≥140 y/o ≥90 mmHg confirmada en varias visitas. Si sistólica y diastólica caen en grados distintos, se clasifica por la más alta.",
    cols: ["Categoría", "Sistólica", "", "Diastólica"],
    filas: [
      [N("Óptima", ["optima"]), T("<120"), Y("y"), T("<80")],
      [N("Normal"), T("120–129"), Y("y/o"), T("80–84")],
      [N("Normal alta", ["normal alta", "presion normal alta"]), T("130–139"), Y("y/o"), T("85–89")],
      [N("HTA grado 1", ["grado 1", "hta 1", "hipertension grado 1", "grado i", "hta grado i"]), T("140–159"), Y("y/o"), T("90–99")],
      [N("HTA grado 2", ["grado 2", "hta 2", "hipertension grado 2", "grado ii", "hta grado ii"]), T("160–179"), Y("y/o"), T("100–109")],
      [N("HTA grado 3", ["grado 3", "hta 3", "hipertension grado 3", "grado iii", "hta grado iii"]), T("≥180"), Y("y/o"), T("≥110")],
      [N("HTA sistólica aislada", ["sistolica aislada", "hipertension sistolica aislada"]), T("≥140"), Y("y"), T("<90")]
    ]
  },
  {
    id: "dm2", nombre: "Diagnóstico DM2", enf: "dm2",
    titulo: "Criterios diagnósticos de diabetes y prediabetes (ADA)",
    nota: "Sin síntomas, se confirma con una segunda prueba alterada. Metas habituales: A1c <7 %, glucosa en ayuno 80–130 mg/dL, posprandial <180 mg/dL.",
    cols: ["Prueba", "Prediabetes", "Diabetes"],
    filas: [
      [N("Glucosa en ayuno (≥8 h)", ["glucosa en ayuno", "glucosa de ayuno", "ayuno", "glucemia en ayuno"]), T("100–125 mg/dL"), T("≥126 mg/dL")],
      [N("Hemoglobina glucosilada (A1c)", ["a1c", "hba1c", "hemoglobina glucosilada", "hemoglobina glicosilada", "hemoglobina glucosilada a1c"]), T("5.7–6.4 %"), T("≥6.5 %")],
      [N("Glucosa 2 h tras 75 g (PTOG)", ["ptog", "curva de tolerancia", "tolerancia oral a la glucosa", "glucosa 2 h", "glucosa a las 2 h", "prueba de tolerancia oral a la glucosa", "glucosa 2 horas"]), T("140–199 mg/dL"), T("≥200 mg/dL")],
      [N("Glucosa al azar + síntomas clásicos", ["glucosa al azar", "azar", "glucosa casual", "glucosa al azar con sintomas"]), T("—", { fijo: true }), T("≥200 mg/dL")]
    ]
  },
  {
    id: "imcoms", nombre: "IMC (OMS)", enf: "dm2",
    titulo: "Clasificación del IMC en adultos (OMS)",
    nota: "IMC = peso (kg) ÷ talla (m)². Ejemplo: 80 kg y 1.70 m → 80 ÷ 2.89 = 27.7 kg/m² → sobrepeso.",
    cols: ["Clasificación", "IMC (kg/m²)"],
    filas: [
      [N("Bajo peso"), T("<18.5")],
      [N("Peso normal", ["normal", "normopeso"]), T("18.5–24.9")],
      [N("Sobrepeso (preobesidad)", ["sobrepeso", "preobesidad"]), T("25.0–29.9")],
      [N("Obesidad grado I", ["obesidad 1", "obesidad grado 1", "obesidad i", "obesidad tipo 1", "obesidad clase 1"]), T("30.0–34.9")],
      [N("Obesidad grado II", ["obesidad 2", "obesidad grado 2", "obesidad ii", "obesidad tipo 2", "obesidad clase 2"]), T("35.0–39.9")],
      [N("Obesidad grado III (mórbida)", ["obesidad 3", "obesidad grado 3", "obesidad iii", "obesidad morbida", "obesidad grado iii", "obesidad tipo 3", "obesidad clase 3"]), T("≥40")]
    ]
  },
  {
    id: "imcnom", nombre: "IMC (NOM-008)", enf: "dm2",
    titulo: "Sobrepeso y obesidad según la NOM-008-SSA3-2017 (México)",
    nota: "La NOM baja los cortes en talla baja y los sube en adultos mayores. Riesgo por cintura: ≥90 cm hombres, ≥80 cm mujeres.",
    cols: ["Grupo", "Sobrepeso", "Obesidad"],
    filas: [
      [N("Adultos de 20 a 59 años", ["adultos", "adulto", "20 a 59 anos", "adultos de 20 a 59"]), T("25.0–29.9"), T("≥30")],
      [N("Talla baja (hombre <1.60 m, mujer <1.50 m)", ["talla baja", "adultos con talla baja"]), T("23.0–24.9"), T("≥25")],
      [N("Adultos de 60 años o más", ["60 anos o mas", "adultos mayores", "adulto mayor", "mayores de 60", "60 o mas"]), T("28.0–31.9"), T("≥32")]
    ]
  }
];
