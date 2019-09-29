'use strict'

import { app } from 'electron'
import createAuthWindow from './services/auth-process'
import createAppWindow from './services/app-process'
import authService from './services/auth-service'

if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow

async function createWindow () {
  try {
    await authService.refreshTokens()
    mainWindow = createAppWindow()
  } catch (err) {
    createAuthWindow()
  }
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})
