const ndjson = require('ndjson');
const {groupBy, countBy} = require('lodash');

const main = (streamCovidData) => {
  return new Promise((resolve, reject) => {
    let memoryCovidData = [];

    streamCovidData
      .pipe(ndjson.parse())
      .on('data', obj => memoryCovidData.push(obj))
      .on('error', error => reject(error))
      .on('end', () => {

        const response = {};
        const counties = groupBy(memoryCovidData, 'ENTIDAD_RES');

        for (const keyCounty in counties) {
          response[keyCounty] = {}
          const dates = groupBy(counties[keyCounty], 'FECHA_INGRESO')

          response[keyCounty].totalResults = countBy(counties[keyCounty], "RESULTADO")
          response[keyCounty].totalTypePacient = countBy(counties[keyCounty], "TIPO_PACIENTE")
          response[keyCounty].totalAge = countBy(counties[keyCounty], "EDAD")
          response[keyCounty].careInstensive = countBy(counties[keyCounty], "UCI")
          response[keyCounty].countryOrigin = countBy(counties[keyCounty], "PAIS_ORIGEN")
          response[keyCounty].anotherCase = countBy(counties[keyCounty], "OTRO_CASO")

          for (const keyDate in dates) {
            response[keyCounty].dates = {
              ...response[keyCounty].dates,
              [keyDate]: {
                resultados: countBy(dates[keyDate], "RESULTADO"),
                tipo_paciente: countBy(dates[keyDate], "TIPO_PACIENTE"),
                edades: countBy(dates[keyDate], "EDAD"),
              }
            }
          }
        }

        return resolve(response);
      })
  })
}

exports.main = main;
