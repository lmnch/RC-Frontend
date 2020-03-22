<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="MainHeader">
      <q-toolbar>
        <q-toolbar-title>
          <div
            style="font-size: 2.5rem; width:80vw; white-space: initial; text-align: center; float:left"
          >
            Rindviech Control
          </div>
          <div style="float: right; width:10vw; margin-top: 3vh;">
            <a href="#/options">
              <img
                id="loading"
                width="25px"
                height="25px"
                src="~assets/gear.png"
              />
            </a>
          </div>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer class="MainFooter">
      <a href="#/map">
        <img src="~assets/arrow.png" style="width:30px;" />
      </a>
      <br />
      Leafe Safe-Zone
    </q-footer>
  </q-layout>
</template>

<script>
export default {
  name: "MainLayout"
};
</script>
