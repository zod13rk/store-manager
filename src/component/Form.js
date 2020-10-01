import React, { useState } from 'react'
import { Button, IconButton, TextField, Divider } from '@material-ui/core'
import {
  createMuiTheme,
  ThemeProvider,
  makeStyles
} from '@material-ui/core/styles'
import EditIcon from '@material-ui/icons/Edit'

import Dialog from '@material-ui/core/Dialog'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import CloseIcon from '@material-ui/icons/Close'
import Slide from '@material-ui/core/Slide'

const theme = createMuiTheme({
  direction: 'rtl' // Both here and <body dir="rtl">
})

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative'
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1
  }
}))

const Transition = React.forwardRef(function Transition (props, ref) {
  return <Slide direction='up' ref={ref} {...props} />
})

export function Form ({ initData, submit, actionName, cancel }) {
  const classes = useStyles()
  const [values, setValues] = useState(
    initData.reduce((o, c) => {
      o[c.name] = c.value || ''
      return o
    }, {})
  )
  const [open, setOpen] = useState({})
  const handleClickOpen = (k) => {
    setOpen({ ...open, [k]: true })
  }

  const handleClose = (k) => {
    setOpen({ ...open, [k]: false })
  }
  return (
    <ThemeProvider theme={theme}>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          submit(values)
        }}
      >
        {initData.map(({ table, name, label, map, inputTable }, i) =>
          table ? (
            <div key={i}>
              <div>
                <Typography variant='h6' className={classes.title}>
                  {label}
                  <IconButton onClick={() => handleClickOpen(i)}>
                    <EditIcon />
                  </IconButton>
                </Typography>
                {values[name] ? map(values) : ''}
              </div>
              <Dialog
                fullScreen
                open={open[i]}
                onClose={() => handleClose(i)}
                TransitionComponent={Transition}
              >
                <AppBar className={classes.appBar}>
                  <Toolbar>
                    <IconButton
                      edge='start'
                      color='inherit'
                      onClick={() => handleClose(i)}
                      aria-label='close'
                    >
                      <CloseIcon />
                    </IconButton>
                    <Typography variant='h6' className={classes.title}>
                      {label}
                    </Typography>
                    <Button
                      autoFocus
                      color='inherit'
                      onClick={() => handleClose(i)}
                    >
                      انجام
                    </Button>
                  </Toolbar>
                </AppBar>
                {table(values[name], (value) =>
                  setValues({ ...values, [name]: value })
                )}
              </Dialog>
              <Divider />
            </div>
          ) : inputTable ? (
            inputTable(values[name], (value) =>
              setValues({ ...values, [name]: value })
            )
          ) : (
            <TextField
              fullWidth
              margin='dense'
              key={i}
              label={label}
              name={name}
              value={values[name]}
              onChange={(e) => setValues({ ...values, [name]: e.target.value })}
            />
          )
        )}
        <Button color='secondary' onClick={cancel}>
          انصراف
        </Button>
        <Button
          variant='contained'
          color='primary'
          onClick={() => {
            submit(values)
            cancel()
          }}
        >
          {actionName}
        </Button>
      </form>
    </ThemeProvider>
  )
}
