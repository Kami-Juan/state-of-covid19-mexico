const {createReadStream} = require('fs');
const path = require('path');
const {jsonConverter} = require('./../utils')
const csv = require('@fast-csv/parse');
const {getCatalogs} = require('./catalogs')

const covidStream = createReadStream(path.join(__dirname, './../data/covid-mexico-data.csv'));

const covidObj = [];

(async () => {

  const getDescription = (catalog, pos) => catalog.get(parseInt(pos))["DESCRIPCIÓN"].trim()

  const {
    origin,
    sector,
    sex,
    typePacient,
    yesNo,
    nacionality,
    result
  } = await getCatalogs;

  csv.parseStream(covidStream, {
      headers: false
    })
    .on('error', error => console.error(error))
    .on('data', row => {
      if (row[0] !== 'FECHA_ACTUALIZACION') {
        covidObj.push({
          "FECHA_ACTUALIZACION": row[0],
          "ID_REGISTRO": row[1],
          "ORIGEN": getDescription(origin, row[2]),
          "SECTOR": getDescription(sector, row[3]),
          "ENTIDAD_UM": row[4],
          "SEXO": getDescription(sex, row[5]),
          "ENTIDAD_NAC": row[6],
          "ENTIDAD_RES": row[7],
          "MUNICIPIO_RES": row[8],
          "TIPO_PACIENTE": getDescription(typePacient, row[9]),
          "FECHA_INGRESO": row[10],
          "FECHA_SINTOMAS": row[11],
          "FECHA_DEF": row[12] === "9999-99-99" ? '' : row[12],
          "INTUBADO": getDescription(yesNo, row[13]),
          "NEUMONIA": getDescription(yesNo, row[14]),
          "EDAD": row[15],
          "NACIONALIDAD": getDescription(nacionality, row[16]),
          "EMBARAZO": getDescription(yesNo, row[17]),
          "HABLA_LENGUA_INDIG": getDescription(yesNo, row[18]),
          "DIABETES": getDescription(yesNo, row[19]),
          "EPOC":  getDescription(yesNo, row[20]),
          "ASMA":  getDescription(yesNo, row[21]),
          "INMUSUPR":  getDescription(yesNo, row[22]),
          "HIPERTENSION":  getDescription(yesNo, row[23]),
          "OTRA_COM":  getDescription(yesNo, row[24]),
          "CARDIOVASCULAR":  getDescription(yesNo, row[25]),
          "OBESIDAD":  getDescription(yesNo, row[26]),
          "RENAL_CRONICA":  getDescription(yesNo, row[27]),
          "TABAQUISMO":  getDescription(yesNo, row[28]),
          "OTRO_CASO":  getDescription(yesNo, row[29]),
          "RESULTADO": getDescription(result, row[30]),
          "MIGRANTE": getDescription(yesNo, row[31]),
          "PAIS_NACIONALIDAD": row[32],
          "PAIS_ORIGEN": row[33],
          "UCI": getDescription(yesNo, row[34]),
        })
      }
    })
    .on('end', () => jsonConverter(covidObj, path.join('./../data/covid.json')));
})();