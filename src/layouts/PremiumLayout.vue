<template>
  <q-layout view="lHh Lpr lFf" style="min-height: 100px">
    <q-header>
      <q-toolbar>
        <q-toolbar-title class="premium-header">
          <a href="#/main">
            <img width="25px" height="25px" src="~assets/arrowleft.png" />
          </a>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container class="bg-premium-layout">
      <router-view />
    </q-page-container>
  </q-layout>
</template>
