import React, {useState, useEffect} from 'react'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Icon from '@material-ui/core/Icon'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
import CircularProgress from '@material-ui/core/CircularProgress'
import SearchIcon from '@material-ui/icons/Search'
import { makeStyles } from '@material-ui/core/styles'
import auth from './../auth/auth-helper'
import {read, update, list} from './api-country.js'
import {Redirect} from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 600,
    margin: 'auto',
    textAlign: 'center',
    marginTop: theme.spacing(5),
    paddingBottom: theme.spacing(2)
  },
  title: {
    margin: theme.spacing(2),
    color: theme.palette.protectedTitle
  },
  error: {
    verticalAlign: 'middle'
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 300
  },
  submit: {
    margin: 'auto',
    marginBottom: theme.spacing(2)
  },
  subheading: {
    marginTop: theme.spacing(2),
    color: theme.palette.openTitle
  },
  switch: {
    marginTop: theme.spacing(2)
  },
  selectionBlock: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  expand: {
    flexGrow: 1
  },
  searchCard: {
    backgroundColor: '#80808024',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  searchField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 300,
    marginBottom: '20px'
  },
  searchButton: {
    minWidth: '20px',
    height: '30px',
    padding: '0 8px',
    marginTop: '25px',
    marginBottom: '20px'
  }
}))

export default function CountryList() {
  const classes = useStyles()
  const [values, setValues] = useState({
      countries: [],
      search: '',
      searched: false,
      error: ''
  })
  const [checkedCountries, setCheckedCountries] = useState({});
  const jwt = auth.isAuthenticated()

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal

    read({t: jwt.token}, signal).then((data) => {
      if (data && data.error) {
        setValues({...values, error: data.error})
      } else {
        setValues({...values, countries: data.countries})
        let newChecked = {}
        data.countries.forEach(c => newChecked[c.name] = c.allowPurchase)
        setCheckedCountries(newChecked)
      }
    })
  
    return function cleanup(){
      abortController.abort()
    }
  }, [])

  const handleCheck = (country) => {
    update(
      { country: country }, 
      { t: jwt.token }, 
      { name: country, allowPurchase: !checkedCountries[country] }
    ).then((data) => {
        if (data && data.error) {
          setValues({...values, error: data.error})
        } else {
          // if no error, change status on website
          let newChecked = {...checkedCountries};
          newChecked[country] = !checkedCountries[country];
          setCheckedCountries(newChecked);
        }
    })
  }

  const handleChange = name => event => {
    setValues({
      ...values, [name]: event.target.value,
    })
  }

  const search = () => {
    list(
      { t: jwt.token },
      {search: values.search}
    ).then((data) => {
      if (data.error) {
        console.log(data.error)
      } else {
        setValues({ ...values, countries: data, searched: true })
        let newChecked = {}
        data.countries.forEach(c => newChecked[c.name] = c.allowPurchase)
        setCheckedCountries(newChecked)
      }
    })
  }
  const enterKey = (event) => {
    if (event.keyCode == 13) {
      event.preventDefault()
      search()
    }
  }
  
  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="h6" className={classes.title}>
          Choose Countries to Ban
        </Typography>
        <Card className={classes.searchCard}>
          <TextField
            id="search"
            label="Search countries"
            type="search"
            onKeyDown={enterKey}
            onChange={handleChange('search')}
            className={classes.searchField}
            margin="normal"
          />
          <Button variant="contained" color={'primary'} className={classes.searchButton} onClick={search}>
            <SearchIcon/>
          </Button>
        </Card>
        {values.countries.length == 0 && <CircularProgress size={80}/>}
        {
          Object.entries(checkedCountries).map(([countryName, checkedStatus]) => 
          <div className={classes.selectionBlock} key={`selectionBlock${countryName}`}>
            <Typography variant="subtitle1" className={classes.subheading}>
              {countryName}
            </Typography>
            <div className={classes.expand}></div>
            <FormControlLabel className={classes.switch}
              control={
                <Switch classes={{
                                  checked: classes.checked,
                                  bar: classes.bar,
                                }}
                        checked={checkedStatus}
                        onChange={() => handleCheck(countryName)}
                />
              }
              label={checkedStatus ? 'Allowed' : 'Banned'}
              />
          </div>
          )
        }
        <br />
        {
          values.error && (<Typography component="p" color="error">
            <Icon color="error" className={classes.error}>error</Icon>
            {values.error}
          </Typography>)
        }
      </CardContent>
    </Card>
  )
}
