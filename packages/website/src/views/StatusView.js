import React from 'react';

import {Typography, Box} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

import GraphCovidCases from '../components/ui/graphs/GraphCovidCases';
import MapCasesCovid from '../components/ui/map/MapCasesCovid';

const useStyles = makeStyles(theme => ({
  text: {
    marginBottom: theme.spacing(4),
  },
}));

const StatusView = () => {
  const classes = useStyles();

  return (
    <>
      <Typography variant="h4" gutterBottom>
        ESTATUS ACTUAL DEL PAÍS
      </Typography>
      <Typography variant="body1" className={classes.text}>
        Información del Sistema de Vigilancia Epidemiológica de Enfermedades
        Respiratoria Viral, que informan las 475 unidades monitoras de
        enfermedad respiratoria viral (USMER) en todo el país de todo el sector
        salud (IMSS, ISSSTE, SEDENA, SEMAR, ETC).
      </Typography>
      <Typography variant="body1" className={classes.text}>
        Nota: Datos preliminares sujetos a validación por la Secretaría de Salud
        a través de la Dirección General de Epidemiología. La información
        contenida corresponde únicamente a los datos que se obtienen del estudio
        epidemiológico de caso sospechoso de enfermedad respiratoria viral al
        momento que se identifica en las unidades médicas del Sector Salud.
      </Typography>
      <Typography variant="body1" className={classes.text}>
        De acuerdo al diagnóstico clínico de ingreso, se considera como un
        paciente ambulatorio u hospitalizado. La base no incluye la evolución
        durante su estancia en las unidades médicas, a excepción de las
        actualizaciones a su egreso por parte de las unidades de vigilancia
        epidemiológica hospitalaria o de jurisdicciones sanitarias en el caso de
        defunciones.
      </Typography>
      <GraphCovidCases />
      <Box marginY={4}>
        <Typography variant="h5">CASOS POSITIVOS</Typography>
      </Box>
      <MapCasesCovid type="Positivo SARS-CoV-2" />
      <Box marginY={4}>
        <Typography variant="h5">CASOS NEGATIVOS</Typography>
      </Box>
      <MapCasesCovid type="No positivo SARS-CoV-2" />
      <Box marginY={4}>
        <Typography variant="h5">CASOS SIN CONFIRMAR</Typography>
      </Box>
      <MapCasesCovid type="Resultado pendiente" />
    </>
  );
};

export default StatusView;
