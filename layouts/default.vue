<template>
  <v-app dark>
<!--    <v-navigation-drawer-->
<!--      v-model="drawer"-->
<!--      :mini-variant="miniVariant"-->
<!--      :clipped="clipped"-->
<!--      fixed-->
<!--      app-->
<!--    >-->
<!--      <v-list>-->
<!--        <v-list-item-->
<!--          v-for="(item, i) in items"-->
<!--          :key="i"-->
<!--          :to="item.to"-->
<!--          router-->
<!--          exact-->
<!--        >-->
<!--          <v-list-item-action>-->
<!--            <v-icon>{{ item.icon }}</v-icon>-->
<!--          </v-list-item-action>-->
<!--          <v-list-item-content>-->
<!--            <v-list-item-title v-text="item.title" />-->
<!--          </v-list-item-content>-->
<!--        </v-list-item>-->
<!--      </v-list>-->
<!--    </v-navigation-drawer>-->
    <v-app-bar
      :clipped-left="clipped"
      height="50"
      fixed
      app
    >
<!--      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />-->
      <v-toolbar-title v-text="title" class="ml-5"/>
      <v-spacer />
<!--      <v-btn-->
<!--        icon-->
<!--        @click.stop="rightDrawer = !rightDrawer"-->
<!--      >-->
<!--        <v-icon>mdi-menu</v-icon>-->
<!--      </v-btn>-->
    </v-app-bar>
    <v-content>
      <v-container>
        <Breadcrumb class="ml-4"/>
        
        <v-layout justify-center align-center>
          <v-flex md12 lg10>
            <nuxt />
          </v-flex>
        </v-layout>
        
        
      </v-container>
    </v-content>
    <v-navigation-drawer
      v-model="rightDrawer"
      :right="right"
      temporary
      fixed
    >
      <v-list>
        <v-list-item @click.native="right = !right">
          <v-list-item-action>
            <v-icon light>
              mdi-repeat
            </v-icon>
          </v-list-item-action>
          <v-list-item-title>Switch drawer (click me)</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-footer
      :fixed="fixed"
      app
    >
      <v-layout>
        <v-spacer />
        <v-flex style="text-align: center">
          <span class="mr-3 copyright">
            Copyright &copy; {{ new Date().getFullYear() }} <b>JrosK</b>
          </span>
          <span class="design-and-code">
            Design & code:
            <a class="link ml-1" href="mailto:jrosk.managment@gmail.com">
              Sol Rosca
            </a>
          </span>
        </v-flex>
        <v-spacer />
      </v-layout>
    </v-footer>
  </v-app>
</template>

<script>
import Breadcrumb from '../components/Breadcrumb';
export default {
  components: { Breadcrumb },
  data: () => ({
    clipped: false,
    drawer: false,
    fixed: false,
    items: [
      {
        icon: 'mdi-home',
        title: 'Home',
        to: '/'
      },
      // {
      //   icon: 'mdi-chart-bubble',
      //   title: 'Inspire',
      //   to: '/inspire'
      // }
    ],
    miniVariant: false,
    right: true,
    rightDrawer: false,
    title: "Boite a WebGL"
  }),
}
</script>

<style lang="scss">
  .admin-footer {
    border-top: 1px solid lightgray;
    background-color: white;
  }
  
  .copyright {
    font-size: 12px;
    color: #757575;
  }
  .design-and-code {
    font-size: 12px;
    color: #757575;
  
    .link {
      color: #EC008C;
      font-size: 14px;
      font-weight: bold;
      text-decoration: none;
    }
  }
</style>
