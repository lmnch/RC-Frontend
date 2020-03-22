<template>
  <q-layout view="lHh Lpr lFf" class="start-grid">
    <q-header class="start-header">
      <q-toolbar>
        <q-toolbar-title >
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container > <!-- edit content ONLY in Start.vue -->
            <router-view />
    </q-page-container>
    
    <q-footer class="start-footer"></q-footer>
  </q-layout>
</template>
