var fs = require('fs');
const path = require('path');
const {groupBy, countBy} = require('lodash');
const {jsonConverter} = require('./../utils');

const data = {};
var covidData = JSON.parse(fs.readFileSync(path.resolve(__dirname, './../data/covid.json'), 'utf8'));

const main = () => {
  const counties = groupBy(covidData, 'ENTIDAD_RES');

  for (const keyCounty in counties) {
    data[keyCounty] = {}
    const dates = groupBy(counties[keyCounty], 'FECHA_INGRESO')

    data[keyCounty].totalResults = countBy(counties[keyCounty], "RESULTADO")
    data[keyCounty].totalTypePacient = countBy(counties[keyCounty], "TIPO_PACIENTE")
    data[keyCounty].totalAge = countBy(counties[keyCounty], "EDAD")
    data[keyCounty].careInstensive = countBy(counties[keyCounty], "UCI")
    data[keyCounty].countryOrigin = countBy(counties[keyCounty], "PAIS_ORIGEN")
    data[keyCounty].anotherCase = countBy(counties[keyCounty], "OTRO_CASO")

    for (const keyDate in dates) {
      data[keyCounty].dates = {
        ...data[keyCounty].dates,
        [keyDate]: {
          resultados: countBy(dates[keyDate], "RESULTADO"),
          tipo_paciente: countBy(dates[keyDate], "TIPO_PACIENTE"),
          edades: countBy(dates[keyDate], "EDAD"),
        }
      }
    }
  }

  jsonConverter(data, path.resolve('./../data/covid-counters.json'))
}

exports.main = main;