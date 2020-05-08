const csv = require('@fast-csv/parse');
const ndjson = require('ndjson')

const {getDescriptionByCatalog} = require('./../utils')

const main = async (covidStream, catalogs) => {
  return new Promise((resolve, reject) => {
    const streamJson = ndjson.serialize();

    const {
      origin,
      sector,
      sex,
      typePacient,
      yesNo,
      nacionality,
      result
    } = catalogs;

    csv
      .parseStream(covidStream, { headers: false })
      .transform(row => {
        if (row[0] === 'FECHA_ACTUALIZACION') {
          return null;
        }

        return {
          "FECHA_ACTUALIZACION": row[0],
          "ID_REGISTRO": row[1],
          "ORIGEN": getDescriptionByCatalog(origin, row[2]),
          "SECTOR": getDescriptionByCatalog(sector, row[3]),
          "ENTIDAD_UM": row[4],
          "SEXO": getDescriptionByCatalog(sex, row[5]),
          "ENTIDAD_NAC": row[6],
          "ENTIDAD_RES": row[7],
          "MUNICIPIO_RES": row[8],
          "TIPO_PACIENTE": getDescriptionByCatalog(typePacient, row[9]),
          "FECHA_INGRESO": row[10],
          "FECHA_SINTOMAS": row[11],
          "FECHA_DEF": row[12] === "9999-99-99" ? '' : row[12],
          "INTUBADO": getDescriptionByCatalog(yesNo, row[13]),
          "NEUMONIA": getDescriptionByCatalog(yesNo, row[14]),
          "EDAD": row[15],
          "NACIONALIDAD": getDescriptionByCatalog(nacionality, row[16]),
          "EMBARAZO": getDescriptionByCatalog(yesNo, row[17]),
          "HABLA_LENGUA_INDIG": getDescriptionByCatalog(yesNo, row[18]),
          "DIABETES": getDescriptionByCatalog(yesNo, row[19]),
          "EPOC":  getDescriptionByCatalog(yesNo, row[20]),
          "ASMA":  getDescriptionByCatalog(yesNo, row[21]),
          "INMUSUPR":  getDescriptionByCatalog(yesNo, row[22]),
          "HIPERTENSION":  getDescriptionByCatalog(yesNo, row[23]),
          "OTRA_COM":  getDescriptionByCatalog(yesNo, row[24]),
          "CARDIOVASCULAR":  getDescriptionByCatalog(yesNo, row[25]),
          "OBESIDAD":  getDescriptionByCatalog(yesNo, row[26]),
          "RENAL_CRONICA":  getDescriptionByCatalog(yesNo, row[27]),
          "TABAQUISMO":  getDescriptionByCatalog(yesNo, row[28]),
          "OTRO_CASO":  getDescriptionByCatalog(yesNo, row[29]),
          "RESULTADO": getDescriptionByCatalog(result, row[30]),
          "MIGRANTE": getDescriptionByCatalog(yesNo, row[31]),
          "PAIS_NACIONALIDAD": row[32],
          "PAIS_ORIGEN": row[33],
          "UCI": getDescriptionByCatalog(yesNo, row[34]),
        };
      })
      .on('error', error => reject(error))
      .on('data', row => {
        if (row !== null) {
          streamJson.write(row)
        }
      })
      .on('end', () => {
        streamJson.end();
        resolve(streamJson)
      });
  })
}

exports.main = main;