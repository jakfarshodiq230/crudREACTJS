import React, { useEffect, useState } from "react";

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { Select, MenuItem } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function UserCreate() {
  const classes = useStyles();

  const handleSubmit = event => {
    event.preventDefault();
    var data = {
      'nama': nama,
      'provinsi': provinsi,
      'kabupaten': kabupaten,
      'kecamatan': kecamatan,
      'kelurahan': kelurahan,
    }
    fetch(' https://61601920faa03600179fb8d2.mockapi.io/pegawai', {
      method: 'POST',
      headers: {
        Accept: 'application/form-data',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(res => res.json())
      .then(
        (result) => {
          alert(result['message'])
          if (result['status'] === 'ok') {
            window.location.href = '/';
          }
        }
      )
  }
  // nama provinsi
  const [prov, setprovinsi] = useState([]);
  useEffect(() => {
    ProvinsiGet()
  }, [])

  const ProvinsiGet = () => {
    fetch("https://dev.farizdotid.com/api/daerahindonesia/kota?id_provinsi=32")
      .then(res => res.json())
      .then(
        (result) => {
          setprovinsi(result)
          // console.log(result.kota_kabupaten[0]['nama'])
        }
      )
  }

  // nama kanupaten
  const [kab, setKab] = useState([]);
  useEffect(() => {
    KabupatenGet()
  })

  const KabupatenGet = () => {
    fetch("https://dev.farizdotid.com/api/daerahindonesia/kota?id_provinsi=32")
      .then(res => res.json())
      .then(
        (result) => {
          setKab(result.kota_kabupaten)
          // console.log(result.kota_kabupaten[0]['nama'])
        }
      )
  }


  // nama kecamatan
  const [camat, setCamat] = useState([]);
  useEffect(() => {
    camatGet()
  }, [])

  const camatGet = () => {
    fetch("https://dev.farizdotid.com/api/daerahindonesia/kecamatan?id_kota=3214")
      .then(res => res.json())
      .then(
        (result) => {
          setCamat(result.kecamatan)
          // console.log(result.kecamatan)
        }
      )
  }

  // nama kelurahan
  const [lurah, setLurah] = useState([]);
  useEffect(() => {
    lurahGet()
  }, [])

  const lurahGet = () => {
    fetch("https://dev.farizdotid.com/api/daerahindonesia/kelurahan?id_kecamatan=3214010")
      .then(res => res.json())
      .then(
        (result) => {
          setLurah(result.kelurahan)
          // console.log(result.kelurahan)
        }
      )
  }

  const [nama, setNama] = useState('');
  const [provinsi, setProvinsi] = useState('');
  const [kabupaten, setKabupaten] = useState('');
  const [kecamatan, setKecamatan] = useState('');
  const [kelurahan, setKelurahan] = useState('');
  return (
    <Container maxWidth="xs">
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          DATA PEGAWAI
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="nama"
                label="nama"
                onChange={(e) => setNama(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="provinsi"
                label="provinsi"
                
                onChange={(e) => setProvinsi(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Select
                labelId="demo-simple-select-label"
                id="kabupaten"
                variant="outlined"
                label="kabupaten"
                required
                fullWidth
                //value={age}
                onChange={(e) => setKabupaten(e.target.value)}
              >
                {kabupaten.map((kabu) => (
                  <MenuItem value={kab.nama}>{kab.nama}</MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12}>
              <Select
                labelId="demo-simple-select-label"
                id="kecamatan"
                variant="outlined"
                label="kecamatan"
                required
                fullWidth
                //value={age}
                onChange={(e) => setKecamatan(e.target.value)}
              >
                {camat.map((camat) => (
                  <MenuItem value={camat.nama}>{camat.nama}</MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12}>

              <Select
                labelId="demo-simple-select-label"
                id="kelurahan"
                variant="outlined"
                label="kelurahan"
                required
                fullWidth
                //value={age}
                onChange={(e) => setKelurahan(e.target.value)}
              >
                {lurah.map((lurah) => (
                  <MenuItem value={lurah.nama}>{lurah.nama}</MenuItem>
                ))}
              </Select>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Create
          </Button>
        </form>
      </div>
    </Container>
  );
}