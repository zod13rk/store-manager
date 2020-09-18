import React, { useState } from 'react'
import { Button, TextField } from '@material-ui/core'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
const theme = createMuiTheme({
  direction: 'rtl' // Both here and <body dir="rtl">
})
export function Form ({ initData, submit, actionName, cancel }) {
  const [values, setValues] = useState(
    initData.reduce((o, c) => {
      o[c.name] = c.value || ''
      return o
    }, {})
  )
  return (
    <ThemeProvider theme={theme}>
      <form
        onSubmit={e => {
          e.preventDefault()
          submit(values)
        }}
      >
        {initData.map((d, i) =>
          d.form ? (
            d.form(values[d.name], value => setValues({ ...values, [d.name]: value }))
          ) : (
            <TextField
              fullWidth
              margin='dense'
              key={i}
              label={d.label}
              name={d.name}
              value={values[d.name]}
              onChange={e => setValues({ ...values, [d.name]: e.target.value })}
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
